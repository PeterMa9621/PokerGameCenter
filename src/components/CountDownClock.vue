<template>
    <div>
        <v-circle :config="circleConfig" />
        <v-text :config="textConfig" />
    </div>
</template>

<script>
    const radius = 30;
    export default {
        name: "CountDownClock",
        props: ['x', 'y', 'height', 'userName'],
        data() {
            return {
                circleConfig: {
                    x: this.x + 25,
                    y: this.y + this.height,
                    radius: radius,
                    fill: '#D18405'
                },
                second: 30,
                textConfig: {
                    x: this.x + 10,
                    y: this.y + this.height - 10,
                    text: '30',
                    fontSize: 30
                },
            }
        },
        watch: {
            x: function (newX) {
                this.circleConfig.x = newX  + 25;
                this.textConfig.x = newX + 10;
            },
            y: function (newY) {
                this.circleConfig.y = newY + this.height;
                this.textConfig.y = newY + this.height - 10;
            }
        },
        mounted() {
            let countDown = setInterval(() => {
                this.second -= 1;
                this.textConfig.text = this.second + '';
                if(this.second === 0) {
                    clearInterval(countDown);
                    this.$emit('countDownCallback', this.userName);
                }
            }, 1000);
        }
    }
</script>

<style scoped>

</style>