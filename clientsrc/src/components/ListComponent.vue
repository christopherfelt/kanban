<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="shadow p-1 m-1">
      <h4>{{ list.title }}</h4>
    </div>
    <ul class="list-group">
      <task v-for="task in activeTasks" :key="task.id" :task="task" />
    </ul>
  </div>
</template>

<script>
import Task from "./TaskComponent.vue";
export default {
  mounted() {
    this.$store.dispatch("getTaskByListId", this.list.id);
  },
  // data(){
  //   taskListData:  {
  //     listId:
  //   },
  // },
  computed: {
    activeTasks() {
      return this.$store.state.activeTasks[this.list.id];
    },
  },
  props: ["list"],
  components: {
    Task,
  },
};
</script>

<style></style>
