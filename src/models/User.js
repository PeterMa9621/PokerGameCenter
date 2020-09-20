export default class User {
    constructor({username, token, createdAt, isAuthorized, score, numWin, numGame}) {
        this.username = username === undefined ? '' : username;
        this.token = token === undefined ? '' : token;
        this.createdAt = createdAt === undefined ? '' : createdAt;
        this.isAuthorized = isAuthorized === undefined ? false : isAuthorized;
        this.score = score === undefined ? 0 : score;
        this.numWin = numWin === undefined ? 0 : numWin;
        this.numGame = numGame === undefined ? 0 : numGame;
    }
}