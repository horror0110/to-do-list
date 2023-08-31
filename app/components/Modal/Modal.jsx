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
    
       <div className="flex flex-col items-center justify-center">

        <Shadow/>

<div className={openModal ? "w-[300px] h-auto bg-[teal] rounded-xl text-black p-5 fixed top-24 z-50 " : "hidden"}>
     
     
       
     <h1>Edit this task  <strong className="font-bold text-yellow-400"> "{getEditTaskValue}"</strong></h1>

     <input
       onChange={(e) => setModalItem(e.target.value)}
       className="bg-mainColor rounded-md py-2 px-2 my-5 text-white placeholder:text-white"
       type="text"
       placeholder="edit task"
       value={modalItem}
     />

     <div className="flex justify-between items-center">
       <button className="bg-red-600 px-2 py-1 rounded-md text-white" onClick={toggleModal}>CANCEL</button>
       <button className="bg-green-600 px-2 py-1 rounded-md text-white " onClick={editTask}>SAVE</button>
     </div>
   </div>

       </div>



    


  );
};

export default Modal;
