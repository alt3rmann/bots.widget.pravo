<template>
  <v-slide-x-reverse-transition>
    <v-card
      transition="slide-x-reverse-transition"
      elevation=4
      class="chat"
    >
      <Output />
      <v-divider></v-divider>
      <Input ref="input" />
    </v-card>
  </v-slide-x-reverse-transition>
</template>

<script>
import Output from './Output.vue';
import Input from './Input.vue';

export default {
  name: 'Chat',

  components: {
    Output,
    Input,
  },

  async mounted() {
    this.$metrika.hit('*widget*');
  },

  async created() {
    this.$store.dispatch('RELOAD');
  },
};
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 80%;
  max-width: 800px;
  min-width: 330px;
  height: 90vh;
  bottom: 0;
  right: 10px;
  border-radius: 12px !important;
}

@media (max-width: 600px) {
  .chat {
    bottom: 0;
    right: 0;
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
