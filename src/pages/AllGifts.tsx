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
    const giftQuery = query(collection(db, "gifts"), orderBy("count", "desc"));

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
    <section className="min-h-96 w-full py-24 px-8 sm:px-10 md:px-12 lg:px-24 xl:px-44 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {gifts?.map((item, index) => (
        <ItemCard key={item.id} {...item} hasRank={index < 3} index={index} />
      ))}
    </section>
  );
};

export default AllGifts;
