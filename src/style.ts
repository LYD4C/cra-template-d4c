import { createGlobalStyle, DefaultTheme } from 'styled-components'
import { isDesktop } from './helpers/utils'


const defaultTheme = {
  grey1: '#000',
  grey2: '',
  grey3: '',
  grey4: '',
  grey5: '',
  fontLargest: '40px',
  fontLarge: '24px',
  fontNormal: '14px',
  fontSmall: '12px',
  primaryColor: '#0057FF',
  borderColor: '',
  isDesktop,
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
    font-size: ${defaultTheme.fontNormal};
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
