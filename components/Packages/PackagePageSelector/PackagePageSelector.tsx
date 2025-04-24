"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function PackagePageSelector() {
    const pathname = usePathname()
    return (
        <div className="mt-[5rem] mb-[0.7rem] flex gap-2 place-items-center justify-start w-full px-8">
            <Link href="/packages" className={`py-2 px-3 bg no-underline ${pathname === "/packages" ? 'bg-green text-yellow' : 'border border-green text-black'} rounded-md font-bold`}>Recommended Packages</Link>
            <Link href="/packages/custom-packages" className={`py-2 px-3 bg no-underline ${pathname === "/packages/custom-packages" ? 'bg-green text-yellow' : 'border border-green text-black'} rounded-md  font-bold`}>My custom packages</Link>
        </div>
    )
}

export default PackagePageSelector