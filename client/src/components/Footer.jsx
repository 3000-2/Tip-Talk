import React from 'react';
import styled from 'styled-components';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Color_1 } from '../styles/common';

const Container = styled.footer`
  display: flex;
  width: 100%;
  height: 120px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.size.mobile} {
    padding: 0px 16px;
  }
  @media ${({ theme }) => theme.size.small} {
    padding: 0px;
  }
`;

const Row = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 1500px;
  height: inherit;
  align-items: center;
  justify-content: center;
  @media ${({ theme }) => theme.size.tablet} {
    margin-right: 56px;
    justify-content: flex-end;
  }
  @media ${({ theme }) => theme.size.mobile} {
    justify-content: center;
    margin-right: 0;
  }
`;

const Left = styled.div`
  display: flex;
  position: absolute;
  left: 10px;
  align-items: center;
  @media ${({ theme }) => theme.size.mobile} {
    display: none;
  }
`;

const Fat = styled.h1`
  color: ${Color_1};
  margin: 6px 28px 0 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.line};
  :last-child {
    border-right: none;
  }

  div {
    display: flex;
    height: 32px;
    align-items: center;
  }

  @media ${({ theme }) => theme.size.tablet} {
    width: 160px;
  }
  @media ${({ theme }) => theme.size.mobile} {
    border: none;
  }
  @media ${({ theme }) => theme.size.small} {
    width: 125px;
    font-size: 14px;
  }
`;

const Text = styled.h2`
  font-weight: bold;
  margin-right: 8px;
`;

const Border = styled.span`
  padding: 3px 6px;
  color: white;
  font-weight: bold;
  background-color: #007e2a;
  border-radius: 8px;
`;

const A = styled.a`
  display: block;
  color: ${({ theme }) => theme.color};
  margin: 6px 0;
  font-size: 26px;
  text-decoration: none;
  span {
    font-size: 20px;
    margin-left: 10px;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Row>
        <Left>
          <div>
            <Fat>TIPTALK</Fat>
            <Fat>세얼간이</Fat>
          </div>
          <div>
            <A href="https://github.com/codestates/Tip-Talk">
              <FontAwesomeIcon icon={faGithub} />
              <span>깃허브</span>
            </A>
            <A href="https://github.com/codestates/Tip-Talk/wiki">
              <FontAwesomeIcon icon={faBookOpen} />
              <span>WiKi</span>
            </A>
          </div>
        </Left>
        <Column>
          <div>
            <Text>박상천</Text>
            <Border>풀스택</Border>
          </div>
          <div>
            <Text>팀장</Text>
            <A href="https://github.com/3000-2">
              <FontAwesomeIcon icon={faGithub} />
            </A>
          </div>
        </Column>
        <Column>
          <div>
            <Text>권용현</Text>
            <Border>프론트엔드</Border>
          </div>
          <div>
            <Text>팀원</Text>
            <A href="https://github.com/wolfdale-12f8217">
              <FontAwesomeIcon icon={faGithub} />
            </A>
          </div>
        </Column>
        <Column>
          <div>
            <Text>정수창</Text>
            <Border>백엔드</Border>
          </div>
          <div>
            <Text>팀원</Text>
            <A href="https://github.com/tnckddl14">
              <FontAwesomeIcon icon={faGithub} />
            </A>
          </div>
        </Column>
      </Row>
    </Container>
  );
};

export default Footer;
