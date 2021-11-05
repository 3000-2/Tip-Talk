import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Button, Color_1, Color_3 } from '../styles/common';

export const ModalBackground = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -320px;
  top: 60px;
  width: 320px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  transition: 0.25s;
  align-items: center;
  z-index: 11;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 280px;
  border-radius: 6px;
`;

const Info = styled.div`
  width: 100%;
  padding: 20px 20px 0 20px;
  color: ${Color_3};
`;

const Close = styled.button`
  position: absolute;
  top: 0px;
  right: -38px;
  width: 38px;
  height: 46px;
  text-align: center;
  color: ${Color_1};
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  &:hover {
    background-color: ${Color_1};
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Text = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 4px 0 10px 4px;
`;

const MapModal = ({ post, backgroundRef, handleClose }) => {
  const history = useHistory();

  const goToPost = () => {
    history.push(`/post/${post.id}`);
  };
  return (
    <ModalBackground ref={backgroundRef}>
      <Close onClick={handleClose}>
        <FontAwesomeIcon size="2x" icon={faChevronLeft} />
      </Close>

      <Thumbnail src={post?.images[0]} alt={post?.title} />
      <Info>
        <Label>이름</Label>
        <Text>{post?.title}</Text>
        <Label>지역</Label>
        <Text>{post?.region}</Text>
        <Label>카테고리</Label>
        <Text>{post?.category?.value}</Text>
      </Info>
      <Button width="140px" height="40px" onClick={goToPost}>
        자세히 보기
      </Button>
    </ModalBackground>
  );
};

export default MapModal;
