import { auth } from '~/services/fireinit'

export default context => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        return resolve(store.commit('main/setUser', user))
      }

      return resolve()
    })
  })
}
