import { getMe } from "@/actions/users/getMe";
import UsersPage from "@/components/Users/UsersPage";

export default async function Users() {
  const me = await getMe();

  return <UsersPage me={me} />;
}
