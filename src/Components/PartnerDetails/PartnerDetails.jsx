import { useQuery } from "@tanstack/react-query";
import { Button, Dialog } from "@material-tailwind/react";
import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import PartnerDetailsSkeletonLoader from "./PartnerDetailsSkeletonLoader";

const PartnerDetails = () => {
  let axios = useAxios();

  let { data: restaurants = [], isLoading: isRestaurantsLoading } = useQuery({
    queryKey: ["restaurantDetails"],
    queryFn: async () => {
      let res = await axios.get(`/restaurants-and-details`).then();
      return res.data;
    },
  });

  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [offeredFoods, setOfferedFoods] = useState([]);

  const handleOpen = (details) => {
    setOpen(!open);
    setDetails(details);
  };

  if (isRestaurantsLoading) {
    return <PartnerDetailsSkeletonLoader />;
  }

  return (
    <div>
      <div>
        <div className="">
          <section className="antialiased text-gray-600 mt-5">
            <div className="flex flex-col h-full ">
              <div className="w-full bg-gray-200 shadow-lg rounded-sm border border-gray-200">
                <div className="p-3">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full ">
                      <thead className="text-md font-semibold uppercase text-white bg-[#0866ff]">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center capitalize">
                              Name
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold capitalize text-center">
                              Total Foods
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center capitalize">
                              Action
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {restaurants.map((item, index) => (
                          <tr key={index}>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 mr-2 sm:mr-3">
                                  <img
                                    className="w-20 h-20 rounded-full border-2 border-blue-600"
                                    src={item.restaurant.thumbnail}
                                  />
                                </div>
                                <div className="font-bold text-xl text-gray-800">
                                  {item.restaurant.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center text-xl font-bold text-gray-800">
                                {item.foods.length}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center font-medium text-green-500">
                                <Button
                                  className="bg-[#0866ff]"
                                  onClick={() => {
                                    handleOpen(item.restaurant);
                                    setOfferedFoods(item.foods);
                                  }}
                                >
                                  See Details
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modal to see details */}
      <Dialog open={open} size="md" handler={handleOpen}>
        <div className="my-5">
          <div className="flex flex-col items-center">
            <span className="text-3xl text-black">
              Foods that{" "}
              <span className="text-blue-600 italic">{details.name}</span>{" "}
              offers
            </span>

            <div>
              {offeredFoods.length === 0 ? (
                <div>
                  <h1 className="mt-8 text-xl text-red-500">
                    No foods offered by {details.name} yet!!
                  </h1>
                </div>
              ) : (
                <>
                  <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                    {offeredFoods.map((item, index) => (
                      <div
                        key={index}
                        className="mt-4 border-2 border-blue-500 rounded-lg p-2"
                      >
                        <div className="">
                          <img
                            className="mb-3 w-20 h-20 object-cover rounded-full shadow-lg mx-auto"
                            src={item.image}
                          />
                        </div>

                        <div>
                          <h1 className="text-center text-black">
                            {item.name}
                          </h1>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PartnerDetails;
