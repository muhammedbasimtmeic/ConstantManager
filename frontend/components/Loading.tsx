import React from "react";
import { LoaderCircle } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const Loading = () => (
  <div className="font-semibold text-sm flex text-zinc-500 justify-center items-center gap-1 p-3">
    <LoaderCircle className="w-4 h-4 animate-spin" />
    Loading...
  </div>
);

interface BoxesLoadingSkeletonProps {
  count: number;
  className?: string;
}

export const BoxesLoadingSkeleton: React.FC<BoxesLoadingSkeletonProps> = ({ count, className }) => (
  <div className="flex flex-col gap-1">
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} className={cn("w-full h-16 bg-zinc-300 border", className)} />
    ))}
  </div>
);

export default Loading;
