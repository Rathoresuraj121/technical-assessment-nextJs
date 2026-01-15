import type { Metadata } from "next"
import { fetchProducts, fetchCategories } from "@/lib/api"
import ProductListingPage from "@/components/product-listing-page"

export const metadata: Metadata = {
  title: "Product Explorer - Browse & Filter Products",
  description: "Explore and manage your favorite products with easy filtering and search capabilities.",
}

export default async function Home() {
  let products: any[] = []
  let categories: string[] = []
  let hasError = false

  try {
    const [fetchedProducts, fetchedCategories] = await Promise.all([fetchProducts(), fetchCategories()])
    products = fetchedProducts
    categories = fetchedCategories
  } catch (error) {
    hasError = true
    console.error("Failed to fetch products:", error)
  }

  return <ProductListingPage initialProducts={products} categories={categories} hasError={hasError} />
}
