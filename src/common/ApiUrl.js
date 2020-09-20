export default class ApiUrl {
    static PROTOCOL = 'http://';
    static SOCKET_PROTOCOL = 'ws://';
    static BASE_SOCKET_URL =  this.SOCKET_PROTOCOL + '35.203.54.101/:3000';
    static BIE_7_SOCKET_URL = this.BASE_SOCKET_URL + '/bie7/';
    static BASE_URL = this.PROTOCOL + '35.203.54.101:3000';
    static BIE_7_URL = this.BASE_URL + '/bie7/';
    static LOGIN_URL = this.BASE_URL + '/user/login';
    static REGISTER_URL = this.BASE_URL + '/user/register';
}