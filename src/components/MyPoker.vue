<template>
    <div v-if="Object.keys(myPokers).length > 0">
        <div v-for="(poker, index) in myPokers" :key="poker.id">
            <PokerCard :poker="poker" :x="startPosition.x + index*interval" :y="startPosition.y"
                       :index="index" :selected-poker="selectedPoker" :can-operate="true" />
        </div>
    </div>
</template>

<script>
    import PokerCard from "./PokerCard";    const interval = 25;
    export default {
        name: "MyPoker",
        components: {PokerCard},
        props: ['myPokers', 'center', 'cardWidth', 'cardHeight', 'selectedPoker'],
        data() {
            return {
                startPosition: {
                    x: this.center.x,
                    y: this.center.y
                },
                interval: interval
            }
        },
        watch: {
            center: {
                handler(newCenter) {
                    this.calculatePokersPosition(newCenter);
                },
                deep: true
            },
            myPokers: {
                handler() {
                    this.calculatePokersPosition(this.center);
                },
                deep: true
            }
        },
        mounted() {
            this.calculatePokersPosition(this.center);
        },
        methods: {
            calculatePokersPosition(center) {
                this.startPosition.x = center.x - (this.cardWidth + (interval*this.myPokers.length))/2 + this.cardWidth/2;
                this.startPosition.y = window.innerHeight - this.cardHeight - interval;
            }
        }
    }
</script>

<style scoped>

</style>