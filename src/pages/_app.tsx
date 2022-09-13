import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useEffect, useState } from 'react'
import { getContractInteractor } from '@/ethereum/ContractUtl'

export const WalletContext = createContext('')
// @ts-ignore
export const ContractContext = createContext()

function MyApp({ Component, pageProps }: AppProps) {
  const [address, setAddress] = useState('MyAddress')
  const [contract, setContract] = useState()

  useEffect(() => {
    connect()
    // @ts-ignore
    getContractInteractor().then((res) => setContract(res))
  }, [])

  const connect = () => {
    ;(window.ethereum as any)
      .request({ method: 'eth_requestAccounts' })
      .then((x: any) => {
        setAddress(x)
      })
  }

  return (
    <>
      <WalletContext.Provider value={address}>
        <ContractContext.Provider value={contract}>
          <Component {...pageProps} />
        </ContractContext.Provider>
      </WalletContext.Provider>
    </>
  )
}

export default MyApp
