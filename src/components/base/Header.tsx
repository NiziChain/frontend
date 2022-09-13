import { WalletContext } from '@/pages/_app'
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useContext } from 'react'
import CustomHead from './CustomHead'

const Header = () => {
  const address = useContext(WalletContext)[0]
  return (
    <>
      <CustomHead />
      <AppBar className='bg-slate-400' position='static'>
        <Toolbar>
          <Typography variant='h4' component='div' className='ml-10'>
            <Link href='/'>NiziChain</Link>
          </Typography>
          <Container className='text-right space-x-4 mr-2'>
            <Link href='/id'>ID発行</Link>
            <Link href='/works'>作品一覧</Link>
            <Link href='/mypage'>マイページ</Link>
            <Box component='span'>{address.slice(0, 5)}...</Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
