import { useEffect } from 'react'


export const Reporter = () => {
  useEffect(() => {
    const { navigator: { userAgent } } = window
    console.log(11111, userAgent)
  }, [])
}
