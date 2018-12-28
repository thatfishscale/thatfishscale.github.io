import { auth } from '~/services/fireinit'

export const state = () => ({
  user: null,
  videos: null
})

export const getters = {
  activeUser: (state, getters) => {
    return state.user
  },
  getVideos: (state, getters) => {
    return state.videos
  }
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setVideos (state, payload) {
    state.videos = payload
  }
}

export const actions = {
  // admin@fishscale.com fishscale
  async signInWithEmailAndPassword ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(payload.email, payload.password)
      resolve(payload)
    })
  }
}
