<template>
    <div class="container">
        <div class="card mt-5">
            <div class="card-header">
                选择游戏
            </div>
            <div class="card-body">
                <button class="btn btn-lg btn-primary" @click="() => play('bie7')">憋七</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            userName: ''
        }
    },
    methods: {
        play(gameType) {
            this.$router.push({name: gameType});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
