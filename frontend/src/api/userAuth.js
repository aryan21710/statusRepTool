import { LOGIN_URL } from "../common/mydotenv";



export const saveJwtToLocalStorage = (jwtFromServer, signInInfo, cb) => {
  if (typeof window != "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwtFromServer));
    localStorage.setItem("signInInfo", JSON.stringify(signInInfo));
    cb();
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    localStorage.removeItem("signInInfo");

    return fetch(`${LOGIN_URL}/signout`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((err) => err);
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  } else {
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  }
};
