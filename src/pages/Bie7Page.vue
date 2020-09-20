<template>
    <div class="background">
        <div class="row h-100 w-100">
            <div class="col-9" ref="container">
                <v-stage ref="stage" :config="configCanvas">
                    <v-layer>
                        <div v-if="hasUserInfoFinishInit">
                            <div v-for="(opponent, index) in opponents" :key="index + 'opponent'">
                                <div v-if="opponent!==null">
                                    <Bie7UserInfo :height="sideUserInfoConfig.height" :width="sideUserInfoConfig.width"
                                                  :y="userInfoPos[index].y" :x="userInfoPos[index].x" :opponent="opponent"
                                                  :pos="userInfoPos[index].pos"/>
                                </div>
                            </div>
                        </div>
                        <!--
                        <Bie7UserInfo :height="sideUserInfoConfig.height" :width="sideUserInfoConfig.width"
                                      :y="center.y+100" :x="this.configCanvas.width" pos="right"/>
                        <Bie7UserInfo :height="sideUserInfoConfig.height" :width="sideUserInfoConfig.width"
                                      :y="20" :x="this.center.x" pos="up"/>
                                      -->

                        <div v-for="(pokerList, colIndex) in pokers" :key="colIndex + 'pokers'">
                            <PokerCard v-for="(poker, index) in pokerList" :key="poker.id"
                                       :poker="poker" :x="pokerColumnPos[colIndex].x" :y="pokerColumnPos[colIndex].y + index*interval" />
                        </div>

                    </v-layer>
                    <v-layer>
                        <TipTextArea v-if="showTip" :x="center.x" :card-height="cardHeight" :msg="tipMsg" />
                        <OperationPanel :x="center.x" :card-height="cardHeight" :pokers="pokers" @showTipArea="(msg) => showTipArea(msg)"
                                        :selected-poker="mySelectedPoker" :me="me" :type="operationType"
                                        :covered-pokers="myCoveredPokers" :service="service" :my-turn="me.myTurn" />
                        <MyPoker ref="myPoker" :my-pokers="me.myPokers" :center="center" :selected-poker="mySelectedPoker"
                                 :card-width="cardWidth" :card-height="cardHeight" />
                        <Bie7CoverPokerArea ref="coverPokerArea" :covered-pokers="myCoveredPokers" />
                        <MyNameTextArea :userName="me.userName" :x="center.x" />
                    </v-layer>
                </v-stage>
            </div>
            <div class="col-3 align-self-center">
                <Bie7SideBar :players="players" />
            </div>
        </div>
    </div>
</template>

