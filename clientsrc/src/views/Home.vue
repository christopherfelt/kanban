<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <img
          class="p-absolute img-full p-absolute"
          src="https://images.pexels.com/photos/3810756/pexels-photo-3810756.jpeg?auto=compress&cs=tinysrgb&dpr=1"
          alt
        />
      </div>
    </div>
    <div class="home row">
      <div class="col-12 col-lg-10 m-auto mt-5">
        <div class="shadow welcome-card m-3 mt-70 p-1 b-radius">
          <div class="mt-1">
            <h1 class="text-primary pl-lg-5 p-2">Welcome to Kanban Kabana</h1>
            <hr />
          </div>
          <p class="p-1 m-1">
            If you need to get a team ready for a project you have come to the right place. We are all about keeping
            the endless stream of todos in order.
          </p>

          <div class="p-relative d-flex justify-content-center p-3">
            <button class="btn btn-primary btn-lg push-down shadow" @click="login">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Boards from "./Boards.vue";

let _api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true
});
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      // console.log("this.$auth.user: ");
      // console.log(this.$auth.user);
    },
    async logout() {
      await this.$auth.logout({ returnTo: window.location.origin });
    }
  },
  components: {
    Boards
  }
};
</script>

<style >
.b-radius {
  border-radius: 8px;
}
.img-full {
  z-index: -1;
  margin: -15px 0px;
  overflow: hidden;
  width: 100%;
}
.push-up {
  position: absolute;
}
.push-down {
  position: absolute;
  top: 0.75rem;
}
.p-absolute {
  position: absolute;
}
.p-relative {
  position: relative;
}
.welcome-card {
  background-color: rgba(255, 230, 149, 0.835);
}
.mt-70 {
  margin-top: 20vh !important;
}
</style>
