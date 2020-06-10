<template>
  <li class="task list-group-item" :class="{ opened: listMoveChoiceVisible }">
    <div class="position-relative">
      <div v-if="taskEditForm">
        {{ task.body }}
      </div>
      <div v-else>
        <form @submit.prevent="editTask">
          <input type="text" v-model="task.body" />
        </form>
      </div>
      <div>
        <h3
          class="position-absolute option-button pointer"
          @click="listMoveChoiceVisible = !listMoveChoiceVisible"
        >
          ...
        </h3>
      </div>
    </div>
    <div class="border-top mt-2" v-if="listMoveChoiceVisible">
      <div class="row ">
        <div class="col-6">
          <Small>Move To:</Small>
          <ul class="list-group">
            <li
              class="list-group-item p-0 text-center pointer move-options"
              v-for="list in activeLists"
              :key="list.id"
              @click="moveTaskToNewList(list.id)"
            >
              <small>{{ list.title }}</small>
            </li>
          </ul>
        </div>
        <div class="col-6">
          <div class="text-center">
            <small>Tasks Options</small>
            <div class="text-center">
              <i
                class="fa fa-pencil text-light text-dark mx-2 action"
                aria-hidden="true"
                @click="taskEditForm = !taskEditForm"
              ></i>
              <i
                class="fa fa-trash-alt text-danger mx-2 action"
                aria-hidden="true"
                @click="deleteTask"
              ></i>
            </div>
          </div>
          <div class="text-center mt-2">
            <small class="border-bottom">Assigned To:</small>

            <div>
              <small>{{ task.creatorEmail }}</small>
            </div>
          </div>
          <!-- <div class="text-center">
            <small>Comment Options</small>
            <div>
              <button class="btn btn-primary">P</button>
              <button class="btn btn-primary">P</button>
            </div>
          </div> -->
        </div>
      </div>
      <div class=" row ">
        <div class="col-12 mt-2">
          <div class="text-center">
            <h6>Comments</h6>
          </div>
          <div
            class="text-center"
            @click="openComments = true"
            v-if="!openComments"
          >
            <h6>...</h6>
          </div>
          <div v-else class="d-block text-center">
            <small class="pointer" @click="openComments = false"
              >Collapse</small
            >
            <form class="mt-2" @submit.prevent="addComment">
              <input v-model="commentBody" type="text" />
              <button class="btn btn-primary" type="submit">+</button>
            </form>
            <ul class="list-group mt-2">
              <comment
                v-for="comment in activeComments"
                :key="comment.id"
                :comment="comment"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
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
    return {
      listMoveChoiceVisible: false,
      openComments: false,
      commentBody: "",
      taskEditForm: true,
    };
  },
  props: ["task"],
  computed: {
    activeComments() {
      return this.$store.state.activeComments[this.task.id];
    },
    activeLists() {
      return this.$store.state.activeLists;
    },
  },
  methods: {
    moveTaskToNewList(newListId) {
      let data = {
        boardId: this.task.boardId,
        taskId: this.task.id,
        newListId: newListId,
        oldListId: this.task.listId,
        taskData: { listId: newListId },
      };
      this.$store.dispatch("moveTaskToNewList", data);
      this.listMoveChoiceVisible = false;
    },

    addComment() {
      let data = {
        taskId: this.task.id,
        listId: this.task.listId,
        boardId: this.task.boardId,
        body: this.commentBody,
      };
      this.$store.dispatch("addComment", data);
      this.commentBody = "";
    },

    deleteTask() {
      this.$store.dispatch("deleteTask", this.task);
    },

    editTask() {
      this.$store.dispatch("editTask", this.task);
      this.taskEditForm = true;
    },
  },
  components: {
    Comment,
  },
};
</script>

<style scoped>
.task:hover {
  background-color: lightyellow;
}

.opened {
  background-color: lightyellow;
}

.pointer {
  cursor: pointer;
}

.option-button {
  top: 0%;
  right: 0%;
}

.options {
  background-color: darkgray;
}

.move-options {
  cursor: pointer;
}

.move-options:hover {
  background-color: pink;
}
</style>
