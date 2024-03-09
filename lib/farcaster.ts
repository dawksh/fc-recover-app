import { ID_REGISTRY_ADDRESS, idRegistryABI } from "@farcaster/hub-web";
import { publicClient } from "./viem";
import { Account } from "viem";

export const getDeadline = () => {
    const now = Math.floor(Date.now() / 1000);
    const oneHour = 60 * 60;
    return now + oneHour;
};

export const readNonce = async (account: Account) => {
    return await publicClient.readContract({
        address: ID_REGISTRY_ADDRESS,
        abi: idRegistryABI,
        functionName: 'nonces',
        args: [account.address],
    });
};

export const readCustody = async (fid: Number) => {
    return await publicClient.readContract({
        address: ID_REGISTRY_ADDRESS,
        abi: idRegistryABI,
        functionName: 'custodyOf',
        args: [BigInt(fid.toString())],
    });
};