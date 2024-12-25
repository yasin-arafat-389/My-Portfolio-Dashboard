import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";

const useDeliveryArea = () => {
  let axios = useAxios();
  let { user } = useContext(authContext);

  let { data = [], isLoading: isDeliveryAreaLoading } = useQuery({
    queryKey: ["deliveryArea"],
    queryFn: async () => {
      let res = await axios
        .get(`/delivery-area?name=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  let totalEarned = [data, isDeliveryAreaLoading];

  return totalEarned;
};

export default useDeliveryArea;
