"use server";

import { fetchApi } from "@/utils/apiFetch";
import { IMessage } from "@/types/apiFetch";

export async function getMessagesAction(userId: string) {
  return await fetchApi<IMessage[], null>({
    endpoint: `/messages/${userId}`,
    method: "GET",
  });
}
