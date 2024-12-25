const PartnerDetailsSkeletonLoader = () => {
  return (
    <div>
      <style>
        {`
        @keyframes pulse {
            0% {
            background-position: 100% 0;
            }
            100% {
            background-position: -100% 0;
            }
        }

        .animate-pulse {
            background-image: linear-gradient(to right, rgba(255,255,255,0) 0%, #ccc 50%, rgba(255,255,255,0) 100%);
            background-size: 200% 100%;
            animation: pulse 1.2s infinite;
        }
    `}
      </style>

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
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                      <tr key={index}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 mr-2 sm:mr-3">
                              <div className="w-20 h-20 rounded-full border-2 bg-gray-400 animate-pulse" />
                            </div>
                            <h1 className="h-5 w-[30%] rounded-lg bg-gray-400 animate-pulse"></h1>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <h1 className="h-5 w-[30%] mx-auto rounded-lg bg-gray-400 animate-pulse"></h1>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center font-medium text-green-500">
                            <div className="h-12 w-[50%] mx-auto rounded-lg bg-gray-400 animate-pulse"></div>
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
  );
};

export default PartnerDetailsSkeletonLoader;
