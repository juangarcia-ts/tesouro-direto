export const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const setToken = token => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const setUser = user => {
  const token = JSON.parse(localStorage.getItem("token"));

  const newToken = { ...token, user };

  localStorage.setItem("token", JSON.stringify(newToken));
};
