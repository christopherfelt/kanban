<template>
  <li class="task d-flex justify-content-center list-group-item ">
    {{ task.body }}

    <ul>
      <comment
        v-for="comment in activeComments"
        :key="comment.id"
        :comment="comment"
      />
    </ul>
  </li>
</template>

<script>
import Comment from "./CommentComponent.vue";

export default {
  name: "Task",
  mounted() {
    this.$store.dispatch("getCommentsByTaskId", this.task.id);
  },
  data() {
    return {};
  },
  props: ["task"],
  computed: {
    activeComments() {
      return this.$store.state.activeComments[this.task.id];
    },
  },
  methods: {},
  components: {
    Comment,
  },
};
</script>

<style scoped>
.task {
}
.task:hover {
  background-color: lightgray;
}
</style>
