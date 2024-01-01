import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { worldCupResult } from "../atom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { IResult } from "../types";
import Tag from "../components/Tag";

const TournamentResult = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useRecoilState(worldCupResult);

  const [isLoading, setIsLoading] = useState(true);

  const getResult = async (id: string) => {
    const docRef = doc(db, "results", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data() as IResult;
      setResult(data);
    } else {
    }
    setIsLoading(false);
  };

  const onMoveItemPage = () => {
    navigate(`/gifts/${result?.winner.id}`);
  };

  useEffect(() => {
    getResult(params.id!);
  }, []);
  return (
    <div className="w-full min-h-screen px-8 sm:px-10 md:px-12 lg:px-24 xl:px-28 py-10 flex justify-center items-center bg-red-200">
      {!isLoading && (
        <div className="w-full h-full bg-white rounded-2xl shadow-lg grid grid-cols-2 p-5 gap-3">
          <div className="w-full h-full overflow-hidden">
            <img
              src={result?.winner.photo}
              alt="item_image"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-full h-full flex flex-col justify-between items-start py-10 px-10">
            <div className="w-full flex flex-col justify-start items-start">
              <div className="w-full h-full flex justify-between items-center text-center">
                <span className="text-4xl font-semibold mt-6 text-center h-full">
                  {result?.winner.title}
                </span>
                <svg
                  onClick={onMoveItemPage}
                  width={25}
                  className="text-gray-500"
                  data-slot="icon"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </div>
              <span className="text-xl font-medium text-gray-400 mt-3">
                {result?.winner.description}
              </span>
            </div>
            <div className="w-full flex flex-wrap gap-5">
              {result?.winner.tags.map((tag) => (
                <Tag key={tag} result tag={tag} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentResult;
