import {useWalletConnect} from '@walletconnect/react-native-dapp';

const ConnectorContext = React.createContext(null);

const ConnectorProvider = ({children}) => {
  const connector = useWalletConnect();
  function isConnected() {
    return connector.connected();
  }
  return (
    <ConnectorContext.Provider
      value={{connector, isConnected}}></ConnectorContext.Provider>
  );
};
export default ConnectorContext;
