import jazzicon from '@metamask/jazzicon'
import { useLayoutEffect, useRef } from 'react'
import { useActiveWeb3React } from '../../helpers/hooks'

interface IdenticonProps {
  diameter?: number // 默认头像直径px
}
const Identicon: React.FC<IdenticonProps> = ({ diameter = 32 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { account } = useActiveWeb3React()
  useLayoutEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(jazzicon(diameter, parseInt(account.slice(2, 10), 16)))
    }
  }, [account])

  return <div ref={ref} />
}

export default Identicon
