<template>
    <div>
        <div v-if="type==='play'">
            <v-line :config="playButtonCardConfig" @mousemove="onMouseInPlayButton" @mouseout="onMouseOutPlayButton" @click="onPlayCard" />
            <v-text :config="playButtonTextConfig" @mousemove="onMouseInPlayButton" @mouseout="onMouseOutPlayButton" @click="onPlayCard" />
        </div>
        <div v-if="type==='kou'">
            <v-line :config="kouButtonCardConfig" @mousemove="onMouseInKouButton" @mouseout="onMouseOutKouButton" @click="onKouCard" />
            <v-text :config="kouButtonTextConfig" @mousemove="onMouseInKouButton" @mouseout="onMouseOutKouButton" @click="onKouCard" />
        </div>
        <div v-if="type==='prepare'">
            <v-line :config="prepareButtonCardConfig" @mousemove="onMouseInPrepareButton" @mouseout="onMouseOutPrepareButton" @click="onPrepareCard" />
            <v-text :config="prepareButtonTextConfig" @mousemove="onMouseInPrepareButton" @mouseout="onMouseOutPrepareButton" @click="onPrepareCard" />
        </div>
        <CountDownClock v-if="me.myTurn" :x="countDownPos.x" :y="countDownPos.y" :height="0"
                        :user-name="me.userName" @countDownCallback="(userName) => countDownCallback(userName)" />
    </div>
</template>

<script>
    import CountDownClock from "./CountDownClock";

    export default {
        name: "OperationPanel",
        components: {CountDownClock},
        props: ['x', 'cardHeight', 'selectedPoker', 'pokers', 'type', 'coveredPokers', 'service', 'me'],
        data() {
            return {
                playButtonCardConfig: {
                    x: this.x,
                    y: 0,
                    points: [0, 0, 80, 0, 80, 30, 0, 30],
                    tension: 0.05,
                    fill: 'white',
                    closed: true,
                    stroke: 'black'
                },
                playButtonTextConfig: {
                    x: 0,
                    y: 0,
                    text: '出牌',
                    fontSize: 15
                },
                kouButtonCardConfig: {
                    x: this.x,
                    y: 0,
                    points: [0, 0, 80, 0, 80, 30, 0, 30],
                    tension: 0.05,
                    fill: 'gray',
                    closed: true,
                    stroke: 'black'
                },
                kouButtonTextConfig: {
                    x: 0,
                    y: 0,
                    text: '扣牌',
                    fontSize: 15
                },
                prepareButtonCardConfig: {
                    x: this.x,
                    y: 0,
                    points: [0, 0, 80, 0, 80, 30, 0, 30],
                    tension: 0.05,
                    fill: 'white',
                    closed: true,
                    stroke: 'black'
                },
                hasPrepared: false,
                prepareButtonTextConfig: {
                    x: 0,
                    y: 0,
                    text: '准备',
                    fontSize: 15
                },
                countDownPos: {
                    x: this.x,
                    y: 0
                }
            }
        },
        watch: {
            x: function (newX) {
                this.playButtonCardConfig.x = newX;
                this.kouButtonCardConfig.x = newX;
                this.prepareButtonCardConfig.x = newX;
                this.calculateButtonsPosition();
            }
        },
        mounted() {
            this.calculateButtonsPosition();
        },
        methods: {
            calculateButtonsPosition() {
                this.playButtonCardConfig.y = window.innerHeight - this.cardHeight - 85;
                this.playButtonTextConfig.x = this.playButtonCardConfig.x + 40 - (this.playButtonTextConfig.text.length * this.playButtonTextConfig.fontSize)/2;
                this.playButtonTextConfig.y = this.playButtonCardConfig.y + 10;

                this.kouButtonCardConfig.y = window.innerHeight - this.cardHeight - 85;
                this.kouButtonTextConfig.x = this.kouButtonCardConfig.x + 40 - (this.kouButtonTextConfig.text.length * this.kouButtonTextConfig.fontSize)/2;
                this.kouButtonTextConfig.y = this.kouButtonCardConfig.y + 10;

                this.prepareButtonCardConfig.y = window.innerHeight - this.cardHeight - 85;
                this.prepareButtonTextConfig.x = this.prepareButtonCardConfig.x + 40 -
                    (this.prepareButtonTextConfig.text.length * this.prepareButtonTextConfig.fontSize)/2;
                this.prepareButtonTextConfig.y = this.prepareButtonCardConfig.y + 10;

                this.countDownPos.x = this.prepareButtonTextConfig.x + 90;
                this.countDownPos.y = this.prepareButtonTextConfig.y;
            },
            onMouseInPlayButton() {
                this.playButtonCardConfig.fill = 'brown';
            },
            onMouseInKouButton() {
                this.kouButtonCardConfig.fill = 'brown';
            },
            onMouseOutPlayButton() {
                this.playButtonCardConfig.fill = 'white';
            },
            onMouseOutKouButton() {
                this.kouButtonCardConfig.fill = 'gray';
            },
            onMouseInPrepareButton() {
                this.prepareButtonCardConfig.fill = 'gray';
            },
            onMouseOutPrepareButton() {
                this.prepareButtonCardConfig.fill = 'white';
            },
            onPlayCard() {
                if(this.selectedPoker.poker === undefined) {
                    this.$emit('showTipArea', '请先选牌！');
                    return;
                }

                //let pokers = this.pokers;
                let selectedPoker = this.selectedPoker.poker;
                this.service.playPoker(selectedPoker);
                /*
                let type = selectedPoker.pokerType;
                let index = PokerUtility.getProperPokerListByType(this.pokers, type);
                if(index === -1) {
                    index = 0;
                    pokers.push([selectedPoker]);
                } else {
                    pokers[index].push(selectedPoker);
                }
                pokers[index] = PokerUtility.orderPoker(pokers[index]);
                for(let poker of pokers[index]) {
                    poker.updateId();
                }
                let removeIndex = this.myPokers.indexOf(selectedPoker);
                this.myPokers.splice(removeIndex, 1);
                delete this.selectedPoker.poker;

                 */
            },
            onKouCard() {
                let selectedPoker = this.selectedPoker.poker;
                if(selectedPoker === undefined) {
                    this.$emit('showTipArea', '请先选牌！');
                    return;
                }

                let removeIndex = this.me.myPokers.indexOf(selectedPoker);
                console.log(removeIndex);
                this.me.myPokers.splice(removeIndex, 1);
                this.coveredPokers.push(selectedPoker);
                delete this.selectedPoker.poker;
            },
            onPrepareCard() {
                if(this.hasPrepared) {
                    this.hasPrepared = false;
                    this.prepareButtonTextConfig.text = '准备';
                } else {
                    this.hasPrepared = true;
                    this.prepareButtonTextConfig.text = '取消准备';
                }
                this.service.prepare(this.hasPrepared);
                this.prepareButtonTextConfig.x = this.prepareButtonCardConfig.x + 40 -
                    (this.prepareButtonTextConfig.text.length * this.prepareButtonTextConfig.fontSize)/2;
            },
            countDownCallback(userName) {
                this.$emit('countDownCallback', userName);
            }
        }
    }
</script>

<style scoped>

</style>