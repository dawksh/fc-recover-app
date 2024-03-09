import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { mnemonicToAccount } from "viem/accounts";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    ID_REGISTRY_ADDRESS,
    ID_REGISTRY_EIP_712_TYPES,
    idRegistryABI,
} from "@farcaster/hub-web";
import { publicClient, walletClient } from "@/lib/viem";
import { getDeadline, readCustody, readNonce } from "@/lib/farcaster";

const Signing = ({ fid, phrase, clearState }: { fid: Number; phrase: string, clearState: () => void }) => {
    const account = mnemonicToAccount(phrase);
    const { isConnected, address } = useAccount();

    const { writeContractAsync } = useWriteContract();

    const [loading, setLoading] = useState(false);

    const initRecovery = async () => {
        setLoading(true);
        const deadline = getDeadline();
        const sig = await walletClient.signTypedData({
            account,
            ...ID_REGISTRY_EIP_712_TYPES,
            primaryType: "Transfer",
            message: {
                fid: BigInt(fid.toString()),
                to: account.address,
                nonce: await readNonce(account),
                deadline: BigInt(deadline),
            },
        });
        const currentCustody = await readCustody(fid);
        try {
            const txn = await writeContractAsync({
                abi: idRegistryABI,
                address: ID_REGISTRY_ADDRESS,
                functionName: "recover",
                args: [currentCustody, account.address, BigInt(deadline), sig],
            });
            toast.success(
                "Recovery Successful, use your new login phrase to log into Warpcast Client"
            );
            clearState()
        } catch (e) {
            toast.error("There was an error. Please check console.");
            console.log(e);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col">
            <div className="my-4">
                Farcaster Requires you to sign a message to verify ownership of
                your FID, please connect your Farcaster Recovery Address.
            </div>
            {isConnected ? (
                <>
                    Connected Address:{" "}
                    <span className="font-mono">{address}</span>
                </>
            ) : (
                "Connect Wallet"
            )}
            <div>
                FID to be Recovered:{" "}
                <span className="font-mono">{fid.toString()}</span>
            </div>
            <div>
                New Custody Address:{" "}
                <span className="font-mono">{account.address}</span>
            </div>
            <div className="my-2">
                <label htmlFor="phrase">Your new login phrase:</label>
                <Textarea
                    onClick={async () => {
                        await navigator.clipboard.writeText(phrase);
                        toast.success("Copied to clipboard");
                    }}
                    readOnly={true}
                    value={phrase}
                    className="my-2"
                />
                <p className="text-sm text-muted-foreground">
                    This will be shown once, please back it up carefully. Click
                    on the Textarea to copy.
                </p>
            </div>
            <div className="flex justify-center items-center my-6">
                <Button disabled={!isConnected || loading} onClick={initRecovery}>
                    {isConnected ? loading ? "Casting spells to speed up recovery" : "Initiate Recovery" : "Connect Wallet"}
                </Button>
            </div>
        </div>
    );
};

export default Signing;
