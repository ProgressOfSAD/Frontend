import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    id: -1,
    avatar: '',
    isLogin: false
  },
  mutations: {
    setName (state, name) {
      state.name = name
    },
    setId (state, id) {
      state.id = id
    },
    setAvatar (state, a) {
      state.avatar = a
    },
    changeLogin (state) {
      state.isLogin = !state.isLogin
    },
    reset (state) {
      state.userId = ''
    }
  }
})
