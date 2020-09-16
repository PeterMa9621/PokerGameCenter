import axios from "axios";

export default class Bie7Service {
    static socketUrl = 'ws://192.168.0.38:3000/bie7/';
    static apiUrl = 'http://192.168.0.38:3000/bie7/';
    webSocket = null;
    finishInit = false;
    joinCallback = () => {};
    closeCallback = () => {};
    startCallback = () => {};
    playCardCallback = () => {};
    clearBoardCallback = () => {};

    constructor(roomId, userName, connectedCallBack) {
        this.connectedCallBack = connectedCallBack;
        this.userName = userName;
        this.roomId = roomId;
        this.connectWebSocket();
    }

    connectWebSocket() {
        this.webSocket = new WebSocket(Bie7Service.socketUrl + this.roomId + '/' + this.userName);
        this.webSocket.onopen = () => {
            console.log('Connected to game server!');
            this.finishInit = true;
            this.connectedCallBack();
        };
        this.webSocket.onmessage = (event) => {
            let data = event.data;
            data = JSON.parse(data);
            console.log(data);
            if(!('action' in data))
                return;
            let action = data['action'];
            switch (action) {
                case 'join':
                    this.joinCallback(data['orderedPlayers'], data['players']);
                    break;
                case 'start':
                    this.startCallback(data['pokers']);
                    break;
                case 'play card':
                    this.playCardCallback(data['poker'], data['userName']);
                    break;
                case 'clear':
                    this.clearBoardCallback();
                    break;
            }
        };
        this.webSocket.onclose = () => {
            this.closeCallback();
        };
    }

    sendMessage(msg) {
        if(this.finishInit)
            this.webSocket.send(msg);
    }

    prepare(isPrepare=false) {
        let data = {
            action: isPrepare?'prepare':'not prepare',
            userName: this.userName,
            roomId: this.roomId
        };
        this.sendMessage(JSON.stringify(data));
    }

    playPoker(poker) {
        let data = {
            action: 'play card',
            userName: this.userName,
            roomId: this.roomId,
            poker: {
                pokerType: poker.pokerType,
                number: poker.number
            }
        };
        this.sendMessage(JSON.stringify(data));
    }

    static getRoomInfo() {
        return new Promise((resolve, reject) => {
            axios.get(Bie7Service.apiUrl).then(response => {
                resolve(response);
            }).catch(reason => {
                reject(reason);
            });
        })
    }
}