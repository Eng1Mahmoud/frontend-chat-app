import { fetchApi } from "@/utils/apiFetch";
import { LogdinUserUI } from "./LogdinUserUI";
import { Iuser } from "@/types/apiFetch";

const LogdinUser = async () => {
  const res = (await fetchApi({
    endpoint: "/users/profile",
    method: "GET",
  })) as { data: { user: Iuser } };
  const user = res.data?.user;

  return <LogdinUserUI user={user} />;
};

export default LogdinUser;
