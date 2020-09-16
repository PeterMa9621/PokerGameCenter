import User from "../../models/User";

export default function authMiddleware ({next, router, to, store}) {
    if(store.state.user.isAuthorized) {
        return next();
    }

    let username = window.$cookies.get('username');
    if(username!==undefined && username!==null) {
        store.dispatch('setUser', new User({username: username, isAuthorized: true}));
        return next();
    }

    router.push({name: 'login', query: {next: to.path}});
}