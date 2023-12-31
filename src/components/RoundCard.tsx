import React from "react";
import { useRecoilValue } from "recoil";
import { worldcupDetail } from "../atom";

interface IProp {
  onClickPlay: () => void;
  round: number;
}

const RoundCard = ({ onClickPlay, round }: IProp) => {
  const tournament = useRecoilValue(worldcupDetail);
  return (
    <div className="w-full h-full bg-white rounded-xl flex flex-col justify-center items-center px-10 py-10">
      <h1 className="mb-10 text-5xl font-semibold">
        {round === 2 ? "결승" : `${round} 강`}
      </h1>
      <div className="grid grid-cols-2 w-fit h-fit rounded-xl overflow-hidden">
        <img
          src={tournament?.gifts[0].photo}
          className="w-64 h-64 object-cover"
        />
        <img
          src={tournament?.gifts[1].photo}
          className="w-64 h-64 object-cover"
        />
        <img
          src={tournament?.gifts[2].photo}
          className="w-64 h-64 object-cover"
        />
        <img
          src={tournament?.gifts[3].photo}
          className="w-64 h-64 object-cover"
        />
      </div>
      <span className="text-3xl font-semibold mb-2 mt-5">
        {tournament?.title}
      </span>
      <span className="text-lg font-medium text-gray-400 mt-2 text-center w-3/4">
        {tournament?.description}
      </span>
      <button
        className="px-10 py-2 bg-cyan-400 text-white rounded-xl text-2xl mt-4"
        onClick={onClickPlay}
      >
        Play
      </button>
    </div>
  );
};

export default RoundCard;