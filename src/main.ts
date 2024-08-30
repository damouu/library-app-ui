import './assets/main.css';
import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import instance from "@/plugins/axios";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.provide('axios', instance);
app.mount('#app');
