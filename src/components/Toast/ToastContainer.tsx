import React from 'react'
import { ToastContainer as Container } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  .Toastify__toast-container {
    width: fit-content !important;
  }
  .Toastify__toast {
    flex-direction: row;
    padding: 0;
    border-radius: 8px;
    min-height: auto;
    .Toastify__toast-body {
      flex-direction: row;
      margin: 0;
    }
    .Toastify__close-button {
      display: none;
    }
  }
  .Toastify--animate-icon {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }
`
// 按需处理 https://fkhadra.github.io/react-toastify/introduction
const ToastContainer: React.FC = () => {
  return (
    <StyledContainer
      position="top-center"
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

