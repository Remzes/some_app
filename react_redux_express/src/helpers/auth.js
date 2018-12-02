export const setTokenToLocalStorage = token => {
  localStorage.setItem("jwtToken", token)
}

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("jwtToken")
}

export const deleteTokenFromLocalStorage = () => {
  localStorage.removeItem("jwtToken")
}