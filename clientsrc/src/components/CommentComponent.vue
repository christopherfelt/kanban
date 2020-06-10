<template>
  <li class="comment">
    <small>{{ comment.body }}</small>
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
  methods: {},
  components: {},
};
</script>

<style scoped></style>
