import Vue from 'vue'
import VueRouter from 'vue-router';
import HomePage from "../pages/HomePage";
import store from "../settings/VuexStore";
import authMiddleware from "../middleware/auth/AuthMiddleware";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import BieSevenPage from "../pages/Bie7Page";
import Bie7LobbyPage from "../pages/Bie7LobbyPage";
import RegisterPage from "../pages/RegisterPage";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: HomePage, name: 'home', meta: {middleware:[authMiddleware]}},
    {path: '/login', component: LoginPage, name: 'login'},
    {path: '/register', component: RegisterPage, name: 'register'},
    {path: '/about', component: AboutPage, name: 'about', meta: {middleware:[authMiddleware]}},
    {path: '/bie7', component: Bie7LobbyPage, name: 'bie7', meta: {middleware:[authMiddleware]}},
    {path: '/bie7/:id', component: BieSevenPage, name: 'bie7-game', meta: {middleware:[authMiddleware]}}
];

const router = new VueRouter({
    mode: 'history',
    hash: false,
    routes: routes,
});

function getNextMiddleware(context, middleware, index) {
    const subsequentMiddleware = middleware[index];

    if(!subsequentMiddleware) {
        return context.next;
    }

    return () => {
        const nextMiddleware = getNextMiddleware(context, middleware, index+1);
        subsequentMiddleware({
            ...context,
            next: nextMiddleware
        });
    };
}

router.beforeEach((to, from, next) => {
    if(to.meta.middleware) {
        const middleware = to.meta.middleware;

        const context = {
            to: to,
            from: from,
            next: next,
            router: router,
            store: store
        };

        const nextMiddleware = getNextMiddleware(context, middleware, 1);

        return middleware[0]({
            ...context,
            next: nextMiddleware
        });
    }
    return next();
});

export default router;