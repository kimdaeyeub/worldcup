import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { allGifts } from "../atom";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import { IGift } from "../types";
import { useNavigate } from "react-router-dom";

const AddWorldcup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [gifts, setGifts] = useRecoilState(allGifts);

  // 옵션 박스를 열기 위한 값
  const [openDropDownBtn, setOpenDropDownBtn] = useState(false);
  // 월드컵에 추가하기 위해 아이템들을 저장하는 곳
  const [selectItem, setSelectItem] = useState<IGift[]>([]);
  // 옵션 요소에서 선택한 값을 저장하기 위함
  const [option, setOption] = useState("대진 결정");
  // 대진이 8강인지, 16강인지, 32강인지 구별하기 위한 숫자
  const [num, setNum] = useState<number>(8);
  //api로부터 선물 목록을 받아와서 저장할 변수
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onClickDropDown = () => {
    setOpenDropDownBtn(!openDropDownBtn);
  };
  const onClickOption = (num: number) => {
    setNum(num);
    setOption(`${num}강 대진`);
    setOpenDropDownBtn(false);
  };

  const setItems = (item: IGift) => {
    if (isLoading) return;
    if (selectItem.includes(item)) {
      deleteItems(item);
    } else {
      if (num === selectItem.length) {
        setError("해당 대진의 선물 갯수를 초과했습니다");
        return window.confirm("해당 대진의 선물 갯수를 초과했습니다");
      }
      setSelectItem([...selectItem, item]);
    }
  };
  const deleteItems = (item: IGift) => {
    const itemNumber = selectItem.indexOf(item);
    const beforeArr = selectItem.slice(0, itemNumber);
    const afterArr = selectItem.slice(itemNumber + 1, selectItem.length);
    setSelectItem([...beforeArr, ...afterArr]);
  };

  const onClickAddWorldCup = async () => {
    const user = auth.currentUser;

    if (!user) return;

    if (num !== selectItem.length) return;
    const newWorldCup = {
      title,
      description,
      gifts: selectItem,
      creator: user?.displayName,
      round: num,
    };

    console.log(newWorldCup);
    //firebase에 데이터 넣는 기능 추가
    try {
      await addDoc(collection(db, "worldcups"), newWorldCup);
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  };

  const getAllGifts = async () => {
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
    if (gifts.length === 0) {
      getAllGifts();
    }

    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {gifts.length === 0 ? (
            <div>Empty...</div>
          ) : (
            <div className="w-full h-full flex flex-col justify-start items-end px-8 sm:px-10 md:px-12 lg:px-24 xl:px-44 py-8">
              <div className="w-full mb-8 flex md:flex-row flex-col-reverse justify-between items-center md:space-x-10">
                <div className="w-full flex justify-center md:items-center md:space-x-4 md:flex-row flex-col items-start">
                  <span className="text-nowrap text-xl font-medium md:mb-0 mb-5">
                    제목:
                  </span>
                  <input
                    value={title}
                    onChange={onChangeTitle}
                    placeholder="월드컵 이름..."
                    className="bg-gray-100 px-4 py-2 rounded-md w-full outline-none"
                  />
                </div>
                <div className="md:w-64 w-full relative mb-10 md:mb-0">
                  <button
                    onClick={onClickDropDown}
                    className="w-full px-6 py-2 flex justify-between items-center space-x-8 border rounded-md"
                  >
                    <span>{option}</span>
                    <svg
                      width={20}
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
                        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </button>
                  {openDropDownBtn && (
                    <motion.div
                      initial={{ opacity: 0, y: -100 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full bg-slate-200 rounded-md flex flex-col justify-center items-center absolute top-full left-0 right-0 mt-4"
                    >
                      <span
                        onClick={() => onClickOption(8)}
                        className="w-full py-4 px-6 cursor-pointer"
                      >
                        8강 대진
                      </span>
                      <span
                        onClick={() => onClickOption(16)}
                        className="w-full py-4 px-6 cursor-pointer"
                      >
                        16강 대진
                      </span>
                      <span
                        onClick={() => onClickOption(32)}
                        className="w-full py-4 px-6 cursor-pointer"
                      >
                        32강 대진
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-start md:flex-row flex-col w-full mb-4 md:space-x-4">
                <span className="text-nowrap text-xl font-medium md:mb-0 mb-5">
                  설명:
                </span>
                <textarea
                  value={description}
                  onChange={onChangeDescription}
                  className="w-full bg-gray-100 rounded-lg resize-none outline-none px-4 py-2"
                  rows={5}
                />
              </div>
              <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-8">
                <div className="w-full min-h-[700px] rounded-md flex flex-col p-3 space-y-3 border border-slate-300">
                  <div className="px-4 py-3 border-b-2 border-slate-400 mb-3">
                    <span className="text-xl font-medium">선물 목록</span>
                  </div>
                  {gifts.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setItems(item)}
                      className={
                        ` flex justify-start items-center px-4 py-3 rounded-lg border-2 border-slate-300 cursor-pointer` +
                        `${
                          !selectItem.includes(item)
                            ? ""
                            : " bg-green-400 text-white transition-colors"
                        }`
                      }
                    >
                      <img
                        src={item.photo}
                        alt="gift_image"
                        width={300}
                        height={300}
                        className="w-20 h-20 rounded-full object-cover mr-5"
                      />
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full min-h-[700px] rounded-md flex flex-col p-3 space-y-3 border border-slate-300">
                  <div className="px-4 py-3 border-b-2 border-slate-400 mb-3 flex justify-between items-center">
                    <span className="text-xl font-medium">선택한 선물</span>
                    <span>{selectItem.length} 개</span>
                  </div>
                  {selectItem.map((item) => (
                    <div
                      key={`${item.id}select`}
                      onClick={() => deleteItems(item)}
                      className="bg-white flex justify-between items-center px-4 py-3 rounded-lg border-2 border-slate-300 cursor-pointer"
                    >
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={onClickAddWorldCup}
                className="px-4 py-2 bg-black text-white mt-3 rounded-lg"
              >
                등록하기
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AddWorldcup;
