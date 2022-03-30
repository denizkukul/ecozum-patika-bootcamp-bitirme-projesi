import { User } from "../services/server/controllers/auth";
import { deleteCookie, setCookie } from "./cookies";

export const saveUserData = (arg: { user: User, authPersistence: boolean }) => {
  if (arg.authPersistence) {
    setCookie('token', arg.user.token); //TODO: set expiration date
    setCookie('userID', String(arg.user.id));
    setCookie('username', arg.user.username);
  }
  else {
    sessionStorage.setItem('token', arg.user.token);
    sessionStorage.setItem('userID', String(arg.user.id));
    sessionStorage.setItem('username', arg.user.username);
  }
}

export const clearUserData = () => {
  sessionStorage.clear();
  deleteCookie('token');
  deleteCookie('userID');
  deleteCookie('username');
}