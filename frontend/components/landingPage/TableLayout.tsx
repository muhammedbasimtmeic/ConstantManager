import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import RecentActivitiesCards from "./RecentActivityCards";
import DashBoardLogo from "./DashBoardLogo";
import QuickTables from "./QuickTables";
import TableAnalytics from "./TableAnalytics";
import AnimatedGridPattern from "../magicui/AnimatedGridPattern";

const LandingPageTableLayout = () => {
  return (
    <div className="w-full h-full border-2 border-zinc-600 rounded-lg  bg-zinc-100 drop-shadow-xl overflow-clip">
      <div className="h-[45px] bg-zinc-600 flex items-center">
        <div className="w-16 h-4 bg-zinc-300 rounded-md ms-4" />
        <div className="w-64 h-4 bg-zinc-300 rounded-md ms-4" />
        <div className="w-36 h-4 bg-zinc-300 rounded-md ms-4" />
        <div className="w-64 h-4 bg-zinc-300 rounded-md ms-4" />
        <div className="w-16 h-4 bg-zinc-300 rounded-md ms-4" />
      </div>

      <div className="h-[40px] bg-zinc-500 flex items-center">
        <div className="w-16 h-4 bg-zinc-400 rounded-md ms-4" />
        <div className="w-64 h-4 bg-zinc-400 rounded-md ms-4" />
        <div className="w-36 h-4 bg-zinc-400 rounded-md ms-4" />
        <div className="w-64 h-4 bg-zinc-400 rounded-md ms-4" />
        <div className="w-16 h-4 bg-zinc-400 rounded-md ms-4" />
      </div>

      <div className="w-full flex justify-stretch relative overflow-clip flex-col md:flex-row">
        <AnimatedGridPattern
          width={50}
          height={50}
          numSquares={30}
          maxOpacity={0.4}
          duration={3}
          repeatDelay={1}
          className={cn("[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]", "inset-x-0 inset-y-[-20%] h-[200%] skew-y-6 ")}
        />

        <div className="hidden md:flex flex-col justify-start gap-3 p-4">
          <Skeleton className={cn("h-4 w-16")} />
          <Skeleton className={cn("h-4 w-16")} />
          <Skeleton className={cn("h-4 w-16")} />
          <Skeleton className={cn("h-4 w-16")} />
          <Skeleton className={cn("h-4 w-16")} />
          <Skeleton className={cn("h-4 w-16")} />
          <Skeleton className={cn("h-4 w-16")} />
          <Skeleton className={cn("h-4 w-16")} />
          <Skeleton className={cn("h-4 w-16")} />
        </div>

        <div className="flex flex-col">
          <div className="p-4 md:p-10">
            <DashBoardLogo />
          </div>
          {/* <div className="p-4 md:p-8 mt-5">
            <QuickTables />
          </div> */}
        </div>
        <div className=" md:w-[500px] ms-auto p-4 md:p-8 space-y-8">
          <TableAnalytics />
          <RecentActivitiesCards />
        </div>
      </div>
    </div>
  );
};

export default LandingPageTableLayout;
