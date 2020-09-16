export default class User {
    constructor({username, token, createdAt, isAuthorized, score, winRate}) {
        this.username = username === undefined ? '' : username;
        this.token = token === undefined ? '' : token;
        this.createdAt = createdAt === undefined ? '' : createdAt;
        this.isAuthorized = isAuthorized === undefined ? false : isAuthorized;
        this.score = score === undefined ? 0 : score;
        this.winRate = winRate === undefined ? 0 : winRate;
    }
}