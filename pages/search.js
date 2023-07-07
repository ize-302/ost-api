import React from 'react'
import Layout from '@/components/layouts/Layout'
import { HeroSection } from '@/components/HeroSection'
import { Container } from '@/components/layouts/Container'
import { useRouter } from 'next/router'
import { Text } from '@mantine/core'
import { TitlesList } from '@/components/shared/TitlesList'
import { TitleContext } from '@/context/titleContext'

export default function Search() {
  const router = useRouter()
  const { query } = router.query
  const { handleSearch, loading, searchresults, setsearchresults, setloading } = React.useContext(TitleContext)

  React.useEffect(() => {
    setloading(true)
    handleSearch(query)
    return () => {
      setsearchresults([])
    }
  }, [query]) // eslint-disable-line

  return (
    <Layout>
      <HeroSection height='h-32' />
      <Container>
        <div className='w-full my-10 grid gap-10'>
          <div>
            <Text className='pb-1 text-2xl mb-5'>Search result for &apos;<b>{query}</b>&apos;</Text>
            <TitlesList loading={loading} titles={searchresults} />
          </div>
        </div>
      </Container>
    </Layout>
  )
}