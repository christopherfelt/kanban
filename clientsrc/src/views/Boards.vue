<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-12 p-0">
          <img
            class="img-full p-absolute"
            src="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&dpr=2"
            alt
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="boards">
            <h4 class="p-2 m-2">Welcome {{"some guy"}}</h4>
            <div class="d-flex align-items-end">
              <img class="d-inline profile-img p-1 m-1" :src="user.picture" alt="no profile image" />
              <p class="d-inline">{{user.name}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-9 col-lg-8 m-auto p-1">
          <form class="pb-3" @submit.prevent="addBoard">
            <div class="boards-card shadow p-2">
              <input
                class="p-1 mt-1 w-100"
                type="text"
                placeholder="title"
                v-model="newBoard.title"
                required
              />
              <br />
              <input
                class="p-1 mt-1 w-100"
                type="text"
                placeholder="description"
                v-model="newBoard.description"
              />
              <br />
              <div class="text-center">
                <button class="btn btn-success mt-1" type="submit">
                  <i class="fas fa-plus"></i>
                  <p class="d-inline p-1 m-1 px-3">Board</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-9 col-lg-8 m-auto p-2 boards-card shadow">
          <ul class="list-group" v-for="board in boards" :key="board.id">
            <!-- <router-link :to="{ name: 'board', params: { boardId: board.id } }"> -->
            <li class="text-primary list-group-item d-flex justify-content-between w-100 mt-2">
              <div @click="routeToBoard(board.id)">
                <h5 class="w-100 m-1 p-1 action">{{ board.title}}</h5>
                <p class="w-100 m-1 p-1 text-center">{{ board.creationDate }}</p>
              </div>
              <div class="w-100 text-right m-1 p-1">
                <!-- TODO LINK THESE BUTTONS UP TO ACTIONS -->
                <i
                  @click="editBoard(board.id)"
                  class="fas fa-pencil-alt text-dark px-1 mx-1 action"
                ></i>
                <input v-model="editForm.title" placeholder="edit title" />
                <input v-model="editForm.description" placeholder="edit description " />
                <i
                  @click="deleteBoard(board.id)"
                  class="fas fa-trash-alt text-danger px-1 mx-1 action"
                ></i>
              </div>
            </li>
            <!-- </router-link> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },

  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      },
      editForm: {}
    };
  },

  computed: {
    boards() {
      return this.$store.state.boards;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    deleteBoard(id) {
      this.$store.dispatch("deleteBoard", id);
    },
    editBoard(id) {
      let data = {
        boardId: id,
        update: {
          title: this.editForm.title,
          description: this.editForm.description
        }
      };
      this.$store.dispatch("editBoard", data);
    },
    //route user to the board page view by board id
    routeToBoard(id) {
      this.$router.push({ name: "board", params: { id: id } });
    },
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  }
};
</script>


<style>
.boards-card {
  background: rgba(206, 145, 65, 0.514);
  border-radius: 8px;
}
.profile-img {
  border-radius: 50%;
  height: 4rem;
  widows: 4rem;
}
</style>