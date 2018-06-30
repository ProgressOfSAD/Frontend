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
    setLogin (state, b) {
      state.isLogin = b
    },
    reset (state) {
      state.userId = ''
    }
  }
})
