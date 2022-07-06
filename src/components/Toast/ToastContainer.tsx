import React from 'react'
import { ToastContainer as Container } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  .Toastify__toast {
    flex-direction: row;
  }
`
// 按需处理 https://fkhadra.github.io/react-toastify/introduction
const ToastContainer: React.FC = () => {
  return (
    <StyledContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export default ToastContainer

