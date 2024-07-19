import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const columnDefnitionArray: columnDefnitionType[] = [
      {
        title: "ID",
        id: "id",
        description: "Person ID",
        dataType: "number",
        constrains: [],
        isPrimaryKey: true,
      },
      {
        title: "First Name",
        id: "first_name",
        description: "Fisrt Name of the person",
        dataType: "text",
        constrains: [],
        isPrimaryKey: true,
      },
      {
        title: "Last Name",
        id: "last_name",
        dataType: "text",
        constrains: [],
        isPrimaryKey: false,
      },
      {
        title: "Email Address",
        id: "email",
        dataType: "text",
        constrains: [],
        isPrimaryKey: true,
      },
      {
        title: "Age",
        id: "age",
        dataType: "number",
        constrains: [],
        isPrimaryKey: false,
      },
      {
        title: "Gender",
        id: "gender",
        dataType: "text",
        constrains: ["Male", "Female"],
        isPrimaryKey: false,
      },
      {
        title: "Active",
        id: "active",
        dataType: "boolean",
        constrains: [],
        isPrimaryKey: false,
      },
      {
        title: "Date Of Birth",
        id: "date_of_birth",
        dataType: "date",
        constrains: [],
        isPrimaryKey: false,
      },
      {
        title: "Company",
        id: "company",
        dataType: "text",
        constrains: [],
        isPrimaryKey: false,
      },
      {
        title: "Entry Time",
        id: "entryTime",
        dataType: "time",
        constrains: [],
        isPrimaryKey: false,
      },
      {
        title: "TimeStamp",
        id: "timestamp",
        dataType: "datetime",
        constrains: [],
        isPrimaryKey: false,
      },
    ];

    return NextResponse.json(columnDefnitionArray);
  } catch (error) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
