import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/home/HomeView.vue';
import Cart from '../views/checkout/Cart.vue';
import Checkout from "@/views/checkout/Checkout.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/book',
            name: 'book-list',
            component: () => import('@/views/book/BookListView.vue')
        },
        {
            path: '/book/:bookUUID',
            name: 'book-detail',
            component: () => import('@/views/book/BookView.vue'),
            props: true
        },
        {
            path: '/student',
            name: 'student-list',
            component: () => import('@/views/user/StudentView.vue')
        },
        {
            path: '/news',
            redirect: '/book'
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            beforeEnter: (to, from, next) => {
                if (!from.name) {
                    next({name: 'home'});
                } else {
                    next();
                }
            }
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout,
            beforeEnter: (to, from, next) => {
                if (!from.name) {
                    next({name: 'home'});
                } else {
                    next();
                }
            }
        },
        {
            path: '/series',
            name: 'series',
            component: () => import('@/views/series/seriesView.vue')
        },
        {
            path: '/chapter/:chapterUuid',
            name: 'chapter-details',
            props: true,
            component: () => import('@/views/book/BookView.vue')
        },
        {
            path: '/series/:seriesUuid/chapters',
            name: 'series-details',
            props: true,
            component: () => import('@/views/chapter/chapterView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/error/NotFoundView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/user/SignInView.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('@/views/user/UserView.vue')
        }
    ]
});

export default router;