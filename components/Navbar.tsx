import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='flex flex-row items-center justify-between p-4'>
            <span><Link href="/">FC Recover</Link></span>
            <ConnectButton />
        </div>
    )
}

export default Navbar