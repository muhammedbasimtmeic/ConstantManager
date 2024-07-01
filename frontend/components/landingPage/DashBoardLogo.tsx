import { DatabaseZap } from "lucide-react";
import TypingAnimation from "../magicui/TypingAnimation";
import BlurIn from "../magicui/BlurIn";

const DashBoardLogo = () => {
  return (
    <>
      <div>
        <DatabaseZap className="w-8 h-8 md:w-16 md:h-16 text-orange-500" />
        <TypingAnimation
          className="font-bold py-2 md:text-6xl text-3xl bg-gradient-to-r from-orange-500 to-amber-400 text-transparent bg-clip-text whitespace-nowrap tracking-tight"
          text="Constant Manager"
          duration={100}
        />
        {/* <h1 className="font-bold py-2 text-6xl bg-gradient-to-r from-orange-500 to-amber-400 text-transparent bg-clip-text whitespace-nowrap tracking-tight">
          Constants Manager
        </h1> */}
      </div>
      {/* <p className="font-normal text-xl text-zinc-700 line-clamp-2 m-3">
        Manage you constants table effortlessly. <br />
        Add, Edit, Delete and backup constants Table.{" "}
      </p> */}
      <BlurIn word="Manage you constants table effortlessly." className="font-normal text-base md:text-xl text-zinc-700" />
      <BlurIn word="Add, Edit, Delete and backup constants Table." className="font-normal text-base md:text-xl text-zinc-700" />
    </>
  );
};

export default DashBoardLogo;
