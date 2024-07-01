import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import qs from "query-string";

const useGetSideBarQuery = () => {
  const queryClient = useQueryClient();

  const fetchTableData = async (): Promise<SidebarData> => {
    const url = qs.stringifyUrl({
      url: "http://127.0.0.1:8000/sidebar/renderList",
    });

    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error("Network response was not ok");
    }
  };

  // Queries
  const { isSuccess, isPending, isError, data, error } = useQuery({
    queryKey: ["sideBarList"],
    queryFn: fetchTableData,
    initialData: () => queryClient.getQueryData(["sideBarList"]),
    refetchInterval: false,
    staleTime: Infinity,
  });

  return { isSuccess, isPending, isError, data, error };
};

export default useGetSideBarQuery;
