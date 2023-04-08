import styled from 'styled-components';

import { ReactComponent as UpArrow } from '../vendor/images/upArrow.svg';
import { ReactComponent as DownArrow } from '../vendor/images/downArrow.svg';
import { ReactComponent as SettingsIcon } from '../vendor/images/settings.svg';
import { ReactComponent as CrossPic } from '../vendor/images/cross-icon.svg';

export const UpArrowIcon = styled(UpArrow)`
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    top:0;
    left:-24px ;
`;

export const DownArrowIcon = styled(DownArrow)`
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    top:0;
    right:-24px ;
    cursor: pointer;
`;


export const BasicSettingsIcon = styled(SettingsIcon)`
   width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    top: 28px;
    right:-24px ;
    cursor: pointer;
`
export const CrossIcon = styled(CrossPic)`
  width: 24px;
  height: 24px;
  display: block;
`;