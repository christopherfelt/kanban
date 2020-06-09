<template>
  <div class="boards container">
    <h4>Welcome {{"some guy"}}</h4>
    <div class="d-flex align-items-end">
      <img class="d-inline profile-img p-1 m-1" :src="user.picture" alt="no profile image" />
      <p class="d-inline">{{user.name}}</p>
    </div>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button type="submit">Create Board</button>
    </form>
    <div class="row d-flex justify-content-center mt-3">
      <div class="col-8">
        <ul class="list-group" v-for="board in boards" :key="board.id">
          <!-- <router-link :to="{ name: 'board', params: { boardId: board.id } }"> -->
          <li @click="routeToBoard(board.id)" class="list-group-item text-left">
            {{ board.title}}
            <br />
            <span class>{{ board.creationDate }}</span>
          </li>
          <!-- </router-link> -->
        </ul>
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
      }
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
.profile-img {
  border-radius: 50%;
  height: 4rem;
  widows: 4rem;
}
</style>