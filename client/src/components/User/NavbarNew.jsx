import React from 'react'
import Image from "../../Assets/Screenshot 2023-01-29 010123.png";
import PersonIcon from "@mui/icons-material/Person";

function NavbarNew() {
    return (
        <>
      <div className=" w-full h-28 shadow-lg bg-slate-50 ">
        <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
          <img src={Image} alt="/" width="150" height="80" />

          <form className="lg:w-[58%] lg:ml-2 md:w-[58%] md:px-8 md:-ml-9 sm:w-[58%]">
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block border w-full p-4 pl-10 text-sm  border-gray-300  bg-gray-50  border-gray-00 dark:placeholder-gray-400   "
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-sky-600  "
              >
                Search
              </button>
            </div>
          </form>

          <div className="text-black">
            {/* <ul className="flex hover:border h-16 w-40 hover:bg-slate-50 ">
              <p className="text-stone-700 cursor-pointer mt-5 ml-12">Login/</p>

              <p className="text-stone-700 cursor-pointer ml-1 mt-5">Signup</p>
            </ul> */}

            <ul className="flex hover:border h-16 w-40 hover:bg-slate-50 text-sky-600 hover:bg-gray-100 ">
              <p className=" text-stone-700 cursor-pointer mt-5 ml-12 font-bold text-lg text-sky-700 ">
                <PersonIcon className="" />
                Anagh
              </p>
            </ul>
          </div>
        </div>
      </div>
    </>
    )
}

export default NavbarNew