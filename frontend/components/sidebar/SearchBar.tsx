"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { LoaderCircle, Search, X } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const highlightKeyword = (text: string, keyword: string, highlightColor: string) => {
  const parts = text.split(new RegExp(`(${keyword})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={index} style={{ color: highlightColor }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SideBarTableData[]>([]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchInput) {
        setIsLoading(true);

        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/sidebar/items?search=${searchInput}`)
          .then((response) => {
            setResults(response.data);
            console.log(results);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);

            console.error("Error fetching search results:", error);
          });
      } else {
        setResults([]);
      }
    }, 300); // 300ms debounce times

    return () => clearTimeout(debounce);
  }, [searchInput]);

  return (
    <div className="relative w-[550px] z-20">
      <Input
        value={searchInput}
        type="text"
        className="relative w-full px-10 py-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-zinc-200"
        placeholder="Search for Table..."
        onChange={handleSearch}
        onBlur={() => setSearchInput("")}
      />
      {searchInput ? (
        <X className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2" />
      ) : (
        <Search className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2" />
      )}

      {searchInput && (
        <ul className="absolute w-full divide-y divide-gray-200 bg-zinc-100 dark:bg-zinc-800 shadow-md mt-1 max-h-96 overflow-y-auto py-2 snap-start rounded-md [&>li]:rounded-md">
          {isLoading ? (
            <li className="font-semibold text-sm flex text-zinc-600 justify-center items-center gap-1 ">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Loading...
            </li>
          ) : (
            <>
              {results.length > 0 ? (
                <li className="font-medium text-sm flex text-zinc-600 justify-center items-center gap-1">
                  <p>{results.length} Matches found</p>
                </li>
              ) : (
                <li className="font-medium text-sm flex text-zinc-600 justify-center items-center gap-1">
                  <p>No result found</p>
                </li>
              )}
              {results.map((result, index) => (
                <li key={index} className="">
                  <Link
                    className="flex items-center p-2 px-4 border-gray-200 dark:border-zinc-700 hover:bg-zinc-300 hover:shadow-sm hover:cursor-pointer"
                    href={`/table/${result.id}`}
                  >
                    <Icon name={result.icon as keyof typeof dynamicIconImports} className="w-8 h-8 text-orange-600" />
                    <div className="p-2">
                      <p className="font-semibold text-sm tracking-tight text-zinc-700">{highlightKeyword(result.name, searchInput, "blue")}</p>
                      <p className="font-medium text-sm text-zinc-500">{highlightKeyword(result.description, searchInput, "blue")}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
