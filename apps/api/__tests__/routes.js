import app from "../src/index";

test("GET /shots", async () => {
  const response = await app.request("/shots");
  expect(response.status).toBe(200);

  const shots = await response.json();
  expect(shots.length).toEqual(24);
});

test("GET /search", async () => {
  const response = await app.request("/search?query=orange");
  expect(response.status).toBe(200);

  const shots = await response.json();
  expect(shots.length).toEqual(24);
});

describe("Get shot by :id", () => {
  it.each([
    "23088187",
    // https://dribbble.com/shots/23088187-Wander-UX-UI
    "23080474",
    // https://dribbble.com/shots/23080474-Video-Sharing-App
    "23087195",
    // https://dribbble.com/shots/23087195-Travel-Earth-Mascot-Logo
  ])(`GET /shots/:%s`, async (id) => {
    const response = await app.request(`/shots/${id}`);
    expect(response.status).toBe(200);

    const shot = await response.json();
    expect(shot.id).toEqual(id);
  });
});
