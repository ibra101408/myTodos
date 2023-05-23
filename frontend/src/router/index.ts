import { createRouter, createWebHistory } from 'vue-router';

// Import your components here
// @ts-ignore
import SignUp from '../views/SignUp.vue';
import SignIn from '../views/SignIn.vue';
import Tasks from '../views/Tasks.vue';
import SignOut from '../views/SignOut.vue';
import axios from 'axios';

const routes = [
    {
        path: '/',
        name: 'Tasks',
        component: Tasks,
    },
    {
        path: '/signup',
        name: 'Sign Up',
        component: SignUp,
    },
    {
        path: '/signin',
        name: 'Sign In',
        component: SignIn,
    },

    {
        path: '/signout',
        name: 'Sign Out',
        component: SignOut,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;