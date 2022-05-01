export default () => ({
  userSession: JSON.parse(localStorage.getItem("user")) || {},
  status: localStorage.getItem("status") || null,
  idToken: null,
})
