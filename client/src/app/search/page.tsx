"use client";
import React, { useEffect, useState } from "react";
import { useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
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
  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500 //this will prevent overloading: we dont want to search on every letter
  );
  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);
  return (
    <div className="p-8 ">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occured while fetching search results</p>}
        {!isLoading && !isError && searchResults && (
          // this is where we add our search results
          <div>
            {searchResults.task && searchResults.task?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {searchResults.task?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {/* FOR PROJECTS */}
            {searchResults.project && searchResults.project?.length > 0 && (
              <h2>Proejcts</h2>
            )}
            {searchResults.project?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* USER  */}
            {/* FOR PROJECTS */}
            {searchResults.users && searchResults.users?.length > 0 && (
              <h2>User</h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
