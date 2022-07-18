import styled from 'styled-components'
import {
  defaultTheme, flexCenter,
} from '../../style'


const WalletWrapper = styled.div`
  ${flexCenter};
  flex-direction: row;
  justify-content: space-between;
  height: fit-content;
  padding: 8px 16px;
  border-radius: 20px;
  color: ${defaultTheme.grey1};
  line-height: 19px;
  cursor: pointer;
  background-color: #0057FF;
  .logo {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
  .avatar {
    ${flexCenter};
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
    padding: 20px 0;
    text-align: center;
  }
  .img {
    width: 105px;
    height: 105px;
    margin: 0 auto;
  }

`

const AccountModal = styled.div`
  padding: 0 24px 40px 24px;
  width: 480px;
  .content {
    position: relative;
    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: ${defaultTheme.fontLarge};
      color: #101010;
      line-height: 23px;
      margin-bottom: 12px;
      .avatar {
        width: 32px;
        height: 32px;
        margin-right: 12px;
      }
      .copy-icon {
        width: 24px;
        height: 24px;
        margin-left: 12px;
        cursor: pointer;
      }
    }
    .desc {
      color: #999999;
      line-height: 15px;
      margin-bottom: 20px;
    }
    button {
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 8px;
    }
  }
  .label {
    ${flexCenter};
    flex-direction: row;
    justify-content: center;
    border-radius: 8px;
    padding: 16px 0;
    margin-top: 8px;
    cursor: pointer;
    font-weight: 500;
    background: #F4F5F6;
    :hover {
      color: #FCFCFD;
      background-color: ${defaultTheme.primaryColor};
    }
  }
`

const AccountDrawer = styled(AccountModal)`
  padding:40px 0;
  width: 100%;
  .content {
    align-items: center;
  }
`


export { WalletWrapper, WalletModal, AccountModal, AccountDrawer }
