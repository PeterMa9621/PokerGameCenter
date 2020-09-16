<template>
    <div class="container">
        <div class="card mt-5">
            <div class="card-header">
                选择一个游戏房间
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <div v-for="room in leftSideRooms" :key="room.id">
                            <div class="card form-group">
                                <div class="card-header">
                                    <div class="row justify-content-between">
                                        <div class="ml-3">
                                            房间 {{ room.id }} 号
                                        </div>
                                        <div class="mr-3">
                                            (玩家: {{ room.numPlayers }}/4)
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <router-link class="btn btn-primary" :to="{name: 'bie7-game', params: {id:room.id}}">进入这个房间</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div v-for="room in rightSideRooms" :key="room.id">
                            <div class="card form-group">
                                <div class="card-header">
                                    <div class="row justify-content-between">
                                        <div class="ml-3">
                                            房间 {{ room.id }} 号
                                        </div>
                                        <div class="mr-3">
                                            (玩家: {{ room.numPlayers }}/4)
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <router-link class="btn btn-primary" :to="{name: 'bie7-game', params: {id:room.id}}">进入这个房间</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Bie7Service from "../service/Bie7Service";

    export default {
        name: "Bie7LobbyPage",
        data() {
            return {
                rooms: [{
                    numPlayers: 0
                },{
                    numPlayers: 0
                },{
                    numPlayers: 0
                },{
                    numPlayers: 0
                },{
                    numPlayers: 0
                },{
                    numPlayers: 0
                },{
                    numPlayers: 0
                }],
                leftSideRooms: [],
                rightSideRooms: []
            }
        },
        mounted() {
            let numRoom = this.rooms.length;
            let numLeft = Math.ceil(numRoom/2);

            Bie7Service.getRoomInfo().then(response => {
                let data = response.data;
                for(let roomId in data) {
                    this.rooms[parseInt(roomId)-1].numPlayers = data[roomId].numPlayers;
                }

                for(let i=0; i<numLeft; i++) {
                    this.leftSideRooms.push({...this.rooms[i], id: i+1});
                }
                for(let i=numLeft; i<numRoom; i++) {
                    this.rightSideRooms.push({...this.rooms[i], id: i+1});
                }
            }).catch(reason => {
                console.log(reason);
            });
        }
    }
</script>

<style scoped>

</style>