export default class Utility {
    static removePlayerByUserName(playerList, userName) {
        let players = Object.assign([], playerList);

        for(let i=0; i<players.length; i++) {
            let player = players[i];
            console.log(player.userName);
            if(player.userName === userName) {
                console.log(userName);
                players.splice(i, 1);
                break;
            }
        }
        return players;
    }
}