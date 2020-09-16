<template>
    <div>
        <v-line :config="areaConfig" />
        <div v-for="(poker, index) in coveredPokers" :key="poker.id + '_cover'">
            <PokerCard :poker="poker" :x="areaConfig.x + cardWidth * (index%6) + 3" :y="areaConfig.y + Math.floor(index/6)*cardHeight + 3" :index="index"
                       :can-operate="false" :scale-x="0.7" :scale-y="0.7" />
        </div>
        <v-text :config="textConfig" />
    </div>
</template>

<script>
    import PokerCard from "./PokerCard";

    const width = 190;
    const height = 150;
    export default {
        name: "Bie7CoverPokerArea",
        components: {PokerCard},
        props: ['coveredPokers'],
        data() {
            return {
                areaConfig: {
                    x: 20,
                    y: 0,
                    points: [0, 0, width, 0, width, height, 0, height],
                    fill: '#c1b395',
                    tension: 0.04,
                    closed: true,
                    stroke: 'black'
                },
                cardWidth: 22,
                cardHeight: 40,
                textConfig: {
                    x: 20,
                    y: 0,
                    fill: 'red',
                    text: '扣牌区',
                    fontSize: 30
                },
            }
        },
        mounted() {
            this.calculateAreaPosition();
        },
        methods: {
            calculateAreaPosition() {
                this.areaConfig.y = window.innerHeight - 170;
                this.textConfig.x = 20 + width/4;
                this.textConfig.y = window.innerHeight - 170 + height/2.5;
            }
        }
    }
</script>

<style scoped>

</style>