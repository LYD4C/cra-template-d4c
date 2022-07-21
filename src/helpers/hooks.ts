import { createContext } from 'react'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { ChainId, NetworkContextName } from '../web3/chain'

interface Theme {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}


// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const ThemeContext = createContext({} as Theme)

type Web3Context = Web3ReactContextInterface<Web3Provider> & { chainId?: ChainId }

export const useActiveWeb3React = (): Web3Context => {
  const context = useWeb3ReactCore<Web3Provider>()
  const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
  return context.active ? context : contextNetwork
}
