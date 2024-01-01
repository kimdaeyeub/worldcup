import React from "react";
import { FaCertificate } from "react-icons/fa";
import { Link } from "react-router-dom";
import Tag from "./Tag";
import { useRecoilState } from "recoil";
import { giftDetailState } from "../atom";

interface IProp {
  hasRank?: boolean;
  title: string;
  description: string;
  tags: string[];
  photo: string;
  count: number;
  creator: string;
  id: string;
  createdAt: number;
  username: string;
  index: number;
}
const ItemCard = ({
  hasRank,
  title,
  description,
  tags,
  photo,
  count,
  creator,
  id,
  createdAt,
  username,
  index,
}: IProp) => {
  const [giftDetail, setGiftDetail] = useRecoilState(giftDetailState);
  const onClick = () => {
    setGiftDetail({
      title,
      description,
      tags,
      photo,
      count,
      creator,
      id,
      createdAt,
      username,
    });
  };
  return (
    <Link to={`/gifts/${id}`} onClick={onClick}>
      <div className="min-h-[300px] h-full w-full shadow-md border-2 border-slate-300 rounded-lg p-4 flex flex-col justify-between items-center gap-y-3">
        <div className="w-full h-fit relative">
          <img
            src={photo}
            alt="item_image"
            width={500}
            height={500}
            className="w-full h-[300px] object-cover rounded-md"
          />
          {hasRank && (
            <div
              className={`absolute top-4 left-4 flex justify-center items-center ${
                index === 0
                  ? "text-yellow-400"
                  : index === 1
                  ? "text-gray-400"
                  : "text-amber-900"
              }`}
            >
              <FaCertificate size={40} />
              <span className="text-white absolute text-xl font-semibold">
                {index + 1}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start items-start w-full ">
          <span className="text-xl font-medium">{title}</span>
          <div className="flex flex-wrap w-full gap-x-3 gap-y-1.5 mt-2">
            {tags.map((item) => (
              <Tag key={item} tag={item} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
