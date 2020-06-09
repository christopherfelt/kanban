import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
  },
  mutations: {
    activeBoard(state, board) {
      state.activeBoard = board;
      console.log(state.activeBoard.id);
    },
    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile");
        commit("setUser", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    //#endregion

    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get("boards").then((res) => {
        const dateOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        res.data.forEach((b) => {
          let date = new Date(b.createdAt);
          b.creationDate = date.toLocaleDateString("en-US", dateOptions);
        });
        commit("setBoards", res.data);
      });
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post("boards", boardData).then((serverBoard) => {
        dispatch("getBoards");
      });
    },
    async getBoardById({ commit, dispatch }, id) {
      let data = await api.get(`boards/${id}`);
      commit("activeBoard", data.data);
    },
    //#endregion

    //#region -- LISTS --
    async createList({ commit, dispatch }, data) {
      let res = await api.post("lists", data);
      commit("setActiveLists", res.data);
    },

    async getListsByBoardId({ commit, dispatch }, boardId) {
      debugger;
      let res = await api.get(`lists/boardId/?boardId=${boardId}`);
      console.log(res.data);
    },
    //#endregion
  },
});
