import clubA from "../assets/poker/club/club_A-min.png";
import club2 from "../assets/poker/club/club_2-min.png";
import club3 from "../assets/poker/club/club_3-min.png";
import club4 from "../assets/poker/club/club_4-min.png";
import club5 from "../assets/poker/club/club_5-min.png";
import club6 from "../assets/poker/club/club_6-min.png";
import club7 from "../assets/poker/club/club_7-min.png";
import club8 from "../assets/poker/club/club_8-min.png";
import club9 from "../assets/poker/club/club_9-min.png";
import club10 from "../assets/poker/club/club_10-min.png";
import clubJ from "../assets/poker/club/club_J-min.png";
import clubQ from "../assets/poker/club/club_Q-min.png";
import clubK from "../assets/poker/club/club_K-min.png";

import diamondA from "../assets/poker/diamond/diamond_A-min.png";
import diamond2 from "../assets/poker/diamond/diamond_2-min.png";
import diamond3 from "../assets/poker/diamond/diamond_3-min.png";
import diamond4 from "../assets/poker/diamond/diamond_4-min.png";
import diamond5 from "../assets/poker/diamond/diamond_5-min.png";
import diamond6 from "../assets/poker/diamond/diamond_6-min.png";
import diamond7 from "../assets/poker/diamond/diamond_7-min.png";
import diamond8 from "../assets/poker/diamond/diamond_8-min.png";
import diamond9 from "../assets/poker/diamond/diamond_9-min.png";
import diamond10 from "../assets/poker/diamond/diamond_10-min.png";
import diamondJ from "../assets/poker/diamond/diamond_J-min.png";
import diamondQ from "../assets/poker/diamond/diamond_Q-min.png";
import diamondK from "../assets/poker/diamond/diamond_K-min.png";

import heartA from "../assets/poker/heart/heart_A-min.png";
import heart2 from "../assets/poker/heart/heart_2-min.png";
import heart3 from "../assets/poker/heart/heart_3-min.png";
import heart4 from "../assets/poker/heart/heart_4-min.png";
import heart5 from "../assets/poker/heart/heart_5-min.png";
import heart6 from "../assets/poker/heart/heart_6-min.png";
import heart7 from "../assets/poker/heart/heart_7-min.png";
import heart8 from "../assets/poker/heart/heart_8-min.png";
import heart9 from "../assets/poker/heart/heart_9-min.png";
import heart10 from "../assets/poker/heart/heart_10-min.png";
import heartJ from "../assets/poker/heart/heart_J-min.png";
import heartQ from "../assets/poker/heart/heart_Q-min.png";
import heartK from "../assets/poker/heart/heart_K-min.png";

import spadeA from "../assets/poker/spade/spade_A-min.png";
import spade2 from "../assets/poker/spade/spade_2-min.png";
import spade3 from "../assets/poker/spade/spade_3-min.png";
import spade4 from "../assets/poker/spade/spade_4-min.png";
import spade5 from "../assets/poker/spade/spade_5-min.png";
import spade6 from "../assets/poker/spade/spade_6-min.png";
import spade7 from "../assets/poker/spade/spade_7-min.png";
import spade8 from "../assets/poker/spade/spade_8-min.png";
import spade9 from "../assets/poker/spade/spade_9-min.png";
import spade10 from "../assets/poker/spade/spade_10-min.png";
import spadeJ from "../assets/poker/spade/spade_J-min.png";
import spadeQ from "../assets/poker/spade/spade_Q-min.png";
import spadeK from "../assets/poker/spade/spade_K-min.png";
import PokerType from "./PokerType";
import Poker from "../models/Poker";

export default class PokerContainer {
    static clubImages = [clubA, club2, club3, club4, club5, club6, club7, club8, club9, club10, clubJ, clubQ, clubK];
    static diamondImages = [diamondA, diamond2, diamond3, diamond4, diamond5, diamond6, diamond7, diamond8, diamond9, diamond10, diamondJ, diamondQ, diamondK];
    static heartImages = [heartA, heart2, heart3, heart4, heart5, heart6, heart7, heart8, heart9, heart10, heartJ, heartQ, heartK];
    static spadeImages = [spadeA, spade2, spade3, spade4, spade5, spade6, spade7, spade8, spade9, spade10, spadeJ, spadeQ, spadeK];
    static images = {club: this.clubImages, diamond: this.diamondImages, heart: this.heartImages, spade: this.spadeImages};

    static getPokers(pokerType) {
        let images = [];
        switch (pokerType) {
            case PokerType.CLUB:
                images = this.clubImages;
                break;
            case PokerType.DIAMOND:
                images = this.diamondImages;
                break;
            case PokerType.HEART:
                images = this.heartImages;
                break;
            case PokerType.SPADE:
                images = this.spadeImages;
                break;
        }
        let pokers = [];
        for(let i=0; i<images.length; i++) {
            let poker = new Poker(images[i], pokerType, i+1);
            pokers.push(poker);
        }
        return pokers;
    }
}