import {
  faCheck,
  faPencilAlt,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Color_2 } from '../styles/common';
import Modal from './Modal';

const CommentContainer = styled.li`
  display: flex;
  font-size: 14px;
  margin: 3px 0;
  padding: 4px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  align-items: center;
`;

const Name = styled.span`
  min-width: 60px;
  font-weight: 600;
  margin-right: 3px;
  :hover {
    cursor: pointer;
  }
`;

const TextInput = styled.input`
  display: block;
  width: 80%;
  height: 100%;
  color: ${({ theme }) => theme.color};
  font-size: 15px;
  font-weight: ${({ weight }) => (weight ? weight : 400)};
  margin-right: 6px;
  border: none;
  outline: none;
  background-color: transparent;
`;

const Text = styled.p`
  text-overflow: ellipsis;
  display: -webkit-box;
  width: 100%;
  margin-right: 6px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Button = styled.button`
  border: none;
  color: ${Color_2};
  background-color: transparent;
`;

const Date = styled.span`
  min-width: 60px;
  font-size: 13px;
`;

const Profile = styled.div`
  min-width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.navBgColor};
  font-size: 28px;
  text-align: center;
  border-radius: 3px;
  margin-right: 10px;
  overflow: hidden;
  :hover {
    cursor: pointer;
  }
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Comment = ({ comment, handleEdit, handleDelete }) => {
  const history = useHistory();
  const inputRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isEdit) {
      inputRef.current.value = comment.text;
      inputRef.current.focus();
    }
  }, [isEdit, comment]);

  const onEditToggle = () => {
    if (!isEdit) {
      setIsEdit(true);
    }
  };

  const EditSubmit = () => {
    if (inputRef.current.value.length) {
      handleEdit(inputRef.current.value, comment.id);
      inputRef.current.value = '';
      setIsEdit(false);
    } else {
      setIsOpen('댓글을 입력해주세요!');
    }
  };

  const onDelete = () => {
    handleDelete(comment.id);
  };

  const modalHandler = () => {
    setIsOpen('정말 댓글을 삭제하시겠습니까?');
  };

  const imageController = () => {
    if (comment.user?.img) {
      return <ProfileImg src={comment.user.img} />;
    } else {
      return <FontAwesomeIcon icon={faUser} />;
    }
  };

  const goToMypage = () => {
    history.push(`/mypage/${comment.userId}`);
  };

  return (
    <CommentContainer>
      {isOpen && (
        <Modal
          message={isOpen}
          setIsOpen={setIsOpen}
          callback={() => (isEdit === true ? null : onDelete())}
        />
      )}
      <Profile onClick={goToMypage}>{imageController()}</Profile>
      <Name onClick={goToMypage}>{comment.user?.nickname}</Name>
      {isEdit ? <TextInput ref={inputRef} /> : <Text>{comment.text}</Text>}
      {comment.isMine ? (
        isEdit ? (
          <Button>
            <FontAwesomeIcon onClick={EditSubmit} icon={faCheck} />
          </Button>
        ) : (
          <>
            <Button>
              <FontAwesomeIcon onClick={onEditToggle} icon={faPencilAlt} />
            </Button>
            <Button>
              <FontAwesomeIcon onClick={modalHandler} icon={faTrash} />
            </Button>
          </>
        )
      ) : null}
      <Date>{comment.updatedAt}</Date>
    </CommentContainer>
  );
};

export default Comment;
