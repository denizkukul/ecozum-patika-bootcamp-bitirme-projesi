import addMinutes from "date-fns/addMinutes";
import { User } from "../services/server/controllers/auth";
import { deleteCookie, setCookie } from "./cookies";

export const saveUserData = (user: User) => {
  const expires = addMinutes(new Date(), 30).toUTCString();
  setCookie('token', user.token, expires);
  setCookie('userID', String(user.id), expires);
  setCookie('username', user.username, expires);
}

export const clearUserData = () => {
  deleteCookie('token');
  deleteCookie('userID');
  deleteCookie('username');
}