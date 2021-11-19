import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Color_5, Hangeul, Logo } from '../styles/common';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import UserContext from '../context/UserContext';

const Navbar = styled.nav`
  display: flex;
  max-width: 1500px;
  height: 70px;
  margin: 0 auto;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
  @media ${({ theme }) => theme.size.mobile} {
    padding: 0px 16px;
  }
`;

const LogoImg = styled.img`
  height: 60%;
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 80px;
  font-size: 17px;
  color: ${({ theme }) => theme.color};
  font-family: ${Hangeul};
  font-weight: 500;
  background-color: transparent;
  padding: 0;
  border: none;
  transition: 0.25s;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Menu = ({ showLogin, setShowLogin, showSignup, setShowSignup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);

  const showLoginHandler = () => {
    setShowLogin(true);
  };

  const showSignupHandler = () => {
    setShowSignup(true);
  };

  const logoutHandler = () => {
    setIsLogout(true);
    setIsOpen(true);
  };

  const goToMyPage = () => {
    history.push(`/mypage/${user.id}`);
  };
  const goToMain = () => {
    history.push('/main');
  };

  return (
    <>
      <Navbar>
        <LogoImg
          src={Logo}
          alt="로고"
          onClick={goToMain}
          onContextMenu={(e) => e.preventDefault()}
        />
        {user === null ? (
          <div>
            <Button onClick={showLoginHandler}>로그인</Button>
            <Button onClick={showSignupHandler}>회원가입</Button>
          </div>
        ) : (
          <div>
            <Button onClick={goToMyPage}>마이페이지</Button>
            <Button onClick={logoutHandler}>로그아웃</Button>
          </div>
        )}
        {showLogin === true ? (
          <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
        ) : null}
        {showSignup === true ? (
          <Signup setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
        ) : null}
        {isLogout === true ? (
          <Logout isOpen={isOpen} setIsOpen={setIsOpen} setUser={setUser} />
        ) : null}
      </Navbar>
    </>
  );
};

export default Menu;
