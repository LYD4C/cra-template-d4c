import { Route, Routes } from 'react-router-dom'
import {
  darkTheme, GlobalStyle, lightTheme,
} from './style'
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { LoadingProvider } from './components/Loading/Loading'
import Main from './pages/Main'
import Test from './pages/Test'
import { ThemeContext } from './helpers/hooks'
import ToastContainer from './components/Toast/ToastContainer'
import Header from './components/Header'
import Web3Manager from './web3Manager'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <LoadingProvider>
            <GlobalStyle />
            <Header />
            <Web3Manager>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/test" element={<Test />} />
              </Routes>
            </Web3Manager>
            <ToastContainer />
          </LoadingProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </React.StrictMode>
  )
}

export default App
