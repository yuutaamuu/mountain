import React, { memo, useState, VFC } from "react";

type PROPS = {
  input: string;
  onChangeSearch: (text: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Search: VFC<PROPS> = memo((props) => {
  //   const [text, setText] = useState("");
  const { onChangeSearch, input } = props;
  return (
    <section className="relative w-full max-w-md pl-5 py-4 mx-auto rounded-l-md rounded-r-none">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>

        <input
          type="text"
          className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-l-md rounded-r-none focus:border-blue-500 focus:outline-none"
          placeholder="Search"
          value={input}
          onChange={(e) => onChangeSearch(e)}
        />
      </div>
      {/* 
      <div className="absolute inset-x-0 px-6 py-3 mx-5 mt-4 overflow-y-auto bg-white border rounded-md max-h-72 dark:bg-gray-800 dark:border-transparent">
        <a href="#" className="block py-1">
          <h3 className="font-medium text-gray-700 dark:text-gray-100 hover:underline">
            Software engineer
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            02/04/2020
          </p>
        </a>
      </div> */}
    </section>
  );
});
