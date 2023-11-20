import { parse } from "node-html-parser";
import { DRIBBBLE } from "../lib/constants";

const fetcher = async (path: string) => {
  const result = await fetch(DRIBBBLE + path, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Content-Type": "text/html",
    },
  });

  const html = await result.text();

  return parse(html);
};

export default fetcher;
