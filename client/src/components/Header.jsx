import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  color: ${({ theme }) => theme.color};
  background-color: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Header = ({ showLogin, setShowLogin, showSignup, setShowSignup }) => {
  return (
    <>
      <HeaderContainer>
        <Menu
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          showSignup={showSignup}
          setShowSignup={setShowSignup}
        />
      </HeaderContainer>
    </>
  );
};

export default Header;
