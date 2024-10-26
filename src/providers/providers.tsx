"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "@/redux/store/store";
import { Layout } from "@/components/layout/layout";
import { NextUIProvider } from "@nextui-org/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}
export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <Provider store={store}>
      <Toaster />
      <NextUIProvider>
          {/* <DebugBar /> */}
          <Layout>
            {children}
          </Layout>
      </NextUIProvider>
    </Provider>
  );
}
