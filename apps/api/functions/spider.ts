import { parse } from "node-html-parser";
import { DRIBBBLE } from "../lib/constants";

type Args = {
  path: "/search" | "/shots/popular" | string;
  // tag?:
  //   | "animation"
  //   | "branding"
  //   | "illustration"
  //   | "mobile"
  //   | "print"
  //   | "product-design"
  //   | "typography"
  //   | "web-design";
  page?: string;
};

export const Scrap = async ({ path, page }: Args) => {
  const query = new URLSearchParams({ page: page || "1" });

  const URL = DRIBBBLE + path + "?" + query.toString();

  const result = await fetch(URL, { headers: { "Content-Type": "text/html" } });

  const html = await result.text();
  const root = parse(html);

  const output = [];
  const shots = root.querySelectorAll("li.shot-thumbnail-container");

  for (const shot of shots) {
    const image = shot.querySelector("img")?.getAttribute("data-src");

    const link =
      DRIBBBLE +
      shot.querySelector("a.shot-thumbnail-link")?.getAttribute("href");

    const upvotes = shot.querySelector("js-shot-likes-count")?.innerText;

    const author = {
      displayName: shot.querySelector("div.user-information span")?.innerText,

      avatar: shot
        .querySelector("div.user-information img")
        ?.getAttribute("data-src"),

      username: shot
        .querySelector("div.user-information a")
        ?.getAttribute("href")
        ?.split("/")[1],
    };

    output.push({ image, link, upvotes, author });
  }

  return output;
};
