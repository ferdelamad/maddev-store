import React from 'react';
import Header from './Header';
import Meta from './Meta';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  white: '#FFFFFF',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Helvetica Neue, Helvetica;
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: Helvetica Neue;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: Helvetica Neue; }
`;


const StyledPage = styled.div`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
`;

const InnerStyles = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const Page: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <React.Fragment>
        <StyledPage>
          <Meta />
          <Header />
          <InnerStyles>
            { children }
          </InnerStyles>
        </StyledPage>
      </React.Fragment>
    </ThemeProvider>
  )
}

export default Page;
