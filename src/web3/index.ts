import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import MetamaskIcon from './images/metamask.png'
import { decimalToHex } from '../helpers/utils'

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  BSC_TEST = 97,
}
export const NetworkContextName = 'NETWORK'

export const SUPPORTED_CHAIN_IDS = [1, 3, 4, 5, 42, 97]

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

// export const NETWORK_CHAIN_ID: number = 1

// export const network = new NetworkConnector({
//   urls: { [NETWORK_CHAIN_ID]: '' },
// })

interface NetworkConfig {
  [key: number]: {
    chainId: typeof SUPPORTED_CHAIN_IDS;
    chainName: string;
    rpcUrls: string[];
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
    rpcUrls: ['https://speedy-nodes-nyc.moralis.io/183208d8487f74a9dccbc1c7/bsc/testnet'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  [ChainId.ROPSTEN]: {
    chainId: [ChainId.ROPSTEN],
    chainName: 'Ropsten_Testnet',
    rpcUrls: ['https://rpc.ankr.com/eth_ropsten'],
    nativeCurrency: {
      name: 'ROP',
      symbol: 'ROP',
      decimals: 18,
    },
  },
}

export const changeNetwork = (chainId: number) => {
  return new Promise<void>((reslove, rejects) => {
    const { ethereum } = window
    if (ethereum && ethereum.isMetaMask) {
      ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: decimalToHex(chainId) }],
      }).then(() => reslove()).catch((switchError: any) => {
        if (switchError.code === 4902) {
          ethereum.reques({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: decimalToHex(chainId),
              chainName: NETWORK_CONFIG[chainId].chainName,
              rpcUrls: [...NETWORK_CONFIG[chainId].rpcUrls],
            }],
          }).catch(() => rejects())
        }
      }).catch(() => rejects())
    }
  })
}

// let networkLibrary: Web3Provider | undefined
// export function getNetworkLibrary(): Web3Provider {
//   // eslint-disable-next-line no-return-assign
//   return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
// }
