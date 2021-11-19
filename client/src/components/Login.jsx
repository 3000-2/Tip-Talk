import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Color_3, Samlib, Logo } from '../styles/common';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { Button } from '../styles/common';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;

  .modalView {
    border-radius: 10px;
    background-color: #ffffff;
    width: 610px;
    height: 680px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3), 0 0 5px 5px rgba(0, 0, 0, 0.3);
    @media ${({ theme }) => theme.size.mobile} {
      width: 90%;
    }

    .close-btn-wrapper {
      position: relative;
      display: flex;
      justify-content: right;
      top: -5rem;
      right: 1rem;
      width: 100%;
      .close-btn {
        border-radius: 10px;
        cursor: pointer;
        border: none;
        background-color: ${({ theme }) => theme.navBgColor};
        color: ${Color_3};
        &:hover {
          color: ${({ theme }) => theme.navBgColor};
          background-color: ${Color_3};
        }
        transition-duration: 0.3s;
        font-size: 2rem;
      }
    }

    .icon {
      width: 15rem;
      position: relative;
      top: 5rem;
    }
  }
`;

const InputSection = styled.div`
  width: 38rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .id-line {
    position: relative;
    top: 7rem;
    height: 5rem;
    #id {
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }

  .password-line {
    position: relative;
    top: 7rem;
    #password {
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }
`;

const LoginButton = styled(Button)`
  position: relative;
  top: -2rem;
`;

const BottomContainer = styled.div`
  .bottomSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 30rem;
    position: relative;
    top: 1rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-family: ${Samlib};
  .idError {
    position: relative;
    top: 0.5rem;
    left: 0.5rem;
  }
  .passwordError {
    position: relative;
    top: 0.5rem;
    left: 0.5rem;
  }
`;

const GoogleButton = styled.img`
  width: 15rem;
  cursor: pointer;
  position: relative;
  top: -1rem;
`;

const KakaoButton = styled.img`
  position: relative;
  top: -0.6rem;
  width: 15rem;
  cursor: pointer;
`;

const Login = ({ setShowLogin, setShowSignup }) => {
  const googleNormal =
    'https://tiptalk-client.s3.us-east-2.amazonaws.com/btn_google_signin_light_normal_web.png';
  const googleFocus =
    'https://tiptalk-client.s3.us-east-2.amazonaws.com/btn_google_signin_light_focus_web.png';
  const googlePressed =
    'https://tiptalk-client.s3.us-east-2.amazonaws.com/btn_google_signin_light_pressed_web.png';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useContext(UserContext);
  const [status, setStatus] = useState(null);
  const [googleButton, setGoogleButton] = useState(googleNormal);

  const oauth2Handler = () => {
    setGoogleButton(googlePressed);
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const SCOPE =
      'https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/plus.me+https://www.googleapis.com/auth/userinfo.profile';
    const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;
    const STATE = 'state_parameter_passthrough_value';
    const INCLUDE_GRANTED_SCOPES = true;
    const PROMPT = 'consent';
    const oauth2Endpoint = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&access_type=offline&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${STATE}&include_granted_scopes=${INCLUDE_GRANTED_SCOPES}&prompt=${PROMPT}`;

    window.location.assign(oauth2Endpoint);
  };
  const KakaoLogin = () => {
    const K_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const K_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${K_CLIENT_ID}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;
    window.location.assign(kakaoLoginUrl);
  };

  const closeLoginModal = () => {
    setShowLogin(false);
  };

  const signupHandler = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const emailValidation = () => {
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (email.length === 0) {
      return true;
    }
    if (regex.test(email) === false) {
      return false;
    }
    return true;
  };

  const loginHandler = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        const { data } = res.data;
        setUser(data.user);
        closeLoginModal();
      })
      .catch(() => setStatus(false));
  };

  const googleButtonHandler = (e) => {
    if (e.type === 'mouseenter') {
      setGoogleButton(googleFocus);
    } else if (e.type === 'mouseleave') {
      setGoogleButton(googleNormal);
    }
  };

  return (
    <>
      <ModalBackdrop onClick={closeLoginModal}>
        <div className="modalView" onClick={(e) => e.stopPropagation()}>
          <img className="icon" src={Logo} alt="logo" />
          <div className="close-btn-wrapper">
            <button onClick={closeLoginModal} className="close-btn">
              &times;
            </button>
          </div>
          <InputSection>
            <div className="id-line">
              <input
                type="text"
                id="id"
                placeholder="email"
                onChange={emailHandler}
              />
              {emailValidation() === false ? (
                <ErrorMessage>
                  <div className="idError">이메일 형식을 입력해주세요</div>
                </ErrorMessage>
              ) : null}
            </div>
            <div className="password-line">
              <input
                type="password"
                id="password"
                placeholder="password"
                onChange={passwordHandler}
              />
              {(user === null || user === undefined) && status === false ? (
                <ErrorMessage>
                  <div className="passwordError">
                    이메일이나 비밀번호가 올바르지 않습니다
                  </div>
                </ErrorMessage>
              ) : null}
            </div>
          </InputSection>
          <LoginButton onClick={loginHandler}>로그인</LoginButton>
          <BottomContainer>
            <div className="bottomSection">
              <GoogleButton
                src={googleButton}
                alt="google-button"
                onClick={oauth2Handler}
                onMouseEnter={googleButtonHandler}
                onMouseLeave={googleButtonHandler}
              ></GoogleButton>
              <KakaoButton
                src="https://tiptalk-client.s3.us-east-2.amazonaws.com/kakao_login_medium_narrow.png"
                alt="kakao-button"
                onClick={KakaoLogin}
              ></KakaoButton>
              <Button onClick={signupHandler}>회원가입</Button>
            </div>
          </BottomContainer>
        </div>
      </ModalBackdrop>
    </>
  );
};

export default Login;
