<template>
    <div class="container-fluid h-100">
        <div class="row h-100 justify-content-center align-items-center">
            <div class="col-xl-4 col-lg-4 col-md-3 col-sm-1"></div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-10">
                <div class="form-group">
                    <div class="card login-card">
                        <div class="card-img-top mt-2 mb-2">
                            <div class="text-center">
                                <img src="../assets/login.png" alt="">
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="username"><strong>UserName</strong></label>
                                <input id="username" name="username" class="form-control" v-model="username">
                            </div>
                            <div class="form-group">
                                <label for="password"><strong>Password</strong></label>
                                <input type="password" id="password" name="username" class="form-control" v-model="password">
                            </div>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-primary" @click="login()">Log in</button>
                                <div class="form-inline">
                                    Need an account?
                                    <router-link class="btn btn-link" :to="{name: 'register'}">Register</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-3 col-sm-1"></div>
        </div>
    </div>
</template>

<script>
    import User from "../models/User";
    import AccountService from "../service/AccountService";

    export default {
        name: "LoginPage",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                AccountService.login(this.username, this.password).then(response => {
                    if(!response['succeed'])
                        return;
                    let user = response['user'];
                    this.$store.dispatch('setUser', new User({
                        username: user.userName,
                        ...user,
                        isAuthorized: true
                    }));
                    this.$router.push(this.$route.query.next ? this.$route.query.next : '/');
                }).catch(reason => {
                    alert("帐号或密码错误");
                    console.log(reason);
                });
            }
        }
    }
</script>

<style scoped>
    .login-card {
        box-shadow: 0 10px 25px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.1);
        border-radius: 10px !important;
        background-color: aliceblue;
        padding: 20px;
    }
</style>