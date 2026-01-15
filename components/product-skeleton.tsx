import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ProductSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="p-4 flex-grow">
        <div className="h-48 mb-4 bg-muted rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
          <div className="h-5 bg-muted rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-muted rounded w-full animate-pulse" />
          <div className="h-4 bg-muted rounded w-4/5 animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex items-center justify-between gap-2">
        <div className="h-6 bg-muted rounded w-20 animate-pulse" />
        <div className="h-8 w-8 bg-muted rounded animate-pulse" />
      </CardFooter>
    </Card>
  )
}
