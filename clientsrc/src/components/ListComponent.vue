<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="bg-light shadow p-1 m-1">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h4>{{ list.title }}</h4>
        </div>
        <div class="p-1">
          <i @click="editList" class="fa fa-pencil text-light text-dark mx-1 action"></i>
          <i @click="deleteList" class="fa fa-trash-alt text-danger action"></i>
        </div>
      </div>
      <div>
        <!-- <input v-model="listForm.title" type="text" placeholder="edit list name" /> -->
      </div>
      <ul class="list-group">
        <task v-for="task in activeTasks" :key="task.id" :task="task" />
      </ul>
      <div class="p-1 m-1">
        <div class="d-flex justify-content-center align-items-start btn btn-success plus-btn-sm">
          <i @click="toggleNewTaskForm" class="fas fa-plus"></i>
        </div>
        <!-- -->
        <div class>
          <div class="p-relative" v-if="showNewTaskForm">
            <form @submit.prevent="addTask">
              <input
                class="p-absolute slide-right"
                v-model="taskData.body"
                type="text"
                placeholder="new task...."
              />
            </form>
          </div>
        </div>
      </div>

      <!--  -->
    </div>
  </div>
</template>

<script>
import Task from "./TaskComponent.vue";
export default {
  data() {
    return {
      taskData: {},
      listForm: {},
      isTaskFormShowing: false
    };
  },
  mounted() {
    this.$store.dispatch("getTaskByListId", this.list.id);
    console.log("adding list item");
  },

  computed: {
    showNewTaskForm() {
      return this.$store.state.showNewTaskForm[this.list.id];
    },
    activeTasks() {
      return this.$store.state.activeTasks[this.list.id];
    }
  },
  props: ["list"],
  components: {
    Task
  },
  methods: {
    toggleNewTaskForm() {
      this.isTaskFormShowing = !this.isTaskFormShowing;
      let data = {
        listId: this.list.id,
        update: this.isTaskFormShowing
      };
      this.$store.dispatch("showNewTaskForm", data);
    },
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
      this.toggleNewTaskForm();
    }
  }
};
</script>

<style>
.p-relative {
  position: relative;
}
</style>
