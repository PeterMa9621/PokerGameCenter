<template>
    <v-text :config="tipTextConfig" />
</template>

<script>
    export default {
        name: "TipTextArea",
        props: ['x', 'msg', 'cardHeight'],
        data() {
            return {
                tipTextConfig: {
                    x: this.x,
                    y: 0,
                    text: this.msg,
                    fontSize: 20,
                    fill: 'red'
                }
            }
        },
        mounted() {
            this.tipTextConfig.y = window.innerHeight - this.cardHeight - 115;
            this.calculateTipTextPosition(this.tipTextConfig.x);
        },
        watch: {
            x: function (newX) {
                this.calculateTipTextPosition(newX);
            }
        },
        methods: {
            calculateTipTextPosition(x) {
                this.tipTextConfig.x = x;
            }
        }
    }
</script>

<style scoped>

</style>