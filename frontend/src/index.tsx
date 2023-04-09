import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './store/store';

import AlegreyaFonts from './vendor';
import App from './app/app';

const rootDiv = document.getElementById('root');
const rootNode = createRoot(rootDiv as Element);

const GlobalStyles = createGlobalStyle`
  ${normalize}
`;

rootNode.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <AlegreyaFonts />
      <App />
    </Provider>
  </React.StrictMode>,
);
