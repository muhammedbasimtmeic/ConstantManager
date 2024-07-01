import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import React from "react";
import { Edit, Ellipsis } from "lucide-react";
import Link from "next/link";

interface TableHeaderSectionProps {
  tableName: string | undefined;
  schemaName: string | undefined;
  dbName: string | undefined;
  tableComment?: string;
}
const TableHeaderSection = ({ tableName, schemaName, dbName, tableComment }: TableHeaderSectionProps) => {
  const [comment, setComment] = useState(tableComment);
  const [isEdited, setIsEdited] = useState(false);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="hover:text-orange-600 font-semibold">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/" className="hover:text-orange-600 font-semibold">
              {dbName ? dbName : <Ellipsis className="w-4 h-4 animate-pulse" />}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/" className="hover:text-orange-600 font-semibold">
              {schemaName ? schemaName : <Ellipsis className="w-4 h-4 animate-pulse" />}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="hover:text-orange-600 font-semibold">
              {tableName ? tableName : <Ellipsis className="w-4 h-4 animate-pulse" />}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-semibold text-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-500 inline-block text-transparent bg-clip-text w-fit p-1">
        {tableName ? tableName : "Loading..."}
      </h1>
      <div className="flex gap-2 relative">
        <Input
          className="border-none bg-zinc-200/70 text-zinc-500  focus-visible:ring-0 focus-visible:ring-offset-0 w-96 px-8"
          value={comment}
          placeholder="Table Comment"
          onChange={(e) => {
            setComment(e.target.value);
            if (e.target.value == tableComment) {
              setIsEdited(false);
            } else {
              setIsEdited(true);
            }
          }}
        />
        <Edit className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-2 text-zinc-600" />
        {isEdited && (
          <Button type="submit" onClick={(e) => handleSubmit(e)}>
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default TableHeaderSection;
