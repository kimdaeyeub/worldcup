import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import ItemCard from "../components/ItemCard";
import { IGift } from "../types";
import { useRecoilState } from "recoil";
import { allGifts } from "../atom";

const AllGifts = () => {
  const [gifts, setGifts] = useRecoilState<IGift[]>(allGifts);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGifts = async () => {
    const giftQuery = query(
      collection(db, "gifts"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(giftQuery);
    const datas = querySnapshot.docs.map((doc) => {
      const {
        title,
        description,
        username,
        creator,
        createdAt,
        tags,
        photo,
        count,
      } = doc.data();
      const id = doc.id;
      return {
        title,
        description,
        username,
        creator,
        createdAt,
        tags,
        photo,
        id,
        count,
      };
    });

    setGifts(datas);
  };
  useEffect(() => {
    fetchGifts();

    setIsLoading(false);
  }, []);
  return (
    <section className="min-h-96 w-full py-24 px-32 grid grid-cols-4 gap-5">
      {gifts?.map((item) => (
        <ItemCard key={item.id} hasRank {...item} />
      ))}
    </section>
  );
};

export default AllGifts;
