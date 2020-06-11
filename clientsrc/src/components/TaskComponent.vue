<template>
  <li
    class="task list-group-item bg-secondary m-2 mt-2 shadow"
    :class="{ opened: listMoveChoiceVisible }"
  >
    <div class>
      <div class="d-flex justify-content-between align-items-center">
        <div class>
          <div class="p-0 m-0" v-if="taskEditForm">
            <p class="p-0 m-0">{{ task.body }}</p>
          </div>
          <div class v-else>
            <form class @submit.prevent="editTask">
              <input class type="text" v-model="task.body" />
            </form>
          </div>
        </div>
        <div class>
          <p
            title="details/edit"
            class="pointer p-0 m-0 dots"
            @click="listMoveChoiceVisible = !listMoveChoiceVisible"
          >
            <i class="fas fa-ellipsis-h"></i>
          </p>
        </div>
      </div>
    </div>
    <div class="border-top mt-3 text-dark" v-if="listMoveChoiceVisible">
      <div class="row bg-light">
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
          </div>-->
        </div>
      </div>
      <div class="row bg-light pt-2 text-dark">
        <div class="col-12 m-0 p-0 mt-2">
          <div class="text-center">
            <p class="m-0 p-0">Comments</p>
          </div>
          <div class="text-center m-0 p-0" @click="openComments = true" v-if="!openComments">
            <h3 class="p-0 m-0 text-info">
              <i class="action fas fa-arrow-circle-down action"></i>
            </h3>
          </div>
          <div v-else class="d-block text-center bg-light">
            <h3 class="text-info" @click="openComments = false">
              <i class="action fas fa-arrow-circle-up"></i>
            </h3>
            <form class="mt-2" @submit.prevent="addComment">
              <input class v-model="commentBody" type="text" />
              <br />
              <button class="btn btn-outline-dark p-1 mt-2" type="submit">Post</button>
            </form>
            <ul class="list-group shadow p-1 my-3 bg-gray">
              <comment v-for="comment in activeComments" :key="comment.id" :comment="comment" />
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
      taskEditForm: true
    };
  },
  props: ["task"],
  computed: {
    activeComments() {
      return this.$store.state.activeComments[this.task.id];
    },
    activeLists() {
      return this.$store.state.activeLists;
    }
  },
  methods: {
    moveTaskToNewList(newListId) {
      let data = {
        boardId: this.task.boardId,
        taskId: this.task.id,
        newListId: newListId,
        oldListId: this.task.listId,
        taskData: { listId: newListId }
      };
      this.$store.dispatch("moveTaskToNewList", data);
      this.listMoveChoiceVisible = false;
    },

    addComment() {
      let data = {
        taskId: this.task.id,
        listId: this.task.listId,
        boardId: this.task.boardId,
        body: this.commentBody
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
    }
  },
  components: {
    Comment
  }
};
</script>

<style scoped>
.dots {
  position: absolute;
  top: 0;
  right: 0.5rem;
}
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
  background-color: rgba(126, 126, 126, 0.452);
}
.bg-gray {
  background: rgb(235, 233, 233);
  border-radius: 6px;
  padding: 0.5rem;
}
</style>
