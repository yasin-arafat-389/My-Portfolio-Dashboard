import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";

const useTotalEarned = () => {
  let axios = useAxios();
  let { user } = useContext(authContext);

  let { data = [], isLoading: isTotalEarnedLoading } = useQuery({
    queryKey: ["totalEarned"],
    queryFn: async () => {
      let res = await axios
        .get(`/total-earned?name=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  let totalEarned = [data.grandTotal, isTotalEarnedLoading];

  return totalEarned;
};

export default useTotalEarned;
