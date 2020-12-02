import Vue from 'vue';
import VueYandexMetrika from 'vue-yandex-metrika';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';

const yandexMetrica = 70019899;
const hash = '5fc7e8922ef36c56e4668d63';
const hook = `https://widget.ikigai.art/proxy/${hash}`;

localStorage.setItem('widget_api_url', hook);

Vue.config.productionTip = true;

Vue.use(VueYandexMetrika, {
  id: yandexMetrica,
  env: process.env.NODE_ENV,
});

const widget = document.createElement('div');
widget.className = 'widget__ikigai';
document.body.appendChild(widget);

const widgetContainer = document.createElement('div');
widgetContainer.className = 'widget__container';
widget.appendChild(widgetContainer);

new Vue({
  store,
  vuetify,
  render: h => h(App),
}).$mount('.widget__container');
