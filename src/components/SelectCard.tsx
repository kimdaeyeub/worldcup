import React from "react";

const SelectCard = () => {
  return (
    <div className="w-full h-full overflow-hidden p-3 bg-white rounded-xl flex flex-col justify-center items-center space-y-3 cursor-pointer">
      <svg
        className="text-green-500"
        width={400}
        data-slot="icon"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
        ></path>
      </svg>
    </div>
  );
};

export default SelectCard;
