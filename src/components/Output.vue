<template>
    <v-card
    flat
    class="chat__history ma-3"
    >
      <div
      v-for="message in messages"
      :key="message.id"
      class="d-flex justify-start chat__message"
      :class="{
          'justify-start': message.type === 'bot',
          'justify-end': message.type === 'user'
      }"
      >
      <v-card
        :color="(message.type === 'bot') ? 'blue lighten-4' : 'blue lighten-3'"
        tile
        class="px-4 py-2 ma-2 chat__message-inner"
      >
      <div v-if="message.text.length > 0">
        <p class="chat__p" v-html="message.text"></p>
      </div>
      <div v-else-if="message.pic">
        <img class="chat__img" :src="message.pic" alt="">
      </div>
      <div>
        <v-btn
          v-for="(i, index) in message.buttons"
          :key=index
          raised
          class="ma-2"
          @click="buttonClick(index, message.id)">
          {{i}}
        </v-btn>
      </div>
      </v-card>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'Output',
  data() {
    return {
      height: 0,
    };
  },

  computed: {
    messages() {
      return this.$store.state.messages;
    },
  },

  methods: {
    buttonClick(index, id) {
      this.$store.state.text = this.messages.find(el => el.id === id).buttons[index];
      this.$store.dispatch('SEND_MESSAGE');
    },
  },

  created() {
    setInterval(() => {
      if (this.height < this.$el.scrollHeight) {
        this.$el.scrollTop = this.$el.scrollHeight;
        this.height = this.$el.scrollHeight;
      }
    }, 100);
  },
};
</script>

<style scoped>

.chat__img {
  max-width: 100%;
}

.chat__history {
  overflow-y: scroll;
  flex: 1;
}

.chat__p {
  margin: 0;
}

.chat__message-inner {
  max-width: 85%;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .chat__history {
    height: 400px !important;
  }
}

</style>
