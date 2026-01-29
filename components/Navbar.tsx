'use client'
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const Navbar = () => {
  const handleNavClick = (linkName: string) => {
    posthog.capture(`nav_${linkName}_clicked`)
  }

  return (
    <header className="fixed top-0 w-full backdrop-blur-2xl bg-white/70 border-b border-black/10 z-50 shadow-sm">
        <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            {/* Logo */}
            <Link href='/' className='flex items-center gap-2 hover:opacity-60 transition-opacity' onClick={() => handleNavClick('logo')}>
                <Image src='/logo.png' alt='Logo' width={32} height={32}/>
                <span className="text-base font-semibold text-black">Dev Event</span>
            </Link>

            {/* Links */}
            <ul className='flex items-center gap-8'>
                <li>
                    <Link href='/' className='text-sm font-medium text-black hover:opacity-60 transition-opacity' onClick={() => handleNavClick('home')}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href='/events' className='text-sm font-medium text-black hover:opacity-60 transition-opacity' onClick={() => handleNavClick('events')}>
                        Events
                    </Link>
                </li>
                <li>
                    <Link href='/create' className='text-sm font-medium text-black hover:opacity-60 transition-opacity' onClick={() => handleNavClick('create')}>
                        Create
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}
export default Navbar
