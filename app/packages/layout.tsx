import PackagePageSelector from '@/components/Packages/PackagePageSelector/PackagePageSelector'
import Link from 'next/link'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full'>
            <PackagePageSelector/>
            {children}
        </div>
    )
}

export default layout