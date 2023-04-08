import { createGlobalStyle } from 'styled-components';

import AlegreyaRegularTtf from './Alegreya/Alegreya-Regular.ttf';

const AlegreyaFonts = createGlobalStyle`
  @font-face {
    font-family: 'Alegreya';
    src: local('Alegreya'),
      url(${AlegreyaRegularTtf}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }
`;

export default AlegreyaFonts;
