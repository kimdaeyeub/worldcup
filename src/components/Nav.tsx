import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import {
  GithubAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FaGithub } from "react-icons/fa";

const Nav = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>();
  const [isOpen, setIsOpen] = useState(false);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
    }
  };

  const openDropDownMenu = () => {
    setIsOpen(!isOpen);
  };

  const onClickLogo = () => {
    navigate("/");
  };

  const onClickGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const response = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    setIsLoading(false);
  }, []);

  return (
    <div className="w-full px-8 sm:px-10 md:px-12 lg:px-24 xl:px-44 py-8 border-b border-black flex justify-between items-center">
      <h1
        onClick={onClickLogo}
        className="sm:text-4xl text-2xl font-semibold cursor-pointer font-dancingScript text-red-500"
      >
        GiftWorldCup
      </h1>
      <div className="flex justify-center items-center space-x-6">
        <Link to="/gifts">
          <span className="text-xl font-medium font-SingleDay h-full md:flex hidden">
            선물 조회하기
          </span>
        </Link>
        {user && (
          <>
            <Link to="/gifts/add">
              <span className="text-xl font-medium h-full md:flex hidden">
                선물 추가하기
              </span>
            </Link>
            <Link to="/worldcups/add">
              <span className="text-xl font-medium h-full md:flex hidden">
                월드컵 추가하기
              </span>
            </Link>
          </>
        )}
        {user ? (
          <div className="relative">
            <img
              onClick={openDropDownMenu}
              src={user!.photoURL!}
              alt="avatar_image"
              className="w-12 h-12 rounded-full object-cover"
            />
            {isOpen && (
              <div className="w-60 bg-gray-100 rounded-lg absolute right-0 mt-4 flex flex-col justify-center items-center z-20">
                <button
                  onClick={logOut}
                  className="w-full py-4 border-b border-gray-300"
                >
                  로그아웃
                </button>
                <Link to="/gifts">
                  <button className="w-full py-4 border-b border-gray-300 md:hidden flex">
                    선물 조회하기
                  </button>
                </Link>
                <Link to="/gifts/add">
                  <button className="w-full py-4 border-b border-gray-300 md:hidden flex">
                    선물 추가하기
                  </button>
                </Link>
                <Link to="/worldcups/add">
                  <button className="w-full py-4 border-b border-gray-300 md:hidden flex">
                    월드컵 추가하기
                  </button>
                </Link>
                {/* <button className="w-full py-4">프로필 조회</button> */}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onClickGithubLogin}
            className="px-4 py-2 rounded-lg bg-black text-white text-xl flex justify-center items-center space-x-2"
          >
            <FaGithub />
            <span>Login</span>
          </button>
        )}
      </div>
    </div>
  );
};
export default Nav;
