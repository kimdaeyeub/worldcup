import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import ItemCard from "../components/ItemCard";

interface IGift {
  title: string;
  description: string;
  username: string;
  creator: string;
  createdAt: number;
  tags: string[];
  photo: string;
  id: string;
  count: number;
}

const AllGifts = () => {
  const [gifts, setGifts] = useState<IGift[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGifts = async () => {
    const giftQuery = query(collection(db, "gifts"));

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
