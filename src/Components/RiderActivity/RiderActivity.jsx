import { useContext } from "react";
import useAxios from "../../Hooks/useAxios";
import { authContext } from "../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Utilities/Loader/Loader";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const RiderActivity = () => {
  let axios = useAxios();
  let { user } = useContext(authContext);

  let { data = [], isLoading } = useQuery({
    queryKey: ["riderActivity"],
    queryFn: async () => {
      let res = await axios
        .get(`/deliveries/accepted?riderName=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="mt-10">
        <Loader />;
      </div>
    );
  }

  console.log(data);

  return (
    <div>
      <div>
        {data.length === 0 ? (
          <div>
            <div className="bg-gray-200 flex flex-col justify-center items-center mt-7 rounded-lg pb-5 pt-5">
              <div className="bg-gray-400 shadow-xl shadow-blue-300 flex justify-center items-center p-6 rounded-full">
                <img
                  src="https://i.ibb.co/jRwxsDK/no-results.png"
                  className="w-[100px]"
                />
              </div>

              <h2 className="mt-7 text-2xl font-bold text-center text-gray-800">
                You have no active delivery. Please accept a delivery <br /> to
                keep track of your activity
              </h2>

              <Link
                to={"/rider/dashboard/incoming-deliveries"}
                className="mt-7"
              >
                <Button className="capitalize text-lg bg-blue-500">
                  Accept Delivery
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-col gap-5">
              {data.map((item, index) => (
                <div className="relative" key={index}>
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                  <div className="relative p-6 bg-white border-2 border-indigo-500 rounded-lg">
                    <h1 className="text-lg">
                      Go to{" "}
                      <span className="text-blue-600 font-semibold">
                        {item.restaurant}
                      </span>{" "}
                      and pick up{" "}
                      {item.orderType === "regular order" ? (
                        <span className="text-blue-600 font-semibold">
                          {item.quantity} {item.name}
                        </span>
                      ) : (
                        <span className="text-blue-600 font-semibold">
                          one custom burger
                        </span>
                      )}{" "}
                      and drop it off at{" "}
                      <span className="text-blue-600 font-semibold">
                        {item.address}.
                      </span>{" "}
                      Ask for the order with order ID{" "}
                      <span className="text-blue-600 font-semibold">{`#${item.orderId}`}</span>{" "}
                      at the restaurant. Call the customer at{" "}
                      <span className="text-blue-600 font-semibold">
                        {item.phone}
                      </span>{" "}
                      if necessary.{" "}
                      {item.orderType === "regular order" ? (
                        <h1>
                          Do not forget to collect{" "}
                          <span className="text-blue-600 font-semibold">
                            {item.totalPrice} taka
                          </span>{" "}
                          from the customer. Ride safe..!!
                        </h1>
                      ) : (
                        <h1>
                          No need to worry about payment, customer already paid
                          online. Ride safe..!!
                        </h1>
                      )}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RiderActivity;
