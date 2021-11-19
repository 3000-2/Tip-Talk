import axios from 'axios';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import { Scroll } from '../styles/common';
import Thumbnail from '../components/Thumbnail';
import Modal from '../components/Modal';
import UserContext from '../context/UserContext';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Color_1 } from '../styles/common';

const Container = styled.div`
  width: 100%;
  height: ${(props) => (props.role === 1 ? 1600 + 'px' : 1100 + 'px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  ${Button} {
    display: ${(props) => (props.correctUser === true ? 'block' : 'none')};
  }

  .no-image {
    font-size: 8rem;
    position: absolute;
    top: 50rem;

    .no-picture {
      position: relative;
      font-size: 2rem;
      top: 2.5rem;
    }
  }

  .mypost-image {
    font-size: 8rem;
    position: absolute;
    top: 80rem;

    .no-picture-mypost {
      position: relative;
      font-size: 2rem;
      top: 2.5rem;
    }
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .top-header {
    font-size: 3rem;
    position: relative;
    top: 5rem;
  }
  .middle-header {
    font-size: 3rem;
    position: relative;
    top: 15rem;
  }
  .bottom-header {
    font-size: 3rem;
    position: relative;
    top: 43rem;
  }
`;

const ProfileSection = styled.div`
  width: 800px;
  height: 330px;
  position: relative;
  top: 8rem;
  display: flex;
  flex-direction: row;
  .wrapper-1 {
    .wrapper-1-1 {
      width: 280px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        width: 180px;
        height: 180px;
      }
    }
    .wrapper-1-2 {
      width: 280px;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      > input {
        display: none;
      }
    }
  }

  .wrapper-2 {
    .wrapper-2-1 {
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .email-div {
        top: 1.5rem;
        line-height: 2.5rem;
        position: relative;
        width: 14rem;
        height: 2.5rem;
        border-bottom: 2px solid ${Color_1};
      }
      #nickname-input {
        position: relative;
        width: 14rem;
        height: 2.5rem;
        font-size: 1.5rem;
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none;
        text-align: center;
      }
      #password-input {
        position: relative;
        width: 14rem;
        height: 2.5rem;
        font-size: 1.5rem;
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none;
        text-align: center;
      }
      #old-password-input {
        position: relative;
        width: 14rem;
        height: 2.5rem;
        font-size: 1.5rem;
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none;
        text-align: center;
      }
    }
    .wrapper-2-2 {
      width: 280px;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .wrapper-3 {
    .wrapper-3-1 {
      width: 240px;
      height: 100%;
    }
    .wrapper-3-2 {
      width: 240px;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .wrapper-before-edit {
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 100%;
    align-items: center;

    .before-edit-email-div {
      top: 6rem;
      line-height: 2.5rem;
      position: relative;
      border-bottom: 2px solid ${Color_1};
      width: 14rem;
      height: 2.5rem;
    }

    .before-edit-nickname-div {
      line-height: 2.5rem;
      position: relative;
      top: 8rem;
      width: 14rem;
      height: 2.5rem;
      border-bottom: 2px solid ${Color_1};
    }
  }
`;

const RadioSection = styled.div`
  position: relative;
  width: 14rem;
  .owner-div {
    display: inline-block;
    position: relative;
    right: 1.5rem;
    top: -0.1rem;
  }
  #owner-radio {
    display: inline-block;
    position: relative;
    right: 2rem;
  }
  .user-div {
    display: inline-block;
    position: relative;
    left: 1.5rem;
    top: -0.1rem;
  }
  #user-radio {
    display: inline-block;
    position: relative;
    left: 1rem;
  }

  .before-edit-radio-container {
    position: relative;
    top: 10.5rem;

    .before-edit-owner-div {
      display: inline-block;
      position: relative;
      right: 1.5rem;
      top: -0.1rem;
    }
    #before-edit-owner-radio {
      display: inline-block;
      position: relative;
      right: 2rem;
    }
    .before-edit-user-div {
      display: inline-block;
      position: relative;
      left: 1.5rem;
      top: -0.1rem;
    }
    #before-edit-user-radio {
      display: inline-block;
      position: relative;
      left: 1rem;
    }
  }

  input[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border: 1px solid #bbbbbb;
    background-color: #e7e6e7;
    border-radius: 50%;
  }

  input[type='radio']:checked {
    background-color: ${Color_1};
  }
`;

