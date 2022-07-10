// import { useWeb3React } from '@web3-react/core'

const Web3Manager: React.FC<{children: JSX.Element}> = ({ children }) => {
  // const { active } = useWeb3React()

  return (
    <>
      {children}
    </>
  )
}

export default Web3Manager
