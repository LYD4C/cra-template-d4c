import { Button as MButton } from '@material-ui/core'
import styled from 'styled-components'
import { defaultTheme } from '../../styled'

const ButtonWrapper = styled(MButton)`
  &.MuiButton-contained {
    border-radius: 20px;
    background: ${defaultTheme.primaryColor};
    color: #FCFCFD;
    line-height: 22px;
    font-size: 16px;
    padding: 8px 24px;
    text-transform: none;
    :hover {
      background: #3772FF;
    }
    &.Mui-disabled {
      background-color: RGBA(55, 115, 255, 0.4);
      color: #FCFCFD;
    }
    &.large {
      line-height: 24px;
      font-size: 18px;
      padding: 16px 48px;
      border-radius: 32px;
      font-family: MiSans-Demibold;
    }
  }
  &.MuiButton-outlined {
    background-color: ${props => props.theme.headerBgColor};
    color: ${props => props.theme.fontColor};
    border-color: ${props => props.theme.fontColor};
    border-radius: 180px;
    font-weight: 400;
    text-transform: none;
    font-family: MiSans-Normal;
    font-size: 16px;
    line-height: 22px;
    :hover {
      background-color: ${defaultTheme.primaryColor};
      border-color:  ${defaultTheme.primaryColor};
      color: #FCFCFD;
    }
    :vidited {
      background: #3772FF;
      border-color: #3772FF;
      color: #FCFCFD;
    }

  }

`

type ButtonProps = {
  disabled?: boolean;
  text: string;
  size?: 'small' | 'large' | 'medium';
  variant?: 'text' | 'outlined' | 'contained';
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  disabled,
  text,
  size = 'medium',
  variant = 'contained',
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
    >{text}
    </ButtonWrapper>
  )
}

export default Button
