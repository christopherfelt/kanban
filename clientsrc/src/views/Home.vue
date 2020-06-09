<template>
  <div class="home">
    <div v-if="$auth.isAuthenticated">
      <h1>This is your home page.</h1>
      <h2>Click on My-Dashboard to See All Your Boards</h2>
    </div>
    <div class="container" v-else>
      <div class="jumbotron mt-3">
        <h1 class="display-3">Welcome to Kanban Kabana</h1>

        <hr class="my-2" />
        <p>Click below to sign up or login</p>
        <p class="lead">
          <button class="btn btn-primary btn-lg" @click="login">
            Get Started
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Boards from "./Boards.vue";

let _api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true,
});
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    async logout() {
      await this.$auth.logout({ returnTo: window.location.origin });
    },
  },
  components: {
    Boards,
  },
};
</script>

<style scoped></style>
