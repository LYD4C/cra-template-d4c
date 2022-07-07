import styled from 'styled-components'
import { flexCenter } from '../../styled'

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  z-index: 10;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 20px 160px;
  background-color: ${props => props.theme.headerBgColor};
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
  color: ${props => props.theme.fontColor};
  font-size: 26px;
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
    </HeaderWrapper>
  )
}

export default Header
