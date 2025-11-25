"use client";
import { useEffect } from "react";
import { getUserAction } from "@/actions/getUserAction";
import { useChat } from "@/context/ChatProvider";
const GetLogdinUser =  () => {
  const { changedLogedinUser } = useChat() || {};
  useEffect( () => {
    // get logdin user 
    const fetchUser = async () => {
      const user = await getUserAction();
      changedLogedinUser?.(user);
    };

    fetchUser();
  }, []);
  return null;
};

export default GetLogdinUser;
