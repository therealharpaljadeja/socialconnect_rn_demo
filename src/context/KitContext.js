import {newKit} from '@celo/contractkit';
import {OdisUtils} from '@celo/identity';
import {IdentifierPrefix} from '@celo/identity/lib/odis/identifier';
import {OdisContextName} from '@celo/identity/lib/odis/query';
import {ISSUER_PRIVATE_KEY} from '@env';
import {E164_REGEX} from '../services/twilio';
import {ReactBlsBlindingClient} from '../utils/bls-blinding-client';
import {buyMoreQuota, getQuota} from '../utils/odisUtils';
import React, {useState, useEffect, useReducer} from 'react';

const KitContext = React.createContext(null);

const INITIAL_STATE = {
  issuer: undefined,
  issuerKit: undefined,
  federatedAttestations: undefined,
  odisPayment: undefined,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ISSUER':
      return {...state, issuer: action.payload};
    case 'ISSUER_KIT':
      return {...state, issuerKit: action.payload};
    case 'FEDERATED_ATTESTATIONS':
      return {...state, federatedAttestations: action.payload};
    case 'ODIS_PAYMENTS':
      return {...state, odisPayment: action.payload};
    default:
      return state;
  }
};

export const KitProvider = ({children}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const init = async () => {
      const issuerKit = newKit('https://alfajores-forno.celo-testnet.org');
      issuerKit.addAccount(ISSUER_PRIVATE_KEY);
      dispatch({type: 'ISSUER_KIT', payload: issuerKit});
      dispatch({
        type: 'ISSUER',
        payload:
          issuerKit.web3.eth.accounts.privateKeyToAccount(ISSUER_PRIVATE_KEY),
      });
      setIsInitialized(true);
    };
    init();
  }, []);

  useEffect(() => {
    async function getContracts() {
      dispatch({
        type: 'FEDERATED_ATTESTATIONS',
        payload: await state.issuerKit.contracts.getFederatedAttestations(),
      });
      dispatch({
        type: 'ODIS_PAYMENTS',
        payload: await state.issuerKit.contracts.getOdisPayments(),
      });
    }

    if (state.issuerKit) {
      getContracts();
    }
  }, [state.issuerKit]);

  useEffect(() => {
    if (state.issuer) {
      dispatch({
        type: 'ISSUER_KIT',
        payload: {...state.issuerKit, defaultAccount: state.issuer.address},
      });
    }
  }, [state.issuer]);

  async function getIdentifier(phoneNumber) {
    try {
      if (!E164_REGEX.test(phoneNumber)) {
        throw 'Attempting to hash a non-e164 number: ' + phoneNumber;
      }
      const authSigner = {
        authenticationMethod: OdisUtils.Query.AuthenticationMethod.WALLET_KEY,
        contractKit: issuerKit,
      };
      const serviceContext = getServiceContext(OdisContextName.ALFAJORES);

      const remainingQuota = await getQuota(
        issuerKit.defaultAccount,
        authSigner,
        serviceContext,
      );

      if (remainingQuota < 1) {
        let paymentTxHash = await buyMoreQuota(issuer, issuerKit);
        console.log(`Odis Quota Payment: ${paymentTxHash}`);
      }

      const blindingClient = new ReactBlsBlindingClient(
        serviceContext.odisPubKey,
      );

      const {obfuscatedIdentifier} =
        await OdisUtils.Identifier.getObfuscatedIdentifier(
          phoneNumber,
          IdentifierPrefix.PHONE_NUMBER,
          issuer.address,
          authSigner,
          serviceContext,
          undefined,
          undefined,
          blindingClient,
        );

      return obfuscatedIdentifier;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <KitContext.Provider value={{isInitialized, state}}>
      {children}
    </KitContext.Provider>
  );
};
export default KitContext;
