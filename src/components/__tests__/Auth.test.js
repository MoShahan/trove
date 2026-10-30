import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { createSession } from "@/actions/auth-action";
import AuthPage from "@/components/Auth/Auth";
import { toastMessage } from "@/utils/toast";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/actions/auth-action", () => ({
  createSession: jest.fn(),
}));

jest.mock("@/lib/firebase/firebase", () => ({
  firebaseAuth: { name: "firebase-auth" },
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("@/utils/toast", () => ({
  toastMessage: jest.fn(),
}));

describe("AuthPage", () => {
  beforeEach(() => {
    localStorage.clear();
    createSession.mockResolvedValue(true);
  });

  it("renders the Firebase login form", () => {
    render(<AuthPage type="login" />);

    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show password" })
    ).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<AuthPage type="login" />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByTestId("password-visibility-toggle"));

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: "Hide password" })
    ).toBeInTheDocument();
  });

  it("renders confirm password on signup", () => {
    render(<AuthPage type="signup" />);

    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByTestId("confirmPassword-visibility-toggle")
    ).toBeInTheDocument();
  });

  it("validates required login fields", () => {
    render(<AuthPage type="login" />);

    fireEvent.submit(screen.getByTestId("auth-form"));

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it("logs in through Firebase and stores the session", async () => {
    signInWithEmailAndPassword.mockResolvedValue({
      user: {
        getIdToken: jest.fn().mockResolvedValue("firebase-id-token"),
      },
    });

    render(<AuthPage type="login" />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { name: "email", value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { name: "password", value: "secret-password" },
    });
    fireEvent.submit(screen.getByTestId("auth-form"));

    await waitFor(() => {
      expect(createSession).toHaveBeenCalledWith("firebase-id-token");
    });
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      { name: "firebase-auth" },
      "user@example.com",
      "secret-password"
    );
    expect(localStorage.getItem("trove-token")).toBe("firebase-id-token");
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(toastMessage).toHaveBeenCalledWith(
      "success",
      "Logged in successfully"
    );
  });

  it("signs up, creates a session, and redirects home", async () => {
    createUserWithEmailAndPassword.mockResolvedValue({
      user: {
        getIdToken: jest.fn().mockResolvedValue("new-user-token"),
      },
    });

    render(<AuthPage type="signup" />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { name: "email", value: "new@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { name: "password", value: "secret-password" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { name: "confirmPassword", value: "secret-password" },
    });
    fireEvent.submit(screen.getByTestId("auth-form"));

    await waitFor(() => {
      expect(createSession).toHaveBeenCalledWith("new-user-token");
    });
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      { name: "firebase-auth" },
      "new@example.com",
      "secret-password"
    );
    expect(localStorage.getItem("trove-token")).toBe("new-user-token");
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(toastMessage).toHaveBeenCalledWith(
      "success",
      "Account created successfully"
    );
  });
});
