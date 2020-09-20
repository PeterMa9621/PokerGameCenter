<template>
    <v-text :config="myNameTextConfig" />
</template>

<script>
    export default {
        name: "MyNameTextArea",
        props: ['x', 'userName'],
        data() {
            return {
                myNameTextConfig: {
                    x: this.x,
                    y: 0,
                    text: this.userName,
                    fontSize: 20,
                    fill: 'white'
                }
            }
        },
        mounted() {
            this.calculateTextPosition();
        },
        methods: {
            calculateTextPosition() {
                this.myNameTextConfig.y = window.innerHeight - 20;
            }
        },
        watch: {
            x: function (newX) {
                this.myNameTextConfig.x = newX;
                this.calculateTextPosition();
            },
            userName: function (newUserName) {
                this.myNameTextConfig.text = newUserName;
            }
        }
    }
</script>

<style scoped>

</style>