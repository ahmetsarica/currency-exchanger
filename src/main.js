/* eslint-disable object-curly-newline */
import Vue from 'vue';
import NumericDirective from '@/directives/NumericOnly';
import { Button, Select, Input, Icon, Spin } from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';

Vue.use(NumericDirective);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Input.name, Input);
Vue.component(Icon.name, Icon);
Vue.component(Spin.name, Spin);
Vue.component(Input.Group.name, Input.Group);
Vue.component(Select.Option.name, Select.Option);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
