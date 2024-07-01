"use-client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TooltopProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "left" | "bottom" | "right";
  align?: "start" | "center" | "end";
}

const ActionTooltip = ({ label, children, side, align }: TooltopProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {label && (
          <TooltipContent side={side} align={align} className="bg-zinc-100 border-zinc-400 border-[1px]">
            <p className="text-xs capitalize text-zinc-800">{label.toLowerCase()}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
