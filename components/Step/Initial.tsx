import React, { Dispatch, SetStateAction } from 'react'
import { Button } from "@/components/ui/button"


const Initial = ({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) => {

    return (
        <div className="flex flex-col items-center justify-evenly">
            <h1 className="text-4xl font-bold my-4">Farcaster Recover</h1>
            <p>
                Use Your recovery address to recover your Farcaster
                account.
            </p>
            <p>
                If you&apos;ve forgotten your Farcaster Wallet Phrase,
            </p>
            <p>
                this tool will help you recover your farcaster account using your recovery address
            </p>
            <Button className='my-4' onClick={() => setStep(1)}>Get Started</Button>
        </div>
    )
}

export default Initial