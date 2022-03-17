import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/* Login */}
          <div className="w-3/5 p-5">
            <div className="pt-5">
              <h2 className="text-3xl font-bold text-green-500">
                Sign in to Account
              </h2>
            </div>
            <div className="border-2 w-20 border-green-500 inline-block mt-5"></div>

            <div className="flex flex-col items-center mt-5">
              <div className="bg-gray-100 w-64 p-2 flex items-center">
                <FaEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>

              <div className="bg-gray-100 w-64 p-2 flex items-center mt-3">
                <RiLockPasswordLine className="text-gray-500 m-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>

              <div className="bg-gray-100 w-64 p-2 flex items-center mt-3">
                <RiLockPasswordLine className="text-gray-500 m-2" />
                <input
                  type="password"
                  placeholder="Rematch Password"
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>

              {/* <div className="flex justify-between w-64 mt-3">
                <label htmlFor="" className="flex items-center text-xs">
                  <input type="checkbox" name="remember" className="mr-1" />
                  Remember me
                </label>
                <a href="#" className="text-xs">
                  Forgot password
                </a>
              </div> */}
            </div>
            <button
              className=" mt-5 border-2 border-green-500 
             rounded-full px-12 py-2 inline-block 
             font-semibold 
             hover:bg-white 
             hover:text-green-500"
            >
              Sign up
            </button>
          </div>
          {/* register */}
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2 ">Hello</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Fill up personal information and start journey with us
            </p>
            <button
              className="border-2 border-white 
             rounded-full px-12 py-2 inline-block 
             font-semibold 
             hover:bg-white 
             hover:text-green-500"
            >
              Sign in
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
