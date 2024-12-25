/* eslint-disable react/prop-types */
import Lottie from "lottie-react";
import noDataFoundGif from "./noDataFound.json";
import noOrders from "./NoOrders.json";

const NoDataFound = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-100 py-7 rounded-lg">
      <div className="w-full">
        <Lottie
          animationData={text === "No orders yet!!" ? noOrders : noDataFoundGif}
          loop={true}
          className={`w-[300px] h-[300px] mx-auto ${
            text === "No orders yet!!" &&
            "bg-gray-300 rounded-full shadow-xl shadow-blue-200"
          }`}
        />
      </div>
      <h2
        className={`text-center text-[30px] md:text-[40px] lg:text-[40px] font-bold leading-tight text-gray-800 ${
          text === "No orders yet!!" ? "pt-10" : "pt-0"
        }`}
      >
        {text}
      </h2>
    </div>
  );
};

export default NoDataFound;
