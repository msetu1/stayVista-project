import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // fetch user info using logged in user db
  const { data: role = {}, isLoading } = useQuery({
    queryKey: ["role"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data.role;
    },
  });

  return [role, isLoading];
};
