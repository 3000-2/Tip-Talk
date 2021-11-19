import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Color_6 } from '../styles/common';

const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  white-space: nowrap;
  will-change: transform;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
`;

const StepForm = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  bottom: 10px;
  justify-content: center;
  z-index: 11;
`;

const Step = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 5px;
  background-color: ${({ current }) => (current ? Color_6 : 'white')};
  border-radius: 50%;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  right: ${({ right }) => right};
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.6);
  filter: drop-shadow(1px 1px 1px #ffffffa0);
  font-size: 14px;
  background-color: transparent;
  z-index: 10;
`;

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.style.transition = 'all 0.5s ease-in-out';
    scrollRef.current.style.transform = `translate(-${current}00%)`;
  }, [current]);

  const handlePrevScroll = () => {
    if (current <= 0) {
      setCurrent(images?.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  const handleNextScroll = () => {
    if (current >= images?.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <CarouselContainer>
      <StepForm>
        {images?.map((_, i) => (
          <Step current={current === i} key={i} />
        ))}
      </StepForm>
      {images?.length > 1 && (
        <>
          <Button onClick={handlePrevScroll}>
            <FontAwesomeIcon size="2x" icon={faChevronLeft} />
          </Button>
          <Button onClick={handleNextScroll} right="0">
            <FontAwesomeIcon size="2x" icon={faChevronRight} />
          </Button>
        </>
      )}
      <Slide ref={scrollRef}>
        {images?.map((image, i) => (
          <Image src={image} key={i} alt="Carousel" />
        ))}
      </Slide>
    </CarouselContainer>
  );
};

export default Carousel;
