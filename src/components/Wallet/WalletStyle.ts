import styled from 'styled-components'
import {
  defaultTheme, flexCenter,
} from '../../style'


const Wrapper = styled.div`
  ${flexCenter};
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
  border-radius: 20px;
  color: ${defaultTheme.grey1};
  font-size: ${defaultTheme.fontNormal};
  line-height: 19px;
  cursor: pointer;
  background-color: #0057FF;
  .logo {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
`

const WalletModal = styled.div`
  padding: 0 24px 40px 24px;
  width: 432px;
  .label {
    ${flexCenter};
    flex-direction: row;
    justify-content: space-between;
    border-radius: 8px;
    padding: 16px 24px;
    margin-top: 8px;
    cursor: pointer;
    font-weight: 500;
    :hover {
      background-color: ${defaultTheme.primaryColor};
      color: #FCFCFD;
    }
    .icon {
      width: 24px;
      height: 24px;
    }
  }
  .content {
    font-size: ${defaultTheme.fontNormal};
    padding: 20px 0;
    text-align: center;
  }

`
const PopoverContent = styled.div`
  ${flexCenter};
  padding: 16px;
  .label {
    ${flexCenter};
    flex-direction: row;
    justify-content: center;
    border-radius: 8px;
    width: 280px;
    padding: 16px 0;
    margin-top: 8px;
    cursor: pointer;
    font-weight: 500;
    font-family: MiSans-Normal;
    :hover {
      color: #FCFCFD;
      background-color: ${defaultTheme.primaryColor};
    }
  }

`

export { Wrapper, WalletModal, PopoverContent }
