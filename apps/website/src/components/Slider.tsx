import useSWR from "swr";

const URL = "https://api.dunker.app";

const Slider = () => {
  const { data, isLoading } = useSWR(
    URL + "/shots",
    async (url) => await (await fetch(url)).json(),
  );

  return (
    <div
      id="slider"
      className="flex items-center overflow-hidden z-40 max-w-7xl space-x-6"
    >
      <div className="flex space-x-6 animate-loop-scroll">
        {data?.map((item: any) => (
          <img
            loading="lazy"
            src={item.image}
            draggable={false}
            alt={item.author.username}
            className="max-w-none inline-block"
            onContextMenu={(e) => e.preventDefault()}
          />
        ))}
      </div>

      <div aria-hidden="true" className="flex space-x-6 animate-loop-scroll">
        {data?.map((item: any) => (
          <img
            loading="lazy"
            src={item.image}
            draggable={false}
            alt={item.author.username}
            className="max-w-none inline-block"
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
