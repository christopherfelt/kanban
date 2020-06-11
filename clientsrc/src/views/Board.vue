<template>
  <div class="board">
    <div class="row">
      <div class="col-12 p-0">
        <img
          class="img-full p-absolute"
          src="https://images.pexels.com/photos/1249586/pexels-photo-1249586.jpeg?auto=compress&cs=tinysrgb&dpr=2"
          alt
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 p-0">
        <div class="d-flex justify-content-between dashboard-header">
          <div>
            <h1 class="text-light p-3 pl-3">{{ activeBoard.title }}</h1>
          </div>

          <div class="mt-3 m-3">
            <div class="mx-4">
              <form v-if="showNewListForm" @submit.prevent="createList">
                <input
                  class="p-absolute slide-left"
                  v-model="newList.title"
                  type="text"
                  placeholder="List title....."
                />
              </form>
            </div>
            <div>
              <button @click="toggleCreateListForm" class="btn plus-btn btn-success">
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
    this.$store.dispatch("getBoardById", this.$route.params.boardId);
    this.$store.dispatch("getListsByBoardId", this.$route.params.boardId);
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
