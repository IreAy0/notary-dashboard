export const getToken = () => {
  const tokenString = localStorage.getItem('accessToken');

  return tokenString;
}


export const saveToken = (userToken) => {
  localStorage.setItem('accessToken', JSON.stringify(userToken));
  // setToken(userToken.token);
}