<script>
    import PokerCard from "../components/PokerCard";
    import MyPoker from "../components/MyPoker";
    import Bie7UserInfo from "../components/Bie7UserInfo";
    import Bie7SideBar from "../components/Bie7SideBar";
    import OperationPanel from "../components/OperationPanel";
    import TipTextArea from "../components/TipTextArea";
    import Bie7CoverPokerArea from "../components/Bie7CoverPokerArea";
    import Bie7Service from "../service/Bie7Service";
    import PokerUtility from "../common/PokerUtility";
    import Utility from "../common/Utility";
    import MyNameTextArea from "../components/MyNameTextArea";

    const width = window.innerWidth;
    const height = window.innerHeight;
    const cardHeight = 148;
    const cardWidth = 106;
    const interval = 25;

    export default {
        name: "BieSevenPage",
        components: {
            MyNameTextArea,
            Bie7CoverPokerArea, TipTextArea, OperationPanel, Bie7SideBar, Bie7UserInfo, MyPoker, PokerCard},
        data() {
            return {
                configCanvas: {
                    width: width,
                    height: height
                },
                pokers: [],
                myCoveredPokers: [],
                center: {
                    x: (width / 2) - (cardWidth / 2),
                    y: (height / 2) - (interval*8) - (cardHeight / 2)
                },
                pokerColumnPos: [],
                userInfoPos: [],
                interval: interval,
                cardWidth: cardWidth,
                cardHeight: cardHeight,
                players: [],
                opponents: [],
                sideUserInfoConfig: {
                    height: 300,
                    width: 200
                },
                shouldKou: false,
                mySelectedPoker: {},
                showTip: false,
                tipMsg: '',
                hasUserInfoFinishInit: false,
                service: null,
                operationType: 'prepare',
                me: {
                    myPokers: []
                }
            };
        },
        mounted() {
            this.changeRect();
            this.hasUserInfoFinishInit = true;
            let userName = this.$store.state.user.username;
            this.service = new Bie7Service(this.$route.params.id, userName, () => {});
            this.service.updatePlayerCallback = (players) => {
                this.players = players;
                this.opponents = Object.assign({}, players);
                let result = Utility.removePlayerByUserName(this.opponents, userName);
                let me = result[0];
                me.myPokers = this.me.myPokers;
                this.me = me;
                if(me.shouldKou)
                    this.operationType = 'kou';
                else if(me.myTurn)
                    this.operationType = 'play';
                else if(!me.isInGame)
                    this.operationType = 'prepare';

                this.opponents = result[1];
            };
            this.service.closeCallback = () => {
                this.$router.push({name: 'bie7'});
            };
            this.service.startCallback = () => {
                this.operationType = 'play';
                this.pokers = [];
                this.myCoveredPokers = [];
            };
            this.service.playCardCallback = (poker, playerUserName) => {

                let pokerWithPic = PokerUtility.convertPoker(poker);
                let type = pokerWithPic.pokerType;
                let index = PokerUtility.getProperPokerListByType(this.pokers, type);
                if(index === -1) {
                    index = 0;
                    this.pokers.push([pokerWithPic]);
                } else {
                    this.pokers[index].push(pokerWithPic);
                }
                this.pokers[index] = PokerUtility.orderPoker(this.pokers[index]);
                for(let poker of this.pokers[index]) {
                    poker.updateId();
                }

                if(playerUserName === userName) {
                    if(PokerUtility.isSamePoker(poker, this.mySelectedPoker.poker)) {
                        let removeIndex = this.me.myPokers.indexOf(this.mySelectedPoker.poker);
                        this.me.myPokers.splice(removeIndex, 1);
                    }
                }

                delete this.mySelectedPoker.poker;
            };
            this.service.clearBoardCallback = () => {
                this.pokers = [];
                this.me.myPokers = [];
                this.me.myTurn = false;
                this.operationType = 'prepare';
            };
            this.service.errorCallback = (msg, playerUserName) => {
                if(userName === playerUserName)
                    this.showTipArea(msg);
            };
            this.service.updatePokerCallback = (poker) => {
                this.me.myPokers = PokerUtility.convertPokers(poker);
            };
            this.service.kouPokerCallback = (playerUserName) => {
                if(playerUserName !== userName) {
                    return;
                }
                let selectedPoker = this.mySelectedPoker.poker;
                let removeIndex = this.me.myPokers.indexOf(selectedPoker);

                this.me.myPokers.splice(removeIndex, 1);
                this.myCoveredPokers.push(selectedPoker);
                delete this.mySelectedPoker.poker;
                this.operationType = 'play';
            };
        },
        created() {
            window.addEventListener("resize", this.changeRect);
            this.changeRect();
            this.initPositions();
        },
        methods: {
            changeRect: function() {
                const container = this.$refs.container;
                if (!container)
                    return;

                this.configCanvas.width = container.offsetWidth;
                this.configCanvas.height = container.offsetHeight;
                this.center.x = (this.configCanvas.width / 2) - (cardWidth / 2);
                this.center.y = (this.configCanvas.height / 2) - (interval*8) - (cardHeight / 2);
                this.initPositions();
                this.sideUserInfoConfig.width = this.pokerColumnPos[0].x/2;
                this.userInfoPos = [{
                    x: 20,
                    y: this.center.y+100,
                    pos: 'left'
                }, {
                    x: this.configCanvas.width,
                    y: this.center.y+100,
                    pos: 'right'
                }, {
                    x: this.center.x,
                    y: 20,
                    pos: 'up'
                }];
                this.$refs['coverPokerArea'].calculateAreaPosition();
            },
            initPositions: function () {
                let center = this.center;
                let x = center.x;
                let y = center.y;
                let interval = (1/4) * x;
                this.pokerColumnPos = [{
                    x: x - (interval * 3/2),
                    y: y
                }, {
                    x: x - interval/2,
                    y: y
                }, {
                    x: x + interval/2,
                    y: y
                }, {
                    x: x + (interval * 3/2),
                    y: y
                }]
            },
            showTipArea(msg) {
                this.tipMsg = msg;
                this.showTip = true;
                setTimeout(() => {
                    this.showTip = false;
                }, 3000);
            }
        }
    }
</script>

<style scoped>
    .background {
        background-image: url("../assets/poker/bie7_background.jpg");
        background-attachment: fixed;
        background-size: cover;
    }
</style>