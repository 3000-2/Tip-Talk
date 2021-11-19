import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useLocation, useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../components/Modal';
import TextEditor, { deserialize } from '../components/TextEditor';

import { Body, Button, Info, Label, Meta, Text } from '../styles/common';
import Loading from '../components/Loading';
import { Column } from './Post';
import UserContext from '../context/UserContext';

const UploadForm = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1600px;
  padding: 50px;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.size.tablet} {
    flex-direction: column;
    padding: 50px 30px;
  }
  @media ${({ theme }) => theme.size.mobile} {
    padding: 30px 10px;
  }
`;

const CustomMeta = styled(Meta)`
  @media ${({ theme }) => theme.size.mobile} {
    flex-direction: column;
  }
`;

const CustomLabel = styled(Label)`
  width: 80px;
`;

const CustomInfo = styled(Info)`
  font-size: 28px;
  margin-bottom: 20px;
  padding: 0;
`;

const Input = styled.input`
  width: 320px;
  height: 38px;
  padding: 8px 12px;
  font-size: 18px;
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 6px;
  background-color: transparent;
`;

const Select = styled.select`
  width: 120px;
  height: 38px;
  padding: 8px 12px;
  margin-bottom: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.color};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 6px;
  background-color: transparent;
`;

const CurrentImageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 600px;
  margin: 5px 0;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.formColor};
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media ${({ theme }) => theme.size.mobile} {
    height: 400px;
  }
`;

const CurrentImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  min-width: 160px;
  min-height: 120px;
  text-align: center;
  margin: 20px 0;
  list-style: none;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.size.tabletL} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  /* @media ${({ theme }) => theme.size.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
  } */
  @media ${({ theme }) => theme.size.mobile} {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageWrapper = styled.li`
  position: relative;
  display: flex;
  width: 160px;
  height: 120px;
  margin: 6px;
  border-radius: 6px;
  list-style: none;
  background-color: ${({ theme }) => theme.formColor};
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: -2px;
  top: 0;
  border: none;
  background-color: transparent;
`;

const ImageCard = styled.img`
  width: 160px;
  height: 120px;
`;

const Message = styled.strong`
  font-size: 19px;
  line-height: 28px;
`;

const UploadPost = ({ edit }) => {
  const [address, setAddress] = useState({ ...useLocation().state });
  const [categories, setCategories] = useState();
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState();
  const [content, setContent] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user] = useContext(UserContext);

  const { postId } = useParams();

  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const categoriesInputRef = useRef();
  const history = useHistory();

  useEffect(() => {
    if (user && edit) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/post/${postId}`)
        .then(({ data }) => {
          if (data.status) {
            const { posts } = data.data;
            if (posts.userId !== user.id) {
              history.replace('/main');
            }

            setAddress({ name: posts.region });
            const text = JSON.parse(posts.content);
            setContent([...text]);
            const imgs = posts.images.split(' ');
            let prevImage = [];
            imgs.forEach((img) => {
              prevImage.push({ url: img });
            });
            setImages([...prevImage]);
            titleInputRef.current.value = posts.title;
            categoriesInputRef.current.value = posts.categoryId;
          }
        })
        .catch(() => {
          history.push('/main');
        });
    }
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/category`)
      .then(({ data }) => {
        if (data.status) {
          setCategories(data.data);
        }
      });
  }, [postId, user, edit, history]);

  useEffect(() => {
    if (!images.length) {
      setCurrent(undefined);
    }
  }, [images]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = categoriesInputRef.current.value;
    const title = titleInputRef.current.value;
    if (images.length === 0 || !category || !title) {
      setMessage('모든 항목을 입력해주세요');
      return;
    }
    if (title.length > 12) {
      setMessage('상호명은 12글자 이하로 입력해주세요!');
      return;
    }
    setIsOpen(true);
  };

  const uploadPlace = () => {
    const text = deserialize(localStorage.getItem('content') || '');
    const category = categoriesInputRef.current.value;
    const title = titleInputRef.current.value;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', text[0].children[0].text);
    formData.append('categoryId', category);
    formData.append('lat', address.lat);
    formData.append('lng', address.lng);
    formData.append('region', address.name);

    images.forEach((image) => {
      if (image.file) {
        formData.append('images', image.file);
      } else {
        formData.append('images', image.url);
      }
    });

    setLoading(true);

    if (edit) {
      axios
        .patch(`${process.env.REACT_APP_SERVER_URL}/post/${postId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) => {
          if (data.status) {
            images.forEach((image) => {
              URL.revokeObjectURL(image);
            });
            setLoading(false);
            setMessage('수정 완료되었습니다!');
          }
        })
        .catch(() => {
          history.replace('/main');
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/post`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) => {
          if (data.status) {
            images.forEach((image) => {
              URL.revokeObjectURL(image);
            });
            setLoading(false);
            setMessage('업로드 완료되었습니다!');
          }
        })
        .catch(() => {
          history.replace('/main');
        });
    }
  };

  const handleUploadImage = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  };

  const handleImage = (e) => {
    if (e.target.files.length && images.length < 4) {
      const ImageURL = URL.createObjectURL(e.target.files[0]);
      setImages([...images, { file: e.target.files[0], url: ImageURL }]);
      setCurrent(images.length);
    }
  };

  const handleDeleteImage = (index, e) => {
    e.preventDefault();
    const filtered = images.filter((_, i) => i !== index);
    URL.revokeObjectURL(images[index].url);
    setCurrent(filtered.length - 1);
    setImages([...filtered]);
  };

  const handleCurrentImage = (index) => {
    setCurrent(index);
  };

  const afterEvent = () => {
    if (message.includes('수정')) {
      const cb = () => {
        history.replace(`/post/${postId}`);
      };
      return cb;
    } else if (message.includes('업로드')) {
      const cb = () => {
        history.replace(`/main`);
      };
      return cb;
    } else {
      return undefined;
    }
  };

  return (
    <Body>
      {message && (
        <Modal
          message={message}
          setIsOpen={setMessage}
          callback={afterEvent()}
          no={afterEvent()}
        />
      )}
      {isOpen && (
        <Modal
          message="저장할까요?"
          setIsOpen={setIsOpen}
          callback={uploadPlace}
        />
      )}
      {loading && <Loading />}
      <UploadForm onSubmit={handleSubmit}>
        <Column>
          <CustomInfo>사업지 등록하기</CustomInfo>
          <CustomMeta>
            <div>
              <CustomLabel>상호명</CustomLabel>
              <Input
                ref={titleInputRef}
                type="text"
                name="title"
                placeholder="상호명을 입력해주세요"
              />
              <CustomLabel>카테고리 선택</CustomLabel>
              <Select ref={categoriesInputRef} name="categories">
                {categories?.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.value}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <CustomLabel>주소</CustomLabel>
              <Text>{address?.name}</Text>
            </div>
          </CustomMeta>
          <CustomInfo>소개란 입력하기</CustomInfo>
          {edit ? (
            content.length && <TextEditor content={content} />
          ) : (
            <TextEditor content={[]} />
          )}
          <Button margin="30px 0" type="submit">
            저장하기
          </Button>
        </Column>
        <Column>
          <CustomInfo>사진 등록하기</CustomInfo>
          <CurrentImageWrapper>
            {current !== undefined ? (
              <CurrentImage src={images[current]?.url} alt="대표이미지" />
            ) : (
              <Message>미리보기할 사진이 없어요</Message>
            )}
          </CurrentImageWrapper>
          <ImageList>
            {images.length ? (
              images?.map((image, i) => (
                <ImageWrapper key={i}>
                  <DeleteButton
                    type="button"
                    onClick={(e) => handleDeleteImage(i, e)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </DeleteButton>
                  <ImageCard
                    onClick={() => handleCurrentImage(i)}
                    src={image.url}
                    alt="이미지"
                  />
                </ImageWrapper>
              ))
            ) : (
              <ImageWrapper>
                <Message>
                  사진을 <br /> 업로드 해주세요
                </Message>
              </ImageWrapper>
            )}
          </ImageList>
          <ImageInput
            ref={imageInputRef}
            type="file"
            multiple="multiple"
            accept="image/*"
            name="image"
            onChange={handleImage}
          />
          <Button margin="30px 0" type="button" onClick={handleUploadImage}>
            사진 업로드
          </Button>
        </Column>
      </UploadForm>
    </Body>
  );
};

export default UploadPost;
