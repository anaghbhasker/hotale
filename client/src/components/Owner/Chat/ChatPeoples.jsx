import React, {  useContext, useEffect, useState } from "react";
import { getAdmin } from "../../../config/Service/OwnerRequest";
import { AppContext } from "../../../context/AppContext";



function ChatPeoples({data,currentOwnerId}) {

    const {setChat} =useContext(AppContext)

    const [admin,setAdmin]=useState()
    useEffect(()=>{
        async function invoke(){
            const adminId=data.members.find((id)=>id!==currentOwnerId)
            const result=await getAdmin(adminId)
            setAdmin(result.adminDetails)
        }invoke()
        
    },[data,currentOwnerId])


    const showMessage=async()=>{
      setChat(data)
    }
    
  return (
    <>
      <button onClick={()=>{showMessage()}} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full uppercase">
        {admin?.email.substring(0,1)}
        </div>
        <div className="ml-2 text-sm font-semibold">{admin?.email.substring(0,5)}</div>
      </button>
    </>
  );
}

export default ChatPeoples;
