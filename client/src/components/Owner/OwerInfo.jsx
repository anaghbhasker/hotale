import React, { useEffect, useState } from 'react'
import { fullDetails } from '../../config/Service/OwnerRequest'

function OwerInfo() {
      const [owner,setOwner]=useState()


    useEffect(()=>{
      async function invoke(){
            const data= await fullDetails()
            setOwner(data.owner)
      }invoke()
    },[])


    return (
        <div className="text-gray-400 mt-4">
        <div className="border border-r border-gray-700">
            <h3 className="text-white ml-3 mt-2 font-semibold">Profile Information</h3>
            <div className="grid grid-cols-2 ml-3 mt-2 mb-3 font-normal">
                <div className="mt-3">
                      Email: {owner?.email}
                </div>
                <div className="mt-3">
                      Phone: {owner?.phone}
                </div>
                <div className="mt-3 inline-flex">
                      City: {owner?.city?<p>{owner.city}</p>:<p className="text-red-500 italic">Please add your city</p>}
                </div>
                <div className="mt-3 inline-flex">
                      State: {owner?.state?<p>{owner.state}</p>:<p className="text-red-500 italic">Please add your city</p>}
                </div>
                <div className="mt-3 inline-flex">
                      Zip: {owner?.zip?<p>{owner.zip}</p>:<p className="text-red-500 italic">Please add your city</p>}
                </div>
              
            </div>
        </div>
     
    </div>
    )
}

export default OwerInfo