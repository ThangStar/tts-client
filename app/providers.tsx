"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Layout } from "@/components/layout/layout";
import { Provider } from "react-redux";
import store from "@/redux/store/store";
import { Toaster } from "react-hot-toast";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <Provider store={store}>
      <Toaster/>
      <NextUIProvider>
        <NextThemesProvider
        defaultTheme='system'
        attribute='class'
        {...themeProps}>
        <Layout>
          {children}
        </Layout>
      </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  );
}
