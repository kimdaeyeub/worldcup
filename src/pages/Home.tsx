import React, { useEffect, useState } from "react";
import TournamentCard from "../components/TournamentCard";
import { IWorldCup } from "../types";
import { useRecoilState } from "recoil";
import { allWorldcups } from "../atom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
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
        <div className="w-full h-screen flex justify-center items-center">
          <span className="text-4xl font-semibold">Loading...</span>
        </div>
      ) : (
        <>
          <div className="w-full h-80 bg-purple-400 relative">
            {/* <input className="absolute top-full bottom-10 left-0 right-0 m-auto w-1/2 h-12 rounded-full outline-none border px-16 shadow-lg" />
        <svg
          className="w-8 absolute top-full left-14 right-1/2 m-auto bottom-10 text-gray-300"
          data-slot="icon"
          fill="none"
          strokeWidth="2.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          ></path>
        </svg> */}
          </div>
          <section className="min-h-96 w-full py-16 px-32 grid grid-cols-4 gap-5">
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
