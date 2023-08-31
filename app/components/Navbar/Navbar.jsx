"use client";
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Loading from '../Loading/Loading';

const Navbar = () => {
    const {data:session , status} = useSession();
    if(status === "authenticated"){

  return (
    
    <div className='bg-[teal] h-[50px] text-white w-full px-2 '>
    {session?.user ? (
        <div className='flex items-center gap-5 justify-between  md:justify-end p-2   '>
            <div className='flex gap-3 items-center'>
           <h1>{session.user.name}</h1>
    <div className='relative w-[30px] h-[30px]'>
        <Image src={`${session.user.image}`} className='object-contain' fill alt='profile'/>
    </div>
       </div>
    <Link onClick={signOut} href="/login">Гарах</Link>
        </div>
    ) : <p>not found user</p>}
   
</div>
 
)

    }

}

export default Navbar