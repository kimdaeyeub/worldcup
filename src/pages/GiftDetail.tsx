import { doc } from "firebase/firestore";
import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import { useRecoilValue } from "recoil";
import { giftDetailState } from "../atom";

const GiftDetail = () => {
  const gift = useRecoilValue(giftDetailState);
  console.log(gift);
  return <div>GiftDetail</div>;
};

export default GiftDetail;
