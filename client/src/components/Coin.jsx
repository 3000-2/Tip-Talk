import {
  faArrowUp,
  faMoon,
  faReply,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Color_3 } from '../styles/common';

export const CoinForm = styled.div`
  display: flex;
  position: fixed;
  color: ${Color_3};
  top: ${({ position }) => (position.bottom ? 'none' : '100px')};
  bottom: ${({ position }) => (position.bottom ? position.bottom : 'none')};
  left: ${({ position }) => (position.right ? 'none' : '40px')};
  right: ${({ position }) => (position.right ? position.right : 'none')};
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
  @media ${({ theme }) => theme.size.mobile} {
    display: none;
  }
`;

export const Coin = ({
  mode,
  darkMode,
  setDarkMode,
  scrollRef,
  ...position
}) => {
  const history = useHistory();
  const scrollToTop = () => {
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  const getStyle = () => {
    switch (mode) {
      case 'reply':
        return faReply;
      case 'up':
        return faArrowUp;
      case 'light':
        return darkMode ? faSun : faMoon;
      default:
        return faArrowUp;
    }
  };

  const handleEvent = () => {
    switch (mode) {
      case 'reply':
        history.goBack();
        break;
      case 'up':
        scrollToTop();
        break;
      case 'light':
        if (darkMode) {
          localStorage.removeItem('darkmode');
        } else {
          localStorage.setItem('darkmode', !darkMode);
        }
        setDarkMode(!darkMode);
        break;
      default:
        break;
    }
  };

  return (
    <CoinForm position={position} onClick={handleEvent}>
      <FontAwesomeIcon size="lg" icon={getStyle()} />
    </CoinForm>
  );
};
