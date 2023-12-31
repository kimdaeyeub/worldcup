export interface IGift {
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

export interface IWorldCup {
  creator: string;
  title: string;
  description: string;
  gifts: IGift[];
  round: number;
  id: string;
}
