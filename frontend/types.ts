type columnDefnitionType = {
  title: string;
  id: string;
  description?: string;
  dataType: "text" | "number" | "boolean" | "datetime" | "time" | "date";
  isPrimaryKey: boolean;
  constrains?: string[];
  min?: number;
  max?: number;
};

interface SideBarTableData {
  id: string;
  name: string;
  description: string;
  tableName: string;
  schemaName: string;
  dbName: string;
  icon: string | null;
}

interface SidebarItem {
  title: string;
  id: string;
  description: string;
  icon: string | null;
  tables: SideBarTableData[];
}

type SidebarData = SidebarItem[];
