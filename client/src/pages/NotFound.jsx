import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { Color_1, Color_2 } from '../styles/common';

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1600px;
  height: calc(100vh - 190px);
  padding-bottom: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    color: ${Color_2};
    font-size: 148px;
    margin-bottom: 20px;
  }
`;

const Message = styled.h1`
  color: ${Color_1};
  font-size: 48px;
  margin-bottom: 20px;
`;

const NotFound = () => {
  return (
    <Container>
      <FontAwesomeIcon className="icon" icon={faExclamationCircle} />
      <Message>찾을 수 없는 페이지입니다!</Message>
      <Message>주소를 다시 확인해주세요!</Message>
    </Container>
  );
};

export default NotFound;
