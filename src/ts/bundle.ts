import Vue, { CreateElement, VNode } from 'vue';
import VueCompositionApi from '@vue/composition-api';
import vuetify from './plugins/vuetify';
import App from '../vue/App.vue';
import store from './store/index';
import '../scss/base.scss';
import '../scss/colors.scss';

Vue.use(VueCompositionApi);

new Vue({
  vuetify,
  store,
  render: (h: CreateElement): VNode => h(App),
}).$mount('#app');
