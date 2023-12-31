import {
  Avatar,
  Button,
  Divider,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Show,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import {
  GithubAuthProvider,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

const Nav = () => {
  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      const userCredentails = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentails.user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      onClose();
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
    }
  };

  const onClickLogo = () => {
    navigate("/");
  };

  const onClickGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const response = await signInWithPopup(auth, provider);

      console.log(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
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

  console.log(user);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <HStack
            px={{
              lg: "150px",
              md: "80px",
              sm: "55px",
            }}
            py={25}
            borderBottomWidth={"medium"}
            borderBottomColor={"gray"}
            justifyContent={"space-between"}
          >
            <Text
              onClick={onClickLogo}
              fontWeight={"600"}
              fontSize={"xxx-large"}
            >
              Logo
            </Text>
            <HStack spacing={10}>
              <Show above="md">
                <Text fontSize={"large"} fontWeight={"600"}>
                  선물 조회하기
                </Text>
                <Text fontSize={"large"} fontWeight={"600"}>
                  <Link to="/gifts/add">선물 추가하기</Link>
                </Text>
                <Text fontSize={"large"} fontWeight={"600"}>
                  월드컵 추가하기
                </Text>
              </Show>
              {user ? (
                <Menu>
                  <MenuButton>
                    <Avatar src={user.photoURL ? user.photoURL : ""} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={logOut}>로그아웃</MenuItem>
                    <MenuItem>프로필</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button onClick={onOpen}>로그인</Button>
              )}
              {/* <Text>{user?.email}</Text> */}
            </HStack>
          </HStack>
          <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>header</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={2}>
                  <Input
                    onChange={onChange}
                    type="email"
                    value={email}
                    name="email"
                    placeholder="Email"
                    px={3}
                    py={5}
                  />
                  <Input
                    onChange={onChange}
                    type="password"
                    value={password}
                    title="password"
                    placeholder="Password"
                  />
                  <Divider my={5} />
                  <Button
                    fontSize={"larger"}
                    size={"lg"}
                    onClick={handleSubmit}
                    w={"100%"}
                  >
                    로그인
                  </Button>
                  <Button
                    onClick={onClickGithubLogin}
                    bgColor={"black"}
                    textColor={"white"}
                    fontSize={"larger"}
                    w={"100%"}
                    size={"lg"}
                  >
                    Github
                  </Button>
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};
export default Nav;
