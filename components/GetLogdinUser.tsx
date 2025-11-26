"use client";
import { useEffect } from "react";
import { getUserAction } from "@/actions/getUserAction";
import { useChat } from "@/context/ChatProvider";
import { usePathname } from "next/navigation";

const GetLogdinUser = () => {
  const { logedinUser, changedLogedinUser } = useChat() || {};
  const pathname = usePathname();
  useEffect(() => {
    // Only fetch if we don't have the user yet
    if (logedinUser) return;

    // get logdin user
    const fetchUser = async () => {
      const user = await getUserAction();
      changedLogedinUser?.(user);
    };

    fetchUser();
  }, [pathname, logedinUser]);
  return null;
};

export default GetLogdinUser;
