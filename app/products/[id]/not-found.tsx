import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Product not found</p>
        <p className="text-sm text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/">
          <Button>Back to Products</Button>
        </Link>
      </div>
    </div>
  )
}
