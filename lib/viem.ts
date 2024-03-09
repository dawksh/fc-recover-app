import { createPublicClient, createWalletClient, http } from "viem";
import { optimism } from "viem/chains";

export const publicClient = createPublicClient({
    chain: optimism,
    transport: http(),
});

export const walletClient = createWalletClient({
    chain: optimism,
    transport: http(),
});