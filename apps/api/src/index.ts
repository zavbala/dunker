import { Hono } from "hono";
import { cors } from "hono/cors";
import fetcher from "../functions/fetcher";
import { define, resolver } from "../functions/spider";
import { Shot } from "../lib/models";

const app = new Hono();

app.use("/*", cors({ origin: "*", allowMethods: ["GET"] }));

app.get("/", (context) =>
  context.text(`
  DUNKER API

  author: @zavbala
  docs: https://dunker.app/docs
`)
);

app.get("/shots", async (context) => {
  const { page = "1", tag } = context.req.query() as {
    tag: string;
    page: string;
  };

  const path =
    "/shots/popular" +
    (tag ? "/" + tag : "") +
    "?" +
    new URLSearchParams({ page, per_page: "24" }).toString();

  const document = await fetcher(path);

  const shots = document.querySelectorAll("li.shot-thumbnail-container");

  const items = resolver(shots, Shot);
  const output = define(items);

  return context.json(output);
});

app.get("/search", async (context) => {
  const { query, page } = context.req.query() as {
    query: string;
    page: string;
  };

  const path =
    "/search" +
    (query ? "/" + query : "") +
    (page && page !== "1" ? `?page=${page}` : "");

  console.log(path);

  const document = await fetcher(path);
  const shots = document.querySelectorAll("li.shot-thumbnail-container");

  const items = resolver(shots, Shot);
  const output = define(items);

  return context.json(output);
});

app.get("/shots/:id", async (context) => {
  const { id } = context.req.param() as { id: string };

  const document = await fetcher("/shots/" + id);

  const isVideo =
    document.querySelector("video")?.getAttribute("src") ||
    document.querySelector("video")?.getAttribute("data-video-large") ||
    false;

  const data = {
    title: document.querySelector("h1.shot-header__title")?.innerText,

    asset: {
      type: isVideo ? "video" : "image",
      url:
        isVideo ||
        document.querySelector("div.block-media a img")?.getAttribute("src"),
    },

    description: document.querySelectorAll("div.content-block").length
      ? document
          ?.querySelectorAll("div.content-block")[1]
          .querySelectorAll("p")
          .join(" ")
          .replace(/<[^>]*>/g, "\n")
          .replace(/\n/g, " ")
          .replace(/\s+/g, " ")
          .trim()
      : null,

    author: {
      username: document.querySelector(".sticky-header__name a")?.innerText,

      avatar: document
        .querySelector(".sticky-header__avatar img")
        ?.getAttribute("src"),

      available:
        document
          .querySelector("div.sticky-header__user-status a")
          ?.innerText.trim() === "Available for work" || false,
    },
  };

  return context.json({ id, ...data });
});

export default app;
