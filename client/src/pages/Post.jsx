import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  Body,
  Color_3,
  Color_4,
  Info,
  Label,
  Meta,
  Text,
} from '../styles/common';
import { useParams, useHistory } from 'react-router';
import Carousel from '../components/Carousel';
import { kakao } from '../App';
import Comments from '../components/Comments';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { EditorForm, Element, Leaf } from '../components/TextEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faEdit,
  faHeart,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import UserContext from '../context/UserContext';

const PostContainer = styled.article`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1600px;
  min-height: 600px;
  padding: 50px 50px 100px;
  @media ${({ theme }) => theme.size.tablet} {
    flex-direction: column;
    padding: 50px 10px 100px;
    justify-content: center;
    align-items: center;
  }
`;

export const Column = styled.div`
  display: flex;
  width: 50%;
  margin: 0 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media ${({ theme }) => theme.size.tablet} {
    width: 70%;
  }
  @media ${({ theme }) => theme.size.mobile} {
    width: 90%;
  }
  @media ${({ theme }) => theme.size.mobileS} {
    width: 100%;
  }
`;

export const CarouselContainer = styled.div`
  width: 100%;
  height: 600px;
  margin-bottom: 20px;
  @media ${({ theme }) => theme.size.tablet} {
    height: 620px;
  }
  @media ${({ theme }) => theme.size.mobile} {
    height: 540px;
  }
  @media ${({ theme }) => theme.size.mobileS} {
    height: 380px;
  }
`;

const CustomMeta = styled(Meta)`
  width: 100%;
  margin-bottom: 0px;
  padding: 10px 25px;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  background-color: transparent;
  .title {
    display: flex;
    font-size: 48px;
    text-overflow: ellipsis;
    align-items: center;
  }
  @media ${({ theme }) => theme.size.tabletL} {
    flex-direction: column;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${({ theme }) => theme.size.tabletL} {
    justify-content: flex-start;
    div {
      margin-right: 20px;
    }
  }
`;

const Map = styled.div`
  width: 100%;
  height: 360px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  .container {
    padding: 8px 16px;
    border-radius: 6px;
    color: ${Color_3};
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.55);
  }
  .container:hover {
    cursor: pointer;
  }
`;

const CoinForm = styled.div`
  display: flex;
  position: fixed;
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  right: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.navBgColor};
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  z-index: 10;
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.navBgColor};
    background-color: ${Color_3};
  }
`;

const CoinButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 22px;
  border: none;
  color: ${({ isLike }) => (isLike ? Color_4 : Color_3)};
  background-color: transparent;
  :hover {
    color: ${({ isLike, theme }) => (isLike ? Color_4 : theme.navBgColor)};
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const TextEditor = styled(EditorForm)``;

const Post = () => {
  const map = useRef();
  const marker = useRef();
  const scrollRef = useRef();
  const history = useHistory();

  const [current, setCurrent] = useState(0);
  const [pages, setPages] = useState([1]);
  const [post, setPost] = useState();
  const [value, setValue] = useState();
  const [comments, setComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLikeOpen, setIsLikeOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { postId } = useParams();
  const [user] = useContext(UserContext);

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    const MapContainer = document.getElementById('map');

    const center = new kakao.maps.LatLng(0, 0);

    const option = {
      center,
      level: 3,
    };

    map.current = new kakao.maps.Map(MapContainer, option);
  }, []);

  useEffect(() => {
    // * 서버로부터 데이터 받아오기
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/post/${postId}`)
      .then(({ data }) => {
        if (data.status) {
          const { posts } = data.data;
          setValue(JSON.parse(posts.content));
          setPost({
            ...posts,
            images: posts.images.split(' '),
            content: JSON.parse(posts.content),
          });

          const lat = +posts.lat;
          const lng = +posts.lng;

          axios
            .get(`${process.env.REACT_APP_SERVER_URL}/post/around/${postId}`, {
              params: { lat, lng },
            })
            .then(({ data }) => {
              if (data.status && data.data.posts.length > 0) {
                const { posts } = data.data;
                let bounds = new kakao.maps.LatLngBounds();
                posts.forEach((post) => {
                  post.lat = +post.lat;
                  post.lng = +post.lng;
                  displayMarker(post);
                  bounds.extend(new kakao.maps.LatLng(post.lat, post.lng));
                });
                bounds.extend(new kakao.maps.LatLng(lat, lng));
                map.current.setBounds(bounds);
              }
            });

          const center = new kakao.maps.LatLng(+lat, +lng);

          marker.current = new kakao.maps.Marker({
            position: center,
          });

          setCenter(lat, lng);
          marker.current.setPosition(new kakao.maps.LatLng(lat, lng));
          marker.current.setMap(map.current);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    function displayMarker(post) {
      const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const imageSize = new kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const newMarker = new kakao.maps.Marker({
        map: map.current,
        position: new kakao.maps.LatLng(post.lat, post.lng),
        image: markerImage,
      });

      const content = `<div class="container">
      <div class="overlay">
        <span class="title">${post.title}</span>
      </div>
    </div>`;

      const overlay = new kakao.maps.CustomOverlay({
        content,
        map: map.current,
        position: newMarker.getPosition(),
        yAnchor: 0,
      });

      overlay.setVisible(null);

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(newMarker, 'click', function () {
        if (overlay.getVisible()) {
          overlay.setVisible(null);
        } else {
          overlay.setVisible(map.current);
        }
      });

      overlay.a.onclick = () => setIsOpen({ id: post.id, title: post.title });
    }
  }, [postId]);

  useEffect(() => {
    if (current !== null) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/comment/${postId}?page=${current}`,
        )
        .then(({ data }) => {
          if (data.data) {
            data.data.forEach((comment) => {
              parseDate(comment);
            });
            setComments(data.data);
            const page = [1];
            for (let i = 1; i <= data.max; i++) {
              page.push(i + 1);
            }
            setPages(page);
          }
        });
    }
  }, [current, postId]);

  const setCenter = (lat, lng) => {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.current.panTo(moveLatLon);
  };

  const parseDate = (comment) => {
    comment.updatedAt = new Date(comment.updatedAt)
      .toLocaleDateString()
      .replaceAll('.', '')
      .split(' ');
    comment.updatedAt = `${comment.updatedAt[1]}월 ${comment.updatedAt[2]}일`;
  };

  const handleLike = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/like/${postId}`)
      .then(({ data }) => {
        if (data.status) {
          setPost({ ...post, isLike: !post.isLike });
        }
      });
  };

  const handleSubmit = (text) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/comment/${postId}`, { text })
      .then(({ data }) => {
        if (data.status) {
          setCurrent(null);
          setCurrent(0);
        }
      });
  };

  const handleEdit = (text, commentId) => {
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/comment/${commentId}`, {
        text,
      })
      .then(({ data }) => {
        if (data.status) {
          comments.forEach((comment) => {
            if (comment.id === commentId) {
              comment.text = data.data.text;
            }
          });
          setComments([...comments]);
        }
      });
  };

  const handleCommentDelete = (commentId) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/comment/${commentId}`)
      .then(() => {
        const filtered = comments.filter((comment) => comment.id !== commentId);
        setCurrent(null);
        setCurrent(0);
        setComments([...filtered]);
      });
  };

  const goToPost = (id) => {
    scrollRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'start',
      inline: 'nearest',
    });
    marker.current = undefined;
    history.push(`/loading`);
    setTimeout(() => {
      history.replace(`/post/${id}`);
    }, 2000);
  };

  const callback = () => {
    if (user) {
      handleLike();
    }
  };

  const ChangePage = (page) => {
    setCurrent(page);
  };

  const getPages = (pages) => {
    if (current < 4) {
      return pages.slice(0, 5);
    } else if (current + 5 > pages.length) {
      return pages.slice(pages.length - 5, pages.length);
    } else {
      return pages.slice(current - 3, current + 2);
    }
  };

  const goToEdit = () => {
    history.push(`/edit/${post.id}`);
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/post/${post.id}`)
      .then(() => {
        history.push(`/main`);
      })
      .catch(() => {
        history.push(`/main`);
      });
  };

  return (
    <Body ref={scrollRef}>
      {isOpen && (
        <Modal
          message={`${isOpen.title} 보러 가시겠어요?`}
          setIsOpen={setIsOpen}
          callback={() => goToPost(isOpen.id)}
        />
      )}
      {isLikeOpen && (
        <Modal
          message={
            user
              ? `${post.title}${
                  post.isLike
                    ? ' 찜 목록에서 삭제하시겠어요?'
                    : ' 찜 목록에 추가하시겠어요?'
                }`
              : '로그인이 필요합니다!'
          }
          setIsOpen={setIsLikeOpen}
          callback={() => callback()}
        />
      )}
      {confirm && (
        <Modal
          message="정말 삭제하시겠어요?"
          setIsOpen={setConfirm}
          callback={handleDelete}
        />
      )}
      <PostContainer>
        <CoinForm bottom="110px">
          <CoinButton isLike={post?.isLike} onClick={() => setIsLikeOpen(true)}>
            <FontAwesomeIcon icon={faHeart} />
          </CoinButton>
        </CoinForm>
        {user?.id === post?.userId && (
          <CoinForm bottom="160px" onClick={() => setToggle(!toggle)}>
            <CoinButton>
              <FontAwesomeIcon icon={faBars} />
            </CoinButton>
          </CoinForm>
        )}
        {toggle && (
          <>
            <CoinForm bottom="210px">
              <CoinButton onClick={goToEdit}>
                <FontAwesomeIcon icon={faEdit} />
              </CoinButton>
            </CoinForm>
            <CoinForm bottom="260px">
              <CoinButton onClick={() => setConfirm(true)}>
                <FontAwesomeIcon icon={faTimes} />
              </CoinButton>
            </CoinForm>
          </>
        )}

        <Column>
          <CustomMeta>
            <div className="title">
              <Text>{post?.title}</Text>
            </div>
            <div>
              <Label top="0">주소</Label>
              <Text size="14px">{post?.region}</Text>
              <Row>
                <div>
                  <Label top="0">조회수</Label>
                  <Text size="14px">{post?.views}</Text>
                </div>
                <div>
                  <Label top="0">좋아요</Label>
                  <Text size="14px">{post?.likes}</Text>
                </div>
              </Row>
            </div>
          </CustomMeta>
          <CarouselContainer>
            <Carousel images={post?.images} />
          </CarouselContainer>
          <Info>{post?.title} 주변엔 어떤 것이 있나요?</Info>
          <Map id="map" />
        </Column>
        <Column>
          <Wrapper>
            <Info>{post?.title} 소개</Info>
            <TextEditor>
              {value && (
                <Slate
                  editor={editor}
                  value={value}
                  onChange={(data) => setValue(data)}
                >
                  <Editable
                    readOnly
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    className="Editor"
                  />
                </Slate>
              )}
            </TextEditor>
          </Wrapper>
          <Wrapper>
            <Info>댓글</Info>
            <Comments
              comments={comments}
              handleSubmit={handleSubmit}
              handleEdit={handleEdit}
              handleDelete={handleCommentDelete}
              ChangePage={ChangePage}
              pages={getPages(pages)}
              current={current}
            />
          </Wrapper>
        </Column>
      </PostContainer>
    </Body>
  );
};

export default Post;
