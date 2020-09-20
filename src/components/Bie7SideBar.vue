<template>
    <div class="card">
        <div class="card-header">
            Information
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table">
                    <thead class="thead-dark">
                    <tr>
                        <th>User Name</th>
                        <th>Score</th>
                        <th>Win Rate</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(player, index) in players" :key="index + '_player'">
                        <td v-if="player!==null">{{ player['userName'] }}</td>
                        <td v-if="player!==null">{{ player['score'] }}</td>
                        <td v-if="player!==null">{{ player['winRate'] }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="card mt-3">
                <div class="card-header">
                    Chat Room
                </div>
                <div class="card-body">
                    <div class="form-group card card-body">
                        No content
                    </div>
                    <div>
                        <label for="chat">Chat</label>
                        <textarea id="chat" class="form-control" placeholder="Chat content"></textarea>
                        <button class="btn btn-sm btn-primary mt-3">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Bie7SideBar",
        props: ['players']
    }
</script>

<style scoped>

</style>