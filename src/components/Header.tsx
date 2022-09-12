import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import CustomHead from './CustomHead'


const Header = () => {
  // 後でアドレスを追加
  const address = 'MyAddress'
  return (
    <>
      <CustomHead />
      <AppBar className='bg-slate-400' position='static'>
        <Toolbar>
          <Typography variant='h4' component='div' className='ml-10'>
            <Link href='/'>NiziChain</Link>
          </Typography>
          <Container className='text-right space-x-4 mr-2'>
            <Link href='/'>ID発行</Link>
            <Link href='/works'>作品一覧</Link>
            <Link href='/'>マイページ</Link>
            <Box component='span'>{address}</Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
