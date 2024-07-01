import dynamic from "next/dynamic";
import { Loader2, LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports | "";
}

const Icon = ({ name, ...props }: IconProps) => {
  if (name === null || name == "") {
    name = "table";
    // return <Table {...props} />;
  }

  const LucideIcon = dynamic(dynamicIconImports[name], {
    loading: () => <Loader2 className="animate-spin w-5 h-5 mr-2 text-zinc-700" />,
  });

  return <LucideIcon {...props} />;
};

export default Icon;
