"use client"

import { useState, useMemo, useEffect } from "react"
import type { Product } from "@/lib/types"
import { ProductCard } from "./product-card"
import { ProductFilters } from "./product-filters"
import { DarkModeToggle } from "./dark-mode-toggle"
import { ProductSkeleton } from "./product-skeleton"
import { getFavoritesFromStorage, saveFavoritesToStorage, toggleFavorite } from "@/lib/favorites"
import { Input } from "@/components/ui/input"
import { Search, AlertCircle } from "lucide-react"

interface ProductListingPageProps {
  initialProducts: Product[]
  categories: string[]
  hasError?: boolean
}

export default function ProductListingPage({ initialProducts, categories, hasError }: ProductListingPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc">("relevance")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setFavorites(getFavoritesFromStorage())
    setIsLoading(false)
  }, [])

  const filteredProducts = useMemo(() => {
    let result = initialProducts

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (showFavoritesOnly) {
      result = result.filter((p) => favorites.includes(p.id))
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase()
      result = result.filter(
        (p) => p.title.toLowerCase().includes(lowerSearch) || p.description.toLowerCase().includes(lowerSearch),
      )
    }

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    return result
  }, [initialProducts, selectedCategory, searchTerm, favorites, showFavoritesOnly, sortBy])

  const handleToggleFavorite = (productId: number) => {
    const updated = toggleFavorite(productId, favorites)
    setFavorites(updated)
    saveFavoritesToStorage(updated)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Product Explorer</h1>
              <p className="text-muted-foreground">Discover and manage your favorite products</p>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1" />
            <section className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    )
  }

  if (hasError && initialProducts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Product Explorer</h1>
                <p className="text-muted-foreground text-sm">Discover and manage your favorite products</p>
              </div>
              <DarkModeToggle />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Unable to Load Products</h2>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              We're having trouble connecting to the product service. Please try refreshing the page in a few moments.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Product Explorer</h1>
              <p className="text-muted-foreground text-sm">Discover and manage your favorite products</p>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Search products by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
            aria-label="Search products"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              showFavoritesOnly={showFavoritesOnly}
              onFavoritesToggle={setShowFavoritesOnly}
              sortBy={sortBy}
              onSortChange={setSortBy}
              favoriteCount={favorites.length}
            />
          </aside>

          <section className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-2">No products found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="region" aria-label="Product grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
