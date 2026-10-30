import { getErrorMessage } from "@/utils/auth";

describe("auth helpers", () => {
  it("reads error messages from Error instances", () => {
    expect(getErrorMessage(new Error("Boom"), "fallback")).toBe("Boom");
    expect(getErrorMessage("not-an-error", "fallback")).toBe("fallback");
  });
});
