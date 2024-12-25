import { Button, Dialog } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Loader from "../../../Utilities/Loader/Loader";
import NoDataFound from "../../../Utilities/NoDataFound/NoDataFound";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const RiderRequests = () => {
  let axios = useAxios();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rejectloading, setRejectLoading] = useState(false);
  const [details, setDetails] = useState("");
  const handleOpen = (details) => {
    setOpen(!open);
    setDetails(details);
  };

  let {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riderRequests"],
    queryFn: async () => {
      let res = await axios.get("/rider-requests").then();
      return res.data;
    },
  });

  let handleAccept = () => {
    setLoading(true);

    let riderDetails = {
      email: details.email,
      name: details.name,
    };

    axios.post("/accept/rider-request", riderDetails).then(() => {
      setLoading(false);
      setOpen(!open);
      refetch();
    });
  };

  let handleReject = () => {
    setRejectLoading(true);

    let riderDetails = {
      email: details.email,
      name: details.name,
    };

    axios
      .post(`/reject/rider-request?email=${details.email}`, riderDetails)
      .then(() => {
        setRejectLoading(false);
        setOpen(!open);
        refetch();
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {data.length === 0 ? (
        <NoDataFound text="No Rider Requests Found" />
      ) : (
        <>
          {/* Table */}
          <div className="w-full bg-teal-50 shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Rider requests</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-white">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center text-gray-600 capitalize text-lg">
                          Rider Name
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center text-gray-600 capitalize text-lg">
                          Email
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center text-gray-600 capitalize text-lg">
                          Action
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <div className="font-semibold text-gray-600">
                              {item.name}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center font-semibold text-gray-600">
                            {item.email}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap flex justify-center items-center">
                          <Button
                            onClick={() => handleOpen(item)}
                            className="capitalize bg-indigo-500"
                          >
                            Show Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Details Modal */}
              <Dialog open={open} handler={handleOpen}>
                <div className="bg-white overflow-hidden shadow rounded-lg border">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {details.name}
                    </h3>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {details.email}
                        </dd>
                      </div>

                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Phone Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {details.phone}
                        </dd>
                      </div>

                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-700">
                          Region
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {details.region}
                        </dd>
                      </div>
                    </dl>

                    <div className="flex justify-center items-center gap-4 pb-4">
                      <Button
                        className="bg-green-500"
                        disabled={loading ? true : false}
                        onClick={handleAccept}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-5 ">
                            <ImSpinner9 className="animate-spin text-[20px]" />
                            Accepting
                          </div>
                        ) : (
                          "Accept"
                        )}
                      </Button>

                      <Button
                        className="bg-red-500"
                        disabled={rejectloading ? true : false}
                        onClick={handleReject}
                      >
                        {rejectloading ? (
                          <div className="flex items-center justify-center gap-5 ">
                            <ImSpinner9 className="animate-spin text-[20px]" />
                            Rejecting
                          </div>
                        ) : (
                          "Reject"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RiderRequests;
