import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './styled/theme';

const root = document.getElementById('root');

const GlobalStyle = createGlobalStyle`
  body { 
    font-family: 'Roboto Mono', monospace;
    color: ${(props) => props.theme.color.secondary};
    background-color: ${(prop) => prop.theme.color.bg};
  }
`;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
    <GlobalStyle />
  </ThemeProvider>,
  root,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
