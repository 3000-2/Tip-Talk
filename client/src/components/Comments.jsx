import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import { Color_1, Color_6 } from '../styles/common';
import Comment from './Comment';
import Modal from './Modal';

const Container = styled.section`
  position: relative;
  width: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.formColor};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
`;

const CommentList = styled.ul`
  width: 100%;
  height: 500px;
  padding: 20px 20px 10px 20px;
`;

const CommentForm = styled.form`
  display: flex;
  width: 100%;
  height: 42px;
  justify-content: center;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 0 12px;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.line};
  background-color: transparent;
`;

const CommentSubmit = styled.button`
  width: 64px;
  color: ${Color_1};
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.line};
  background-color: transparent;
`;

const Empty = styled.p`
  text-align: center;
`;

const PageColumn = styled.ul`
  position: absolute;
  display: flex;
  bottom: 56px;
  width: 100%;
  margin-top: 10px;
  justify-content: center;
`;

const ChevronButton = styled.button`
  padding: 0 2px;
  font-size: 12px;
  color: ${Color_1};
  border: none;
  background-color: transparent;
`;

const PageList = styled.li`
  list-style: none;
  margin: 0 3px;
`;

const PageButton = styled.button`
  color: ${({ active }) => (active ? Color_1 : Color_6)};
  padding: 0 2px;
  border: none;
  background-color: transparent;
`;

const Comments = ({
  comments,
  handleSubmit,
  handleEdit,
  handleDelete,
  pages,
  current,
  ChangePage,
}) => {
  const inputRef = useRef();
  const [message, setMessage] = useState(false);
  const [user] = useContext(UserContext);

  const onHandleSubmit = () => {
    if (inputRef.current.value.length) {
      handleSubmit(inputRef.current.value);
      inputRef.current.value = '';
    } else {
      setMessage('댓글을 입력해주세요!');
    }
  };

  const require = (e) => {
    e.preventDefault();
    if (user) {
      onHandleSubmit();
    } else {
      setMessage('로그인이 필요해요');
    }
  };

  const clickChangeButton = (page) => {
    if (page !== current) {
      ChangePage(page);
    }
  };

  const handlePrevPage = () => {
    if (current > 0) {
      ChangePage(current - 1);
    }
  };

  const handleNextPage = () => {
    if (current < pages[pages.length - 1] - 1) {
      ChangePage(current + 1);
    }
  };

  return (
    <Container>
      {message && <Modal message={message} setIsOpen={setMessage} />}
      <CommentList>
        {comments?.length ? (
          comments.map((comment) => (
            <Comment
              comment={comment}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              key={comment.id}
            />
          ))
        ) : (
          <Empty>아직 보여줄 댓글이 없어요</Empty>
        )}
        <PageColumn>
          <ChevronButton onClick={handlePrevPage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </ChevronButton>
          {pages?.map((page) => (
            <PageList key={page}>
              <PageButton
                active={current === page - 1}
                onClick={() => clickChangeButton(page - 1)}
              >
                {page}
              </PageButton>
            </PageList>
          ))}
          <ChevronButton onClick={handleNextPage}>
            <FontAwesomeIcon icon={faChevronRight} />
          </ChevronButton>
        </PageColumn>
      </CommentList>
      <CommentForm>
        <CommentInput ref={inputRef} placeholder="댓글을 입력해주세요" />
        <CommentSubmit type="submit" onClick={require}>
          확인
        </CommentSubmit>
      </CommentForm>
    </Container>
  );
};

export default Comments;
