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
  schema: Record<string, string>
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
  link: string;
  image: string;
  views: string;
  avatar: string;
  upvotes: string;
  username: string;
  displayName: string;
};

export const define = (shots: Record<string, HTMLElement>[]) =>
  shots.map((item) => {
    const link = item.link.getAttribute("href");

    return {
      link,
      views: item.views.innerText.trim(),
      upvotes: item.upvotes?.innerText.trim(),
      id: link?.split("/shots/")[1].split("-")[0],
      image: (
        item.image?.getAttribute("data-src") || item.image?.getAttribute("src")
      )?.split("?")[0],
      author: {
        displayName: item.displayName.innerText,
        avatar: item.avatar.getAttribute("data-src")?.split("?")[0],
        username: item.username?.getAttribute("href")?.split("/")[1],
      },
    };
  });
