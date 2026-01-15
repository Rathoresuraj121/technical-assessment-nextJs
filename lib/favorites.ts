const FAVORITES_KEY = "product_favorites"

export function getFavoritesFromStorage(): number[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveFavoritesToStorage(favorites: number[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch {
    console.error("Failed to save favorites")
  }
}

export function toggleFavorite(productId: number, favorites: number[]): number[] {
  const index = favorites.indexOf(productId)
  if (index > -1) {
    return favorites.filter((id) => id !== productId)
  } else {
    return [...favorites, productId]
  }
}
