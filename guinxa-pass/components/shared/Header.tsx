import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, UserProfile } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from '@/components/ui/button'

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


                <div className="flex w-32 justify-end gap-3">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        {/*<Button asChild className='rounded-full' size='lg'>
                            <Link href='/sign-in'>
                                Login
                            </Link>
                        </Button>*/}
                        <SignInButton className='rounded-full' size='lg'>
                            <Link href='/sign-in'>
                                Login
                            </Link>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}

export default Header