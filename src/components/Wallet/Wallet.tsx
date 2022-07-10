import { PopoverContent, WalletModal, Wrapper } from './WalletStyle'
import WalletIcon from './images/wallet-icon.svg'
import { useEffect, useRef, useState } from 'react'
import { useActiveWeb3React } from '../../helpers/hooks'
import Modal from '../Modal'
import { SUPPORTED_WALLETS } from '../../web3'
import { AbstractConnector } from '@web3-react/abstract-connector'
import toast from '../Toast/Toast'
import { shortenAddress } from '../../helpers/utils'
import Popover from '../Popover'
import { useClipboard } from 'use-clipboard-copy'
import NetworkSelector from './NetworkSelector'

const WALLET_ID = 'walletAnchorId'

const Wallet: React.FC = () => {
  const [showDisconnectModal, setShowDisconnectModal] = useState(false)
  const {
    active, account, chainId, activate, deactivate,
  } = useActiveWeb3React()
  const [showPopover, setShowPopover] = useState(false)
  const anchorElRef = useRef<HTMLDivElement>(null)
  const clipboard = useClipboard()

  useEffect(() => {
    console.log('current', chainId)
  }, [chainId])

  const handleConnect = (cuurentConnector: AbstractConnector) => {
    activate(cuurentConnector, undefined, true).then(() => {
      setShowDisconnectModal(false)
    }).catch(err => {
      toast({ text: err, type: 'error' })
    })
  }
  // 断开钱包链接
  const handleDisconnect = () => {
    deactivate()
    setShowPopover(false)
  }

  const handleCopy = (value: string) => {
    if (clipboard.isSupported()) {
      clipboard.copy(value)
      setShowPopover(false)
      toast({ text: 'copy success', type: 'success' })
    }
  }


  if (!active && !account) {
    return (
      <>
        <NetworkSelector />
        <Wrapper onClick={() => setShowDisconnectModal(true)}>
          <img className="logo" src={WalletIcon} />
          Connect Wallet
        </Wrapper>
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
      </>
    )
  }
  return (
    <>
      <NetworkSelector />
      <Wrapper aria-describedby={WALLET_ID} ref={anchorElRef} onClick={() => setShowPopover(true)} >
        {shortenAddress(account!)}
      </Wrapper>
      <Popover
        open={showPopover}
        id={WALLET_ID}
        anchorEl={anchorElRef.current}
        onClose={() => setShowPopover(false)}
      >
        <PopoverContent>
          <div className="label" onClick={() => handleCopy(account!)}>Copy address</div>
          <div className="label" onClick={handleDisconnect}>Disconnect</div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default Wallet
