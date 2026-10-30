import { toast } from "react-toastify";

import { toastMessage } from "@/utils/toast";

jest.mock("react-toastify", () => ({
  Slide: "slide",
  toast: jest.fn(),
}));

describe("toastMessage", () => {
  it("forwards the message and type to react-toastify", () => {
    toastMessage("success", "Saved");

    expect(toast).toHaveBeenCalledWith(
      "Saved",
      expect.objectContaining({
        type: "success",
        position: "top-center",
      })
    );
  });
});
