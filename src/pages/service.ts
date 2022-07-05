// 实例化ethereum 对象
import { BigNumber, ethers } from 'ethers'
import {
  GUNDAM_ABI, GUNDAM_CONTRACTS, NFTCOMPOUND_ABI, NFTCOMPOUND_CONTRACTS, STRATEGY_CONTRACTS, VAULT_ABI, VAULT_CONTRACTS,
} from '../global'

export const GUNDAM_URI = 'https://ipfs.moralis.io:2053/ipfs/QmYnWVLsQ2egs6xa8x4T25oW2HyAqbN4T5V2LW1yAXbFqf'
const rpcUrl = 'https://speedy-nodes-nyc.moralis.io/183208d8487f74a9dccbc1c7/bsc/testnet'
export let provider: any = window.ethereum === undefined ? undefined : new ethers.providers.Web3Provider(window.ethereum)
const readOnlyProvider = new ethers.providers.JsonRpcProvider(rpcUrl)
// 需要对应链的实例化对象,切链的操作
export const updateProvider = () => {
  return new Promise<void>(resolve => {
    provider = window.ethereum === undefined ? undefined : new ethers.providers.Web3Provider(window.ethereum)
    gundam = null
    vault = null
    NFT = null
    resolve()
  })
}
const getSigner = () => provider?.getSigner()

let gundam: null | ethers.Contract = null
const gundamContract = () => {
  if (gundam) return gundam
  gundam = new ethers.Contract(GUNDAM_CONTRACTS, GUNDAM_ABI, getSigner())
  return gundam
}
// 只读操作用到的
let readOnlyValue: null | ethers.Contract = null
const readOnlyContract = () => {
  if (readOnlyValue) return readOnlyValue
  readOnlyValue = new ethers.Contract(VAULT_CONTRACTS, VAULT_ABI, readOnlyProvider)
  return readOnlyValue
}

// 这里用单例模式，避免频繁的生成实例对象，有时候会造成某些无法估量的错误（比如用Promise.all）
let vault: null | ethers.Contract = null
const vaultContract = () => {
  if (vault) return vault
  vault = new ethers.Contract(VAULT_CONTRACTS, VAULT_ABI, getSigner())
  return vault
}

let NFT: null | ethers.Contract = null
const NFTContract = () => {
  if (NFT) return NFT
  NFT = new ethers.Contract(NFTCOMPOUND_CONTRACTS, NFTCOMPOUND_ABI, getSigner())
  return NFT
}


export const mint = (): Promise<any> => {
  return new Promise((resolve, rejects) => {
    gundamContract().mint().then((res: any) => {
      const { wait } = res
      wait().then((waitRes: any) => {
        resolve(waitRes)
      })
    }).catch((err: any) => rejects(err))
  })
}
// 获取当前全网价值总额
export const getTotalNetWorth = (): Promise<BigNumber> => {
  return new Promise((resolve, rejects) => {
    readOnlyContract().getNetWorth().then((res: BigNumber) => {
      resolve(res)
    }).catch((err: any) => rejects(err))
  })
}
// 获取一年内全网一共产生的收入
export const getTotalRewards = (): Promise<BigNumber> => {
  return new Promise((resolve, rejects) => {
    readOnlyContract().getTotalRewards().then((res: BigNumber) => {
      resolve(res)
    }).catch((err: any) => rejects(err))
  })
}
// 获取用户一共获得的收益额
export const getMyTotalRewards = (address: string): Promise<BigNumber> => {
  return new Promise((resolve, rejects) => {
    vaultContract().getUserRewards(address).then((res: BigNumber) => {
      resolve(res)
    }).catch((err: any) => rejects(err))
  })
}

// 获取 Gundam Pool 中一共存入的 NFT 数量
export const getTotalDeposit = (): Promise<BigNumber> => {
  return new Promise((resolve, rejects) => {
    readOnlyContract().getTotalDeposit().then((res: BigNumber) => {
      resolve(res)
    }).catch((err: any) => rejects(err))
  })
}

// 获取用户已经向 Gundam Pool 中存入的 NFT 数量
export const getUserDepositAmount = (address: string): Promise<BigNumber> => {
  return new Promise((resolve, rejects) => {
    vaultContract().getUserDepositAmount(address).then((res: BigNumber) => {
      resolve(res)
    }).catch((err: any) => rejects(err))
  })
}

// 获取用户当前持有的 Gundam NFT 列表
export const getUserDeposit = (address: string): Promise<BigNumber[]> => {
  return new Promise((resolve, rejects) => {
    vaultContract().getUserDeposit(address).then((res: BigNumber[]) => {
      resolve(res)
    }).catch((err: any) => rejects(err))
  })
}

/**
 * 获取用户当前存入Gundam NFT 对应的未领取收益额
 * @param address 所选 Strategy 的合约地址
 * @param tokenId 需要查询的用户的TokenId
 */

export const getUnclaimedRewards = (tokenId: string): Promise<BigNumber> => {
  return new Promise((resolve, rejects) => {
    NFTContract().getUnclaimedRewards(STRATEGY_CONTRACTS, tokenId).then((res: BigNumber) => {
      resolve(res)
    }).catch((err: any) => rejects(err))
  })
}


// 向 Vault 中存入一组 NFT
export const batchDeposit = (ids: string[]): Promise<BigNumber> => {
  return new Promise((resolve, rejects) => {
    vaultContract().batchDeposit(ids).then((res: BigNumber) => {
      resolve(res)
    }).catch((err: any) => rejects(err))
  })
}

// 从 Vault 中取回一组 NFT
export const batchWithdraw = (ids: string[]): Promise<BigNumber> => {
  return new Promise((resolve, rejects) => {
    vaultContract().batchWithdraw(ids).then((res: BigNumber) => {
      resolve(res)
    }).catch((err: any) => rejects(err))
  })
}
// 授权
export const approve = (id: string): Promise<void> => {
  return new Promise((resolve, rejects) => {
    gundamContract().approve(VAULT_CONTRACTS, id).then(() => {
      resolve()
    }).catch((err: any) => rejects(err))
  })
}

// 获取是否授权
export const getApproved = (id: string): Promise<boolean> => {
  return new Promise((resolve, rejects) => {
    gundamContract().getApproved(id).then((res: any) => {
      resolve(res === VAULT_CONTRACTS)
    }).catch((err: any) => rejects(err))
  })
}


const API_KEY = 'cSFUZDNTRYY7sza43l7n3jokdgpDWgEd420jRx7uGMnCsssWgwsRruxEF6o9QGgj'

/**
 * 通过第三方接口获取到用户所拥有的NFT
 * @param address 合约地址
 * @param cursor 需要查询的用户的TokenId
 */
type GetNFT = {
  address: string;
  action?: 'next' | 'pre';
  size?: number;
}
// ugly
const cursorArr: string[] = []
let current = 0
export const getUserNFTForContacts = ({
  address,
  action,
  size = 3,
}: GetNFT): Promise<any> => {
  let url = `https://deep-index.moralis.io/api/v2/${address}/nft/${GUNDAM_CONTRACTS}?chain=0x61&limit=${size}`
  if (action === 'next') {
    url = `${url}&cursor=${cursorArr[current]}`
  }
  if (action === 'pre') {
    url = `${url}&cursor=${cursorArr[current - 1]}`
  }
  return new Promise((resolve, rejects) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
    }).then(response => response.json()).then(res => {
      current = res.page
      if (action === 'next' && current >= cursorArr.length) {
        cursorArr.push(res.cursor)
      }
      resolve(res)
    }).catch(err => rejects(err))
  })
}
