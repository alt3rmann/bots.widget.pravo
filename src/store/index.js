import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuidv4 } from 'uuid';

const axios = require('axios');

const user = uuidv4();

Vue.use(Vuex);

const convertLinks = (input) => {
  let text = input;
  const linksFound = text.match(/(?:www|https?)[^\s]+/g);
  const aLink = [];

  if (linksFound != null) {
    for (let i = 0; i < linksFound.length; i += 1) {
      let replace = linksFound[i];
      if (!(linksFound[i].match(/(http(s?)):\/\//))) {
        replace = `http://${linksFound[i]}`;
      }
      let linkText = replace.split('/')[2];
      if (linkText.substring(0, 3) === 'www') {
        linkText = linkText.replace('www.', '');
      }
      aLink.push(`<a href="${replace}" target="_blank">${linkText}</a>`);
      text = text.split(linksFound[i]).map(item => (aLink[i].includes('iframe') ? item.trim() : item)).join(aLink[i]);
    }
    return text;
  }

  return input;
};

export default new Vuex.Store({
  state: {
    id: 0,
    messages: [],
    message: '',
    buttons: [],
    text: '',
    sending: false,
    reloading: false,
    opened: false,
    isButtons: false,
    error: '',
  },
  mutations: {
    PUSH_MESSAGE(state, message) {
      state.id += 1;
      state.messages.push({
        id: state.id += 1,
        text: message.text,
        pic: message.pic,
        type: message.type,
        buttons: message.buttons,
      });

      if (state.messages.length > 100) {
        state.messages.shift();
      }
    },
  },
  actions: {
    async SEND_MESSAGE({ commit, state }) {
      if (!state.sending && state.text.length) {
        state.sending = true;
        state.buttons = [];
        state.isButtons = false;
        const answer = await axios({
          method: 'post',
          url: localStorage.getItem('widget_api_url'),
          data: {
            request: {
              command: state.text || '/start',
            },
            session: {
              user_id: user,
            },
          },
        });
        if (!state.reloading) {
          commit('PUSH_MESSAGE', {
            text: state.text,
            type: 'user',
            buttons: [],
          });
        }
        if (answer.data.response && answer.data.response.buttons) {
          const messages = answer.data.response.text.split('\n\n');
          messages.forEach((element) => {
            const rgx = /%%(.*?)%%/g;
            const imgSrc = rgx.exec(element);
            if (imgSrc) {
              commit('PUSH_MESSAGE', {
                text: '',
                pic: imgSrc[1],
                type: 'bot',
                buttons: [],
              });
            } else {
              commit('PUSH_MESSAGE', {
                text: convertLinks(element),
                type: 'bot',
                buttons: [],
              });
            }
          });
          state.buttons = answer.data.response.buttons.map(el => el.title);
        }
        state.text = '';
        state.sending = false;
      }
    },
    async RELOAD({ dispatch, state }) {
      state.reloading = true;
      state.messages = [];
      state.text = '/start';
      await dispatch('SEND_MESSAGE');
      state.reloading = false;
    },
  },
});
