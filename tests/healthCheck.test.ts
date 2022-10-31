import req from "supertest";
import server from "../src/server";

describe("Health checks", () => {
  it("should return 200", async () => {
    const response = await req(server).get("/life");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Server is alive!");
  });

  it("Should return 200", async () => {
    const response = await req(server).get("/ready");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Server is ready!");
  });
});
