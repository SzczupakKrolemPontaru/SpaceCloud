import { createStore } from 'vuex'

export default createStore({
  state: {
    userToken: null,
    userName: null,
  },
  mutations: {
    setToken(state, token) {
      state.userToken = token;
    },
    clearToken(state) {
      state.userToken = null;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    clearUserName(state) {
      state.userName = null;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    clearToken({ commit }) {
      commit("clearToken");
    },
    setUserName({ commit }, userName) {
      commit("setUserName", userName);
    },
    clearUserName({ commit }) {
      commit("clearUserName");
    },
  },
  getters: {
    getUserToken: (state) => state.userToken,
    getUserName: (state) => state.userName,
  },
});
