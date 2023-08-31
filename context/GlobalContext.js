"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [mode, setMode] = useState('dark');
    const [getEditTaskValue , setGetEditTaskValue] =useState("");
    const [getEditTaskValueId , setGetEditTaskValueId] =useState("");
    const [openModal , setOpenModal] = useState(false);
    const [goSpinner , setGoSpinner] =useState(false);


    const toggleMode = () => {
      setMode(mode === 'light' ? 'dark' : 'light');
    };

    const toggleModal = ()=> {
      setOpenModal(!openModal);
    }


 

  return (
    <GlobalContext.Provider value={{mode , toggleMode , setGetEditTaskValue , getEditTaskValue , setGetEditTaskValueId ,getEditTaskValueId , openModal , toggleModal , goSpinner , setGoSpinner }}>
     <div>{children}</div>
    </GlobalContext.Provider>
  );
};