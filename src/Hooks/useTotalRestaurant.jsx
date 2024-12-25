import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useTotalRestaurant = () => {
  let axios = useAxios();

  let { data = [], isLoading: isTotalRestaurantLoading } = useQuery({
    queryKey: ["totalRestaurants"],
    queryFn: async () => {
      let res = await axios.get(`/restaurants`).then();
      return res.data;
    },
  });

  let totalRestaurants = [data?.length, isTotalRestaurantLoading];

  return totalRestaurants;
};

export default useTotalRestaurant;
