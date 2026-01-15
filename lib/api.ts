import type { Product } from "./types"

const API_BASE_URL = "https://fakestoreapi.com"

export async function fetchProducts(): Promise<Product[]> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      signal: controller.signal,
      next: { revalidate: 60 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    return null
  }
}

export async function fetchCategories(): Promise<string[]> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      signal: controller.signal,
      next: { revalidate: 60 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}
