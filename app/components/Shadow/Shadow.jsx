import { GlobalContext } from '@/context/GlobalContext'
import React, { useContext } from 'react'

const Shadow = () => {

    const {openModal} = useContext(GlobalContext);
  return (

    <div className={openModal ? 'w-screen h-screen shadow z-40 fixed top-0 left-0' : "hidden"}></div>
  )
}

export default Shadow