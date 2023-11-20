import { HTMLElement } from "node-html-parser";

type Args = {
  page?: string;
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
};

export const resolver = (
  nodes: HTMLElement[],
  schema: Record<string, string>,
) => {
  const output: Record<string, HTMLElement> | any[] = [];

  for (const node of nodes) {
    const item = {};

    for (const [key, value] of Object.entries(schema)) {
      // @ts-ignore
      item[key] = node.querySelector(value);
    }

    output.push(item);
  }

  return output;
};

type Shot = {
  views: string;
  link: string;
  upvotes: string;
  image: string;
  username: string;
  displayName: string;
  avatar: string;
};

export const define = (shots: Record<string, HTMLElement>[]) =>
  shots.map((item) => ({
    views: item.views.innerText.trim(),
    link: item.link.getAttribute("href"),
    upvotes: item.upvotes?.innerText.trim(),
    image: item.image.getAttribute("data-src"),
    author: {
      displayName: item.displayName.innerText,
      avatar: item.avatar.getAttribute("data-src"),
      username: item.username?.getAttribute("href")?.split("/")[1],
    },
  }));
