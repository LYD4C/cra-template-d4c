import { Button as MButton } from '@material-ui/core'
import styled from 'styled-components'
import { defaultTheme } from '../../style'

const ButtonWrapper = styled(MButton)`
  &.MuiButton-contained {
    border-radius: 20px;
    background: ${defaultTheme.primaryColor};
    color: #fcfcfd;
    line-height: 22px;
    font-size: ${defaultTheme.fontNormal};
    padding: 8px 24px;
    text-transform: none;
    width: ${props => (props.fullWidth ? '100%' : 'fit-content')};
    :hover {
      background: #3772ff;
    }
    &.Mui-disabled {
      background-color: RGBA(55, 115, 255, 0.4);
      color: #fcfcfd;
      cursor: not-allowed;
      pointer-events: auto;
    }
    &.small {
      line-height: 24px;
      font-size: 18px;
      padding: 16px 48px;
      border-radius: 32px;
    }
    &.large {
      line-height: 24px;
      font-size: ${defaultTheme.fontSmall};
      padding: 8px 16px;
      border-radius: 16px;
    }
  }
  &.MuiButton-outlined {
    background-color: ${props => props.theme.grey1};
    color: ${props => props.theme.grey1};
    border-color: ${props => props.theme.grey1};
    border-radius: 180px;
    font-weight: 400;
    text-transform: none;
    font-size: ${defaultTheme.fontNormal};
    padding: 8px 24px;
  }
  &.MuiButton-text {
    border: 0;
  }
`

type ButtonProps = {
  disabled?: boolean
  text: string
  size?: 'small' | 'large' | 'medium'
  variant?: 'text' | 'outlined' | 'contained' // 文字型、描边型、实心按钮
  fullWidth?: boolean // 是否根据父元素填充宽度
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  disabled,
  text,
  size = 'medium',
  variant = 'contained',
  fullWidth = false,
  onClick,
}) => {
  const handleClick = (evt: any) => {
    if (onClick && !disabled) {
      onClick(evt)
    }
  }

  return (
    <ButtonWrapper
      className={size}
      disabled={disabled}
      variant={variant}
      onClick={handleClick}
      size={size}
      fullWidth={fullWidth}
    >
      {text}
    </ButtonWrapper>
  )
}

export default Button
