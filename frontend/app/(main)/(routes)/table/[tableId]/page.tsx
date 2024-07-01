"use client";
import { createColumnDef } from "@/components/datatable/Columns";
import DataTable from "@/components/datatable/DataTable";
import TableSkeleton from "@/components/datatable/TableSkelaton";
import TableHeaderSection from "@/components/datatable/TableHeaderSection";
import useGetTableMetaQuery from "@/hooks/useGetTableMetaQuery";
import useGetTableDataQuery from "@/hooks/useGetTableDataQuery";
import { useParams } from "next/navigation";
import useGetSideBarQuery from "@/hooks/useGetSideBarQuery";

const getCurrentTable = (data: SidebarData | undefined, tableId: string): SideBarTableData | undefined => {
  return data?.flatMap((sidebarGroup) => sidebarGroup.tables).find((table) => table.id == tableId);
};

export default function ConstantTable() {
  const params: { tableId: string } = useParams();
  const { data: sidebarData, isSuccess: isSidebarDataLoaded } = useGetSideBarQuery();
  const tableInfo = getCurrentTable(sidebarData, params.tableId);

  const {
    isSuccess: tableMetaLoaded,
    isPending: tableMetaLoading,
    data: columnDefData,
  } = useGetTableMetaQuery({ tableId: params.tableId, enabled: !!isSidebarDataLoaded });

  const {
    isSuccess: tableDataLoaded,
    isPending: tableDataLoading,
    data: tableData,
  } = useGetTableDataQuery({ tableId: params.tableId, enabled: !!isSidebarDataLoaded });

  const columns = createColumnDef(columnDefData);
  return (
    <div className="p-5 w-full space-y-8">
      <TableHeaderSection
        tableName={tableInfo?.tableName}
        schemaName={tableInfo?.schemaName}
        dbName={tableInfo?.dbName}
        tableComment={tableInfo?.desc}
      />
      {(tableMetaLoading || tableDataLoading) && <TableSkeleton rows={8} cols={7} />}
      {tableMetaLoaded && tableDataLoaded && <DataTable data={tableData} columns={columns} />}
    </div>
  );
}
