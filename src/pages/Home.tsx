import React, { useEffect, useState } from "react";
import TournamentCard from "../components/TournamentCard";
import { useRecoilState } from "recoil";
import { allWorldcups } from "../atom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../Firebase";

const Home = () => {
  const [worldcups, setWorldcups] = useRecoilState(allWorldcups);
  const [isLoading, setIsLoading] = useState(true);

  const getWorldCups = async () => {
    const worlcupsQuery = query(collection(db, "worldcups"));
    const querySnapshot = await getDocs(worlcupsQuery);

    const datas = querySnapshot.docs.map((doc) => {
      const { creator, title, description, gifts, round } = doc.data();
      const id = doc.id;
      return {
        creator,
        title,
        description,
        gifts,
        round,
        id,
      };
    });

    setWorldcups(datas);
  };
  useEffect(() => {
    getWorldCups();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <span className="text-4xl font-semibold">Loading...</span>
        </div>
      ) : (
        <>
          <div className="w-full h-80 bg-purple-400 overflow-hidden">
            <img
              src={"gift1.png"}
              alt="image"
              className="w-full h-full object-right object-cover"
            />
          </div>
          <section className="min-h-96 w-full py-16 px-8 sm:px-10 md:px-12 lg:px-24 xl:px-28 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {worldcups.map((item) => (
              <TournamentCard key={item.id} {...item} />
            ))}
          </section>
        </>
      )}
    </>
  );
};

export default Home;
