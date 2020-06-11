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
              <img
                class="d-inline profile-img p-1 m-1"
                :src="user.picture"
                alt="no profile image"
              />
              <h5 class="p-2 m-2">{{ clock.message }} {{ user.name }}</h5>
              <p class="d-inline"></p>
            </div>
          </div>
          <clock />

          <Quote />
        </div>
      </div>

      <div class="row py-4 pt-4">
        <div class="col-11 col-md-9 col-lg-8 m-auto p-2 m-auto">
          <button
            data-v-step="1"
            @click="toggleNewBoardForm"
            title="Create new board"
            class="btn btn-success plus-btn m-1"
          >
            <i class="fas fa-plus"></i>
          </button>

          <!--         <div data-v-step="2">
          A DOM element on your page. The third and final step will pop on this
          element because its ID is 'v-step-2'.
        </div>

        <v-tour name="myTour" :steps="steps"></v-tour>
      </div> -->
        </div>
        <div
          v-if="showNewBordForm"
          class="col-11 col-md-9 col-lg-8 m-auto p-2 m-auto p-1 fade-in"
        >
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
                <button class="btn btn-success m-2" type="submit">
                  Create
                </button>
                <button @click="toggleNewBoardForm" class="btn btn-danger m-2">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>

        <div class="col-12 col-md-9 col-lg-8 m-auto p-2">
          <div
            class="board-card p-1 my-5 p-2"
            v-for="board in boards"
            :key="board.id"
          >
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="w-100 m-1 p-1 action text-primary">
                {{ board.title }}
              </h3>
              <small class="text-light">{{ board.creationDate }}</small>
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
            <div
              class="d-flex justify-content-between w-100 mt-2 action board-details-card"
            >
              <router-link
                class="nav-link"
                :to="{ name: 'board', params: { boardId: board.id } }"
              >
                <div class="action">
                  <p class="w-100 m-1 p-1 text-dark">{{ board.description }}</p>
                </div>
              </router-link>
            </div>
            <!-- not finished yet edit pop up -->
            <div
              v-if="isEditBoardFormShowing && board.id == boardEdit"
              class="board-details-card"
            >
              <div class="d-flex flex-column align-items-center">
                <form @submit="editBoard(board.id)">
                  <div class="pt-2 mt-2">
                    <input
                      v-model="editForm.title"
                      class="p-1 m-1"
                      type="text"
                      placeholder="Board Title..."
                    />
                    <br />
                    <input
                      v-model="editForm.description"
                      class="p-1 m-1"
                      type="text"
                      placeholder="Board Description...."
                    />
                  </div>
                  <div class="mt-2 pt-2">
                    <button type="submit" class="m-2 btn btn-success">
                      Save
                    </button>
                    <button
                      @click="toggleEditBoardForm"
                      class="m-2 btn btn-danger"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <!-- end section -->
          </div>
        </div>
      </div>
    </div>
    <v-tour name="myTour" :steps="steps" :options="myOptions"></v-tour>
  </div>
</template>

<script>
import clock from "../components/clock";
import Quote from "../components/QuoteComponent";
import NotficationService from "../sweet";
export default {
  mounted() {
    this.$store.dispatch("getBoards");
    this.$tours["myTour"].start();
  },
  components: {
    clock,
    Quote,
  },
  name: "boards",

  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
      editForm: {},
      editBoardFormShowing: false,
      boardEdit: null,
      myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: "Wing it",
          buttonPrevious: "Previous",
          buttonNext: "Next",
          buttonStop: "Geter done",
        },
      },
      steps: [
        {
          target: '[data-v-step="1"]',
          content: "Start a new board",
          params: {
            placement: "right",
          },
        },
      ],
    };
  },

  computed: {
    clock() {
      return this.$store.state.clock;
    },
    isEditBoardFormShowing() {
      if (this.boardEdit)
        return this.$store.state.showEditBoardForm[this.boardEdit];
    },
    showNewBordForm() {
      return this.$store.state.showNewBoardForm;
    },
    boards() {
      return this.$store.state.boards;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    toggleEditBoardForm(boardId) {
      let data = {
        boardId: boardId,
        update: !this.editBoardFormShowing,
      };
      this.$store.dispatch("toggleEditBoardForm", data);
      this.boardEdit = boardId;
    },
    toggleNewBoardForm() {
      this.$store.dispatch("toggleNewBoardForm");
    },

    async deleteBoard(id) {
      if (
        await NotficationService.confirmAction(
          "Are you sure you want to delete this board?"
        )
      ) {
        this.$store.dispatch("deleteBoard", id);
      }
    },
    editBoard(id) {
      let data = {
        boardId: id,
        update: {
          title: this.editForm.title,
          description: this.editForm.description,
        },
      };

      this.$store.dispatch("editBoard", data);
      this.toggleEditBoardForm();
    },
    //route user to the board page view by board id
    // routeToBoard(id) {
    //   this.$router.push({ name: "board", params: { id: id } });
    // },
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
      this.$store.dispatch("toggleNewBoardForm");
    },
  },
};
</script>

<style>
.board-details-card {
  background: rgba(245, 240, 166, 0.75);
}
div .dashboard-header {
  z-index: 1;
  background: rgba(0, 0, 0, 0.75);
}
.board-card {
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
