import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center lg:text-left fixed bottom-0 inset-x-0">
      <div
        className="text-gray-700 text-center p-4"
        // style="background-color: rgba(0, 0, 0, 0.2);"
      >
        © 2021 Copyright:
        <a className="text-gray-800" href="https://tailwind-elements.com/">
          Tailwind Elements
        </a>
      </div>
    </footer>
  );
};
