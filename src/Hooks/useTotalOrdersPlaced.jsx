import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useTotalOrdersPlaced = () => {
  let axios = useAxios();

  let { data = [], isLoading: isTotalOrdersLoading } = useQuery({
    queryKey: ["totalOrders"],
    queryFn: async () => {
      let res = await axios.get(`/all-orders`).then();
      return res.data;
    },
  });

  let totalOrders = [data?.length, isTotalOrdersLoading];

  return totalOrders;
};

export default useTotalOrdersPlaced;
