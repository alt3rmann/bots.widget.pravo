<template>
  <v-app id="widget">
    <Chat v-if="chatOn" v-show="chatVisible"/>
    <v-btn
      fab
      open-on-hover
      fixed
      bottom
      right
      large
      @click="toggleChat"
      class="openChatButton"
      color="blue lighten-1">
      <v-icon v-show="!chatVisible" large color="white">{{ mdiHelpCircleOutline }}</v-icon>
      <v-icon v-show="chatVisible" color="white">{{ mdiClose }}</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import { mdiClose, mdiHelpCircleOutline } from '@mdi/js';
import Chat from './components/Chat.vue';

export default {
  name: 'App',

  components: {
    Chat,
  },

  data: () => ({
    chatVisible: false,
    chatOn: false,
    mdiHelpCircleOutline,
    mdiClose,
  }),

  methods: {
    toggleChat() {
      this.chatOn = true;
      this.chatVisible = !this.chatVisible;
    },
  },
};
</script>

<style>

html {
  box-sizing: initial !important;
}

.widget__ikigai {
  z-index: 99;
  font-family: Arial, sans-serif;
  font-size: 14px;
  position: absolute;
}
</style>
