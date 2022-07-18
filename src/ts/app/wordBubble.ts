import {Renderer} from "../lib/rendering/renderer";
import {getRandomInt} from "../lib/util/mathUtil";

const dice1Image = require("../../resources/images/dice1.png");
const dice2Image = require("../../resources/images/dice2.png");
const dice3Image = require("../../resources/images/dice3.png");
const dice4Image = require("../../resources/images/dice4.png");
const dice5Image = require("../../resources/images/dice5.png");
const dice6Image = require("../../resources/images/dice6.png");

const wordBubbleImage = require("../../resources/images/wordBubble.png");

export default class WordBubble {

    private _wordBubble: HTMLImageElement;
    private _dice1: HTMLImageElement;
    private _dice2: HTMLImageElement;
    private _dice3: HTMLImageElement;
    private _dice4: HTMLImageElement;
    private _dice5: HTMLImageElement;
    private _dice6: HTMLImageElement;

    private _bounce1: number = 0;
    private _bounce2: number = 0;
    private _bounce3: number = 0;
    private _bounce4: number = 0;

    private _tick : number = 0;
    private _maxTick : number = 3;

    private _maxBounce1 : number = getRandomInt(12);
    private _maxBounce2 : number = getRandomInt(12);
    private _maxBounce3 : number = getRandomInt(12);
    private _maxBounce4 : number = 4;


    private _bounce1Up: boolean = false;
    private _bounce2Up: boolean = false;
    private _bounce3Up: boolean = false;
    private _bounce4Up: boolean = false;

    constructor() {

        this._wordBubble = new Image();
        this._wordBubble.src = wordBubbleImage;

        this._dice1 = new Image();
        this._dice1.src = dice1Image;

        this._dice2 = new Image();
        this._dice2.src = dice2Image;

        this._dice3 = new Image();
        this._dice3.src = dice3Image;

        this._dice4 = new Image();
        this._dice4.src = dice4Image;

        this._dice5 = new Image();
        this._dice5.src = dice5Image;

        this._dice6 = new Image();
        this._dice6.src = dice6Image;
    }

   render(lie1 : number , lie2 : number, lie3 : number) : void {

       Renderer.renderImage(this._wordBubble, 0, 0, 1024, 768);


       Renderer.renderImage(this.getDiceImage(lie1), 450, 170 + this._bounce1,  128, 128);
       Renderer.renderImage(this.getDiceImage(lie2), 550 , 170 + this._bounce2, 128, 128);
       Renderer.renderImage(this.getDiceImage(lie3), 650 , 170 + this._bounce3, 128, 128);

       this._tick++;

       if (this._tick < this._maxTick) {
           return;
       }

       this._tick = 0;

       if (this._bounce1Up) {
           this._bounce1--;

           if (this._bounce1 < (this._maxBounce1 * -1)) {
               this._bounce1Up = false;
           }
       } else {
           this._bounce1++;

           if (this._bounce1 > this._maxBounce1) {
               this._bounce1Up = true;
           }
       }

       if (this._bounce2Up) {
           this._bounce2--;

           if (this._bounce2 < (this._maxBounce2 * -1)) {
               this._bounce2Up = false;
           }
       } else {
           this._bounce2++;

           if (this._bounce2> this._maxBounce2) {
               this._bounce2Up = true;
           }
       }

       if (this._bounce3Up) {
           this._bounce3--;

           if (this._bounce3 < (this._maxBounce3 * -1)) {
               this._bounce3Up = false;
           }
       } else {
           this._bounce3++;

           if (this._bounce3 > this._maxBounce3) {
               this._bounce3Up = true;
           }
       }

       if (this._bounce4Up) {
           this._bounce4--;

           if (this._bounce4 < (this._maxBounce4 * -1)) {
               this._bounce4Up = false;
           }
       } else {
           this._bounce4++;

           if (this._bounce4 > this._maxBounce4) {
               this._bounce4Up = true;
           }
       }

   }

    private getDiceImage(die: number) : HTMLImageElement {
        switch (die) {
            case 1:
                return this._dice1;
            case 2:
                return this._dice2;
            case 3:
                return this._dice3;
            case 4:
                return this._dice4;
            case 5:
                return this._dice5;
            case 6:
                return this._dice6;
            default:
                return this._dice1;
        }
    }
}
