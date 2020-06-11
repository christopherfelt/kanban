<template>
  <div class="row">
    <div class="col-12 text-right mr-2">
      <h5>
        <b>{{this.clock.timeDisp}}</b>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.saveClockToStore();
    setInterval(() => {
      this.saveClockToStore();
    }, 5000);
  },
  computed: {
    clock() {
      return this.$store.state.clock;
    }
  },
  methods: {
    saveClockToStore() {
      this.$store.dispatch("updateClock", this.calcutlateTime());
    },
    calcutlateTime() {
      let time = new Date();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let data = {};
      let message = "";
      if (hours >= 5 && hours < 12) {
        message = "good morning";
      } else if (hours >= 12 && hours < 17) {
        message = "good afternoon";
      } else if (hours >= 17 && hours < 22) {
        message = " good evning";
      } else if (hours >= 22 || hours < 5) {
        message = "good night";
      }
      let h = hours > 12 ? hours - 12 : hours;

      data.timeDisp = `${h}:${minutes > 10 ? minutes : minutes + "0"}${
        hours > 12 ? " pm" : " am"
      }`;
      data.message = message;
      return data;
    }
  }
};
</script>

<style>
</style>