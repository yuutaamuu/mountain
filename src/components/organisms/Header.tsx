import React from "react";

export const Header = () => {
  return (
    //   <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
    <header className="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs">
      <div className="ml-8 text-lg text-gray-700 hidden md:flex">
        My Website
      </div>
      <div className="flex flex-row-reverse mr-4 ml-4 md:hidden">
        <i className="fas fa-bars"></i>
      </div>
      <div className="flex flex-row-reverse mr-8 hidden md:flex">
        <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
          Button
        </div>
        <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
          Link
        </div>
      </div>
    </header>
  );
};
