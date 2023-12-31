import { atom } from "recoil";

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

export const giftDetailState = atom({
  key: "giftDetailState",
  default: <IGift>{},
});
