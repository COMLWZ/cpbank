import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: null,
    token: '',
    isStaff: false,
  },
  getters: {},
  mutations: {
    setUserInfo: (state, data) => {
      state.userInfo = data
    }
  },
  actions: {},
  modules: {}
})
