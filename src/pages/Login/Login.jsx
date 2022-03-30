import {
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { FaEnvelope, FaFacebookF, FaGoogle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase.service";
import { localStorageService } from "../../services/local-storage.service";
import { publicApiService } from "../../services/public-api.service";
import { LOCAL_STORAGE } from "../../share/constant";
import { signInValidation } from "./login.validation";
const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const LoginWithEmail = async (userInfo) => {
    try {
      const userLoginData = await publicApiService.loginEmail(userInfo);
      localStorageService.setLocal(
        LOCAL_STORAGE.ACCESS_TOKEN,
        userLoginData.data.token
      );
      localStorageService.setLocal(
        LOCAL_STORAGE.USER_INFO,
        JSON.stringify(userLoginData.data.user)
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGoogle = (provider) => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        if (res.user) {
          const userData = {
            email: res.user.email,
            uid: res.user.uid,
            user_avatar: res.user.photoURL,
          };
          try {
            const userLoginData = await publicApiService.loginGoogle(userData);
            localStorageService.setLocal(
              LOCAL_STORAGE.ACCESS_TOKEN,
              userLoginData.data.token
            );
            localStorageService.setLocal(
              LOCAL_STORAGE.USER_INFO,
              JSON.stringify(userLoginData.data.user)
            );
            navigate("/");
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };

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
            {/* Social login */}
            <div className="flex justify-center my-2">
              <button
                onClick={() => loginWithGoogle(new GoogleAuthProvider())}
                className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-blue-500"
              >
                <FaGoogle />
              </button>
              <button className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-red-500">
                <FaFacebookF />
              </button>
            </div>
            <p className="text-gray-400 my-3">Or use email and password</p>
            {/* Login form */}
            <div className="flex flex-col items-center">
              <Formik
                initialValues={initialValues}
                validationSchema={signInValidation}
                onSubmit={(values) => {
                  LoginWithEmail(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="bg-gray-100 w-64 p-2 flex items-center">
                      <FaEnvelope className="text-gray-400 m-2" />
                      <Field
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                    </div>
                    <p className="text-red-500 text-left w-5/6 text-xs">
                      <ErrorMessage name="email" />
                    </p>

                    <div className="bg-gray-100 w-64 p-2 flex items-center mt-3">
                      <RiLockPasswordLine className="text-gray-500 m-2" />
                      <Field
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                    </div>
                    <p className="text-red-500 text-left w-5/6 text-xs">
                      <ErrorMessage name="password" />
                    </p>

                    <div className="flex justify-between w-64 mt-3">
                      <label htmlFor="" className="flex items-center text-xs">
                        <input
                          type="checkbox"
                          name="remember"
                          className="mr-1"
                        />
                        Remember me
                      </label>
                      <a href="#" className="text-xs">
                        Forgot password
                      </a>
                    </div>
                    <button
                      type="submit"
                      className=" mt-5 border-2 
                        border-green-500 
                        rounded-full 
                        px-12 py-2 
                        inline-block 
                        font-semibold 
                        hover:bg-white 
                        hover:text-green-500"
                    >
                      Sign in
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
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
              Sign up
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
