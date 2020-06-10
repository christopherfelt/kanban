<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-12 p-0">
          <img
            class="img-full p-absolute"
            src="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&dpr=2"
            alt
          />
        </div>
      </div>

      <div class="row pb-5">
        <div class="col-12 dashboard-header text-light">
          <div class="boards">
            <div class="d-flex align-items-end">
              <img class="d-inline profile-img p-1 m-1" :src="user.picture" alt="no profile image" />
              <h5 class="p-2 m-2">Good morning {{user.name}}</h5>
              <p class="d-inline"></p>
            </div>
          </div>
        </div>
      </div>

      <!--  -->

      <div class="row py-4 pt-4 boards-card shadow">
        <!--  -->
        <div class="col-11 m-auto">
          <h3 class="text-primary m-1">Boards</h3>
          <button @click="toggleNewBoardForm" title="Create new board" class="btn btn-success m-1">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div v-if="showNewBordForm" class="col-11 m-auto p-1 fade-in">
          <form class="pb-3" @submit.prevent="addBoard">
            <div class="p-2">
              <input
                class="p-1 mt-1 w-100"
                type="text"
                placeholder="Board title"
                v-model="newBoard.title"
                required
              />
              <br />
              <input
                class="p-1 mt-1 w-100"
                type="text"
                placeholder="Board description"
                v-model="newBoard.description"
              />
              <br />
              <div class="text-center">
                <button class="btn btn-success m-2" type="submit">Create</button>
                <button @click="toggleNewBoardForm" class="btn btn-danger m-2">Cancel</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-11 col-md-9 col-lg-8 m-auto p-2">
          <div class="bg-warning p-1 m-2" v-for="board in boards" :key="board.id">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="w-100 m-1 p-1 action text-light">{{ board.title}}</h5>showEditBoardForm
              <!-- show and hide form for edit board name/description -->
              <i
                @click="toggleEditBoardForm(board.id)"
                title="Edit board"
                class="fas fa-pencil-alt text-light px-1 mx-1 action"
              ></i>
              <i
                @click="deleteBoard(board.id)"
                title="Delete board"
                class="fas fa-trash-alt text-danger px-1 mx-1 action"
              ></i>
            </div>
            <div class="text-primary list-group-item d-flex justify-content-between w-100 mt-2">
              <div class="action" @click="routeToBoard(board.id)">
                <p class="w-100 m-1 p-1 text-dark">{{ board.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- not finished yet edit pop up -->
      <div v-if="true" class="row">
        <div class="col-12 d-flex justify-content-center">
          <div class="edit-box shadow bg-warning">
            <div class="d-flex flex-column align-items-center">
              <div class="pt-2 mt-2">
                <input class="p-1 m-1" type="text" placeholder="Board Title..." />
                <br />
                <input class="p-1 m-1" type="text" placeholder="Board Description...." />
              </div>
              <div class="mt-2 pt-2">
                <button class="m-2 btn btn-success">Save</button>
                <button @click="toggleEditBoardForm" class="m-2 btn btn-danger">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end section -->
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },

  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      },
      editForm: {}
    };
  },

  computed: {
    _showEditBoardForm_() {
      console.log(this.$store._showEditBoardForm);

      return this.$store._showEditBoardForm;
    },
    showNewBordForm() {
      return this.$store.state.showNewBoardForm;
    },
    boards() {
      return this.$store.state.boards;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    toggleEditBoardForm() {
      this.$store.dispatch("toggleEditBoardForm");
      console.log("toggleing the edit form");
    },
    toggleNewBoardForm() {
      this.$store.dispatch("toggleNewBoardForm");
    },

    deleteBoard(id) {
      this.$store.dispatch("deleteBoard", id);
    },
    editBoard(id) {
      let data = {
        boardId: id,
        update: {
          title: this.editForm.title,
          description: this.editForm.description
        }
      };
      this.$store.dispatch("editBoard", data);
    },
    //route user to the board page view by board id
    routeToBoard(id) {
      this.$router.push({ name: "board", params: { id: id } });
    },
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
      this.$store.dispatch("toggleNewBoardForm");
    }
  }
};
</script>


<style>
.edit-box {
  border-radius: 8px;
  height: 25vh;
  width: 80vw;
  position: fixed;
  top: 50vh;
}
div .dashboard-header {
  z-index: 1;
  background: rgba(0, 0, 0, 0.75);
}
.boards-card {
  background: rgba(0, 0, 0, 0.75);
  border-radius: 8px;
}
.profile-img {
  border-radius: 50%;
  height: 4rem;
  widows: 4rem;
}
@keyframes fade-in {
  0% {
    left: -100vw;
  }
  100% {
    left: 0px;
  }
}
.fade-in {
  animation-name: fade-in;
  animation-duration: 1s;
  animation-iteration-count: 1;
}
</style>