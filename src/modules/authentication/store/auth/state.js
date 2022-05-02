export default () => ({
  userSession: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  status: localStorage.getItem("status")
    ? localStorage.getItem("status")
    : null,
  access_token: localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : null,
})
