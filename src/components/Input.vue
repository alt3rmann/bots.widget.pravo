<template>
  <div class="widget--buttons ma-4">
      <v-btn
        class="widget--button ma-2"
        v-bind:class="{
          'widget--button-warning': i === exceptions.warning,
          'widget--button-next': i === exceptions.next
        }"
        v-for="(i, index) in $store.state.buttons"
        :key=index
        outlined
        @click="buttonClick(index)">
        {{i}}
      </v-btn>
    </div>
</template>

<script>
import { mdiRefresh, mdiSend } from '@mdi/js';

export default {
  name: 'Input',

  data() {
    return {
      mdiRefresh,
      mdiSend,
      exceptions: {
        warning: '#Петербургсвоихнебросает',
        next: 'Дальше',
      },
    };
  },

  methods: {
    send() {
      this.$store.dispatch('SEND_MESSAGE');
    },

    buttonClick(index) {
      this.$store.state.text = this.$store.state.buttons[index];
      this.send();
    },

    reload() {
      this.$store.dispatch('RELOAD');
    },
  },
};
</script>

<style lang="scss" scoped>

.widget {
  &--buttons {
    max-height: 300px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
  }

  &--button {
    flex: 1 0 47%;
    text-overflow: ellipsis;
    font-size: 12px;
    letter-spacing: normal;

    &-warning {
      color: red;
    }

    &-next {
      font-weight: 600;
    }
  }
}

.chat__text_input {
  width: 397px;
  display: inline-block;
  height: 52px;
}

@media (max-width: 600px) {
  .chat__text_input {
    width: 350px;
    display: inline-block;
    height: 52px;
  }
}
</style>
