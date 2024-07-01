import { FastForwardIcon } from "lucide-react";

const QuickTables = () => {
  return (
    <>
      <div className="flex items-center z-40 text-blue-500">
        <FastForwardIcon className="w-6 h-6 mr-2" />
        <p className="font-semibold"> Quick Links</p>
      </div>
      {/* <div className="">
        <p>
          Total Tables : <CountUp start={0} end={100} />
        </p>
      </div> */}
    </>
  );
};

export default QuickTables;
