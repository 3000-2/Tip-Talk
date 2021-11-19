import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../styles/common';

const Background = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 380px;
  height: 160px;
  padding: 20px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.55);
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.55);
  align-items: center;
  animation: 0.15s scale;
  div {
    display: flex;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 0;
  color: ${({ theme }) => theme.color};
  font-size: 20px;
  border: none;
  background-color: transparent;
`;

const Message = styled.span`
  margin: 20px 0;
  font-size: 20px;
`;

const Modal = ({ message, setIsOpen, callback, no, withoutNo }) => {
  const eventHandler = () => {
    if (callback) {
      callback();
    }

    closeModal();
  };

  const closeModal = () => {
    if (no) {
      no();
    }
    setIsOpen(false);
  };
  return (
    <Background>
      <ModalContainer>
        <CloseButton onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <Message>{message}</Message>
        <div>
          <Button width="80px" margin="3px" onClick={eventHandler}>
            확인
          </Button>
          {withoutNo === true ? null : (
            <Button width="80px" margin="3px" onClick={closeModal}>
              아니요
            </Button>
          )}
        </div>
      </ModalContainer>
    </Background>
  );
};

export default Modal;
