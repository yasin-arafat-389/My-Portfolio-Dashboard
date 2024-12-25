import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";

const useTotalOrdersDelivered = () => {
  let axios = useAxios();
  let { user } = useContext(authContext);

  let { data = [], isLoading: isTotalOrdersDeliveredLoading } = useQuery({
    queryKey: ["totalOrdersDelivered"],
    queryFn: async () => {
      let res = await axios
        .get(`/orders-delivered/total?name=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  let total =
    data.totalRegularOrdersDelivered?.length +
    data.totalCustomOrdersDelivered?.length;

  let totalRestaurants = [total, isTotalOrdersDeliveredLoading];

  return totalRestaurants;
};

export default useTotalOrdersDelivered;
