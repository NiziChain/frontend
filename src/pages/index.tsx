import type { NextPage } from 'next'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Container className='min-h-screen mb-10'>
        <Card className='mt-10'>
          <CardMedia component='img' image='/BigMamPirates.jpg' />
        </Card>
        <Container className='mt-10 mb-20 text-center'>
          <Container className='border-b-2'>
            <Typography variant='body2' className='font-bold text-2xl mb-2'>
              サービスの概要
            </Typography>
          </Container>
          <Card className='mt-10'>
            <CardMedia component='img' image='/serviceSummary.jpg' />
            <CardContent>
              <Typography
                variant='body2'
                color='text.secondary'
                className='text-lg'
              >
                ブロックチェーンを用いて二次創作をするための権利を買うことができるサービスです。
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                className='text-lg'
              >
                このサービスを使うことで、二次創作の作者はより自由な二次創作を行うことができます。
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                className='text-lg'
              >
                また、1次創作の作者は権利を購入してもらうことで、利益を得ることができます。
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                className='text-lg'
              >
                ファンの方々は、この関係性を見て、コンテンツを安心して楽しむことができます。
              </Typography>
            </CardContent>
          </Card>
        </Container>
        <Container className='mt-10 mb-10 text-center'>
          <Container className='border-b-2'>
            <Typography variant='body2' className='font-bold text-2xl mb-2'>
              サービスの背景
            </Typography>
          </Container>
          <Card className='mt-10'>
            <CardMedia component='img' image='/background.jpg' />
            <CardContent>
              <Typography
                variant='body2'
                color='text.secondary'
                className='text-lg'
              >
                コンテンツが終わった喪失感や推しのIFを見たい、続けたいという欲求がありませんか？
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                className='text-lg'
              >
                その想いを形にしたコンテンツこそが、2次創作と呼ばれるものです。
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                className='text-lg'
              >
                今回、我々ビッグマム海賊団（開発者）が着目した点は、この2次創作です。
              </Typography>
            </CardContent>
          </Card>
          <Card className='mt-10'>
            <CardMedia component='img' image='/focusPoint.jpg' />
            <CardContent>
              <Typography
                variant='body2'
                color='text.secondary'
                className='text-lg'
              >
                2次創作は1次創作（原作）コンテンツをさらに盛り上げる、クリエイティブなコンテンツの1つです。
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                className='text-lg'
              >
                しかし、権利関係の複雑さという現実的な問題が、2次創作の純粋な想い・活動を邪魔しています。
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                className='text-lg'
              >
                この課題を解決し、健全なコンテンツ活動を促進していくことが、このサービスのモチベーションです。
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default Home
