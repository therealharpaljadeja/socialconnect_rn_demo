import {OdisUtils} from '@celo/identity';
import BigNumber from 'bignumber.js';

export async function getQuota(address, authSigner, serviceContext) {
  const {remainingQuota} = await OdisUtils.Quota.getPnpQuotaStatus(
    address,
    authSigner,
    serviceContext,
  );
  return remainingQuota;
}

export async function lookupAttestations(
  federatedAttestationsContract,
  identifier,
  issuer,
) {
  const {accounts} = await federatedAttestationsContract.lookupAttestations(
    identifier,
    [issuer.address],
  );

  return accounts;
}

export async function getOdisPaymentAllowance(issuer, issuerKit) {
  const odisPaymentContract = await issuerKit.contracts.getOdisPayments();
  const cusd = await issuerKit.contracts.getStableToken();
  const currentAllowance = await cusd.allowance(
    issuer.address,
    odisPaymentContract.address,
  );

  return currentAllowance;
}

export async function increaseOdisPaymentAllowance(issuerKit) {
  const cusd = await issuerKit.contracts.getStableToken();
  const ONE_CENT_CUSD = issuerKit.web3.utils.toWei('0.01', 'ether');
  const odisPaymentContract = await issuerKit.contracts.getOdisPayments();

  const approvalTxReceipt = await cusd
    .increaseAllowance(odisPaymentContract.address, ONE_CENT_CUSD)
    .sendAndWaitForReceipt();

  return approvalTxReceipt.status;
}

export async function checkIfEnoughAllowanceToBuyQuota(issuer, issuerKit) {
  let currentAllowance = await getOdisPaymentAllowance(issuer, issuerKit);
  const ONE_CENT_CUSD = issuerKit.web3.utils.toWei('0.01', 'ether');

  return BigNumber(currentAllowance).gte(BigNumber(ONE_CENT_CUSD));
}

export async function payOdisPaymentAndGetQuota(issuer, issuerKit) {
  const odisPaymentContract = await issuerKit.contracts.getOdisPayments();
  const ONE_CENT_CUSD = issuerKit.web3.utils.toWei('0.001', 'ether');
  const odisPayment = await odisPaymentContract
    .payInCUSD(issuer.address, ONE_CENT_CUSD)
    .sendAndWaitForReceipt();
  return odisPayment.transactionHash;
}

export async function buyMoreQuota(issuer, issuerKit) {
  let isAllowanceEnough = await checkIfEnoughAllowanceToBuyQuota(
    issuer,
    issuerKit,
  );

  let paymentTxHash;

  if (isAllowanceEnough) {
    try {
      paymentTxHash = await payOdisPaymentAndGetQuota(issuer, issuerKit);
      return paymentTxHash;
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await increaseOdisPaymentAllowance(issuerKit);
    } catch (e) {
      console.log(e);
    }
  }
}
