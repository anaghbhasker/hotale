import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminDash, ownerDashboard } from "../../config/Service/AdminRequest";
import owner from '../../Assets/owners.jfif'
import AdminChart from "./AdminChart";

function AdminDashboard() {
  const navigate = useNavigate();
  const [dashData,setdashData]=useState()
  useEffect(() => {
    async function invoke() {
      const data = await ownerDashboard();
      if (data.status === "failed") {
        navigate("/admin/login");
      }
    }
    invoke();
  }, [navigate]);

  useEffect(()=>{
    async function invoke(){
      const data=await adminDash()
      setdashData(data);
    }invoke()
  },[])
  return (
    <div>
      <div className=" flex  justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-14 p-5">
          <div className="flex justify-between">
            <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-black shadow-lg border">
              <img
                className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src="https://hbr.org/resources/images/article_assets/2021/03/ICF.SC_.Article.2.image_.-HBR-positive-reinforcement_1099307402.jpg"
                alt="null"
              />
              <div className="p-6 flex flex-col justify-start">
                <h5 className="text-gray-300 text-xl font-medium mb-2">
                  USERS
                </h5>
                <h3 className="text-gray-300 text-6xl mb-4">{dashData?.users}</h3>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-black shadow-lg border">
              <img
                className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src={owner}
                alt=""
              />
              <div className="p-6 flex flex-col justify-start">
                <h5 className="text-gray-300 text-xl font-medium mb-2">
                  OWNERS
                </h5>
                <h3 className="text-gray-300 text-6xl mb-4">{dashData?.owners}</h3>
              </div>
            </div>
          </div>


          <div className="flex justify-between">
            <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-black shadow-lg border">
              <img
                className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src="https://www.skytechindia.com/images/company.jpg"
                alt=""
              />
              <div className="p-6 flex flex-col justify-start">
                <h5 className="text-gray-300 text-xl font-medium mb-2">
                  HOTELS
                </h5>
                <h3 className="text-gray-300 text-6xl mb-4">{dashData?.hotels}</h3>
              </div>
            </div>
          </div>



          <div className="flex justify-between">
            <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-black shadow-lg border">
              <img
                className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src="https://images.ctfassets.net/pdf29us7flmy/6CUCq15966GPkPR9gJbPSP/2fd7431ed38ec4fb8ca16365868e7c8e/Virtual_Interview_8.png"
                alt=""
              />
              <div className="p-6 flex flex-col  justify-center">
                <h5 className="text-gray-300 text-xl font-medium mb-2">
                  Revanue
                </h5>
                <h3 className="text-gray-300 text-xl mb-4">{(dashData?.totalprice*10/100)}</h3>
              </div>
            </div>
          </div>
        <AdminChart/>


        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
