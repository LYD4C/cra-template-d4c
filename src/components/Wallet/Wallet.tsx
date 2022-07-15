import { AccountDrawer, AccountModal, H5BottomWrapper, WalletModal, WalletWrapper } from './WalletStyle'
import WalletIcon from './images/wallet-icon.svg'
import { useEffect, useState } from 'react'
import { useActiveWeb3React } from '../../helpers/hooks'
import Modal from '../Modal'
import { changeNetwork, DEFAULT_NETWORK, DEFAULT_WALLET, getCurrentChainId, NETWORK_CONFIG, SUPPORTED_CHAIN_IDS, SUPPORTED_WALLETS } from '../../web3/chain'
import { AbstractConnector } from '@web3-react/abstract-connector'
import toast from '../Toast/Toast'
import { isDesktop, shortenAddress } from '../../helpers/utils'
import { useClipboard } from 'use-clipboard-copy'
import NetworkSelector from './NetworkSelector'
import WalletWarningIcon from './images/wallet-warning.png'
import CopyIcon from './images/copy.svg'
import Button from '../Button'
import { useLoading } from '../Loading/Loading'
import Drawer from '../Drawer'
import Identicon from './Identicon'
import { UnsupportedChainIdError } from '@web3-react/core'

const LOACL_ACCOUNT = 'localAccount'
const ACCOUNT_CHANGED = 'accountsChanged'
const WALLET_CLOSED = 'walletClosed'
// 钱包头像


