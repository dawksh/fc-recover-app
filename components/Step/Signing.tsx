import React from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { mnemonicToAccount } from 'viem/accounts'
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ID_REGISTRY_ADDRESS, ID_REGISTRY_EIP_712_TYPES, idRegistryABI } from '@farcaster/hub-web';
import { publicClient, walletClient } from '@/lib/viem';


const Signing = ({ fid, phrase }: { fid: Number, phrase: string }) => {

    const account = mnemonicToAccount(phrase);
    const { isConnected, address } = useAccount();

    const { writeContractAsync } = useWriteContract()

    const getDeadline = () => {
        const now = Math.floor(Date.now() / 1000);
        const oneHour = 60 * 60;
        return now + oneHour;
    };

    const readNonce = async () => {
        return await publicClient.readContract({
            address: ID_REGISTRY_ADDRESS,
            abi: idRegistryABI,
            functionName: 'nonces',
            args: [account.address],
        });
    };

    const readCustody = async () => {
        return await publicClient.readContract({
            address: ID_REGISTRY_ADDRESS,
            abi: idRegistryABI,
            functionName: 'custodyOf',
            args: [BigInt(fid.toString())],
        });
    };

    const initRecovery = async () => {
        const deadline = getDeadline();
        const sig = await walletClient.signTypedData({
            account,
            ...ID_REGISTRY_EIP_712_TYPES,
            primaryType: 'Transfer',
            message: {
                fid: BigInt(fid.toString()),
                to: account.address,
                nonce: await readNonce(),
                deadline: BigInt(deadline),
            },
        })
        const currentCustody = await readCustody();
        try {
            const txn = await writeContractAsync({
                abi: idRegistryABI,
                address: ID_REGISTRY_ADDRESS,
                functionName: 'recover',
                args: [
                    currentCustody,
                    account.address,
                    BigInt(deadline),
                    sig
                ]
            })
            toast.success("Recovery Successful, use your new login phrase to log into Warpcast Client");
        } catch (e) {
            toast.error("There was an error. Please check console.");
            console.log(e);
        }

    }

    return (
        <div className='flex flex-col'>
            <div className='my-4'>
                Farcaster Requires you to sign a message to verify ownership of your FID, please connect your Farcaster Recovery Address.
            </div>
            {isConnected ? (<>
                Connected Address: <span className='font-mono'>{address}</span>
            </>) : ("Connect Wallet")}
            <div>
                FID to be Recovered: <span className='font-mono'>{fid.toString()}</span>
            </div>
            <div>
                New Custody Address: <span className="font-mono">{account.address}</span>
            </div>
            <div className='my-2'>
                <label htmlFor="phrase">Your new login phrase:</label>
                <Textarea onClick={async () => {
                    await navigator.clipboard.writeText(phrase);
                    toast.success("Copied to clipboard");
                }} readOnly={true} value={phrase} className='my-2' />
                <p className='text-sm text-muted-foreground'>This will be shown once, please back it up carefully. Click on the Textarea to copy.</p>
            </div>
            <div className='flex justify-center items-center my-6'>
                <Button disabled={!isConnected} onClick={initRecovery}>{isConnected ? "Initiate Recovery" : "Connect Wallet"}</Button>
            </div>
        </div>
    )
}

export default Signing