<template>
  <div class="text-center">
    <p :title="'Author- '+quote.author">{{quote.body}}</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("setQuote");
  },
  computed: {
    quote() {
      return this.$store.state.quote;
    }
  }
};
</script>

<style>
</style>