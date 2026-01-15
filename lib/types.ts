// Product types from fakestoreapi
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  isLoading?: boolean
}

// Favorites context
export interface FavoritesContextType {
  favorites: Set<number>
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
}
