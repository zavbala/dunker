import { motion } from "framer-motion";
import useSWR from "swr";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://0.0.0.0:8787"
    : "https://dunker.jeremy-e05.workers.dev";

const Slider = () => {
  const { data, isLoading } = useSWR(
    URL + "/shots",
    async (url) => await (await fetch(url)).json(),
  );

  return (
    <motion.div className="gap-3 flex flex-col overflow-y-scroll z-40 absolute h-3/4">
      {data?.map((item: any) => (
        <img
          loading="lazy"
          src={item.image}
          alt={item.author.username}
          onDragStart={(e) => e.preventDefault()}
        />
      ))}
    </motion.div>
  );
};

export default Slider;
