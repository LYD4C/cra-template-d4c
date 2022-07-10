import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { SUPPORTED_CHAIN_IDS } from '../../web3'


const SelectorWrapper = styled.div`
  position: relative;
`

const NetworkSelector: React.FC = () => {
  const { chainId, connector } = useWeb3React()

  useEffect(() => {
    console.log(11)
  }, [chainId, connector])

  const onSelectChain = useCallback((id: number) => {
    console.log(id)
    // if (!connector) return
    // const addChainParameter = {
    //   chainId,
    //   chainName: info.label,
    //   rpcUrls: getRpcUrls(chainId),
    //   nativeCurrency: info.nativeCurrency,
    //   blockExplorerUrls: [info.explorer],
    // }
    // connector.activate(addChainParameter)
  }, [connector])
  return (
    <SelectorWrapper>
      {
        SUPPORTED_CHAIN_IDS.map((id: number) =>
          <div key={id} onClick={() => onSelectChain(id)}>{id}</div>)
      }
    </SelectorWrapper>
  )
}

export default NetworkSelector
