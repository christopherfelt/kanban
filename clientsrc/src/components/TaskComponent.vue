<template>
  <li class="task d-flex justify-content-center list-group-item ">
    {{ task.body }}
  </li>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {};
  },
  props: ["task"],
  computed: {},
  methods: {},
  components: {},
};
</script>

<style scoped>
.task {
}
.task:hover {
  background-color: lightgray;
}
</style>
