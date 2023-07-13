import { ProductResults } from '@/components'
import { CategoriesData } from '@/models/product'
import { fetchCategories, fetchCategory } from '@/network/products'
import { arrayShuffler } from '@/utils/arrayShuffler'
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'

type Data = {
  categories: String[],
}

export default async function Home() {
  const categories = await fetchCategories();
  const sampleProducts = await getAllProductResults(categories);

  return (
    <>
      <ProductResults categories={categories} sampleProducts={sampleProducts}/>
    </>
  )
}

async function getAllProductResults(categories: string[], records = 6): Promise<CategoriesData[]> {
  const result: CategoriesData[] = [];
  for (const category of categories) {
    if (category !== "All") {
      const products = await fetchCategory(category, records);
      result.push({
        categoryName: category,
        products: products,
      });
    }
  }
  const shuffledResult = arrayShuffler(result);
  return shuffledResult as CategoriesData[];
}
