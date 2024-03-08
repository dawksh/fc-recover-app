import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Navbar = () => {
    return (
        <div className='flex flex-row items-center justify-between p-4'>
            <span>FC Recover</span>
            <ConnectButton />
        </div>
    )
}

export default Navbar