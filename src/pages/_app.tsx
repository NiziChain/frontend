import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useEffect, useState } from 'react'
import { getContractInteractor } from '@/ethereum/ContractUtl'
import { Alert, Button, Link } from '@mui/material'

export const WalletContext = createContext('')
// @ts-ignore
export const ContractContext = createContext()

function MyApp({ Component, pageProps }: AppProps) {
  const [address, setAddress] = useState('MyAddress')
  const [contract, setContract] = useState()
  const [isError, setIsError] = useState(false)
  const warningMessage = `metamaskを次のURLからインストールしてください`

  useEffect(() => {
    try {
      connect()
      // @ts-ignore
      getContractInteractor().then((res) => setContract(res))
      setIsError(false)
    } catch (error) {
      console.log(error)
      setIsError(true)
    }
  }, [])

  const connect = () => {
    ;(window.ethereum as any)
      .request({ method: 'eth_requestAccounts' })
      .then((x: any) => {
        setAddress(x)
      })
  }

  const onClickWaring = () => {
    setIsError(false)
  }

  return (
    <>
      {isError && (
        <Alert severity='warning'>
          {warningMessage}:
          <Link
            target='_blank'
            href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja'
          >
            MetaMask
          </Link>
          <Button
            color='inherit'
            size='small'
            className='ml-20'
            onClick={onClickWaring}
          >
            閉じる
          </Button>
        </Alert>
      )}
      <WalletContext.Provider value={address}>
        <ContractContext.Provider value={contract}>
          <Component {...pageProps} />
        </ContractContext.Provider>
      </WalletContext.Provider>
    </>
  )
}

export default MyApp
