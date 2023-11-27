import { ProductResults } from '@/components';
import Homepage from '@/components/Homepage/Homepage';
import { CategoriesData } from '@/models/product';
import { fetchCategories, fetchCategory } from '@/network/products';
import { arrayShuffler } from '@/utils/arrayShuffler';

export default async function Home() {
  const categories = await fetchCategories();
  const sampleProducts = await getAllProductResults(categories);
  
  return (
    <>
      <Homepage categories={categories} sampleProducts={sampleProducts}/>
    </>
  )
}

async function getAllProductResults(categories: string[], records = 6): Promise<CategoriesData[]> {
  const result: CategoriesData[] = [];
  for (const category of categories) {
    if (category !== "All") {
      const products = await fetchCategory(category, records, true);
      result.push({
        categoryName: category,
        products: products,
      });
    }
  }
  const shuffledResult = arrayShuffler(result);
  return shuffledResult as CategoriesData[];
}


