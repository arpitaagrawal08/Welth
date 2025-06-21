'use client';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import ThemeToggle from './ThemeToggle';

const HeaderClient = () => {
  return (
    <header className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>
      <nav className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link href="/">
          <Image
            src={"/logoWelth.png"}
            alt="welth logo"
            height={60}
            width={200}
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a href="#features" className="text-gray-600 hover:text-blue-600">
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        <div className="flex items-center space-x-4">
        

<SignedIn>
  <div className="flex items-center space-x-2">
    {/* 🌙 Theme Toggle - first */}
    <ThemeToggle />

    {/* Dashboard Button */}
    <Link
      href="/dashboard"
      className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
    >
      <Button variant="outline">
        <LayoutDashboard size={18} />
        <span className="hidden md:inline">Dashboard</span>
      </Button>
    </Link>

    {/* Add Transaction Button */}
    <a href="/transaction/create">
      <Button className="flex items-center gap-2">
        <PenBox size={18} />
        <span className="hidden md:inline">Add Transaction</span>
      </Button>
    </a>
  </div>
</SignedIn>


          <SignedOut>
            <div className="flex items-center space-x-2">
              <SignInButton forceRedirectUrl='/dashboard'>
                <Button variant="outline"
                 className="text-gray-700 dark:text-black border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                >Login</Button>
              </SignInButton>
              <ThemeToggle />
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default HeaderClient;
