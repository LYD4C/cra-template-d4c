import { useContext } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import toast from '../../components/Toast/Toast'
import { ThemeContext } from '../../helpers/hooks'

const Main: React.FC = () => {
  const { setDarkMode } = useContext(ThemeContext)

  return (
    <>
      <Link to="/">
        <Button onClick={() => setDarkMode(value => !value)} text="link to test page" />
      </Link>
      <Button fullWidth onClick={() => toast({ text: 'esay' })} text="toast" />
    </>
  )
}

export default Main
