<template>
  <li class="comment list-group-item p-0 options">
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
    },
  },
  components: {},
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.options {
  background-color: white;
}
.options:hover {
  background-color: #5ecaae;
}
</style>
