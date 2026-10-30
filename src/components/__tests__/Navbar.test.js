import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { removeSession } from "@/actions/auth-action";
import Navbar from "@/components/Layout/Navbar";
import { toastMessage } from "@/utils/toast";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/actions/auth-action", () => ({
  removeSession: jest.fn(),
}));

jest.mock("@/lib/firebase/firebase", () => ({
  firebaseAuth: {},
}));

jest.mock("firebase/auth", () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/utils/toast", () => ({
  toastMessage: jest.fn(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
    removeSession.mockResolvedValue(true);
  });

  it("hides cart and wishlist links when logged out", () => {
    render(<Navbar />);
    expect(screen.queryByLabelText(/cart/i)).not.toBeInTheDocument();
  });

  it("logs the user out from the account menu", async () => {
    localStorage.setItem("trove-token", "firebase-id-token");
    render(<Navbar />);

    fireEvent.click(screen.getByTestId("PersonOutlineIcon").closest("button"));
    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(removeSession).toHaveBeenCalled();
    });
    expect(toastMessage).toHaveBeenCalledWith(
      "success",
      "Logged out successfully"
    );
    expect(localStorage.getItem("trove-token")).toBeNull();
  });
});
