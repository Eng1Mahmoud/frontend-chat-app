"use server";

import { Iuser } from "@/types/apiFetch";
import { fetchApi } from "@/utils/apiFetch";

export const getUserAction = async () => {
  const res = (await fetchApi({
    endpoint: "/users/profile",
    method: "GET",
  })) as { data: { user: Iuser } };
  const user = res.data?.user;
  return user;
};
