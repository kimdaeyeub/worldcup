import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import { giftDetailState } from "../atom";
import { useRecoilState } from "recoil";
import { IGift } from "../types";
import ItemTextBox from "../components/ItemTextBox";

const GiftDetail = () => {
  const [gift, setGift] = useRecoilState(giftDetailState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const getGiftDetail = async (id: string) => {
    const docRef = doc(db, "gifts", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data() as IGift;
      setGift(data);
    } else {
      setError("Does Not Exist");
    }
  };

  useEffect(() => {
    if (gift === null) {
      getGiftDetail(params.id!);
    }
    if (gift?.id !== params.id) {
      getGiftDetail(params.id!);
    }

    setIsLoading(false);
  }, [params]);

  console.log(error);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error === "" && gift !== null ? (
            <div className="w-full h-full">
              <div className="w-full h-80 bg-purple-400 relative md:mb-44">
                <img
                  src={gift?.photo}
                  alt="item_image"
                  width={500}
                  height={500}
                  className="absolute md:top-full md:bottom-10 md:left-40 md:m-auto md:w-96 md:h-96 md:rounded-full object-cover w-full h-full"
                />
              </div>
              <section className="h-full w-full flex flex-col justify-start items-start px-8 sm:px-10 md:px-12 lg:px-24 xl:px-28 pt-16 pb-20 space-y-14">
                <ItemTextBox title="선물명" detail={gift!.title} />
                <ItemTextBox title="상세정보" detail={gift!.description} />
              </section>
            </div>
          ) : (
            <div>{error}</div>
          )}
        </>
      )}
    </>
  );
};

export default GiftDetail;
