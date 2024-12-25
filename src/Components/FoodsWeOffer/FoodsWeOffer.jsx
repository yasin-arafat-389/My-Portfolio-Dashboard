import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { authContext } from "../../Contexts/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import FoodsWeOfferSkeletonLoader from "./FoodsWeOfferSkeletonLoader";

const FoodsWeOffer = () => {
  let { user } = useContext(authContext);
  let axios = useAxios();
  let navigate = useNavigate();

  let { data: myOfferedFoods = [], isLoading: myOfferedFoodsLoading } =
    useQuery({
      queryKey: ["myOfferedFoods"],
      queryFn: async () => {
        let res = await axios
          .get(`/offered/foods?restaurant=${user.displayName}`)
          .then();
        return res.data;
      },
    });

  if (myOfferedFoodsLoading) {
    return (
      <div className="mt-12">
        <FoodsWeOfferSkeletonLoader />
      </div>
    );
  }

  return (
    <div>
      {myOfferedFoods.length === 0 ? (
        <div>
          <div className="flex flex-col gap-7 mt-5 py-10 rounded-lg bg-gray-200">
            <div className="flex flex-col justify-center items-center">
              <div className="bg-gray-400 p-8 rounded-full shadow-lg shadow-blue-400">
                <img
                  src="https://i.ibb.co/yhD66pK/burger.png"
                  className="w-[100px]"
                />
              </div>

              <h1 className="text-4xl font-bold mt-9 italic text-gray-700">
                You are not offering any food yet!!
              </h1>
            </div>
            <Button
              className="w-[50%] mx-auto capitalize text-lg bg-blue-600"
              onClick={() => navigate("/restaurant/dashboard/add-new-food")}
            >
              Add a new food
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {myOfferedFoods.map((item, index) => (
                <div
                  key={index}
                  className="w-full h-70 py-6 px-4 bg-gray-800 rounded-3xl text-neutral-300 flex flex-col items-start justify-center gap-3 hover:shadow-2xl hover:shadow-sky-400 transition-shadow"
                >
                  <div className="w-full h-40 bg-sky-300 rounded-2xl">
                    <img
                      src={item.image}
                      className="w-full h-[150px] object-cover rounded-lg"
                    />
                  </div>
                  <div className="">
                    <p className="font-extrabold text-white">{item.name}</p>
                  </div>
                  <Link to={"/restaurant/dashboard/my-foods"}>
                    <Button className="bg-blue-500">See more</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodsWeOffer;
