import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import toast from '../../components/Toast/Toast'
import { ThemeContext, useActiveWeb3React } from '../../helpers/hooks'

const Main: React.FC = () => {
  const { setDarkMode } = useContext(ThemeContext)
  const { active } = useActiveWeb3React()

  useEffect(() => {
    console.log('mian', active)
  }, [active])
  return (
    <>
      <Link to="/test" ><Button onClick={() => setDarkMode(value => !value)} text="link to test page" /></Link>
      <Button onClick={() => toast({ text: 'esay' })} text="toast" />
    </>
  )
}

export default Main
