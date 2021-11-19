import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Color_3, Samlib, Logo } from '../styles/common';
import axios from 'axios';
import { Button } from '../styles/common';
import Modal from './Modal';

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

  .ModalView {
    border-radius: 10px;
    background-color: #ffffff;
    width: 38rem;
    height: 47rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3), 0 0 5px 5px rgba(0, 0, 0, 0.3);

    .close-btn {
      border-radius: 10px;
      cursor: pointer;
      border: none;
      position: relative;
      left: 17rem;
      top: -5rem;
      background-color: ${({ theme }) => theme.navBgColor};
      color: ${Color_3};
      &:hover {
        color: ${({ theme }) => theme.navBgColor};
        background-color: ${Color_3};
      }
      transition-duration: 0.3s;
      font-size: 2rem;
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
    height: 4rem;
    position: relative;
    top: 6rem;
    #id {
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }

  #verification {
    position: relative;
    top: 3.5rem;
    font-size: 1.5rem;
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
  }

  .verification-button {
    position: relative;
    top: 1rem;
    left: 14rem;
  }

  .password-line {
    position: relative;
    top: 6.5rem;
    height: 2rem;
    #password {
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
    #re-password {
      position: relative;
      top: 1.5rem;
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }

  .nickname-line {
    position: relative;
    top: 5rem;
    #nickname {
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: 11rem;
`;

const ToLoginButton = styled(Button)`
  position: relative;
  top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-family: ${Samlib};
  .idError {
    position: fixed;
    top: 17rem;
    left: 9.5rem;
  }
  .passwordError {
    position: fixed;
    top: 31.5rem;
    left: 9.5rem;
  }
  .conflictError {
    position: fixed;
    top: 36rem;
    left: 9.5rem;
  }
  .insufficientError {
    position: fixed;
    top: 36.5rem;
    left: 9.5rem;
  }
  .password-length-error {
    position: fixed;
    top: 35rem;
    left: 9.5rem;
  }
  .verification-not-match-error {
    position: fixed;
    top: 34.5rem;
    left: 9.5rem;
  }
`;

const RadioSection = styled.div`
  position: relative;
  top: 6.5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  font-family: ${Samlib};
  .radioContainer {
    width: 20rem;
    display: flex;
    justify-content: space-around;
  }
  .owner {
    display: inline;
    color: black;
  }
  .user {
    display: inline;
    color: black;
  }
`;

const Signup = ({ setShowLogin, setShowSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [insufficient, setInsufficient] = useState(false);
  const [role, setRole] = useState(null);
  const [isExist, setIsExist] = useState(false);
  const [passwordLength, setPasswordLength] = useState(true);
  const [verificationCode, setVerificationCode] = useState(null);
  const [inputVerification, setInputVerification] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(null);

  const closeSignupModal = () => {
    setShowSignup(false);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const rePasswordHandler = (e) => {
    setRePassword(e.target.value);
  };

  const nicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
  };

  const roleHandler = (e) => {
    setRole(e.target.value);
  };

  useEffect(() => {
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (email.length === 0) {
      setIsValidEmail(false);
    }
    if (regex.test(email) === false) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  }, [email]);

  const passwordValidation = () => {
    if (password === rePassword) return true;
    return false;
  };

  const insufficientValidation = () => {
    if (
      email.length === 0 ||
      nickname.length === 0 ||
      password.length === 0 ||
      rePassword.length === 0 ||
      role === null
    ) {
      setInsufficient(true);
    } else {
      setInsufficient(false);
    }
  };

  const submitHandler = () => {
    if (
      passwordValidation() === true &&
      checkVerificationCodeMatch() === true
    ) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
          email,
          password,
          nickname,
          role,
        })
        .then((res) => {
          closeSignupModal();
        })
        .catch(() => {
          setIsExist(true);
        });
    }
  };

  const passwordLengthCheck = () => {
    if (password) {
      if (password.length >= 8) {
        setPasswordLength(true);
      } else {
        setPasswordLength(false);
      }
    }
  };

  const verificationHandler = () => {
    if (email !== null && isValidEmail === true) {
      modalHandler();
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/auth/sendEmail`, { email })
        .then((res) => {
          const { data } = res.data;
          const { number } = data;
          setVerificationCode(number);
        })
        .catch(() => {});
    }
  };

  const verificationInputHandler = (e) => {
    setInputVerification(e.target.value);
  };

  const checkVerificationCodeMatch = () => {
    if (verificationCode === inputVerification) {
      setIsVerified(true);
      return true;
    } else {
      setIsVerified(false);
      return false;
    }
  };

  const modalHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
      <ModalBackdrop onClick={closeSignupModal}>
        <div className="ModalView" onClick={(e) => e.stopPropagation()}>
          <img className="icon" src={Logo} alt="logo" />
          <button onClick={closeSignupModal} className="close-btn">
            &times;
          </button>
          <InputSection>
            <div className="id-line">
              <input
                type="text"
                id="id"
                placeholder="email"
                onChange={emailHandler}
              />
            </div>
            <Button
              className="verification-button"
              onClick={verificationHandler}
            >
              인증하기
            </Button>
            {console.log('isOpen = ' + isOpen)}
            {console.log('isValidEmail = ' + isValidEmail)}
            {isOpen === true && isValidEmail === true ? (
              <Modal
                message={'인증 메일이 발송되었습니다'}
                withoutNo={true}
                setIsOpen={setIsOpen}
              />
            ) : null}
            <input
              type="text"
              id="verification"
              placeholder="verification code"
              onChange={verificationInputHandler}
            />
            {isValidEmail === false && email !== '' ? (
              <ErrorMessage>
                <div className="idError">이메일 형식을 입력해주세요</div>
              </ErrorMessage>
            ) : null}
            <div className="nickname-line">
              <input
                type="text"
                id="nickname"
                placeholder="nickname"
                onChange={nicknameHandler}
              />
            </div>
            <div className="password-line">
              <input
                type="password"
                id="password"
                placeholder="password"
                onChange={passwordHandler}
              />
            </div>
            <div className="password-line">
              <input
                type="password"
                id="re-password"
                placeholder="confirm password"
                onChange={rePasswordHandler}
              />
            </div>
            {passwordValidation() === true || rePassword.length === 0 ? null : (
              <ErrorMessage>
                <div className="passwordError">
                  비밀번호가 일치하지 않습니다
                </div>
              </ErrorMessage>
            )}
          </InputSection>
          <RadioSection>
            <div className="radioContainer">
              <div>
                <input
                  type="radio"
                  id="owner"
                  name="role"
                  value="1"
                  onClick={roleHandler}
                />
                <div className="owner">사업자</div>
              </div>
              <div>
                <input
                  type="radio"
                  id="user"
                  name="role"
                  value="2"
                  onClick={roleHandler}
                />
                <div className="user">일반사용자</div>
              </div>
            </div>
          </RadioSection>
          <BottomContainer>
            <Button
              onClick={() => [
                submitHandler(),
                insufficientValidation(),
                passwordLengthCheck(),
              ]}
            >
              확인
            </Button>
            <ToLoginButton
              onClick={() => [showLoginHandler(), closeSignupModal()]}
            >
              로그인
            </ToLoginButton>
          </BottomContainer>
          {isExist === true && insufficient === false ? (
            <ErrorMessage>
              <div className="conflictError">
                이메일이나 닉네임이 사용 중입니다
              </div>
            </ErrorMessage>
          ) : null}
          {insufficient === true ? (
            <ErrorMessage>
              <div className="insufficientError">
                모든 항목을 입력해야합니다
              </div>
            </ErrorMessage>
          ) : null}
          {passwordLength === false ? (
            <ErrorMessage>
              <div className="password-length-error">
                비밀번호는 8자리 이상이어야 합니다
              </div>
            </ErrorMessage>
          ) : null}
          {isVerified === false ? (
            <ErrorMessage>
              <div className="verification-not-match-error">
                인증번호가 일치하지 않습니다
              </div>
            </ErrorMessage>
          ) : null}
        </div>
      </ModalBackdrop>
    </>
  );
};

export default Signup;
