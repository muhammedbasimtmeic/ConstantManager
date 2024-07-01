import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Table2, User } from "lucide-react";
import { formatDistance } from "date-fns";

const RecentActivitiesCards = () => {
  const activities = [
    {
      timestamp: "2022-01-20T01:06:48Z",
      user: "Basim",
      table: "m_Constants",
      messge: "Column 'm_Target' value updated ot 1.5 from 1.4",
    },
    {
      timestamp: "2022-01-20T01:06:48Z",
      user: "Saran",
      table: "m_Constants",
      messge: "Column valure updated",
    },
    {
      timestamp: "2024-01-20T01:06:48Z",
      user: "Saran",
      table: "m_Constants",
      messge: "Column valure updated",
    },
    {
      timestamp: "2024-01-20T01:06:48Z",
      user: "Saran",
      table: "m_Constants",
      messge: "Column valure updated",
    },
    {
      timestamp: "2024-01-20T01:06:48Z",
      user: "Saran",
      table: "m_Constants",
      messge: "Column valure updated",
    },
    {
      timestamp: "2024-01-20T01:06:48Z",
      user: "Saran",
      table: "m_Constants",
      messge: "Column valure updated",
    },
    {
      timestamp: "2024-01-20T01:06:48Z",
      user: "Saran",
      table: "m_Constants",
      messge: "Column valure updated",
    },
  ];

  return (
    <div className="">
      <div className="flex items-center z-40 text-blue-500">
        <Activity className="w-6 h-6 mr-2" />
        <p className="font-semibold"> Recent Activities</p>
      </div>
      <div className="space-y-2 h-[450px] overflow-auto mt-2">
        {activities.map((activity, index) => (
          <Card
            className="w-full items-center rounded-sm opacity-80 bg-gradient-to-tr from-zinc-200 to-zinc-300 border transition-all hover:cursor-pointer hover:opacity-100"
            key={index}
          >
            <CardHeader className="p-3 items-stretch justify-between">
              <div className="flex items-center text-sky-800">
                <Table2 className="w-5 h-5 mr-2" />
                <CardTitle className="">{activity.table}</CardTitle>
              </div>
              <p className=" font-medium text-sm self-start text-zinc-500">{formatDistance(new Date(activity.timestamp), new Date())}</p>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <p className="capitalize font-semibold">{activity.user}</p>
              </div>
              <p className="capitalize text-sm">{activity.messge}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentActivitiesCards;
