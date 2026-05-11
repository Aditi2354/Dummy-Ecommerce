import type {UserType}  from "../types/authTypes";

export const getUsers = (): UserType[] => {

  const users = localStorage.getItem("users");

  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: UserType[]) => {

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );
};


export const saveSession = (user: UserType) => {

  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );
};


export const getSession = (): UserType | null => {

  const user = localStorage.getItem("currentUser");

  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {

  localStorage.removeItem("currentUser");
};