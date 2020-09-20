import axios from "axios";
import ApiUrl from "../common/ApiUrl";

export default class Bie7Service {
    static socketUrl = ApiUrl.BIE_7_SOCKET_URL;
    static apiUrl = ApiUrl.BIE_7_URL;
    webSocket = null;
    finishInit = false;
    updatePlayerCallback = () => {};
    closeCallback = () => {};
    startCallback = () => {};
    playCardCallback = () => {};
    clearBoardCallback = () => {};
    errorCallback = () => {};
    updatePokerCallback = () => {};
    kouPokerCallback = () => {};

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
                case 'update player':
                    this.updatePlayerCallback(data['players']);
                    break;
                case 'start':
                    this.startCallback(data['currentPlayer']);
                    break;
                case 'play card':
                    this.playCardCallback(data['poker'], data['userName']);
                    break;
                case 'clear':
                    this.clearBoardCallback();
                    break;
                case 'error':
                    this.errorCallback(data['msg'], data['userName']);
                    break;
                case 'update poker':
                    this.updatePokerCallback(data['poker']);
                    break;
                case 'kou card':
                    this.kouPokerCallback(data['userName']);
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

    playPoker(poker, isKou=false) {
        let data = {
            action: !isKou?'play card':'kou card',
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