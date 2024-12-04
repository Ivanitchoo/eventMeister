import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, UserProfile } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from '@/components/ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

const Header = () => {
    return (
        <header className="w-full border-b">
            <div className="wrapper flex items-center justify-between">
                <Link href="/" className="w-36">
                    <Image
                        src="/assets/images/logo.svg" width={128} height={38}
                        alt="Nkuvu logo"
                    />
                </Link>


                <SignedIn>
                    {/*This Navbar will show on Desktop Devices */}
                    <nav className='md:flex-between hidden w-full max-w-xs'>
                        <NavItems />
                    </nav>

                </SignedIn>

                <div className="flex w-32 justify-end gap-3">
                    <SignedIn>
                        <UserButton />
                        {/*This Navbar will show on Mobile Devices */}
                        <MobileNav />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton >
                            <Button className='rounded-full' size='lg'>
                                <Link href='/sign-in'>
                                    Login
                                </Link>
                            </Button>

                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}

export default Header