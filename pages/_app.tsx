import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  optimism,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }: AppProps) {

  const config = getDefaultConfig({
    appName: 'FC Recovery',
    projectId: process.env.NEXT_PUBLIC_WC_ID as string,
    chains: [optimism],
  });

  const queryClient = new QueryClient();

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={{ darkMode: darkTheme(), lightMode: lightTheme() }}>
            <Component {...pageProps} />
            <Toaster />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextThemesProvider>
  );
}
