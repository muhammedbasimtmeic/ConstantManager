"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import qs from "query-string";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Form, FormControl, FormDescription, FormField, FormMessage, FormItem, FormLabel } from "@/components/ui/form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { toast } from "sonner";
import { Key, Plus, Table2, X } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import Icon from "../Icon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sidebarTableItemSchema } from "@/schemas/schemas";
import { useState } from "react";
import useGetSideBarQuery from "@/hooks/useGetSideBarQuery";
import { cn } from "@/lib/utils";

type avbleColumnData = {
  columnName: string;
  isPrimaryKey: boolean;
};

const getDBList = async (): Promise<string[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dbinfo/dblist`);
  return res.data;
};

const getSchemaList = async (dbName: string): Promise<string[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dbinfo/schemaList`, {
    params: { dbName },
  });
  return res.data;
};

const getTableList = async (dbName: string, schemaName: string): Promise<string[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dbinfo/tableList`, {
    params: { dbName, schemaName },
  });
  return res.data;
};

const getColumnList = async (dbName: string, schemaName: string, tableName: string): Promise<avbleColumnData[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dbinfo/columnList`, {
    params: { dbName, schemaName, tableName },
  });
  return res.data;
};

const AddSidebarTableModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "AddSidebarTable";
  const [draggingOver, setDraggingOver] = useState<{ [key: string]: boolean }>({});

  const [columnsList, setColumnsList] = useState<string[]>([]);
  const [keyColumns, setKeyColumns] = useState<string[]>([]);
  const [editableColumns, setEditableColumns] = useState<string[]>([]);

  const [schemaList, setSchemaList] = useState<string[]>([]);
  const [tableList, setTableList] = useState<string[]>([]);
  const [availbleColumnList, setAvailbleColumnList] = useState<avbleColumnData[]>([]);
  const [primaryColumnList, setPrimaryColumnList] = useState<string[]>([]);

  const [fetchError, setFetchError] = useState<boolean>(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(sidebarTableItemSchema),
    defaultValues: {
      name: "",
      tableName: "",
      schemaName: "",
      dbName: "",
      description: "",
      icon: "",
      groupId: "99",
      columnsList: columnsList,
      keyColumns: keyColumns,
      editableColumns: editableColumns,
    },
  });

  // getting DatabaseList
  const {
    data: dbList,
    isPending: dbListLoading,
    isSuccess: dbListLloaded,
  } = useQuery({
    queryKey: ["dbList"],
    queryFn: getDBList,
    staleTime: Infinity,
  });

  // getting SidebarGroup List
  const { data: groups, isPending: groupsDataLoading, isSuccess: groupsDataLoaded } = useGetSideBarQuery();

  const onSubmit = async (values: z.infer<typeof sidebarTableItemSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/sidebar/item`,
      });
      console.log(values);
      await axios.post(url, values);
      toast.success(`New Sidebar Table Created Successfully - ${form.getValues("name")}`);
      queryClient.invalidateQueries({ queryKey: ["sideBarList"] });
      queryClient.invalidateQueries({ queryKey: ["ungroupedTables"] });
      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      toast.error("Failed to create new Sidebar Table");
      console.log(error);
    }
  };

  const handleDatabaseChange = async (value: string) => {
    const formData = form.getValues();
    console.log(formData);
    const data = await getSchemaList(value);
    setSchemaList(data);
    setTableList([]);
    setAvailbleColumnList([]);
  };

  const handleSchemaChange = async (value: string) => {
    const formData = form.getValues();
    console.log(formData);
    const data = await getTableList(formData.dbName, value);
    setTableList(data);
    setAvailbleColumnList([]);
  };

  const handleTableChange = async (value: string) => {
    const formData = form.getValues();
    console.log(formData);
    const data = await getColumnList(formData.dbName, formData.schemaName, value);
    setAvailbleColumnList(data);
    const primaryKeys = data.filter((col) => col.isPrimaryKey).map((col) => col.columnName);
    setPrimaryColumnList(primaryKeys);
    setColumnsList(primaryKeys);
    form.setValue("columnsList", primaryKeys);
    setKeyColumns(primaryKeys);
    form.setValue("keyColumns", primaryKeys);
    setEditableColumns([]);
  };

  const handleRemoveColumnFromDisplayList = (column: string) => {
    if (primaryColumnList.includes(column)) {
      toast.warning("Primary Key Column can't be removed");
      return;
    }
    setColumnsList((prev) => prev.filter((col) => col !== column));
  };

  const handleRemoveColumnFromKeyColumnList = (column: string) => {
    if (primaryColumnList.includes(column)) {
      toast.warning("Primary Key Column can't be removed");
      return;
    }
    setKeyColumns((prev) => prev.filter((col) => col !== column));
  };

  const handleRemoveColumnFromEditableList = (column: string) => {
    setEditableColumns((prev) => prev.filter((col) => col !== column));
  };

  const addAllToEditableColumns = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditableColumns(() => {
      const cols = availbleColumnList.filter((col) => col.isPrimaryKey == false).map((col) => col.columnName);
      form.setValue("editableColumns", cols);
      return cols;
    });
  };

  const addAllToDisplayList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setColumnsList(() => {
      const cols = availbleColumnList.map((col) => col.columnName);
      form.setValue("columnsList", cols);
      return cols;
    });
  };

  const handleDrop = (type: string, columnName: string) => {
    switch (type) {
      case "displayColumns":
        if (columnsList.includes(columnName)) {
          toast.error("Already exist here");
          return;
        }
        setColumnsList((prev) => {
          const newColumns = [...prev, columnName];
          form.setValue("columnsList", newColumns, { shouldValidate: true });
          return newColumns;
        });
        break;

      case "keyColumns":
        if (keyColumns.includes(columnName)) {
          toast.error("Already exist here");
          return;
        }

        if (editableColumns.includes(columnName)) {
          toast.error("Editable column cannot be set as key");
          return;
        }
        setKeyColumns((prev) => {
          const newKeyColumns = [...prev, columnName];
          form.setValue("keyColumns", newKeyColumns, { shouldValidate: true });
          return newKeyColumns;
        });
        break;

      case "editableColumns":
        if (!columnsList.includes(columnName)) {
          toast.error("Add to Display items First to make it editable");
          return;
        }

        if (editableColumns.includes(columnName)) {
          toast.error("Already exist here");
          return;
        }

        if (keyColumns.includes(columnName)) {
          toast.error("Key Column can't be set into editable columns");
          return;
        }

        if (primaryColumnList.includes(columnName)) {
          toast.warning("Primary Key Column can't be a editable columns");
          return;
        }

        setEditableColumns((prev) => {
          const newEditableColumns = [...prev, columnName];
          form.setValue("editableColumns", newEditableColumns, { shouldValidate: true });
          return newEditableColumns;
        });

        break;
      default:
        break;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, dropZoneId: string) => {
    e.preventDefault();
    setDraggingOver((prev) => ({ ...prev, [dropZoneId]: true }));
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, dropZoneId: string) => {
    e.preventDefault();
    setDraggingOver((prev) => ({ ...prev, [dropZoneId]: true }));
  };

  const handleDragLeave = (dropZoneId: string) => {
    setDraggingOver((prev) => ({ ...prev, [dropZoneId]: false }));
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>, dropZoneId: string) => {
    e.preventDefault();
    setDraggingOver((prev) => ({ ...prev, [dropZoneId]: false }));
    const columnName = e.dataTransfer.getData("text/plain");
    handleDrop(dropZoneId, columnName);
  };

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    setAvailbleColumnList([]);
    setColumnsList([]);
    setKeyColumns([]);
    setEditableColumns([]);
    setSchemaList([]);
    setTableList([]);
    onClose();
  };

  const handleReset = () => {
    form.reset();
    setAvailbleColumnList([]);
    setColumnsList([]);
    setKeyColumns([]);
    setEditableColumns([]);
    setSchemaList([]);
    setTableList([]);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gradient-to-br from-[#ececec] via-[#e6ecf7] to-[#f6eeff] text-black overflow-hidden overflow-y-auto p-1 border-none gap-2 w-fit">
        <DialogHeader className="space-y-0 p-4 rounded-md text-zinc-700">
          <DialogTitle className="flex justify-center items-center text-2xl">
            <Table2 className="w-8 h-8 mr-4" />
            Add New Table
          </DialogTitle>
          <DialogDescription className="text-center p-2">Add new table to the sidebar here</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 p-8 gap-6 gap-y-6">
              <div className="w-[400px]">
                <div className="space-y-4">
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70">Display Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-zinc-200/60 border-zinc-400 focus-visible:ring-1 text-black focus-visible:ring-offset-0"
                            placeholder="Enter Display Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* dbName */}
                  <FormField
                    control={form.control}
                    name="dbName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Database Name</FormLabel>
                        <FormControl>
                          <Select
                            disabled={isLoading}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleDatabaseChange(value);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-zinc-200/60 border-zinc-400 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 outline-none">
                                <SelectValue placeholder="Select Database" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {dbList?.map((db) => (
                                <SelectItem key={db} value={db} className="flex gap-2">
                                  {db}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* schema name  */}
                  <FormField
                    control={form.control}
                    name="schemaName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Schema Name</FormLabel>
                        <FormControl>
                          <Select
                            disabled={isLoading}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleSchemaChange(value);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-zinc-200/60 border-zinc-400 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 outline-none">
                                <SelectValue placeholder="Select Schema" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {schemaList?.map((schema) => (
                                <SelectItem key={schema} value={schema} className="flex gap-2">
                                  {schema}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* table name  */}
                  <FormField
                    control={form.control}
                    name="tableName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Table Name</FormLabel>
                        <FormControl>
                          <Select
                            disabled={isLoading}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleTableChange(value);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-zinc-200/60 border-zinc-400 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 outline-none">
                                <SelectValue placeholder="Select Table" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tableList?.map((table) => (
                                <SelectItem key={table} value={table} className="flex gap-2">
                                  {table}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* table description name  */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Table Description</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-zinc-200/60 border-zinc-400 focus-visible:ring-1 text-black focus-visible:ring-offset-0"
                            placeholder="Enter Table Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* table icon */}
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Table icon</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              disabled={isLoading}
                              className="bg-zinc-200/60 border-zinc-400 focus-visible:ring-1 text-black focus-visible:ring-offset-0 pe-8"
                              placeholder="Table Icon"
                              {...field}
                            />
                            <Icon name={form.getValues("icon") as keyof typeof dynamicIconImports} className="w-10 h-10 text-indigo-700" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* table group  */}
                  <FormField
                    control={form.control}
                    name="groupId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Table group</FormLabel>
                        <FormControl>
                          <Select
                            disabled={isLoading}
                            onValueChange={(value) => {
                              field.onChange(value);
                              console.log("Group :", value);
                            }}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-zinc-200/60 border-zinc-400 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 outline-none">
                                <SelectValue placeholder="Select Sidebar Group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {groups?.map((sidebarGroup) => (
                                <SelectItem key={sidebarGroup.id.toString()} value={sidebarGroup.id.toString()}>
                                  <div className="flex gap-2 items-center">
                                    <Icon className="w-4 h-4" name={sidebarGroup.icon as keyof typeof dynamicIconImports} />
                                    {sidebarGroup.title}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full space-y-4">
                {/* avalilable columns */}
                <div>
                  <h1 className="font-bold text-zinc-600 text-sm">COLUMN LIST</h1>
                  <p className="font-normal text-sm text-zinc-400 py-2 tracking-tight line-clamp-2">
                    List of Columns in the selected table, Drag and Drop to the Display List
                  </p>
                  <div className="p-3 rounded-md mt-2 w-full border-dashed border-2 shadow-md  text-zinc-300 border-zinc-400 flex flex-wrap gap-3 min-h-32 max-h-32 overflow-y-scroll items-start justify-start">
                    {availbleColumnList.map((col, index) => (
                      <div
                        key={index}
                        className="text-zinc-700 font-semibold rounded-lg px-2 py-1 flex flex-shrink w-fit items-center shadow-sm border border-orange-300 bg-gradient-to-br from-zinc-200 to-zinc-50 cursor-move"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", col.columnName);
                        }}
                      >
                        {col.isPrimaryKey && <Key className="w-4 h-4 mr-3" />}
                        <p className="text-sm font-medium">{col.columnName}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Display Columns */}
                <FormField
                  control={form.control}
                  name="columnsList"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Displayed columns</FormLabel>
                        <Button variant="default" size="sm" onClick={addAllToDisplayList}>
                          Add All
                        </Button>
                      </div>
                      <FormControl>
                        <div
                          onDragOver={(e) => handleDragOver(e, "displayColumns")}
                          onDragEnter={(e) => handleDragEnter(e, "displayColumns")}
                          onDragLeave={() => handleDragLeave("displayColumns")}
                          onDrop={(e) => handleDragDrop(e, "displayColumns")}
                          className={cn(
                            "p-3 rounded-md mt-2 w-full border-dashed border-2 shadow-md  text-zinc-300 border-zinc-400 flex flex-wrap gap-3 min-h-20 max-h-24 overflow-y-scroll items-start",
                            draggingOver["displayColumns"] && "border-sky-600  bg-sky-200/50"
                          )}
                        >
                          {columnsList.length == 0 && <Plus className="w-7 h-7 text-zinc-300"></Plus>}
                          {columnsList.map((col, index) => (
                            <div
                              key={index}
                              className="text-zinc-700 font-semibold rounded-lg px-2 py-1 flex flex-shrink w-fit items-center shadow-sm border border-zinc-300 bg-gradient-to-br from-stone-200 to-stone-100"
                            >
                              <p className="text-sm font-medium">{col}</p>
                              <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => handleRemoveColumnFromDisplayList(col)} />
                            </div>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Primary Columns */}
                <FormField
                  control={form.control}
                  name="keyColumns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Key columns</FormLabel>
                      <FormControl>
                        <div
                          onDragOver={(e) => handleDragOver(e, "keyColumns")}
                          onDragEnter={(e) => handleDragEnter(e, "keyColumns")}
                          onDragLeave={() => handleDragLeave("keyColumns")}
                          onDrop={(e) => handleDragDrop(e, "keyColumns")}
                          className={cn(
                            "p-3 rounded-md mt-2 w-full border-dashed border-2 shadow-md  text-zinc-300 border-zinc-400 flex flex-wrap gap-3 min-h-20 max-h-20 overflow-y-scroll items-start",
                            draggingOver["keyColumns"] && "border-sky-600 bg-sky-200/50"
                          )}
                        >
                          {keyColumns.length == 0 && <Plus className="w-7 h-7"></Plus>}
                          {keyColumns.map((col, index) => (
                            <div
                              key={index}
                              className="text-zinc-700 font-semibold rounded-lg px-2 py-1 flex flex-shrink w-fit items-center shadow-sm border border-zinc-300 bg-gradient-to-br from-stone-200 to-stone-100"
                            >
                              <p className="text-sm font-medium">{col}</p>
                              <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => handleRemoveColumnFromKeyColumnList(col)} />
                            </div>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Editable Columns */}
                <FormField
                  control={form.control}
                  name="editableColumns"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Editable columns</FormLabel>
                        <Button variant="default" size="sm" onClick={addAllToEditableColumns}>
                          Add All
                        </Button>
                      </div>
                      <FormControl>
                        <div
                          onDragOver={(e) => handleDragOver(e, "editableColumns")}
                          onDragEnter={(e) => handleDragEnter(e, "editableColumns")}
                          onDragLeave={() => handleDragLeave("editableColumns")}
                          onDrop={(e) => handleDragDrop(e, "editableColumns")}
                          className={cn(
                            "p-3 rounded-md mt-2 w-full border-dashed border-2 shadow-md  text-zinc-300 border-zinc-400 flex flex-wrap gap-3 min-h-20 max-h-24 overflow-y-scroll  items-start",
                            draggingOver["editableColumns"] && "border-sky-600  bg-sky-200/50"
                          )}
                        >
                          {editableColumns.length == 0 && <Plus className="w-7 h-7 text-zinc-300"></Plus>}
                          {editableColumns.map((col, index) => (
                            <div
                              key={index}
                              className="text-zinc-700 font-semibold rounded-lg px-2 py-1 flex flex-shrink w-fit items-center shadow-sm border border-zinc-300 bg-gradient-to-br from-stone-200 to-stone-100"
                            >
                              <p className="text-sm font-medium">{col}</p>
                              <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => handleRemoveColumnFromEditableList(col)} />
                            </div>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="px-6 py-4">
              <Button variant="outline" type="reset" disabled={isLoading} onClick={handleReset}>
                Reset
              </Button>
              <Button variant="default" type="submit" disabled={isLoading}>
                Add Table
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSidebarTableModal;
