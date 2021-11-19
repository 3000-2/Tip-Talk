import styled, { createGlobalStyle } from 'styled-components';

export const Color_1 = '#00b667';
export const Color_2 = '#fac125';
export const Color_3 = 'rgb(240, 240, 240)';
export const Color_4 = '#ff6e3a';
export const Color_5 = '#3a3a3a';
export const Color_6 = '#888';
export const Color_7 = '#1a1a1a';
export const Samlib = 'Pretendard-Regular';
export const Hangeul = 'Pretendard-Regular';
export const Logo =
  'https://drawit.s3.ap-northeast-2.amazonaws.com/tiptalk/logo.png';

const size = {
  small: `(max-width: 375px)`,
  mobileS: `(max-width: 500px)`,
  mobile: `(max-width: 770px)`,
  tablet: `(max-width: 1200px)`,
  tabletL: `(max-width: 1500px)`,
  desktop: `(max-width: 1700px)`,
};

export const lightTheme = {
  color: Color_5,
  navColor: Color_1,
  bgColor: 'rgb(250, 250, 250)',
  formColor: 'white',
  navBgColor: Color_1,
  line: 'rgba(0, 0, 0, 0.2)',
  active: '#555',
  toolBar: Color_2,
  size,
};

export const darkTheme = {
  color: Color_6,
  navColor: '#3a3a3a',
  bgColor: Color_5,
  formColor: '#2a2a2a',
  navBgColor: Color_7,
  line: 'rgba(255, 255, 255, 0.4)',
  active: Color_6,
  toolBar: Color_5,
  size,
};

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 35px 0 60px;
  align-items: center;
`;

export const GlobalStyle = createGlobalStyle`
  body{
    color: ${(props) => props.theme.color};
    background-color: ${(props) => props.theme.bgColor};
  }
`;

export const Scroll = styled.div`
  position: absolute;
  top: 0;
`;

export const Meta = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1400px;
  margin-bottom: 35px;
  padding: 10px 45px;
  background-color: ${({ theme }) => theme.formColor};
  border-radius: 6px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  @media ${({ theme }) => theme.size.mobile} {
    padding: 0 15px;
  }
`;

export const Label = styled.div`
  color: ${Color_6};
  font-size: ${({ size }) => (size ? size : '13px')};
  margin: 6px 0;
  margin-top: ${({ top }) => (top ? top : '20px')};
  font-weight: 600;
`;

export const Text = styled.div`
  font-size: ${({ size }) => size};
  font-weight: 600;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export const Info = styled.h3`
  font-size: 24px;
  font-weight: 600;
  padding: 10px 3px;
  margin-bottom: 10px;
  margin-right: auto;
`;

export const Button = styled.button`
  width: ${({ width }) => (width ? width : '140px')};
  height: ${({ height }) => (height ? height : '40px')};
  border: none;
  border-radius: 4px;
  font-family: ${Hangeul};
  font-size: 18px;
  font-weight: 600;
  margin: ${({ margin }) => margin};
  color: ${Color_3};
  background-color: ${({ theme }) => theme.navBgColor};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  transition: 0.1s;
  &:hover {
    color: ${({ theme }) => theme.navBgColor};
    background-color: ${Color_3};
  }
`;
