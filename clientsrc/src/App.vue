<template>
  <div id="app" class="container-fluid font-default">
    <div class="main">
      <navbar />

      <router-view class="grow-1" />

      <footerComp />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { onAuth } from "@bcwdev/auth0-vue";
import footerComp from "./components/FooterComponent";
export default {
  name: "App",
  async beforeCreate() {
    try {
      await onAuth();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    } catch (err) {
      this.$router.push({ name: "home" });
    }
  },
  components: {
    Navbar,
    footerComp
  }
};
</script>


<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
}
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.grow-1 {
  flex-grow: 1;
}

h1,
h2 {
  font-family: "Cantata One", serif;
}
.font-default {
  font-family: "Quicksand", sans-serif;
}
</style>
