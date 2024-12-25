const FoodsWeOfferSkeletonLoader = () => {
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

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            key={index}
            className="w-full h-70 py-6 px-4 bg-gray-800 rounded-3xl text-neutral-300 flex flex-col items-start justify-center gap-3 hover:shadow-2xl hover:shadow-sky-400 transition-shadow"
          >
            <div className="w-full h-40 bg-sky-300 rounded-2xl">
              <div className="h-full rounded-lg border-2 bg-gray-400 animate-pulse" />
            </div>
            <div className="">
              <h1 className="h-5 w-[100px] rounded-lg bg-gray-400 animate-pulse"></h1>
            </div>

            <div className="h-8 w-[130px] rounded-lg bg-gray-400 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodsWeOfferSkeletonLoader;
