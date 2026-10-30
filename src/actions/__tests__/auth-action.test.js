import { cookies } from "next/headers";

import { createSession, removeSession } from "@/actions/auth-action";
import { SESSION_COOKIE_NAME } from "@/utils/constant";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("auth session actions", () => {
  const set = jest.fn();
  const del = jest.fn();

  beforeEach(() => {
    cookies.mockResolvedValue({
      set,
      delete: del,
    });
  });

  it("stores the session cookie", async () => {
    await expect(createSession("token-123")).resolves.toBe(true);
    expect(set).toHaveBeenCalledWith(
      SESSION_COOKIE_NAME,
      "token-123",
      expect.objectContaining({
        httpOnly: true,
        path: "/",
      })
    );
  });

  it("removes the session cookie", async () => {
    await expect(removeSession()).resolves.toBe(true);
    expect(del).toHaveBeenCalledWith(SESSION_COOKIE_NAME);
  });
});
