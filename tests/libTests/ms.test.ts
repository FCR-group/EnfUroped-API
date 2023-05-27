import ms from "ms";

describe("ms function from ms package tests", () => {
  it("ms tests", () => {
    expect(ms("1d")).toBe(86400000);
    expect(ms("1 day")).toBe(86400000);
    expect(ms("1 days")).toBe(86400000);

    expect(ms("1m")).toBe(60000);
    expect(ms("1 minute")).toBe(60000);
    expect(ms("1 minutes")).toBe(60000);

    expect(ms("1h")).toBe(3600000);
    expect(ms("1 hour")).toBe(3600000);
    expect(ms("1 hours")).toBe(3600000);

    expect(ms("1s")).toBe(1000);
    expect(ms("1 second")).toBe(1000);
    expect(ms("1 seconds")).toBe(1000);

    expect(ms("1ms")).toBe(1);
    expect(ms("1 millisecond")).toBe(1);
    expect(ms("1 milliseconds")).toBe(1);

    expect(ms("1w")).toBe(604800000);
    expect(ms("1 week")).toBe(604800000);
    expect(ms("1 weeks")).toBe(604800000);

    expect(ms("1y")).toBe(31557600000);
    expect(ms("1 year")).toBe(31557600000);
    expect(ms("1 years")).toBe(31557600000);
  });
});
