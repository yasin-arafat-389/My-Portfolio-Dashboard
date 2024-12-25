import { useContext } from "react";
import { authContext } from "../../../Contexts/AuthContext";
import Loader from "../../../Utilities/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";

const ManageReviews = () => {
  const { user } = useContext(authContext);
  let axios = useAxios();

  const { data = [], isLoading } = useQuery({
    queryKey: ["reviewsForVendor"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/reviews/for-vendor?restaurant=${user?.displayName}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Manage Reviews</h2>

      {data?.length === 0 ? (
        <div className="text-center text-lg font-medium text-gray-600">
          No reviews yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.map((review) => (
            <div
              key={review._id}
              className="border border-gray-300 p-4 rounded-lg shadow-md bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.profileImage}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg">{review.userName}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              <p className="text-gray-800 mb-4">{review.review}</p>
              <div className="text-teal-500 font-bold">
                Rating: {review.rating}/5
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
