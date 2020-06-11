import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
Vue.use(Vuex);

// api for getting quote
// @ts-ignore
const _quoteApi = Axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/quotes",
  timeout: 3000,
});

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
    clock: {},
    boards: [],
    activeBoard: {},
    activeLists: [],
    activeTasks: [],
    activeComments: [],
    showNewBoardForm: false,
    showEditBoardForm: [],
    showNewListForm: false,
    // NOT IMPLEMENTED YET
    showEditListForm: false,
    showNewTaskForm: [],
    showEditTaskForm: false,
    // NOT IMPLEMENTED YET
    quote: "",
  },
  mutations: {
    setQuote(state, quote) {
      state.quote = quote;
    },
    updateClock(state, data) {
      state.clock = data;
    },
    showNewTaskForm(state, data) {
      Vue.set(state.showNewTaskForm, data.listId, data.update);
    },
    toggleCreateListForm(state) {
      state.showNewListForm = !state.showNewListForm;
    },
    toggleEditBoardForm(state, data) {
      Vue.set(state.showEditBoardForm, data.boardId, data.update);
    },
    toggleNewBoardForm(state, data) {
      state.showNewBoardForm = !state.showNewBoardForm;
    },
    activeBoard(state, board) {
      state.activeBoard = board;
    },
    setActiveLists(state, lists) {
      state.activeLists = lists;
    },

    setActiveTasks(state, tasks) {
      Vue.set(state.activeTasks, tasks.id, tasks.data);
    },

    setActiveComments(state, comments) {
      Vue.set(state.activeComments, comments.id, comments.data);
    },

    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
  },
  actions: {
    //#region utilities section
    async addCollaborator({ commit, dispatch }, data) {
      console.log("board id is: " + data.boardId);
      try {
        let res = await api.put(`boards/${data.boardId}/addcollaborator`, data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    },
    updateClock({ commit, dispatch }, data) {
      commit("updateClock", data);
    },
    setQuote({ commit, dispatch }) {
      _quoteApi.get("").then((res) => {
        commit("setQuote", res.data.quote);
      });
    },
    //#endregion
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
    toggleEditBoardForm({ commit, dispatch }, data) {
      commit("toggleEditBoardForm", data);
    },
    toggleNewBoardForm({ commit, dispatch }) {
      commit("toggleNewBoardForm");
    },

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
      console.log("incoming data : " + data.update.title);

      try {
        let res = await api.put(`boards/${data.boardId}`, data.update);
        console.log("data from api res: " + res.data.title);

        dispatch("getBoards");
      } catch (error) {
        console.error(error);
      }
    },

    //#endregion

    //#region -- LISTS --
    toggleCreateListForm({ commit }) {
      commit("toggleCreateListForm");
    },
    async createList({ commit, dispatch }, data) {
      let res = await api.post("lists", data);
      dispatch("getListsByBoardId", data.boardId);
    },

    async getListsByBoardId({ commit, dispatch }, boardId) {
      try {
        console.log("made it get list by board id");
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
    showNewTaskForm({ commit, dispatch }, data) {
      commit("showNewTaskForm", data);
    },
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
        dispatch("getTaskByListId", res.data.listId);
      } catch (error) {
        console.error(error);
      }
    },

    async moveTaskToNewList({ commit, dispatch }, data) {
      try {
        let res = await api.put(`tasks/${data.taskId}`, data.taskData);
        console.log("board id in store", data.boardId);
        // router.push({ name: "board", params: { boardId: data.boardId } });
        // dispatch("getListByObjectId", data.boardId);
        dispatch("getTaskByListId", data.oldListId);
        dispatch("getTaskByListId", data.newListId);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteTask({ commit, dispatch }, data) {
      try {
        let res = await api.delete(`tasks/${data.id}`);
        dispatch("getTaskByListId", data.listId);
      } catch (error) {
        console.error(error);
      }
    },

    async editTask({ commit, dispatch }, data) {
      try {
        let res = await api.put(`tasks/${data.id}`, data);
        dispatch("getTaskByListId", data.listId);
      } catch (error) {
        console.error(error);
      }
    },

    //#endregion

    //#region  --Comments--
    async getCommentsByTaskId({ commit, dispatch }, taskId) {
      try {
        let res = await api.get(`tasks/${taskId}/comments`);
        let commentObj = { id: taskId, data: res.data };
        commit("setActiveComments", commentObj);
      } catch (error) {
        console.error(error);
      }
    },

    async addComment({ commit, dispatch }, data) {
      try {
        let res = await api.post("comments", data);
        dispatch("getCommentsByTaskId", data.taskId);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteComment({ commit, dispatch }, data) {
      try {
        let res = await api.delete(`comments/${data.id}`);
        dispatch("getCommentsByTaskId", data.taskId);
      } catch (error) {
        console.error(error);
      }
    },

    //#endregion
  },
});
