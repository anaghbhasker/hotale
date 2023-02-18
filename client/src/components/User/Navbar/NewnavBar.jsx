import React,{useState} from 'react'
import { FaListUl,FaTimes,
    FaLinkedin,
    FaGithub,
    FaVoicemail,
    FaPhone,
   } from 'react-icons/fa'


function NewnavBar() {
    const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

    return (
        <>
    <div className=" w-full h-20 shadow-xl z-[100]">
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 ">
        <img src="/../public/assets/qb.png" alt="/" width="150" height="65" />
        <div>
          <ul className="hidden md:flex">
            
              <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
            
            
              <li className="ml-10 text-sm uppercase hover:border-b">About</li>
            
            
              <li className="ml-10 text-sm uppercase hover:border-b">Skills</li>
            
            
              <li className="ml-10 text-sm uppercase hover:border-b">
                Projects
              </li>
            
            
              <li className="ml-10 text-sm uppercase hover:border-b">
                Contact
              </li>
            
          </ul>
          <div onClick={handleNav} className="md:hidden cursor-pointer">
            <FaListUl size={25} />
          </div>
        </div>
      </div>

      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? "md:hidden fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0  p-10 ease-in duration-500"
          }
        >
          <div className="flex w-full items-center justify-between">
            <img
              src="/../public/assets/qb.png"
              width="120"
              height="60"
              alt=""
            />
            <div
              onClick={handleNav}
              className="rounded-full shadow-lg shadow-gray-500 cursor-pointer"
            >
              <FaTimes size={30} />
            </div>
          </div>

          <div className="border-b border-gray-300 my-4">
            <p className="w-[85%] md:w-[90%] py-4">
              Lets build something legendary together
            </p>
          </div>
          <div className="py-4 flex-col">
            <ul className="uppercase">
        
                <li className="py-4 text-sm">Home</li>
              
                <li className="py-4 text-sm">About</li>
            
                <li className="py-4 text-sm">Skill</li>
            
                <li className="py-4 text-sm">Projects</li>
     
                <li className="py-4 text-sm">Contact</li>
      
            </ul>
            <div className="pt-40">
              <p className="uppercase tracking-widest text-[#5651e5]">
                Lets connect
              </p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <div className="rounded-full shadow-lg shadow-gray-500 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <FaLinkedin />
                </div>
                <div className="rounded-full shadow-lg shadow-gray-500 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <FaGithub />
                </div>
                <div className="rounded-full shadow-lg shadow-gray-500 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <FaVoicemail />
                </div>
                <div className="rounded-full shadow-lg shadow-gray-500 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <FaPhone />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  
    </>

    )
}

export default NewnavBar