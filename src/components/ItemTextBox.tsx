import React from "react";

const ItemTextBox = ({ title, detail }: { title: string; detail: string }) => {
  return (
    <div className="w-full border-2 border-slate-400 rounded-xl relative px-12 py-10">
      <h1 className="text-3xl font-medium text-slate-900 mb-10 bg-white w-fit absolute -top-5 left-5 px-8">
        {title}
      </h1>
      <span className="text-xl font-medium text-slate-600">{detail}</span>
    </div>
  );
};

export default ItemTextBox;
