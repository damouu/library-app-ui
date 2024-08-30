import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DataView from "@/views/BookView.vue";
import NewsView from "@/views/BookListView.vue";
import StudentView from "@/views/StudentView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/news',
            name: 'news',
            component: NewsView,
        },
        {
            path: '/student',
            name: 'student',
            component: StudentView
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
});

export default router;