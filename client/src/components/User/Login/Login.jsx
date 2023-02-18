import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../Assets/Screenshot 2023-01-29 010123.png";
import loginPic from "../../../Assets/draw2.webp";
import { Link, useNavigate } from "react-router-dom";
import Axiosinstance from "../../../config/Axiosinstance";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../Store/Slice/Userauth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  const dispatch= useDispatch()
  const loginForm = (e) => {
    e.preventDefault();
    let obj = {
      email: email,
      password: password,
    };
    if (obj.email && obj.password) {
      let regEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (regEmail.test(obj.email.toString())) {
        Axiosinstance.post("/user_Login", obj).then((response) => {
          if(response.data.status==="success"){
            const username=response.data.name
            const token=response.data.token
            dispatch(
              setLogin({
                user:'user',
                name:username,
                token:token,
              })
            )
            navigate('/')
          }else{
            toast.error(response.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        });
      } else {
        toast.error(`Enter your valid email`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      toast.error(`OOPS! All fields are required`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <section className="h-screen">
      <ToastContainer />
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center  lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1   md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img src={loginPic} className="w-full" alt="..." />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 ">
            <form onSubmit={loginForm}>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <div className="flex justify-center items-center">
                  <img src={logo} className="max-w-sm h-auto ml-4" alt="..." />
                </div>
              </div>
              <div className="mb-6">
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black bg-white rounded-lg text-black font-medium placeholder:font-normal"
                />
              </div>

              <div className="mb-6">
                <input
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black bg-white rounded-lg text-black font-medium placeholder:font-normal"
                  type={"password"}
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                >
                  Login
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link
                    to={"/signup"}
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">Or</p>
            </div>
            <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
              <span className="absolute left-4"></span>
              <span className="flex items-center text-black">
                <FcGoogle className="pr-2 w-10" />
                Sign in with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
