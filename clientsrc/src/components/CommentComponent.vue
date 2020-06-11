<template>
  <li class="comment list-group-item mt-1 p-1 options bg-light">
    <div class="position-relative">
      <div class="ml-3 mb-2 d-block">
        <small>{{ comment.body }}</small>
      </div>
      <div class=" author">
        <span class="">- {{ comment.creatorEmail }}</span>
      </div>
      <i
        class="fa fa-trash-alt fa-xs text-danger mx-2 action float-right mt-2 pointer"
        aria-hidden="true"
        @click="deleteComment"
      ></i>
    </div>
  </li>
</template>

<script>
import NotficationService from "../sweet";
export default {
  name: "Comment",
  data() {
    return {};
  },
  props: ["comment"],
  computed: {},
  methods: {
    async deleteComment() {
      if (
        await NotficationService.confirmAction(
          "Are you sure you want to delete this comment?"
        )
      ) {
        this.$store.dispatch("deleteComment", this.comment);
      }
    },
  },
  components: {},
};
</script>

<style scoped>
.author {
  font-size: 10px;
  bottom: 5px;
  right: 15%;
}

.comment {
  border-radius: 6px;
  height: auto;
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
