import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DataView from "@/views/BookView.vue";
import NewsView from "@/views/BookListView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/book/:bookUUID',
            name: 'books',
            component: DataView,
            props: true,
        },
        {
            path: '/book',
            name: 'book',
            component: NewsView
        }
    ]
})

export default router