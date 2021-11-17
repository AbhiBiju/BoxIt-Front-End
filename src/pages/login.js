const logoImg = "/assets/img/Logo.png";

const threeImg = "/assets/img/threepictures.png";

import React, { useState } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";

export default function Example() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await login({
      variables: {
        email: formState.email,
        password: formState.password,
      },
    });

    const token = mutationResponse.data.addUser.token;

    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const myStyles = {
    customMargin: {
      marginBottom: "10rem",
    },
  };
  return (
    <>
      <div className="rounded-blob m-5 flex items-center justify-center h-20 w-20 w-small bg-purple-400">
        <img className="h-8 w-auto sm:h-14" src={logoImg} alt="" />
      </div>

      <div className="min-h-screen flex flex-col md:flex-row relative bg-purple-200 overflow-hidden z-20">
        <div className="rounded-oval absolute h-half w-big bg-white -right-96 bottom-40 z-10"></div>

        <div className="z-20 flex flex-col justify-between ">
          <div className=" header-text mx-28  flex">
            <h1 className="custom-padding text-4xl tracking-tight font-bold text-gray-200 sm:text-2xl md:text-4xl lg:text-3xl xl:text-4xl z-20">
              <span className="w-96 block text-purple-500 ">Login here</span>{" "}
              <span className="block text-gray-400 xl:inline">
                <p className="mt-6 text-sm font-extrabold text-gray-400">
                </p>
              </span>
            </h1>
          </div>
          <div className="hidden sm:block h-20 z-20 ml-28 mr-20 mb-72">
            <img className="" src={threeImg} />
          </div>
        </div>

        <div className="hidden lg:block relative w-0 flex-1 ">
          {/* <img
            className="absolute inset-0 h-full w-full object-cover z-20"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          /> Hello */}
        </div>

        <div
          style={myStyles.customMargin}
          className="flex-1 flex flex-col justify-center  mx-7 px-7 sm:mx-2 sm:px-2 lg:flex-none lg:mx-16 lg:px-16 xl:mx-20 xl:px-20 z-20 rounded-lg"
        >
          <div className="rounded-2xl p-10 bg-purple-300  max-w-sm w-96 lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Log in to your account</h2>
            </div>

            <div className="mt-8">
              <div>
                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={handleChange}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={handleChange}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div> */}

                  <div className="flex space-x-16 ">
                    <a
                      href="/signup"
                      className="w-28 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-300 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign Up
                    </a>
                    <button
                      onClick={handleFormSubmit}
                      type="submit"
                      className="w-28 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
