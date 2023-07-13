import { ProductResults } from '@/components'
import { fetchCategories } from '@/network/products'
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'

type Data = {
  categories: String[],
}

export default function Home() {
  return (
    <>
      <ProductResults/>
    </>
  )
}