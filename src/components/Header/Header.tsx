import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../helpers/hooks'
import { isDesktop } from '../../helpers/utils'
import { defaultTheme, flexCenter } from '../../style'
import Wallet from '../Wallet'
import DarkIcon from './dark-icon.svg'
import LightIcon from './light-icon.svg'

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  z-index: 10;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${defaultTheme.isDesktop ? '20px 160px' : '0 0 0 20px'};
  background-color: ${props => props.theme.grey1};
  border-bottom: 1px solid ${props => props.theme.borderColor};
  .row {
    ${flexCenter};
    flex-direction: row;
  }
  .icon {
    cursor: ${isDesktop ? 'pointer' : 'none'};
    border-radius: 8px;
    width: 24px;
    height: 24px;
    margin-right: 24px;
    :hover {
      background-color: ${props => (isDesktop ? props.theme.primaryColor : null)};
      opacity: ${isDesktop ? '0.2' : '1'};
    }
  }
`
const LogoWrapper = styled.div`
  ${flexCenter};
  flex-direction: row;
  align-items: center;
  color: ${props => props.theme.grey1};
  font-size: ${defaultTheme.fontLarge};
  font-weight: bold;
  cursor: ${isDesktop ? 'pointer' : 'none'};
  font-family: MiSans-Bold;
  .logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .desktop-title-logo {
    width: 100px;
    height: auto;
  }
`

const Header: React.FC = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const { ethereum } = window
  const toggleTheme = () => {
    setDarkMode(current => !current)
  }
  return (
    <HeaderWrapper>
      <LogoWrapper />
      {ethereum && <Wallet />}
      {darkMode ? (
        <img src={LightIcon} className="icon" onClick={toggleTheme} />
      ) : (
        <img src={DarkIcon} className="icon" onClick={toggleTheme} />
      )}
    </HeaderWrapper>
  )
}

export default Header
