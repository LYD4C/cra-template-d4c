import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import MetamaskIcon from './images/metamask.png'
import { decimalToHex } from '../helpers/utils'
import OpIcon from './images/optimism_logo.svg'
import BscIcon from './images/bsc_logo.png'

export enum ChainId {
  BSC_TEST = 97,
  OPTIMISM = 10
}
// 默认显示的链
export const DEFAULT_NETWORK = ChainId.BSC_TEST
export const NetworkContextName = 'NETWORK'

export const SUPPORTED_CHAIN_IDS = [97, 10]

const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
})

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
}

// 支持的钱包
export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: MetamaskIcon,
    description: 'Easy-to-use browser extension.',
    href: null,
  },
}

// 默认的钱包
export const DEFAULT_WALLET = SUPPORTED_WALLETS.METAMASK

interface NetworkConfig {
  [key: number]: {
    chainId: typeof SUPPORTED_CHAIN_IDS;
    chainName: string;
    rpcUrls: string[];
    logo: string;
    explorer: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
  };
}
export const NETWORK_CONFIG: NetworkConfig = {
  [ChainId.BSC_TEST]: {
    chainId: [ChainId.BSC_TEST],
    chainName: 'BSC_Testnet',
    rpcUrls: [
      'https://data-seed-prebsc-2-s3.binance.org:8545',
      'https://data-seed-prebsc-1-s3.binance.org:8545',
      'https://data-seed-prebsc-1-s2.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
    ],
    logo: BscIcon,
    explorer: 'https://testnet.bscscan.com/',
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18,
    },
  },
  [ChainId.OPTIMISM]: {
    chainId: [ChainId.OPTIMISM],
    chainName: 'Optimism',
    rpcUrls: ['https://mainnet.optimism.io'],
    logo: OpIcon,
    explorer: 'https://optimistic.etherscan.io/',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
}

const CHAIN_CHANGED = 'chainChanged'

export const changeNetwork = (chainId: number) => {
  return new Promise<void>((reslove, rejects) => {
    const { ethereum } = window
    if (ethereum && ethereum.isMetaMask) {
      ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: decimalToHex(chainId) }],
      }).then(() => {
        // 曾经遇到过h5端（钱包内置浏览器）无法监听事件
        if (ethereum && ethereum.on) {
          ethereum.on(CHAIN_CHANGED, () => {
            reslove()
          })
          return () => {
            ethereum.removeListener(CHAIN_CHANGED)
          }
        }
      }).catch((switchError: any) => {
        if (switchError.code === 4902) {
          if (!NETWORK_CONFIG[chainId]) {
            rejects()
            return
          }
          ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: decimalToHex(chainId),
              chainName: NETWORK_CONFIG[chainId].chainName,
              rpcUrls: [...NETWORK_CONFIG[chainId].rpcUrls],
            }],
          }).then(() => reslove()).catch(() => rejects())
        } else {
          rejects()
        }
      }).catch(() => rejects())
    }
  })
}

export const getCurrentChainId = () => {
  const { ethereum } = window
  return Number(ethereum.chainId)
}

