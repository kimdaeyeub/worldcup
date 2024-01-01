import { atom } from "recoil";
import { IGift, IResult, IWorldCup } from "./types";

export const giftDetailState = atom<IGift | null>({
  key: "giftDetailState",
  default: null,
});

export const allGifts = atom<IGift[] | []>({
  key: "allGifts",
  default: [],
});

export const allWorldcups = atom<IWorldCup[] | []>({
  key: "allWorldcups",
  default: [],
});

export const worldcupDetail = atom<IWorldCup | null>({
  key: "worldcupDetail",
  default: null,
});

export const worldCupResult = atom<IResult | null>({
  key: "worldCupResult",
  default: null,
});
