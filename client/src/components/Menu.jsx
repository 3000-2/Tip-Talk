import React from 'react';
import styled from 'styled-components';
import { Samlib } from '../styles/common';

const Navbar = styled.nav`
  display: flex;
  max-width: 1000px;
  height: 70px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 60px;
`;

export const Button = styled.button`
  width: 120px;
  font-size: 26px;
  color: ${(props) => props.theme.navColor};
  font-family: ${Samlib};
  background-color: transparent;
  border: none;
  transition: 0.25s;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Menu = () => {
  return (
    <Navbar>
      <Logo
        src="https://drawit.s3.ap-northeast-2.amazonaws.com/tip-talk/logo_transparent.png"
        alt="로고"
      />
      <div>
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </div>
    </Navbar>
  );
};

export default Menu;
