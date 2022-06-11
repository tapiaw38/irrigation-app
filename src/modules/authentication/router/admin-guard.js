import store from '../../../store/index'

const isAdminGuard = (to, from, next) => {

  const user = store().getters['auth/userSession']

  if (user.is_admin) next()
}

export default isAdminGuard
