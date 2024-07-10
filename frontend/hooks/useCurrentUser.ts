import { useSession } from "next-auth/react";

const useCurrentUser = () => {
  const { data: sesssion } = useSession();
  const user = sesssion?.user;
  return user;
};

export default useCurrentUser;
