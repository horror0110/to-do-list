import { GlobalContext } from "@/context/GlobalContext";
import React, { useContext, useState } from "react";
import Shadow from "../Shadow/Shadow";

const Modal = () => {
  const [modalItem, setModalItem] = useState("");
  const { getEditTaskValue, getEditTaskValueId  , openModal , toggleModal} = useContext(GlobalContext);

  const editTask = () => {
    
    if(modalItem.trim() !== ""){
       
        const orderData = {
            item: modalItem
          };
        fetch(`api/todo/${getEditTaskValueId}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(orderData)
        })
          .then((response) => {
            if (response.ok) {
              console.log("updated");
            }
          })
          .catch((err) => console.log(err));
    
          toggleModal();
          setModalItem("");
    }

  };



  return (
   <div className="fixed flex">


    <Shadow/>


      {openModal ?    <div className="flex flex-col gap-3 items-center mt-40 p-2 rounded-md bg-[teal] w-[300px] h-auto z-50 ">

            <h1 >Үүнийг засна уу  <strong className="font-bold text-yellow-800"> "{getEditTaskValue}"</strong></h1>

            <input className="rounded-md px-4 py-1 bg-[teal] border-[3px] border-green-500" onChange={(e)=>setModalItem(e.target.value)} type="text" placeholder="засах" />

            <div className="flex items-center gap-10">   

              <button className="bg-green-500 px-2 py-1 rounded-md" onClick={editTask}>Хадгалах</button>
              <button className="bg-red-500 px-2 py-1 rounded-md" onClick={toggleModal}>Болих</button>

              </div>

             
         </div> : null}

   </div>
  
    
   



    


  );
};

export default Modal;
