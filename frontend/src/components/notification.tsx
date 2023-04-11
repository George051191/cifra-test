import React, { FC } from 'react';
import styled from 'styled-components';
import { TNotification } from '../services/types';

const ErrorDiv = styled.div`
  background: #ce5472;
  width: 200px;
  height: 50px;
  border-radius: 6px;
  position: fixed;
  top: 50px;
  left: 50px;
  z-index: 100;
  text-align: center;
`;

const Notification:FC<TNotification> = ({ errorMessage }) => (
  <ErrorDiv>{errorMessage}</ErrorDiv>
);

export default Notification;
