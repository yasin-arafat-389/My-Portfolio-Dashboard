import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  let { user } = useContext(authContext);

  let { data = [], isLoading: isAdminLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      let res = "admin";
      return res;
    },
  });

  let userRole = [data, isAdminLoading];

  return userRole;
};

export default useRole;
