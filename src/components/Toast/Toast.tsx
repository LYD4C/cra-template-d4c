import { toast as RToast } from 'react-toastify'
import ErrorIcon from './error.svg'

type ToastType = 'info' | 'success' | 'warning' | 'error'
interface ToastProps {
  text: string;
  type?: ToastType;
}
const typeIcon: {[key in ToastType]: any} = {
  info: ErrorIcon,
  success: ErrorIcon,
  error: ErrorIcon,
  warning: ErrorIcon,
}

const toast = ({
  text = '',
  type = 'error',
}: ToastProps) => {
  return RToast(text, {
    type,
    icon: () => <img src={typeIcon[type]} />,
  })
}
export default toast
