<template>
    <div>
        <v-line :config="cardConfig"/>
        <v-image :config="avatarConfig"/>
        <v-text :config="userNameConfig" />
        <v-text :config="gameConfig" />
        <v-text v-if="opponent['isPrepared']" :config="prepareConfig" />
        <CountDownClock v-if="opponent.myTurn" :x="userNameConfig.x" :y="userNameConfig.y" :height="cardConfig.points[5]"
                        :user-name="opponent.userName" @countDownCallback="(userName) => countDownCallback(userName)" />
    </div>
</template>

<script>
    import avatar from '../assets/avatar_man.png';
    import Position from "../common/Position";
    import CountDownClock from "./CountDownClock";

    export default {
        name: "Bie7UserInfo",
        components: {CountDownClock},
        props: ['width', 'x', 'y', 'pos', 'opponent'],
        data() {
            return {
                cardConfig: {
                    x: this.x,
                    y: this.y,
                    points: [0, 0, this.width, 0, this.width, 0, 0, 0],
                    tension: 0.15,
                    fill: '#fffdd9',
                    closed: true,
                    stroke: 'black'
                },
                userNameConfig: {
                    x: 0,
                    y: 0,
                    text: this.opponent.userName,
                    fontSize: 15
                },
                gameConfig: {
                    x: 0,
                    y: 0,
                    text: '扣牌数: 0',
                    fontSize: 15
                },
                prepareConfig: {
                    x: 0,
                    y: 0,
                    text: '已准备',
                    fill: 'green',
                    fontSize: 15
                },
                avatarConfig: {
                    x: 0,
                    y: 0,
                    image: null,
                    height: 1,
                    width: 1
                },
                isFirstNewX: true
            }
        },
        created() {
            const image = new window.Image();
            image.src = avatar;
            image.onload = () => {
                // set image only when it is loaded
                this.avatarConfig.image = image;
                this.avatarConfig.height = image.height;
                this.avatarConfig.width = image.width;

                this.calculateUserInfoPosition(this.x);
            };
        },
        watch: {
            width: function (newWidth) {
                this.updateCardConfig('points', [0, 0, newWidth, 0, newWidth, this.cardConfig.points[5], 0, this.cardConfig.points[7]]);
                this.calculateUserInfoPosition();
            },
            height: function (newHeight) {
                this.updateCardConfig('points', [0, 0, this.cardConfig.points[2], 0, this.cardConfig.points[4], newHeight, 0, newHeight]);
                this.calculateUserInfoPosition();
            },
            x: function (newX) {
                this.calculateUserInfoPosition(newX);
            },
            opponent: function (newOpponent) {
                this.gameConfig.text = '扣牌数: ' + newOpponent.numKou;
            }
        },
        methods: {
            calculateUserInfoPosition(newX=-1) {
                if(this.pos === Position.RIGHT && newX !== -1)
                    this.cardConfig.x = newX - this.cardConfig.points[2] - 20;
                else if(this.pos === Position.UP && newX !== -1)
                    this.cardConfig.x = newX;

                let centerX = (this.cardConfig.x + this.width/2) - (this.userNameConfig.fontSize * this.userNameConfig.text.length)/3;

                this.avatarConfig.x = centerX;
                this.avatarConfig.y = this.cardConfig.y;
                this.userNameConfig.x = this.avatarConfig.x;
                this.userNameConfig.y = this.cardConfig.y + this.avatarConfig.height + 10;
                this.gameConfig.x = this.avatarConfig.x + this.avatarConfig.width/2 - (this.gameConfig.fontSize * this.gameConfig.text.length)/3;
                this.gameConfig.y = this.userNameConfig.y + 20;

                this.prepareConfig.x = this.gameConfig.x;
                this.prepareConfig.y = this.gameConfig.y + 20;

                this.calculateCardHeight();
            },
            calculateCardHeight() {
                let newCardHeight = this.gameConfig.y - this.cardConfig.y + 30;
                this.updateCardConfig('points', [0, 0, this.cardConfig.points[2], 0, this.cardConfig.points[4], newCardHeight, 0, newCardHeight]);
            },
            updateCardConfig(key, value) {
                let cardConfig = Object.assign({}, this.cardConfig);
                cardConfig[key] = value;
                this.cardConfig = cardConfig;
            },
            countDownCallback(userName) {
                console.log(userName);
            }
        }
    }
</script>

<style scoped>

</style>