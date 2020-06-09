<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="bg-primary shadow p-1 m-1">
      <h4>{{ list.title }}</h4>
    </div>
    <div>
      <input v-model="listForm.title" type="text" placeholder="edit list name" />
      <button @click="editList" class="btn btn-light">edit</button>
      <button @click="deleteList" class="btn btn-danger">Delete</button>
    </div>
    <ul class="list-group">
      <task v-for="task in activeTasks" :key="task.id" :task="task" />
    </ul>
    <div>
      <form @submit.prevent="addTask" action>
        <input v-model="taskData.body" type="text" placeholder="task" />
        <button class="btn btn-success">
          <i class="fas fa-plus"></i>
        </button>
      </form>
      {{taskData.body}}
    </div>
  </div>
</template>

<script>
import Task from "./TaskComponent.vue";
export default {
  data() {
    return {
      taskData: {},
      listForm: {}
    };
  },
  mounted() {
    this.$store.dispatch("getTaskByListId", this.list.id);
    console.log("adding list item");
  },
  // data(){
  //   taskListData:  {
  //     listId:
  //   },
  // },
  computed: {
    activeTasks() {
      return this.$store.state.activeTasks[this.list.id];
    }
  },
  props: ["list"],
  components: {
    Task
  },
  methods: {
    deleteList() {
      let data = {
        listId: this.list.id,
        boardId: this.list.boardId
      };
      this.$store.dispatch("deleteList", data);
    },
    editList() {
      let data = {
        boardId: this.list.boardId,
        listId: this.list.id,
        update: {
          title: this.listForm.title
        }
      };
      this.$store.dispatch("editList", data);
    },
    addTask() {
      let data = {
        listId: this.list.id,
        boardId: this.list.boardId,
        body: this.taskData.body
      };
      this.$store.dispatch("addTask", data);
    }
  }
};
</script>

<style></style>
