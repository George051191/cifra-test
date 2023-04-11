/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useEffect, useMemo, FC, MouseEventHandler, MouseEvent,
} from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { TModalProps } from '../services/types';
import { CrossIcon } from './icons';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(243 236 236 / 40%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 24px;
  height: 24px;
  border: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 98;
 
`;

const ModalDialog = styled.div`
  position: relative;
  width: 400px;
  z-index: 97;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 0 4px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  background-color:  #FFFFFF;
`;

const Modal : FC<TModalProps> = ({ onClose, children }) => {
  const portalRoot = useMemo(() => document.getElementById('modal'), []) as Element;
  useEffect(() => {
    const handleEscClose = (evt: any): void => {
      evt.stopPropagation();
      if (evt.key === 'Escape') {
        onClose(evt);
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose, portalRoot]);
  const onCloseClick : MouseEventHandler = (evt) => onClose(evt);

  return ReactDOM.createPortal(
    (
      <ModalOverlay>
        <ModalDialog>
          <CloseButton onClick={onCloseClick}><CrossIcon /></CloseButton>
          {children}
        </ModalDialog>
      </ModalOverlay>
    ), portalRoot,
  );
};

export default Modal;
