import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { worldcupDetail } from "../atom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import { IGift, IWorldCup } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import RoundCard from "../components/RoundCard";
import PlayCard from "../components/PlayCard";
import SelectCard from "../components/SelectCard";

const PlayTournament = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useRecoilState(worldcupDetail);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectItem, setSelectItem] = useState(0);
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
    let id = "";
    try {
      const user = auth.currentUser;
      if (!user) return;
      const data = await addDoc(collection(db, "results"), {
        player: user?.displayName,
        tournament: tournament,
        winner: gift,
      });
      id = data.id;
      const giftRef = doc(db, "gifts", gift.id);

      await updateDoc(giftRef, { count: increment(1) });
    } catch (error) {
      console.log(error);
    } finally {
      navigate(`/worldcups/result/${id}`);
      setIsLoading(true);

      setIsPlaying(false);
      setCurrentRoundItem(null);
      setNextRoundItem([]);
      setMatch(0);
      setRound(0);
    }
  };

  const onClickNext = (gift: IGift, id: number) => {
    if (currentRoundItem === null) return;
    setSelectItem(id);

    if (round === 2) {
      return pushResult(gift);
    }
    setTimeout(() => {
      setSelectItem(0);
      setNextRoundItem((prev) => [...prev, gift]);
      if (match < currentRoundItem?.length / 2 - 1) {
        setMatch((prev) => prev + 1);
      } else {
        // 다음 라운드로 넘어감
        setRound((prev) => prev / 2);
        setIsPlaying(false);
        setCurrentRoundItem(nextRoundItem);
      }
    }, 600);
  };

  useEffect(() => {
    if (round !== tournament?.gifts.length) {
      setCurrentRoundItem(nextRoundItem);
      setMatch(0);
      setNextRoundItem([]);
    }
  }, [round]);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full min-h-screen px-8 sm:px-10 md:px-12 lg:px-24 xl:px-28 py-14 bg-red-300 flex flex-col justify-center items-center">
          {isPlaying && (
            <span className="mb-10 text-2xl font-medium">
              {round !== 2 ? `${round}강 ${match + 1}번째 매치중..` : "결승전"}
            </span>
          )}
          {isPlaying ? (
            <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-3">
              {currentRoundItem !== null && (
                <>
                  {selectItem === 1 ? (
                    <SelectCard />
                  ) : (
                    <PlayCard
                      {...currentRoundItem[2 * match]}
                      onSelect={() =>
                        onClickNext(currentRoundItem[2 * match], 1)
                      }
                    />
                  )}
                  {selectItem === 2 ? (
                    <SelectCard />
                  ) : (
                    <PlayCard
                      {...currentRoundItem[2 * match + 1]}
                      onSelect={() =>
                        onClickNext(currentRoundItem[2 * match + 1], 2)
                      }
                    />
                  )}
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
