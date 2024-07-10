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

interface UserProfile {
  name: string;
  email: string;
  role: "ADMIN" | "MODERATOR" | "USER";
  image: string | null;
}
interface SidebarGroupEdit {
  id: string;
  title: string;
  description: string;
  icon: string;
}
interface SidebarTableEdit {
  name: string;
  tableName: string;
  schemaName: string;
  dbName: string;
  description: string;
  icon: string;
  groupId: number | 99;
  columnsList: string[] | [];
  keyColumns: string[] | [];
  editableColumns: string[] | [];
}
