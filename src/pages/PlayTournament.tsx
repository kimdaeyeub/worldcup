import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { worldcupDetail } from "../atom";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { IGift, IWorldCup } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import RoundCard from "../components/RoundCard";

const PlayTournament = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useRecoilState(worldcupDetail);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  //현재 라운드의 아이템이 들어감.
  const [currentRoundItem, setCurrentRoundItem] = useState<IGift[] | null>(
    null
  );
  //다음 라운드에 진출한 아이템
  const [nextRoundItem, setNextRoundItem] = useState<IGift[]>([]);
  //현재 라운드에서 몇번째 매치인지를 나타냄
  const [match, setMatch] = useState(0);
  const [round, setRound] = useState(0);

  const getWorlCup = async (id: string) => {
    const docRef = doc(db, "worldcups", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data() as IWorldCup;
      setTournament(data);
      setCurrentRoundItem(data.gifts);
      setRound(data?.gifts.length!);
    } else {
      console.log("Not");
      setError("Does Not Exist");
    }
    setIsLoading(false);
  };

  const onClickPlay = () => {
    setIsPlaying(true);
  };

  // 화면이 처음 시작할때 초기화 할 것들
  useEffect(() => {
    getWorlCup(params.id!);
  }, []);

  const pushResult = async (gift: IGift) => {
    try {
      //   const user = auth.currentUser;
      //   await addDoc(collection(db, "result"), {
      //     player: user?.displayName,
      //     tournament: tournament,
      //     winner: gift,
      //   });
    } catch (error) {
      console.log(error);
    } finally {
      navigate(`/worldcups/play/${tournament?.id}/result`);
      setIsLoading(true);
      setError("");
      setIsPlaying(false);
      setCurrentRoundItem(null);
      setNextRoundItem([]);
      setMatch(0);
      setRound(0);
    }
  };

  const onClickNext = (gift: IGift) => {
    if (currentRoundItem === null) return;
    if (round === 2) {
      pushResult(gift);
    }
    setNextRoundItem((prev) => [...prev, gift]);
    if (match < currentRoundItem?.length / 2 - 1) {
      setMatch((prev) => prev + 1);
    } else {
      // 다음 라운드로 넘어감
      setRound((prev) => prev / 2);
      setIsPlaying(false);
      setCurrentRoundItem(nextRoundItem);
    }
  };

  useEffect(() => {
    if (round !== tournament?.gifts.length) {
      setCurrentRoundItem(nextRoundItem);
      setMatch(0);
      setNextRoundItem([]);
    }
  }, [round]);

  console.log(currentRoundItem);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full h-screen px-40 py-14 bg-red-300">
          {isPlaying ? (
            <div className="w-full h-full grid grid-cols-2">
              {currentRoundItem !== null && (
                <>
                  <span
                    onClick={() => onClickNext(currentRoundItem[2 * match])}
                  >
                    {currentRoundItem[2 * match]?.title}
                  </span>
                  <span
                    onClick={() => onClickNext(currentRoundItem[2 * match + 1])}
                  >
                    {currentRoundItem[2 * match + 1]?.title}
                  </span>
                  <span>{match}</span>
                </>
              )}
            </div>
          ) : (
            <RoundCard onClickPlay={onClickPlay} round={round} />
          )}
        </div>
      )}
    </>
  );
};

export default PlayTournament;
