import Vue from 'vue'
import VueRouter from 'vue-router'
import Notes from '../views/Notes'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Notes',
        component: Notes
    },
    {
        path: '/:id',
        name: 'NoteEdit',
        component: () => import(/* webpackChunkName: "about" */ '../views/NoteEdit')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
