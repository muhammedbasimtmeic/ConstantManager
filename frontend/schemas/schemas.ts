import dynamicIconImports from "lucide-react/dynamicIconImports";
import { object, string, array, number } from "zod";
const iconNames = Object.keys(dynamicIconImports) as (keyof typeof dynamicIconImports)[];

export const signInSchema = object({
  email: string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
  password: string({ required_error: "Password is required" }).max(32, "Password must be less than 32 characters"),
});

export const registerSchema = object({
  name: string({ required_error: "Email is required" }).min(1, "Name is required").max(20, "Name can be maiximum 20 characters"),
  email: string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be minimum 8 characters")
    .max(32, "Password must be maximum 32 characters"),
  confirmPassword: string({ required_error: "Password is required" }),
  image: string(),
}).refine((value) => value.password === value.confirmPassword, { message: "Passwords must match", path: ["confirmPassword"] });

export const sidebarTableItemSchema = object({
  name: string({ required_error: "Table name is required" }).min(1, "Table name is required").max(20, "Name can be maiximum 20 characters"),
  tableName: string({ required_error: "tableName is required" }).min(1, "tableName is required"),
  schemaName: string({ required_error: "Schema name is required" }).min(1, "Schema is required"),
  dbName: string({ required_error: "DB name is required" }).min(1, "DB name is required"),
  description: string({ required_error: "Describtion is required" }).min(1, "Describtion is required"),
  icon: string().optional(),
  groupId: string().optional(),
  columnsList: string().array().optional(),
  keyColumns: string().array().optional(),
  editableColumns: string().array().optional(),
});
