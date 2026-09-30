"use client";

import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Link, Button } from "@heroui/react";

export default function Navber() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession();

  const authLinks = (
    <>
      {session?.user ? (
        <>
          <span>Welcome, {session.user.name}</span>

          <Button onClick={() => signOut()}>Sign Out</Button>
        </>
      ) : (
        <>
          <Link href="/sign-in" className="py-2">
            Sign In
          </Link>

          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <div>
          <p className="font-bold">ACME</p>
        </div>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-4 md:flex">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="#">Pricing</Link>
          </li>
        </ul>

        {/* Desktop auth */}
        <div className="hidden items-center gap-4 md:flex">{authLinks}</div>

        {/* Mobile button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-3 p-4">
            <li>
              <Link href="/" className="block py-2">
                Home
              </Link>
            </li>

            <li>
              <Link href="/dashboard" className="block py-2">
                Dashboard
              </Link>
            </li>

            <li>
              <Link href="#" className="block py-2">
                Pricing
              </Link>
            </li>

            <li className="border-t border-separator pt-4">
              <div className="flex flex-col gap-3">{authLinks}</div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
