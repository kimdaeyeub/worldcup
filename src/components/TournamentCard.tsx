import React from "react";
import { Link } from "react-router-dom";
import { IWorldCup } from "../types";
import { useSetRecoilState } from "recoil";
import { worldcupDetail } from "../atom";

const TournamentCard = ({
  gifts,
  title,
  description,
  creator,
  round,
  id,
}: IWorldCup) => {
  const setWorldcup = useSetRecoilState(worldcupDetail);
  const onClick = () => {
    const data = { gifts, title, description, creator, round, id };
    setWorldcup(data);
  };
  return (
    <Link to={`/worldcups/play/${id}`} onClick={onClick}>
      <div className="w-full h-full border border-slate-400 shadow-lg rounded-lg flex flex-col justify-center items-start p-3">
        <div className="w-full h-[300px] grid grid-cols-2 grid-rows-2 rounded-md overflow-hidden">
          <img
            src={gifts[0].photo}
            alt="item_image"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          <img
            src={gifts[1].photo}
            alt="item_image"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          <img
            src={gifts[2].photo}
            alt="item_image"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          <img
            src={gifts[3].photo}
            alt="item_image"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-lg mt-3">{title}</h1>
        <span className="w-full text-slate-500 text-sm mt-2">{creator}</span>
      </div>
    </Link>
  );
};

export default TournamentCard;