const Wallet: React.FC = () => {
  const [showDisconnectModal, setShowDisconnectModal] = useState(false)
  const {
    active, account, chainId, connector, activate, deactivate,
  } = useActiveWeb3React()
  const clipboard = useClipboard()
  const [switchChainModal, setSwitchChainModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const loading = useLoading()
  const { ethereum } = window

  useEffect(() => {
    if ((!localStorage.getItem(LOACL_ACCOUNT) && isDesktop)
      || !DEFAULT_WALLET.connector
    ) return
    handleConnect(DEFAULT_WALLET.connector)
  }, [])

  useEffect(() => {
    if (!account) return
    localStorage.setItem(LOACL_ACCOUNT, account)
  }, [account])

  const handleConnect = (cuurentConnector: AbstractConnector) => {
    connectWallet(cuurentConnector)
  }
  const connectWallet = (cuurentConnector: AbstractConnector) => {
    activate(cuurentConnector, undefined, true).then(() => {
      setShowDisconnectModal(false)
      // 这里需要监听事件
      if (ethereum && ethereum.isMetaMask) {
        ethereum.on(ACCOUNT_CHANGED, (accounts: string[]) => {
          if (!accounts.length) {
            handleDisconnect()
          }
        })
        ethereum.on(WALLET_CLOSED, () => {
          handleDisconnect()
        })
        return () => {
          ethereum.removeListener(WALLET_CLOSED)
          ethereum.removeListener(ACCOUNT_CHANGED)
        }
      }
    }).catch(err => {
      if (err instanceof UnsupportedChainIdError) return
      toast({ text: err.message, type: 'error' })
    })
  }
  // 断开钱包链接
  const handleDisconnect = () => {
    deactivate()
    setShowAccountModal(false)
    localStorage.removeItem(LOACL_ACCOUNT)
  }

  const handleCopy = (value: string) => {
    if (clipboard.isSupported()) {
      clipboard.copy(value)
      setShowAccountModal(false)
      toast({ text: 'copy success' })
    }
  }

  const handleShowDisconnectModal = () => {
    if (!SUPPORTED_CHAIN_IDS.includes(getCurrentChainId())) {
      setSwitchChainModal(true)
      return
    }
    setShowDisconnectModal(true)
  }

  const handleConnectNetwork = () => {
    loading.show()
    changeNetwork(DEFAULT_NETWORK).then(() => {
      setSwitchChainModal(false)
      connectWallet(DEFAULT_WALLET.connector!)
    }).catch(() => {
      toast({ text: 'Something Wrong.Please try again', type: 'error' })
    }).finally(() => loading.hide())
  }
  // 未连接弹窗
  const DisconnectModal = () => {
    return (
      <Modal
        open={showDisconnectModal}
        title="Connect Wallet"
        onClose={() => setShowDisconnectModal(false)}
      >
        <WalletModal>
          {
          Object.keys(SUPPORTED_WALLETS).map(key => {
            const option = SUPPORTED_WALLETS[key]
            return (
              <div className="walletSeletor" key={key}>
                <div className="label" onClick={() => handleConnect(option.connector!)}>
                  {option.name}
                  <img className="icon" src={option.iconName} />
                </div>
              </div>
            )
          })
        }
        </WalletModal>
      </Modal>
    )
  }
  // 处理当前连接的钱包名称
  const formatConnectorName = () => {
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS).filter(k =>
      SUPPORTED_WALLETS[k].connector === connector && (isMetaMask === (k === 'METAMASK'))).map(k => SUPPORTED_WALLETS[k].name)[0]
    return name
  }

  const walletWrapper = () => {
    if (!active && !account) {
      return (
        <WalletWrapper onClick={handleShowDisconnectModal}>
          <img className="logo" src={WalletIcon} />
          Connect Wallet
        </WalletWrapper>
      )
    }
    return (
      <WalletWrapper onClick={() => setShowAccountModal(true)}>
        <div className="avatar"><Identicon diameter={24} /></div>
        {shortenAddress(account!)}
      </WalletWrapper>
    )
  }
  return (
    <>
      <NetworkSelector
        handleNoWallet={!active && !account ? handleShowDisconnectModal : undefined}
      />
      {
        isDesktop ? walletWrapper() : <H5BottomWrapper>{walletWrapper()}</H5BottomWrapper>
      }
      <Modal
        title="Account"
        open={showAccountModal && isDesktop}
        onClose={() => setShowAccountModal(false)}
      >
        <AccountModal>
          <div className="content">
            <div className="row">
              <div className="avatar"><Identicon /></div>
              {account && shortenAddress(account)}
              <img src={CopyIcon} className="copy-icon" onClick={() => handleCopy(account!)} />
            </div>
            <div className="desc">Connected with {formatConnectorName()}</div>
            <Button text="Change" variant="outlined" onClick={() => setShowDisconnectModal(true)} />
          </div>
          <a
            className="label"
            href={chainId && `${NETWORK_CONFIG[chainId].explorer}/address/${account}`}
            target="_blank"
            rel="noreferrer"
          >view on explorer
          </a>
          <div className="label" onClick={handleDisconnect}>Disconnect</div>
        </AccountModal>
      </Modal>
      <DisconnectModal />
      <Modal
        title="Wrong Network"
        open={switchChainModal}
        onClose={() => setSwitchChainModal(false)}
      >
        <WalletModal>
          <img className="img" src={WalletWarningIcon} />
          <div className="content">Please switch to a currently supported network</div>
          <Button onClick={handleConnectNetwork} text="Switch Network" />
        </WalletModal>
      </Modal>
      {/* drawer h5 端抽屉 */}
      <Drawer
        open={showAccountModal && !isDesktop}
        onClose={() => setShowAccountModal(false)}
      >
        <AccountDrawer>
          <div className="content">
            <div className="row">
              <div className="avatar"><Identicon /></div>
              {account && shortenAddress(account)}
              <img src={CopyIcon} className="copy-icon" onClick={() => handleCopy(account!)} />
            </div>
            <div className="desc">Connected with {formatConnectorName()}</div>
          </div>
          <div className="label" onClick={() => setShowDisconnectModal(true)}>Change</div>
          <a
            className="label"
            href={chainId && `${NETWORK_CONFIG[chainId].explorer}/address/${account}`}
            target="_blank"
            rel="noreferrer"
          >view on explorer
          </a>
          <div className="label" onClick={handleDisconnect}>Disconnect</div>
        </AccountDrawer>
      </Drawer>
    </>
  )
}

export default Wallet
