"use client";

import { useQuery } from "@tanstack/react-query";

import { getUsers } from "~/features/admin/api/getUsers";
import { AdminQueryKeys } from "./keys";

export function useGetUsersQuery() {
  return useQuery({
    queryKey: AdminQueryKeys.users,
    queryFn: getUsers,
  });
}
