import React, { Fragment, useEffect, useState } from "react";
import Image from "../../Assets/Screenshot 2023-01-29 010123.png";
import PersonIcon from "@mui/icons-material/Person";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../config/Service/UserRequest";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../Store/Slice/Userauth";

function NavbarNew() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.userLogin);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    async function invoke() {
      const data = await getUser(token);
      setUser(data.user);
    }
    invoke();
  }, [token]);

  const handleLogout = () => {
    dispatch(
      setLogout({
        user: null,
        name: null,
        token: null,
      })
    );

    navigate("/login");
  };

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
            {user ? (
              <ul className="flex hover:border h-16 w-40 hover:bg-slate-50 text-sky-600 hover:bg-gray-100 ">
                <p className=" text-stone-700 cursor-pointer mt-5 ml-12 font-bold text-lg text-sky-700 ">
                  <PersonIcon className="" />
                  {user?.username}
                </p>
              </ul>
            ) : (
              <button
                type="button"
                onClick={()=>{
                  navigate('/login')
                }}
                className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
              >
                Login/Signup
              </button>
              
            )}
          </div>

          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                  Menu
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={"/"}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Account settings
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={"/"}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Bookings
                        </Link>
                      )}
                    </Menu.Item>
                    <form method="POST" action="#">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              handleLogout();
                            }}
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default NavbarNew;
