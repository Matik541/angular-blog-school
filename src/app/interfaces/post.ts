import { User } from "./user";

export interface Post {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
  author: User;
}
