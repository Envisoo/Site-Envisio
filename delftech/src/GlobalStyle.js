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
`;

export default GlobalStyle;