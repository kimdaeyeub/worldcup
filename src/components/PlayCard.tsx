import React, { useState } from "react";
import Tag from "./Tag";

interface IProp {
  onSelect: () => void;
}

const PlayCard = ({ onSelect }: IProp) => {
  const [choice, setChoice] = useState(false);
  return (
    <div
      onClick={() => {
        onSelect();
        setChoice(true);
      }}
      className="w-full h-full overflow-hidden p-3 bg-white rounded-xl flex flex-col justify-center items-start space-y-3 cursor-pointer"
    >
      <img
        className="w-full h-full rounded-xl"
        width={1000}
        height={1000}
        src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="tournament_image"
      />
      <span className="text-xl">Hello</span>
      <div className="w-full flex flex-wrap gap-3">
        <Tag tag="10대" />
        <Tag tag="10대" />
        <Tag tag="10대" />
        <Tag tag="10대" />
      </div>
    </div>
  );
};

export default PlayCard;
