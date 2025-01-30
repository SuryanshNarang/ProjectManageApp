import { useGetUsersQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
// we made a backend for this. went in controller then router then index.

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode); //redux toolkit makes it so easy see here again dark mode state is managed here.
  return <div>Users</div>;
};

export default Users;
