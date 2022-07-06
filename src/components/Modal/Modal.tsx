import { Modal as MModal } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../helpers/hooks'

import { flexCenter } from '../../styled'
import CloseDark from './close-dark-icon.svg'
import CloseLight from './close-light-icon.svg'

const ModalBody = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  outline: 0;
`
const ModalHeader = styled.div`
  ${flexCenter};
  position: relative;
`

interface ModalProps {
  children: React.ReactElement;
  title: string;
  open: boolean;
  showCloseIcon?: boolean;
  width?: number; // px
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  showCloseIcon = true,
  open,
  width = 0,
  onClose,
}) => {
  const { darkMode } = useContext(ThemeContext)
  return (
    <MModal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <ModalBody style={{ width: (width ?? 0) > 0 ? `${width}px` : 'auto' }}>
          <ModalHeader>
            {title}
            {showCloseIcon && <img className="icon" src={darkMode ? CloseDark : CloseLight} onClick={onClose} />}
          </ModalHeader>
          {children}
        </ModalBody>
      </Fade>
    </MModal>
  )
}

export default Modal
