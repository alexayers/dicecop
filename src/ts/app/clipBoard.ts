import {Renderer} from "../lib/rendering/renderer";
import {Color} from "../lib/rendering/color";

const clipBoardImage = require("../../resources/images/clipBoard.png");

export default class ClipBoard {

    private _clipBoard : HTMLImageElement;

    private _bobLeft : boolean = true;
    private _bobX : number = 0;
    private _tick : number = 0;
    private _maxTick : number = 26;
    private _color : Color = new Color();


    constructor() {
        this._clipBoard = new Image();
        this._clipBoard.src = clipBoardImage;

        this._color.setRed(0);
        this._color.setGreen(0);
        this._color.setBlue(0);


    }


    render(answer : number, guesses :number) : void {
        Renderer.renderImage(this._clipBoard , this._bobX,this._bobX, 1024,768);

        Renderer.print("How to play", 120 + this._bobX, 630 + this._bobX, "Arial", 30, this._color);
        Renderer.print("Escape: show / hide facts", 100+ this._bobX, 660+ this._bobX, "Arial", 16, this._color);
        Renderer.print("Space: Accuse", 100+ this._bobX, 680+ this._bobX, "Arial", 16, this._color);
        Renderer.print("\"1\",\"2\",\"3\": Detect Lie ", 100+ this._bobX, 700+ this._bobX, "Arial", 16, this._color);

        Renderer.print("Remaining Guesses: " + guesses, 100+ this._bobX, 730+ this._bobX, "Arial", 16, this._color);


        this._tick++;

        if (this._tick == this._maxTick) {
            this._tick = 0;

            if (this._bobLeft) {
                this._bobX--;
            } else {
                this._bobX++;
            }

        }

        if (this._bobX == -2) {
            this._bobLeft = false;
        } else if (this._bobX == 0) {
            this._bobLeft = true;
        }

    }
}
