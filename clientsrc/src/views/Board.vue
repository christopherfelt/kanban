<template>
  <div class="board">
    <h1>{{ activeBoard.title }}</h1>
    <p>{{ activeBoard.description }}</p>
    <button class="btn btn-success">
      <i title="add list" class="fas fa-plus"></i>
    </button>
    <form @submit.prevent="createList">
      <input v-model="newList.title" type="text" placeholder="list title" />
      <!-- NOTE ONLY NEED ONE INPUT...... NOW THAT I THINK ABOUT IT -->
      <input v-model="newList.body" type="text" placeholder="list body" />
      <button type="submit" class="btn btn-success">
        <i class="fas fa-plus"></i>
      </button>
      <!-- TODO ADD A COLOR SELECTOR AND ALL THAT JAZZ -->
    </form>
    <div class="row">
      <ListComponent v-for="list in activeLists" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import ListComponent from "../components/ListComponent.vue";
export default {
  mounted() {
    this.$store.dispatch("getBoardById", this.$route.params.id);
    this.$store.dispatch("getListsByBoardId", this.$route.params.id);
  },

  data() {
    return {
      newList: {},
    };
  },
  name: "board",
  props: ["board"],
  computed: {
    activeBoard() {
      return this.$store.state.activeBoard;
    },
    activeLists() {
      return this.$store.state.activeLists;
    },
  },
  methods: {
    createList() {
      let data = {
        boardId: this.activeBoard.id,
        title: this.newList.title,
        body: this.newList.body,
        color: "#2255aa",
      };

      this.$store.dispatch("createList", data);
    },
  },
  components: {
    ListComponent,
  },
};
</script>
