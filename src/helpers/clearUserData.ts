import { deleteCookie } from "./cookies";

export const clearUserData = () => {
  sessionStorage.clear();
  deleteCookie('token');
  deleteCookie('userID');
  deleteCookie('username');
}