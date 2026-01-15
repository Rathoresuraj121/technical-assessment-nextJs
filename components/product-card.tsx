"use client"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (productId: number) => void
}

export function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`}>
          <div className="relative h-48 mb-4 bg-muted rounded-lg overflow-hidden group cursor-pointer">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.title}
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{product.category}</p>
            <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">{product.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 border-t flex items-center justify-between gap-2">
        <div className="text-lg font-bold text-primary">${product.price.toFixed(2)}</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleFavorite(product.id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="p-2"
        >
          <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"} />
        </Button>
      </CardFooter>
    </Card>
  )
}
