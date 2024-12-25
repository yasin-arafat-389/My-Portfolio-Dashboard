import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";

const useTotalOrders = () => {
  let axios = useAxios();
  let { user } = useContext(authContext);

  let { data = [], isLoading: isTotalOrdersPlacedLoading } = useQuery({
    queryKey: ["totalOrdersPlacedFilteredByRestaurant"],
    queryFn: async () => {
      let res = await axios
        .get(`/all-orders/partner?name=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  let total = data.regularOrders?.length + data.customOrders?.length;

  let totalOrders = [total, isTotalOrdersPlacedLoading];

  return totalOrders;
};

export default useTotalOrders;
