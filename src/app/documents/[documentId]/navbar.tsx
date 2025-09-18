import Link from 'next/link'
import React from 'react'
import DocumentInput from './document-input'

function Navbar() {
  return (
    <nav className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
        <Link href="/">
        <img src="/livedocs.svg" alt="hehe" className='w-[170px]' />
        </Link>
        <div className='flex flex-col'>
            <DocumentInput />
        </div>
        </div>
    </nav>
  )
}

export default Navbar