const Carousel = styled.div`
  position: absolute;
  top: 46rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  .carousel-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .carousel-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .carousel-content-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .carousel-content {
    display: flex;
    transition: all 250ms linear;
    transform: translateX(
      -${(props) => props.currentIndex * (500 / props.show)}%
    );
  }
  .carousel-content::-webkit-scrollbar {
    display: none;
  }
  .carousel-content > * {
    width: 95%;
    flex-shrink: 0;
    flex-grow: 1;
  }
  .left-arrow {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: white;
    border: 1px solid #ddd;
    left: 24px;
  }
  .right-arrow {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: white;
    border: 1px solid #ddd;
    right: 24px;
  }
  .carousel-content {
    ${(props) =>
      props.show < 4
        ? `width: calc(100% / ${props.show})`
        : `width: calc(100% / 4)`};
  }
`;

const MypostCarousel = styled.div`
  position: absolute;
  top: 77rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  .mypost-carousel-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .mypost-carousel-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .mypost-carousel-content-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .mypost-carousel-content {
    display: flex;
    transition: all 250ms linear;
    transform: translateX(
      -${(props) => props.currentIndex * (500 / props.show)}%
    );
  }
  .mypost-carousel-content::-webkit-scrollbar {
    display: none;
  }
  .mypost-carousel-content > * {
    width: 95%;
    flex-shrink: 0;
  }
  .mypost-left-arrow {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: white;
    border: 1px solid #ddd;
    left: 24px;
  }
  .mypost-right-arrow {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: white;
    border: 1px solid #ddd;
    right: 24px;
  }
  .mypost-carousel-content {
    ${(props) =>
      props.show < 4
        ? `width: calc(100% / ${props.show})`
        : `width: calc(100% / 4)`};
  }
`;

const ErrorMessage = styled.div`
  color: red;

  .password-length-over-8 {
    position: absolute;
    bottom: 2rem;
    left: 19rem;
  }

  .password-not-match {
    position: absolute;
    bottom: 12rem;
    left: 19rem;
  }
`;

