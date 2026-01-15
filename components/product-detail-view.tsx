"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ArrowLeft, Star } from "lucide-react"
import { getFavoritesFromStorage, saveFavoritesToStorage, toggleFavorite } from "@/lib/favorites"

interface ProductDetailViewProps {
  product: Product
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const favorites = getFavoritesFromStorage()
    setIsFavorite(favorites.includes(product.id))
    setIsLoading(false)
  }, [product.id])

  const handleToggleFavorite = () => {
    const favorites = getFavoritesFromStorage()
    const updated = toggleFavorite(product.id, favorites)
    saveFavoritesToStorage(updated)
    setIsFavorite(updated.includes(product.id))
  }

  if (isLoading) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg p-8">
            <div className="relative w-full aspect-square">
              <Image
                src={product.image || "/placeholder.jpg"}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category and Title */}
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.title}</h1>

              {/* Rating if available */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.round(product.rating!.rate)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Price</p>
              <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm font-medium">Description</p>
              <p className="text-foreground leading-relaxed text-base">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleToggleFavorite}
                variant={isFavorite ? "default" : "outline"}
                className="w-full gap-2"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart size={18} className={isFavorite ? "fill-current" : ""} />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
              <Link href="/" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Product Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Product ID</p>
                  <p className="font-semibold text-sm">{product.id}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Category</p>
                  <p className="font-semibold text-sm capitalize">{product.category}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
