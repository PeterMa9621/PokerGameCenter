export default class Utility {
    static removePlayerByUserName(playerList, userName) {
        let players = Object.assign([], playerList);
        let removedPlayer = {};
        for(let i=0; i<players.length; i++) {
            let player = players[i];
            if(player===null)
                continue;
            if(player.userName === userName) {
                console.log(userName);
                removedPlayer = Object.assign({}, player);
                players.splice(i, 1);
                break;
            }
        }
        return [removedPlayer, players];
    }

    static updatePlayer(player, updatedPlayer) {
        player.userName = updatedPlayer.userName;
        player.score = updatedPlayer.score;
        player.winRate = updatedPlayer.winRate;
        player.isPrepared = updatedPlayer.isPrepared;
        player.myTurn = updatedPlayer.myTurn;
    }
}