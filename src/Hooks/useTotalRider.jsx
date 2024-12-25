import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useTotalRider = () => {
  let axios = useAxios();

  let { data = [], isLoading: isTotalRidersLoading } = useQuery({
    queryKey: ["totalRiders"],
    queryFn: async () => {
      let res = await axios.get(`/all-riders`).then();
      return res.data;
    },
  });

  let totalRiders = [data?.length, isTotalRidersLoading];

  return totalRiders;
};

export default useTotalRider;
