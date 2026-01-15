"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, X } from "lucide-react"

interface ProductFiltersProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  showFavoritesOnly: boolean
  onFavoritesToggle: (show: boolean) => void
  sortBy: "relevance" | "price-asc" | "price-desc"
  onSortChange: (sort: "relevance" | "price-asc" | "price-desc") => void
  favoriteCount: number
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  showFavoritesOnly,
  onFavoritesToggle,
  sortBy,
  onSortChange,
  favoriteCount,
}: ProductFiltersProps) {
  return (
    <div className="space-y-4 sticky top-24">
      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Categories</CardTitle>
            {selectedCategory && (
              <button
                onClick={() => onCategoryChange(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear category filter"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Favorites */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Favorites</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            className="w-full justify-start gap-2"
            onClick={() => onFavoritesToggle(!showFavoritesOnly)}
            disabled={favoriteCount === 0}
            aria-label={`Show favorite products (${favoriteCount} saved)`}
          >
            <Heart size={16} className={showFavoritesOnly ? "fill-current" : ""} />
            My Favorites {favoriteCount > 0 && `(${favoriteCount})`}
          </Button>
        </CardContent>
      </Card>

      {/* Sort */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Sort By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { value: "relevance" as const, label: "Relevance" },
            { value: "price-asc" as const, label: "Price: Low to High" },
            { value: "price-desc" as const, label: "Price: High to Low" },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onSortChange(value)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                sortBy === value ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
              }`}
              aria-pressed={sortBy === value}
            >
              {label}
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
