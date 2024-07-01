import React from "react";
import { LoaderCircle } from "lucide-react";

const Loading = () => (
  <div className="font-semibold text-sm flex text-zinc-500 justify-center items-center gap-1 p-3">
    <LoaderCircle className="w-4 h-4 animate-spin" />
    Loading...
  </div>
);

export default Loading;
