import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 48px;
  width: 238px;
  border-radius: 3px;
  background-color: rgba(250, 250, 250, 0.9);
  overflow: none;
`;

const List = styled.div`
  display: block;
  padding: 8px;
  border: none;
  background-color: transparent;
  border-radius: 3px;
  font-size: 14px;
  transition: 0.2s;
  :hover {
    background-color: ${({ theme }) => theme.navBgColor};
    cursor: pointer;
  }
`;

const AutoComplete = ({ value, changeInputValue }) => {
  const handleClick = (value) => {
    changeInputValue(value);
  };
  return (
    <Container>
      {value?.map((v, i) => (
        <List onMouseDown={(e) => handleClick(v)} key={i}>
          {v}
        </List>
      ))}
    </Container>
  );
};

export default AutoComplete;
