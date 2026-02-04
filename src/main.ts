import './assets/main.css';
import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {createBootstrap} from 'bootstrap-vue-next'
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import {api} from "@/plugins/gateway";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(createBootstrap);
app.provide('axios', api);
app.mount('#app');
