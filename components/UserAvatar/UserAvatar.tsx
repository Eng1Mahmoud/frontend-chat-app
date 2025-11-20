import { fetchApi } from "@/utils/apiFetch";
import { AvatarUI } from "./AvataUI";
import { Iuser } from "@/types/apiFetch";

const UserAvatar = async () => {
  const res = (await fetchApi({
    endpoint: "/users/profile",
    method: "GET",
  })) as { data: { user: Iuser } };
  const user = res.data?.user;

  return <AvatarUI user={user} />;
};

export default UserAvatar;
