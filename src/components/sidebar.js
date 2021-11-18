import React from "react";

export default function Sidebar({ user }) {
  return (
    <div className="h-screen w-44 border-r border-gray-200 bg-purple-300">
      <a href="#" className="flex-shrink-0 group block">
        <div className="">
          <div>
            <img
              className="ml-5 pt-2 inline-block h-32 w-32 rounded-full"
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="inline-flex flex-col text-center px-2 ml-3">
            <p className="float-right pt-4 text-base font-medium text-purple-700 group-hover:text-gray-900">
              {user !== undefined ? user.firstName : ""}
            </p>
            <p className="text-sm font-medium mt-4 text-purple-700 group-hover:text-gray-700">
              {"Date: " + new Date()}
            </p>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900"></p>
          </div>
        </div>
      </a>
    </div>
  );
}
