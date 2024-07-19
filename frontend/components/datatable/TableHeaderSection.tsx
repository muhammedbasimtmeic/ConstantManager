import { useState } from "react";
import React from "react";
import { Edit, Ellipsis } from "lucide-react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import TableComments from "./TableComments";

interface TableHeaderSectionProps {
  tableName: string | undefined;
  schemaName: string | undefined;
  dbName: string | undefined;
}

const TableHeaderSection = ({ tableName, schemaName, dbName }: TableHeaderSectionProps) => {
  return (
    <div className="w-1/2 flex flex-col space-y-2">
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
      <TableComments tableName={tableName} schemaName={schemaName} dbName={dbName} />
    </div>
  );
};

export default TableHeaderSection;
