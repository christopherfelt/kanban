<template>
  <div class="boards container">
    WELCOME TO THE BOARDS!!!
    <form @submit.prevent="addBoard">
      <input
        type="text"
        placeholder="title"
        v-model="newBoard.title"
        required
      />
      <input
        type="text"
        placeholder="description"
        v-model="newBoard.description"
      />
      <button type="submit">Create Board</button>
    </form>
    <div class="row d-flex justify-content-center mt-3">
      <div class="col-8">
        <ul class="list-group" v-for="board in boards" :key="board.id">
          <router-link :to="{ name: 'board', params: { boardId: board.id } }">
            <li class="list-group-item text-left">
              {{ board.title }}
              <span class="float-right"> {{ board.creationDate }} </span>
            </li>
          </router-link>
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
        description: "",
      },
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
  },
};
</script>
