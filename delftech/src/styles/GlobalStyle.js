import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #0A192F;
    --secondary: #112240;
    --accent: #64FFDA;
    --text: #CCD6F6;
    --text-secondary: #8892B0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--primary);
    color: var(--text);
    overflow-x: hidden;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
  }

  section {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text);
    line-height: 1.2;
  }

  p {
    line-height: 1.6;
  }
`;

export default GlobalStyle;