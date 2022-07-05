import Snackbar from '@material-ui/core/Snackbar'
import styled from 'styled-components'
import SuceessIcon from './success-icon.svg'
import WarningIcon from './warning-icon.svg'

const SnackbarWrapper = styled(Snackbar)`
  &.MuiSnackbar-anchorOriginTopCenter {
    top: 110px;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  color: #FFFFFF;
  line-height: 17px;
  background: rgba(35, 38, 47, 0.6);
  padding: 8px 16px;
  .icon {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }
`

type MessageProps = {
  type?: 'success' | 'warning';
  text: string;
  open: boolean;
  onClose(): void;
}
const Message: React.FC<MessageProps> = ({
  text,
  type = 'success',
  open,
  onClose,
}) => {
  const handleClose = () => {
    onClose()
  }
  return (
    <SnackbarWrapper
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleClose}
      open={open}
      autoHideDuration={3000}
    >
      <Wrapper><img src={type === 'success' ? SuceessIcon : WarningIcon} className="icon" />{text}</Wrapper>
    </SnackbarWrapper>
  )
}

export default Message
