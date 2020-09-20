<template>
    <div class="container-fluid h-100">
        <div class="row h-100 justify-content-center align-items-center">
            <div class="col-xl-4 col-lg-4 col-md-3 col-sm-1"></div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-10">
                <div class="form-group">
                    <div class="card login-card">
                        <div class="card-img-top mt-2 mb-2">
                            <div class="text-center">
                                <img src="../assets/register.png" alt="">
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
                                <button class="btn btn-primary" @click="signUp()">Sign up</button>
                                <div class="form-inline">
                                    Had an account already?
                                    <router-link class="btn btn-link" :to="{name: 'login'}">Login</router-link>
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
    import AccountService from "../service/AccountService";

    export default {
        name: "RegisterPage",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            signUp() {
                AccountService.register(this.username, this.password).then(response => {
                    if(response['succeed'])
                        this.$router.push({name: 'login'});
                }).catch(reason => {
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