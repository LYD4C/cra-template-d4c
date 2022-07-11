import { AccountModal, WalletModal, Wrapper } from './WalletStyle'
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

const LOACL_ACCOUNT = 'localAccount'

const Wallet: React.FC = () => {
  const [showDisconnectModal, setShowDisconnectModal] = useState(false)
  const {
    active, account, chainId, activate, deactivate,
  } = useActiveWeb3React()
  const clipboard = useClipboard()
  const [switchChainModal, setSwitchChainModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const loading = useLoading()

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
    }).catch(err => {
      toast({ text: err.name, type: 'error' })
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
              <div className="label" key={key} onClick={() => handleConnect(option.connector!)}>
                {option.name}
                <img className="icon" src={option.iconName} />
              </div>
            )
          })
        }
        </WalletModal>
      </Modal>
    )
  }
  if (!active && !account) {
    return (
      <>
        <NetworkSelector handleNoWallet={() => setShowDisconnectModal(true)} />
        <Wrapper onClick={handleShowDisconnectModal}>
          <img className="logo" src={WalletIcon} />
          Connect Wallet
        </Wrapper>
        <DisconnectModal />
        <Modal
          title="Wrong Network"
          open={switchChainModal}
          onClose={() => setSwitchChainModal(false)}
        >
          <WalletModal>
            <img className="img" src={WalletWarningIcon} />
            <div className="content">Please switch to a currently supported network </div>
            <Button onClick={handleConnectNetwork} text="Switch Network" />
          </WalletModal>
        </Modal>
      </>
    )
  }
  return (
    <>
      <NetworkSelector />
      <Wrapper onClick={() => setShowAccountModal(true)}>
        {shortenAddress(account!)}
      </Wrapper>
      <Modal
        title="Account"
        open={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      >
        <AccountModal>
          <div className="content">
            <div className="row">
              {shortenAddress(account!)}
              <img src={CopyIcon} className="copy-icon" onClick={() => handleCopy(account!)} />
            </div>
            <div className="desc">Connected with MetaMask</div>
            <Button text="Change" variant="outlined" onClick={() => setShowDisconnectModal(true)} />
          </div>
          <a
            className="label"
            href={`${NETWORK_CONFIG[chainId!].explorer}/address/${account}`}
            target="_blank"
            rel="noreferrer"
          >view on explorer
          </a>
          <div className="label" onClick={handleDisconnect}>Disconnect</div>
        </AccountModal>
      </Modal>
      <DisconnectModal />
    </>
  )
}

export default Wallet
