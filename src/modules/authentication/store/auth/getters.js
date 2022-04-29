

export const currentState = (state) => {
  return state.status || localStorage.getItem("status")
}

export const userSession = (state) => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"))
  }
  return state.user
}


