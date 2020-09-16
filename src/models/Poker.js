import { v4 as uuidv4 } from 'uuid';
export default class Poker {
    constructor(image, pokerType, number) {
        this.id = uuidv4();
        this.image = image;
        this.pokerType = pokerType;
        this.number = number;
    }

    updateId() {
        this.id = uuidv4();
    }
}