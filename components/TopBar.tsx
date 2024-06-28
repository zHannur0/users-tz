import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from "react";
import Footer from "./Footer";

interface TopBarProps {
    title: string;
    children: ReactNode;
}

export default function TopBar({ title, children }: TopBarProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex min-h-screen flex-col justify-between bg-[#f9fafc] w-full">
                <header>
                    <nav className="flex h-12 items-center px-4 gap-[5px] shadow-md w-full">
                        <img src="/images/logo.svg" alt="logo" className="h-full" />
                        <Link href="/" className="text-lg font-bold text-black">
                            ZhanCorporation
                        </Link>
                    </nav>
                </header>
                <main className="container m-auto mt-4 px-4">{children}</main>
                <Footer />
            </div>
        </>
    );
}
