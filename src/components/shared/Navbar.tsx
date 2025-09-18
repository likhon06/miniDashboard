"use client";
import React from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import { signIn, signOut } from "next-auth/react";

const Navbar = ({ session }: { session: any }) => {
    return (
        <header className="border-b border-black/10 dark:border-white/10 sticky top-0 bg-background/80 backdrop-blur z-10">
            <nav className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
                <a href="/" className="text-sm font-semibold">Mini Dashboard</a>
                <div className="flex items-center gap-4 text-sm">
                    <Link className="hover:underline underline-offset-4" href="/">Home</Link>
                    {session?.user ? (
                        <>
                            <Link className="hover:underline underline-offset-4" href="/posts">Posts</Link>
                            <Link className="hover:underline underline-offset-4" href="/users">Users</Link>
                            <Link className="hover:underline underline-offset-4" href="/profile">Profile</Link>
                        </>
                    ) : (
                        <Link className="hover:underline underline-offset-4" href="/">Dashboard</Link>
                    )}
                    {session?.user ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => signOut({
                                callbackUrl: "http://localhost:3000/"
                            })}
                            className="px-3 py-1 text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                            Sign Out
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => signIn("google", {
                                callbackUrl: "http://localhost:3000/"
                            })}
                            className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            Sign In
                        </motion.button>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar