import { DatabaseZap } from "lucide-react";
import Link from "next/link";
import TypingAnimation from "../magicui/TypingAnimation";

const AppLogo = () => {
  return (
    <Link href="/" className="flex gap-2 flex-nowrap items-center p-2 w-fit">
      <DatabaseZap className="w-9 h-9 text-orange-500" />
      <h1 className="font-bold text-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-transparent bg-clip-text whitespace-nowrap tracking-tight">
        Constants Manager
      </h1>
    </Link>
  );
};
export default AppLogo;
