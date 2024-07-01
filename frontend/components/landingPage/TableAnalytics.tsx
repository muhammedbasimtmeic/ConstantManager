"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Ellipsis, Table } from "lucide-react";

const TableAnalytics = () => {
  const [count, setCount] = useState<number | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getCount"); // Adjust the URL as needed
        setCount(response.data.count);
      } catch (error) {
        console.error("Error fetching count data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="border flex items-start justify-between bg-gradient-to-r from-lime-500 to-lime-400 p-4 rounded-md shadow-md opacity-90 transition-opacity hover:opacity-100">
      <div className="flex flex-col gap-1">
        <p className="text-white text-sm font-semibold pr-2">Total Tables</p>
        {loading ? (
          <div className="text-4xl font-bold text-white">
            <Ellipsis className="w-9 h-9 animate-pulse" />
          </div>
        ) : (
          <CountUp end={count} delay={0} className="text-4xl font-bold text-white" />
        )}
      </div>
      <Table className="w-8 h-8 text-white" />
    </div>
  );
};

export default TableAnalytics;
