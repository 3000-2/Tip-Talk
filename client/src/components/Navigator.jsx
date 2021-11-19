import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: absolute;
  left: 40%;
  top: 16px;
  padding: 16px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 1.1px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 2;
  transition: 0.2s;
  animation: 0.15s scale;
  @media ${({ theme }) => theme.size.mobile} {
    display: none;
  }
`;

const Close = styled.button`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 20px;
  height: 20px;
  color: white;
  border: none;
  text-align: center;
  background-color: transparent;
`;

const Navigator = ({ role, setIsOpen }) => {
  const [message, setMessage] = useState(1);

  const pageController = () => {
    if (message >= 2) {
      setIsOpen(false);
    } else {
      setMessage(message + 1);
    }
  };

  const getMessage = () => {
    if (role === 1) {
      switch (message) {
        case 1:
          return (
            <span>지도를 클릭하여 자신의 사업지를 등록할 수 있습니다.</span>
          );
        case 2:
          return <span>왼쪽에서 등록하기 버튼을 눌러보세요.</span>;
        default:
          return;
      }
    } else {
      switch (message) {
        case 1:
          return <span>검색창에 주소나 장소명을 입력해보세요.</span>;
        case 2:
          return <span>카테고리를 선택할 수도 있습니다.</span>;
        default:
          return;
      }
    }
  };
  return (
    <Background>
      <>
        <Close onClick={pageController}>
          <FontAwesomeIcon icon={faTimes} />
        </Close>
        {getMessage()}
      </>
    </Background>
  );
};

export default Navigator;
