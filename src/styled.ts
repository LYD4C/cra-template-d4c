import { createGlobalStyle, DefaultTheme } from 'styled-components'


const defaultTheme = {
  primaryColor: '#3772FF',
  grey1: '#777E90',
}

const darkTheme: DefaultTheme = {
  ...defaultTheme,
}

const lightTheme: DefaultTheme = {
  ...defaultTheme,
}

const flexCenter = `
  display: flex;
  justify-content: center;
  align-items: center;
`

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    font-size: 12px;
  }

  body {
    min-height: 100%;
    position: relative;
  }

  body, textarea, input, button {
    line-height: 1;
  }

  body, div, p {
    margin: 0;
    padding: 0;
  }

  button, a {
    padding: 0;
    margin: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    &:focus {
      outline: 1px solid rgba(0, 0, 0, .1);
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    :focus {
      outline: none;
    }
  }

  img {
    display: block;
  }

  strong {
    font-weight: bold;
  }

  div, a, button, li {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex-shrink: 0;
  }
`

export {
  darkTheme,
  lightTheme,
  defaultTheme,
  GlobalStyle,
  flexCenter,
}
