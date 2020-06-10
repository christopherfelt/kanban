<template>
  <div class="board">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between">
          <div>
            <h1>{{ activeBoard.title }}</h1>
            <small>{{ activeBoard.description }}</small>
          </div>

          <div class="mt-2">
            <div class="mx-3">
              <form v-if="showNewListForm" @submit.prevent="createList">
                <input class="p-absolute slide-left" v-model="newList.title" type="text" />
              </form>
            </div>
            <div>
              <button @click="toggleCreateListForm" class="btn plus-btn btn-success z-1">
                <i title="add list" class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      newList: {}
    };
  },
  name: "board",
  props: ["board"],
  computed: {
    showNewListForm() {
      return this.$store.state.showNewListForm;
    },
    activeBoard() {
      return this.$store.state.activeBoard;
    },
    activeLists() {
      return this.$store.state.activeLists;
    }
  },
  methods: {
    toggleCreateListForm() {
      this.$store.dispatch("toggleCreateListForm");
    },
    createList() {
      let data = {
        boardId: this.activeBoard.id,
        title: this.newList.title,
        body: this.newList.body,
        color: "#2255aa"
      };
      this.$store.dispatch("createList", data);
    }
  },
  components: {
    ListComponent
  }
};
</script>


<style>
.z-1 {
  z-index: 1;
}
.z-2 {
  z-index: 2;
}
</style>