const MyPage = () => {
  const [show, setShow] = useState(0);
  const [myPostShow, setMyPostShow] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isClose, setIsClose] = useState(null);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState(null);
  const [password, setPassword] = useState('');
  const [oldpassword, setOldpassword] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [myPostCurrentIndex, setMyPostCurrentIndex] = useState(0);
  const [is8Digit, setIs8Digit] = useState(null);
  const fileInput = useRef(null);
  const scrollRef = useRef();
  const history = useHistory();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);
  const [correctUser, setCorrectUser] = useState(null);
  const [likePost, setLikePost] = useState(null);
  const [likePostLength, setLikePostLength] = useState(likePost?.length);
  const [myPost, setMyPost] = useState(null);
  const [myPostLength, setMyPostLength] = useState(myPost?.length);

  useEffect(() => {
    if (userInfo !== null) {
      const { role } = userInfo;
      const owner = document.getElementById('before-edit-owner-radio');
      const user = document.getElementById('before-edit-user-radio');
      if (owner !== null && user !== null) {
        if (role === 1) {
          document.getElementById('before-edit-owner-radio').checked = true;
        } else if (role === 2) {
          document.getElementById('before-edit-user-radio').checked = true;
        }
      }
    }

    if (isEditing === true && userInfo !== null) {
      const { role } = userInfo;
      if (role === 1) {
        document.getElementById('owner-radio').checked = true;
      } else if (role === 2) {
        document.getElementById('user-radio').checked = true;
      }
    }
  }, [userInfo, isEditing]);

  useEffect(() => {
    if (userInfo) {
      const { img } = userInfo;
      setImage(img);
    }
  }, [userInfo]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/${id}`)
      .then((res) => {
        const { data } = res.data;
        setUserInfo(data.user);
        setImage(data.user.img);
      })
      .catch(() => {});
  }, [isEditing]);

  const editHandler = () => {
    setIsEditing(true);
  };

  const fileHandler = (e) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImageBase64(base64.toString());
      }
    };

    if (e.target.files && e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);

      const fd = new FormData();
      fd.append('img', e.target.files[0]);

      axios
        .patch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          const { img } = res.data;
          setImage(img);
        })
        .catch(() => {});
    }
  };

  const closeModalOpenHandler = () => {
    setIsOpen(true);
    setIsClose(true);
  };

  const editCompleteModalCloseHandler = () => {
    setIsEditing(false);
    setIsPasswordMatch(null);
  };

  const modalOpenHandler = () => {
    setIsOpen(true);
    setIsClose(false);
  };

  const deleteHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/auth/deleteUser`, {
        withCredentials: true,
      })
      .then((res) => {
        history.push('/');
        setUserInfo(null);
        setUser(null);
      })
      .catch(() => {});
  };

  const nicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const oldPasswordHandler = (e) => {
    setOldpassword(e.target.value);
  };

  const submitHandler = () => {
    const el = document.querySelector('input[name=role2]:checked');
    if (el !== null) {
      const role = el.value;
      if (userInfo?.platform === 0) {
        axios
          .patch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, {
            nickname,
            oldpassword,
            password,
            role,
          })
          .then(() => {
            setIsPasswordMatch(true);
          })
          .catch(() => {
            setIsPasswordMatch(false);
          });
      } else {
        axios
          .patch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, {
            nickname,
            oldpassword: '',
            role,
          })
          .then(() => {
            setIsPasswordMatch(true);
          })
          .catch(() => {
            setIsPasswordMatch(false);
          });
      }
    }
  };

  const next = () => {
    if (currentIndex < likePostLength - (show > 4 ? 4 : show)) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const myPostNext = () => {
    if (myPostCurrentIndex < myPostLength - (myPostShow > 4 ? 4 : myPostShow)) {
      setMyPostCurrentIndex((prevState) => prevState + 1);
    }
  };

  const myPostPrev = () => {
    if (myPostCurrentIndex > 0) {
      setMyPostCurrentIndex((prevState) => prevState - 1);
    }
  };

  const checkPassword = () => {
    if (password?.length >= 8) {
      setIs8Digit(true);
    } else {
      setIs8Digit(false);
    }
  };

  useEffect(() => {
    setCorrectUser(user?.id === Number(userInfo?.id));
  }, [user, userInfo]);

  useEffect(() => {
    const result = [];
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/post/like/${id}`)
      .then((res) => {
        const { data } = res.data;
        const { find } = data;
        for (let i = 0; i < find.length; i++) {
          const { post } = find[i];
          (({ id, images, title }) =>
            result.push({
              id: id,
              title: title,
              images: images.split(' '),
            }))(post);
        }
        setLikePost(result);
        setShow(find.length);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const result = [];
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/post/mypost`)
      .then((res) => {
        const { data } = res.data;
        const { myPost } = data;
        for (let i = 0; i < myPost.length; i++) {
          const data = myPost[i];
          (({ id, title, images }) =>
            result.push({
              id: id,
              title: title,
              images: images.split(' '),
            }))(data);
        }
        setMyPost(result);
        setMyPostShow(myPost.length);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLikePostLength(likePost?.length);
  }, [likePostLength, likePost]);

  useEffect(() => {
    setMyPostLength(myPost?.length);
  }, [myPostLength, myPost]);

  return (
    <>
      <Scroll ref={scrollRef} />
      <Coin scrollRef={scrollRef} mode="up" right="40px" bottom="110px" />
      <Container correctUser={correctUser} role={userInfo?.role}>
        <Header>
          <div className="top-header">마이페이지</div>
        </Header>
        <ProfileSection>
          <div className="wrapper-1">
            <div className="wrapper-1-1">
              {image ? (
                <img src={image} />
              ) : imageBase64 ? (
                <img src={imageBase64} />
              ) : (
                <FontAwesomeIcon icon={faUser} size="10x" />
              )}
            </div>
            <div className="wrapper-1-2">
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                ref={fileInput}
                onChange={fileHandler}
              />
              <Button onClick={() => fileInput.current.click()}>
                이미지 변경
              </Button>
            </div>
          </div>
          <div className="wrapper-2">
            <div className="wrapper-2-1">
              {isEditing === true ? (
                userInfo?.platform === 0 ? (
                  <>
                    <div className="email-div">{userInfo?.email}</div>
                    <input
                      type="password"
                      id="old-password-input"
                      placeholder="old password"
                      onChange={oldPasswordHandler}
                    />
                    <input
                      type="text"
                      id="nickname-input"
                      placeholder="new nickname"
                      onChange={nicknameHandler}
                    />
                    <input
                      type="password"
                      id="password-input"
                      placeholder="new password"
                      onChange={passwordHandler}
                    />
                    <RadioSection>
                      <input
                        type="radio"
                        id="owner-radio"
                        name="role2"
                        value="1"
                      />
                      <div className="owner-div">사업자</div>
                      <input
                        type="radio"
                        id="user-radio"
                        name="role2"
                        value="2"
                      />
                      <div className="user-div">일반사용자</div>
                    </RadioSection>
                  </>
                ) : (
                  <>
                    <div className="email-div">{userInfo?.email}</div>
                    <input
                      type="text"
                      id="nickname-input"
                      placeholder="new nickname"
                      onChange={nicknameHandler}
                    />
                    <RadioSection>
                      <input
                        type="radio"
                        id="owner-radio"
                        name="role2"
                        value="1"
                      />
                      <div className="owner-div">사업자</div>
                      <input
                        type="radio"
                        id="user-radio"
                        name="role2"
                        value="2"
                      />
                      <div className="user-div">일반사용자</div>
                    </RadioSection>
                  </>
                )
              ) : (
                <>
                  <div className="wrapper-before-edit">
                    <div className="before-edit-email-div">
                      {userInfo?.email}
                    </div>
                    <div className="before-edit-nickname-div">
                      {userInfo?.nickname}
                    </div>
                    <RadioSection>
                      <div className="before-edit-radio-container">
                        <input
                          type="radio"
                          id="before-edit-owner-radio"
                          name="role1"
                          value="1"
                        />
                        <div className="before-edit-owner-div">사업자</div>
                        <input
                          type="radio"
                          id="before-edit-user-radio"
                          name="role1"
                          value="2"
                        />
                        <div className="before-edit-user-div">일반사용자</div>
                      </div>
                    </RadioSection>
                  </div>
                </>
              )}
            </div>
            <div className="wrapper-2-2">
              {isEditing === false ? (
                <Button className="edit" onClick={editHandler}>
                  수정하기
                </Button>
              ) : (
                <Button
                  className="edit"
                  onClick={() => [
                    checkPassword(),
                    modalOpenHandler(),
                    submitHandler(),
                  ]}
                >
                  수정 완료
                </Button>
              )}
              {console.log('is8Digit = ' + is8Digit)}
              {console.log('isPasswordMatch = ' + isPasswordMatch)}
              {isOpen === true &&
              (is8Digit === true || isPasswordMatch === true) ? (
                <Modal
                  message={'정상적으로 수정되었습니다'}
                  setIsOpen={setIsOpen}
                  withoutNo={true}
                  callback={() => [editCompleteModalCloseHandler()]}
                />
              ) : null}
              {isOpen === true && userInfo?.platform !== 0 ? (
                <Modal
                  message={'정상적으로 수정되었습니다'}
                  setIsOpen={setIsOpen}
                  withoutNo={true}
                  callback={() => [editCompleteModalCloseHandler()]}
                />
              ) : null}
            </div>
            {is8Digit === true ||
            password?.length === 0 ||
            password?.length >= 8 ||
            userInfo?.platform !== 0 ? null : (
              <ErrorMessage>
                <div className="password-length-over-8">
                  비밀번호는 8자리 이상이어야 합니다
                </div>
              </ErrorMessage>
            )}
            {isPasswordMatch === true ||
            isPasswordMatch === null ||
            userInfo?.platform !== 0 ? null : (
              <ErrorMessage>
                <div className="password-not-match">
                  예전 비밀번호와 일치하지 않습니다
                </div>
              </ErrorMessage>
            )}
          </div>
          <div className="wrapper-3">
            <div className="wrapper-3-1"></div>
            <div className="wrapper-3-2">
              <Button className="close-account" onClick={closeModalOpenHandler}>
                회원탈퇴
              </Button>
            </div>
            {isOpen === true && isClose === true ? (
              <Modal
                message="회원 탈퇴하시겠습니까?"
                setIsOpen={setIsOpen}
                callback={deleteHandler}
              />
            ) : null}
          </div>
        </ProfileSection>
        <Header>
          <div className="middle-header">
            {userInfo?.nickname}의 찜한 장소 목록
          </div>
        </Header>
        {likePostLength === 0 ? (
          <div className="no-image">
            😅
            <div className="no-picture">아직 사진이 없습니다.</div>
          </div>
        ) : null}
        <Carousel currentIndex={currentIndex} show={show}>
          <div className="carousel-container">
            <div className="carousel-wrapper">
              {currentIndex > 0 && (
                <button className="left-arrow" onClick={prev}>
                  &lt;
                </button>
              )}
              <div className="carousel-content-wrapper">
                <div className="carousel-content">
                  {likePost?.map((post) => (
                    <Thumbnail thumbnail={post} key={post.id} />
                  ))}
                </div>
              </div>
              {currentIndex < likePostLength - (show > 4 ? 4 : show) &&
              likePostLength > 4 ? (
                <button className="right-arrow" onClick={next}>
                  &gt;
                </button>
              ) : null}
            </div>
          </div>
        </Carousel>
        {userInfo?.role === 1 ? (
          <Header>
            <div className="bottom-header">내가 등록한 장소</div>
            {myPostLength === 0 ? (
              <div className="mypost-image">
                😅
                <div className="no-picture-mypost">아직 사진이 없습니다. </div>
              </div>
            ) : null}
            <MypostCarousel currentIndex={myPostCurrentIndex} show={myPostShow}>
              <div className="mypost-carousel-container">
                <div className="mypost-carousel-wrapper">
                  {myPostCurrentIndex > 0 && (
                    <button className="mypost-left-arrow" onClick={myPostPrev}>
                      &lt;
                    </button>
                  )}
                  <div className="mypost-carousel-content-wrapper">
                    <div className="mypost-carousel-content">
                      {myPost?.map((post) => (
                        <Thumbnail thumbnail={post} key={post.id} />
                      ))}
                    </div>
                  </div>
                  {myPostCurrentIndex <
                    myPostLength - (myPostShow > 4 ? 4 : show) &&
                  myPostLength > 4 ? (
                    <button className="mypost-right-arrow" onClick={myPostNext}>
                      &gt;
                    </button>
                  ) : null}
                </div>
              </div>
            </MypostCarousel>
          </Header>
        ) : null}
      </Container>
    </>
  );
};

export default MyPage;
