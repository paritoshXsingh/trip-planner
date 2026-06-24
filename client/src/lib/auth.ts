export const getToken = () => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const login = (token: string) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
};
