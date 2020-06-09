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
    activeLists: [],
    activeTasks: [],
  },
  mutations: {
    activeBoard(state, board) {
      state.activeBoard = board;
      console.log(state.activeBoard.id);
    },
    setActiveLists(state, lists) {
      state.activeLists = lists;
    },

    setActiveTasks(state, tasks) {
      Vue.set(state.activeTasks, tasks.id, tasks.data);
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
    async deleteBoard({ commit, dispatch }, id) {
      try {
        await api.delete(`boards/${id}`);
        dispatch("getBoards");
      } catch (error) {
        console.error(error);
      }
    },
    async editBoard({ commit, dispatch }, data) {
      try {
        let res = await api.put(`boards/${data.boardId}`, data.update);
        dispatch("getBoards");
      } catch (error) {
        console.error(error);
      }
    },

    //#endregion

    //#region -- LISTS --
    async createList({ commit, dispatch }, data) {
      let res = await api.post("lists", data);
      dispatch("getListsByBoardId", data.boardId);
    },

    async getListsByBoardId({ commit, dispatch }, boardId) {
      try {
        let res = await api.get(`lists/boardId/?boardId=${boardId}`);
        commit("setActiveLists", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async editList({ commit, dispatch }, data) {
      try {
        let res = await api.put(`lists/${data.listId}`, data.update);
        dispatch("getListsByBoardId", data.boardId);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteList({ commit, dispatch }, data) {
      console.log("delorting list");

      try {
        let res = await api.delete(`lists/${data.listId}`);
        dispatch("getListsByBoardId", data.boardId);
      } catch (error) {
        console.error(error);
      }
    },

    //#endregion

    //#region -- TASKS --
    async getTaskByListId({ commit, dispatch }, listId) {
      try {
        let res = await api.get(`lists/${listId}/tasks`);
        let taskObj = { id: listId, data: res.data };
        commit("setActiveTasks", taskObj);
      } catch (error) {
        console.error(error);
      }
    },
    async addTask({ commit, dispatch }, data) {
      try {
        let res = await api.post("tasks", data);
        console.log(res.data);
        dispatch("getTaskByListId", res.data.listId);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
  },
});
