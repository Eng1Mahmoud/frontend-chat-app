import { Iuser } from "@/types/apiFetch";
import { fetchApi } from "@/utils/apiFetch";
import UserListUI from "./UserListUI";
const UserList = async () => {
  type UsersResponse = { data: { users: Iuser[] } };
  const res = (await fetchApi({
    endpoint: "/users/",
    method: "GET",
  })) as UsersResponse;
  const users = res.data?.users || [];

  return <UserListUI users={users} />;
};

export default UserList;
