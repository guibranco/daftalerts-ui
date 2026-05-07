import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardFooter } from "./ui/card";

export function PropertyCardSkeleton() {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <Skeleton className="aspect-video w-full rounded-none" />
      <CardContent className="p-4 flex-1 space-y-3">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-12" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 grid grid-cols-3 gap-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}
