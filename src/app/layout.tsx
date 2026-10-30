import { Slide, ToastContainer } from "react-toastify";

import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import Navbar from "@/components/Layout/Navbar";
import theme from "@/utils/theme";

import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trove",
  description:
    "Trove is an e-commerce storefront for browsing products, managing a cart and wishlist, and checking out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            {children}
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
              theme="light"
              transition={Slide}
            />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
