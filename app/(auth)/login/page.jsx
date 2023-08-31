"use client";
import Loading from '@/app/components/Loading/Loading';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import {BiLogoGooglePlus} from "react-icons/bi";

const Login = () => {

  const session = useSession();
  const router =useRouter();

  if(session.status === "loading"){
    return <div className=' items-center flex flex-col justify-center top-10'><Loading/></div>
  }

  if(session.status === "authenticated"){
     router.push("/");
  }
  if(session.status === "unauthenticated"){
    router.push("/login");
  }

  return (
    <div className='login flex flex-col justify-center items-center h-screen'>
      <button  className='flex items-center gap-3 text-white px-2 py-1 bg-blue-500 rounded-md  w-[250px]' onClick={()=> signIn("google")}><BiLogoGooglePlus size={30} color='black'/> Login with google account</button>
    </div>
  )
}

export default Login;