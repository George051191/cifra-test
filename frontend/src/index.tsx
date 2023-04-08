import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { createRoot } from 'react-dom/client';
import AlegreyaFonts from './vendor';
import  App  from './app/app';

const rootDiv = document.getElementById('root');
const rootNode = createRoot(rootDiv as Element);

const GlobalStyles = createGlobalStyle`
  ${normalize}
`;

rootNode.render(
  <React.StrictMode>
    <GlobalStyles />
    <AlegreyaFonts />
    <App />
  </React.StrictMode>,
);
