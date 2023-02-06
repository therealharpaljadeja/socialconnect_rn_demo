import React from 'react';

import {KitProvider} from './src/context/KitContext';
import App from './App';

const AppWrapper = () => {
  return (
    <KitProvider>
      <App />
    </KitProvider>
  );
};

export default AppWrapper;
