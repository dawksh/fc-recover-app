import React from 'react'
import { useAccount } from 'wagmi'
import { mnemonicToAccount } from 'viem/accounts'
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';


const Signing = ({ fid, phrase }: { fid: Number, phrase: string }) => {
    const custody = mnemonicToAccount(phrase);
    const { isConnected, address } = useAccount();
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
                New Custody Address: <span className="font-mono">{custody.address}</span>
            </div>
            <div className='my-2'>
                <label htmlFor="phrase">Your new login phrase:</label>
                <Textarea onClick={async () => {
                    await navigator.clipboard.writeText(phrase);
                    toast.success("Copied to clipboard");
                }} readOnly={true} value={phrase} className='my-2' />
                <p className='text-sm text-muted-foreground'>This will be shown once, please back it up carefully. Click on the Textarea to copy.</p>
            </div>
        </div>
    )
}

export default Signing