import styled from 'styled-components'
import { defaultTheme, flexCenter } from '../../style'
import Wallet from '../Wallet'

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  z-index: 10;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: ${defaultTheme.isDesktop ? '20px 160px' : '0 0 0 20px'};
  background-color: ${props => props.theme.grey1};
  border-bottom: 1px solid ${props => props.theme.borderColor};
  .row {
    ${flexCenter};
    flex-direction: row;
  }
`
const LogoWrapper = styled.div`
  ${flexCenter};
  flex-direction: row;
  align-items: center;
  color: ${props => props.theme.grey1};
  font-size: ${defaultTheme.fontLarge};
  font-weight: bold;
  cursor: pointer;
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
  return (
    <HeaderWrapper >
      <LogoWrapper />
      <Wallet />
    </HeaderWrapper>
  )
}

export default Header
