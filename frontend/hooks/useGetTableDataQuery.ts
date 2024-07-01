import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import qs from "query-string";

interface useGetTableDataQueryProps {
  tableId: string;
  enabled?: boolean;
}

const useGetTableDataQuery = ({ tableId, enabled = true }: useGetTableDataQueryProps) => {
  // Access the client
  const queryClient = useQueryClient();

  const fetchTableData = async (tableId: string) => {
    const url = qs.stringifyUrl(
      {
        url: "/api/tableData",
        query: {
          tableId,
        },
      },
      { skipNull: true }
    );

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
    queryKey: ["tableData", tableId],
    queryFn: () => fetchTableData(tableId),
    refetchInterval: false,
    staleTime: Infinity,
    enabled,
  });

  return { isSuccess, isPending, isError, data, error };
};

export default useGetTableDataQuery;
