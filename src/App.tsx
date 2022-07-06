import { Route, Routes } from 'react-router-dom'
import {
  darkTheme, GlobalStyle, lightTheme,
} from './styled'
import React, {
  createContext, useEffect, useState,
} from 'react'
import { ThemeProvider } from 'styled-components'
import { LoadingProvider } from './components/Loading/Loading'
import Main from './pages/Main'

export const ThemeContext = createContext(true)
export const WalletContext = createContext({} as any)

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    setDarkMode(mode => !mode)
  }, [])

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={darkMode}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <LoadingProvider>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
          </LoadingProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </React.StrictMode>
  )
}

export default App
