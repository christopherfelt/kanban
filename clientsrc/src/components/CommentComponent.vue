<template>
  <li class="comment list-group-item mt-1 p-1 options bg-light">
    <small>{{ comment.body }}</small>
    <i
      class="fa fa-trash-alt fa-xs text-danger mx-2 action float-right mt-2 pointer"
      aria-hidden="true"
      @click="deleteComment"
    ></i>
  </li>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {};
  },
  props: ["comment"],
  computed: {},
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.comment);
    }
  },
  components: {}
};
</script>

<style scoped>
.comment {
  border-radius: 6px;
}
.pointer {
  cursor: pointer;
}
.options {
  background-color: rgb(255, 0, 0);
}
.options:hover {
  background-color: #bebebe9d;
}
</style>
