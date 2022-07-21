import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../helpers/hooks'
import { flexCenter } from '../../style'
import { changeNetwork, DEFAULT_NETWORK, NETWORK_CONFIG } from '../../web3/chain'
import { useLoading } from '../Loading/Loading'
import Popover from '../Popover'
import toast from '../Toast/Toast'
import LinkIcon from './images/link.svg'
import ArrowIcon from './images/arrow.svg'
import { isDesktop } from '../../helpers/utils'

const SelectorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #f3f3f3;
  margin-left: auto;
  margin-right: 20px;
  cursor: ${isDesktop ? 'pointer' : 'none'};
  .logo {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  .arrow {
    width: 16px;
    height: 14px;
    margin-left: 8px;
    transform: rotate(180deg);
  }
`
const Label = `
  .label {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    width: 280px;
    margin-top: 16px;
    cursor: ${isDesktop ? 'pointer' : 'none'};;
    font-weight: 500;
    font-family: MiSans-Normal;
    .logo {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
`
const PopoverContent = styled.div`
  ${flexCenter};
  padding: 16px;
  align-items: flex-start;
  background: #ffffff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  .title {
    font-size: 14px;
    color: #666666;
    line-height: 17px;
  }
  ${Label};
`
const SelectdWrapper = styled.div`
  position: relative;
  background: rgba(0, 87, 255, 0.1);
  border-radius: 8px;
  padding: 10px 16px;
  margin-top: 10px;
  ${Label};
  .label {
    margin-top: 0;
  }
  .row {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 16px;
    .link {
      width: 10px;
      height: 10px;
      cursor: ${isDesktop ? 'pointer' : 'none'};
    }
    :hover {
      text-decoration: underline;
    }
  }
  .dot {
    position: absolute;
    top: 22px;
    right: 16px;
    width: 8px;
    height: 8px;
    background: #66b949;
    border-radius: 50%;
  }
`
const NETWORK_SELECTOR = 'newworkSelector'

interface NetworkProps {
  onWalletDisconnect?: () => void
}
const NetworkSelector: React.FC<NetworkProps> = ({ onWalletDisconnect }) => {
  const { chainId, active } = useActiveWeb3React()
  const anchorElRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const loading = useLoading()

  const onSelectChain = (id: number) => {
    if (!active && onWalletDisconnect) {
      setShow(false)
      onWalletDisconnect()
      return
    }
    if (id === chainId) return
    loading.show()
    changeNetwork(id)
      .then(() => {
        setShow(false)
        toast({ text: 'change network success' })
      })
      .catch(() => {
        toast({ text: 'Something Wrong.Please try again', type: 'error' })
      })
      .finally(() => loading.hide())
  }
  // 已连接的网络
  const activeNetwork = (id: number) => {
    return (
      <SelectdWrapper key={id}>
        <div className="label">
          <img className="logo" src={NETWORK_CONFIG[id].logo} />
          {NETWORK_CONFIG[id].chainName}
        </div>
        <a className="row" href={NETWORK_CONFIG[id].explorer} target="_blank" rel="noreferrer">
          <div>{NETWORK_CONFIG[id].chainName} etherscan</div>
          <img className="link" src={LinkIcon} />
        </a>
        <div className="dot" />
      </SelectdWrapper>
    )
  }
  return (
    <>
      <SelectorWrapper
        aria-describedby={NETWORK_SELECTOR}
        aria-haspopup="true"
        ref={anchorElRef}
        onClick={() => setShow(true)}
      >
        <img className="logo" src={NETWORK_CONFIG[chainId || DEFAULT_NETWORK].logo} />
        {isDesktop && NETWORK_CONFIG[chainId || DEFAULT_NETWORK].chainName}
        <img className="arrow" src={ArrowIcon} />
      </SelectorWrapper>
      <Popover
        open={show}
        id={NETWORK_SELECTOR}
        anchorEl={anchorElRef.current}
        onClose={() => setShow(false)}
      >
        <PopoverContent>
          <div className="title">Select a network</div>
          {Object.keys(NETWORK_CONFIG).map(id => {
            return !!chainId && Number(chainId) === Number(id) ? (
              activeNetwork(Number(id))
            ) : (
              <div className="label" key={id} onClick={() => onSelectChain(Number(id))}>
                <img className="logo" src={NETWORK_CONFIG[Number(id)].logo} />
                {NETWORK_CONFIG[Number(id)].chainName}
              </div>
            )
          })}
        </PopoverContent>
      </Popover>
    </>
  )
}

export default NetworkSelector
