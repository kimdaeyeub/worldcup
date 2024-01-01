import React, { useState } from "react";
import Tag from "./Tag";
import { ChildProcess } from "child_process";

interface IProp {
  onSelect: () => void;
  title: string;
  tags: string[];
  photo: string;
}

const PlayCard = ({ onSelect, title, tags, photo }: IProp) => {
  return (
    <div
      onClick={onSelect}
      className="w-full md:h-full h-[650px] overflow-hidden p-3 bg-white rounded-xl flex flex-col justify-center items-start space-y-3 cursor-pointer"
    >
      <img
        className="w-full md:h-[700px] h-[500px] rounded-xl object-cover overflow-hidden"
        width={1000}
        height={1000}
        src={photo}
        alt="tournament_image"
      />
      <span className="text-xl">{title}</span>
      <div className="w-full flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default PlayCard;
