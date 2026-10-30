import { render, screen } from "@testing-library/react";

import Login from "../page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/lib/firebase/firebase", () => ({
  firebaseAuth: {},
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe("Login page", () => {
  it("renders the Firebase login form", () => {
    render(<Login />);

    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.queryByTestId("demo-credentials")).not.toBeInTheDocument();
  });
});
