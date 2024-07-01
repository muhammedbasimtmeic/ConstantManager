import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("hit");
  try {
    const sideBarData = [
      {
        title: "Engineering",
        id: "engineering",
        description: "Contain Contants Related to Enginering",
        icon: "atom",
        tables: [
          {
            id: 1,
            name: "MFG Constants",
            desc: "MFG Equipment constants",
            tableName: "m_MFGContants",
            schemaName: "public",
            dbName: "TMDB",
            icon: "cat",
          },
          {
            id: 2,
            name: "FDT Constants",
            desc: "FDT Equipment constants",
            tableName: "m_FDTContants",
            schemaName: "public",
            dbName: "TMDB",
            icon: "dog",
          },
          {
            id: 3,
            name: "Equipment Master",
            desc: "Equipment List of HSM",
            tableName: "m_Equipments",
            schemaName: "plant",
            dbName: "TMDB",
            icon: "egg",
          },
        ],
      },
      {
        title: "Limits",
        id: "limits",
        description: "Tables related to the threshold",
        icon: "apple",
        tables: [
          {
            id: 4,
            name: "Vibration Alarm limit",
            desc: "Vibration of Equipment threshold",
            tableName: "m_VibThreshold",
            schemaName: "public",
            dbName: "CST_MGR",
            icon: "shell",
          },
          {
            id: 5,
            name: "VIB Constants",
            desc: "Vibration Contants",
            tableName: "m_VibEquipments",
            schemaName: "public",
            dbName: "TMDB",
            icon: "worm",
          },
        ],
      },
      {
        title: "Types",
        id: "types",
        description: "Tables related to the threshold",
        icon: "folder",
        tables: [
          {
            id: 6,
            name: "Vibration Alarm limit",
            desc: "Vibration of Equipment threshold",
            tableName: "m_VibThreshold",
            schemaName: "public",
            dbName: "CST_MGR",
            icon: "",
          },
          {
            id: 7,
            name: "VIB Constants",
            desc: "Vibration Contants",
            tableName: "m_VibEquipments",
            schemaName: "public",
            dbName: "TMDB",
            icon: "",
          },
        ],
      },
      {
        title: "Assets",
        id: "asset",
        description: "Tables related to the Assets managment",
        icon: "file",
        tables: [
          {
            id: 8,
            name: "Asset List",
            desc: "List of Asset",
            tableName: "m_AssetList",
            schemaName: "public",
            dbName: "CST_MGR",
            icon: "",
          },
          {
            id: 9,
            name: "Asset Types",
            desc: "Type of Asset",
            tableName: "m_AssetTypes",
            schemaName: "public",
            dbName: "TMDB",
            icon: "",
          },
        ],
      },
    ];

    return NextResponse.json(sideBarData);
  } catch (error) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
