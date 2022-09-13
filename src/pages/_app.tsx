import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useEffect, useState } from 'react'

export const WalletContext = createContext('')

function MyApp({ Component, pageProps }: AppProps) {
  const [address, setAddress] = useState('')

  useEffect(() => {
    connectWallet()
  },[])

  const connectWallet = () => {
    // @ts-ignore
    (window.ethereum as any)
      .request({ method: "eth_requestAccounts" })
      .then((x: any) => {
        console.log(x);
        setAddress(x)
      })
  }

  return (
    <>
      <WalletContext.Provider value={address}>
        <Component {...pageProps} />
      </WalletContext.Provider>
    </>
  )
}

export default MyApp
