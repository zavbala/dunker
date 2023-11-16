import { Hono } from "hono";
import { cors } from "hono/cors";
import { Scrap } from "../functions/spider";

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

  const path = "/shots/popular" + (tag ? "/" + tag : "");
  const shots = await Scrap({ path, page });

  return context.json(shots);
});

app.get("/search", async (context) => {
  const { query } = context.req.query() as { query: string };

  const path = "/search" + (query ? "/" + query : "");
  const shots = await Scrap({ path });

  return context.json(shots);
});

export default app;
