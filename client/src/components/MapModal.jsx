import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Button, Color_1, Color_3 } from '../styles/common';
import Carousel from './Carousel';

export const ModalBackground = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -360px;
  top: 60px;
  width: 360px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  transition: 0.25s;
  align-items: center;
  z-index: 11;
  @media ${({ theme }) => theme.size.tablet} {
    top: 0px;
    width: 280px;
  }
  @media ${({ theme }) => theme.size.mobile} {
    width: 180px;
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 280px;
  border-radius: 6px;
  @media ${({ theme }) => theme.size.tablet} {
    height: 220px;
  }
  @media ${({ theme }) => theme.size.mobile} {
    height: 180px;
  }
`;

const Info = styled.div`
  width: 100%;
  padding: 10px 10px 0 10px;
  color: ${Color_3};
  @media ${({ theme }) => theme.size.mobile} {
    margin-bottom: 20px;
  }
  @media ${({ theme }) => theme.size.small} {
    margin-bottom: 0px;
  }
`;

const Close = styled.button`
  position: absolute;
  top: 0px;
  right: -38px;
  width: 38px;
  height: 46px;
  text-align: center;
  font-size: 32px;
  color: ${Color_1};
  border: none;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
  @media ${({ theme }) => theme.size.mobile} {
    right: -28px;
    width: 28px;
    height: 28px;
    font-size: 20px;
    padding: 0;
  }
`;

const Label = styled.div`
  font-size: 13px;
`;

const Text = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 6px 0 15px 4px;
  @media ${({ theme }) => theme.size.tablet} {
    font-size: 16px;
    margin: 6px 0 6px 4px;
  }
  @media ${({ theme }) => theme.size.small} {
    font-size: 14px;
  }
`;

const CustomButton = styled(Button)`
  background-color: rgb(250, 250, 250);
  color: rgba(0, 0, 0, 0.6);
`;

const MapModal = ({ post, backgroundRef, handleClose }) => {
  const history = useHistory();

  const goToPost = () => {
    history.push(`/post/${post.id}`);
  };
  return (
    <ModalBackground ref={backgroundRef}>
      <Close onClick={handleClose}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Close>
      <CarouselContainer>
        <Carousel images={post?.images} />
      </CarouselContainer>
      <Info>
        <Label>상호명</Label>
        <Text>{post?.title}</Text>
        <Label>지역</Label>
        <Text>{post?.region}</Text>
        <Label>카테고리</Label>
        <Text>{post?.category?.value}</Text>
        <Label>조회수</Label>
        <Text>{post?.views}</Text>
      </Info>
      <CustomButton
        width="140px"
        height="40px"
        margin="6px 0 0"
        onClick={goToPost}
      >
        자세히 보기
      </CustomButton>
    </ModalBackground>
  );
};

export default MapModal;
