import React from "react";

const All_Page_Title = ({ text1, text2 }) => {
  return (
    <h1 className="font-semibold text-3xl text-gray-800 drop-shadow-sm tracking-wide flex flex-col">
      <span>
        <span className="text-purple-700">{text1} </span>
        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 font-bold">
          {text2}
          <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full transform scale-x-0 origin-left transition-transform duration-500 hover:scale-x-100"></span>
        </span>
      </span>
    </h1>
  );
};

export default All_Page_Title;
