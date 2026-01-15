import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { fetchProductById, fetchProducts } from "@/lib/api"
import ProductDetailView from "@/components/product-detail-view"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

// Generate static params for common products
export async function generateStaticParams() {
  const products = await fetchProducts()
  return products.slice(0, 5).map((product) => ({
    id: product.id.toString(),
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const product = await fetchProductById(Number(id))
    return {
      title: `${product.title} - Product Explorer`,
      description: product.description.substring(0, 160),
    }
  } catch {
    return {
      title: "Product Not Found - Product Explorer",
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  try {
    const product = await fetchProductById(Number(id))
    return <ProductDetailView product={product} />
  } catch {
    notFound()
  }
}
