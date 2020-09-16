import PokerContainer from "./PokerContainer";
import Poker from "../models/Poker";

export default class PokerUtility {
    static getProperPokerListByType(list, pokerType) {
        for(let i=0; i<list.length; i++) {
            if(list[i][0].pokerType === pokerType) {
                return i;
            }
        }
        return -1;
    }

    static orderPoker(list) {
        return list.sort((a, b) => (a.number < b.number) ? 1 : -1);
    }

    static convertPokers(list) {
        let result = [];
        for(let poker of list) {
            let type = poker['pokerType'];
            let number = poker['number'];
            result.push(new Poker(PokerContainer.images[type][number-1], type, number));
        }
        result = this.orderPoker(result);
        return result;
    }

    static convertPoker(poker) {
        let image = PokerContainer.images[poker.pokerType][poker.number-1];
        return new Poker(image, poker.pokerType, poker.number);
    }
}