import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import qs from "query-string";

interface useGetTableMetaQueryProps {
  tableId: string;
  enabled?: boolean;
}

const useGetTableMetaQuery = ({ tableId, enabled = true }: useGetTableMetaQueryProps) => {
  const queryClient = useQueryClient();
  const fetchTableMetaData = async (tableId: string) => {
    const url = qs.stringifyUrl(
      {
        url: "/api/tableMeta",
        query: {
          tableId,
        },
      },
      { skipNull: true }
    );

    try {
      const res = await axios.get(url);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error("Network response was not ok");
    }
  };

  // Queries
  const { isSuccess, isPending, isError, data, error } = useQuery({
    queryKey: ["tableMeta", tableId],
    queryFn: () => fetchTableMetaData(tableId),
    staleTime: Infinity,
    refetchInterval: false,
    enabled,
  });

  return { isSuccess, isPending, isError, data, error };
};

export default useGetTableMetaQuery;
