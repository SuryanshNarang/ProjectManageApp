"use client";
import React, { useState } from "react";
import { useSearchQuery } from "@/state/api";
// No need of props as this is a new page for nextjs
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //   searchTerm is likely a variable that holds the term or query string entered by a user for searching tasks, projects, or users.
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, { skip: searchTerm.length < 3 });
//   we are going to use Debouncing installed a package for it lodash
  const handleSearch= de
  return <div>Search</div>;
};

export default Search;
