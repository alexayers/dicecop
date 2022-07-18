import {Renderer} from "../lib/rendering/renderer";
import {getRandomBetween} from "../lib/util/mathUtil";


const eyesImage = require("../../resources/images/eyes.png");

const eyeBrow1 = require("../../resources/images/eyeBrow1.png");
const eyeBrow2 = require("../../resources/images/eyeBrow2.png");
const eyeBrow3 = require("../../resources/images/eyeBrow3.png");

export default class Eyes {

    private _eyes : HTMLImageElement;
    private _currentBrow : number = 0;
    private _eyesBrow1 : HTMLImageElement;
    private _eyesBrow2 : HTMLImageElement;
    private _eyesBrow3 : HTMLImageElement;

    private _tick : number = 0;

    constructor() {

        this._eyes = new Image();
        this._eyes.src = eyesImage;

        this._eyesBrow1 = new Image();
        this._eyesBrow1.src = eyeBrow1;

        this._eyesBrow2 = new Image();
        this._eyesBrow2.src = eyeBrow2;

        this._eyesBrow3 = new Image();
        this._eyesBrow3.src = eyeBrow3;
    }

    render(offsetX: number, offsetY : number) : void {

        if (this._tick < 90) {
            Renderer.renderImage(this._eyes , offsetX,offsetY, 1024,768);
        }

        switch (this._currentBrow) {
            case 1:
                Renderer.renderImage(this._eyesBrow1 , offsetX,offsetY, 1024,768);
                break;
            case 2:
                Renderer.renderImage(this._eyesBrow2 , offsetX,offsetY, 1024,768);
                break;
            case 3:
                Renderer.renderImage(this._eyesBrow3 , offsetX,offsetY, 1024,768);
                break;
        }

        this._tick++;

        if (this._tick > 100) {
            this._tick = getRandomBetween(0, 20);

            this._currentBrow = getRandomBetween(1, 3);

        }

    }
}
