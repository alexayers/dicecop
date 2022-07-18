import {Renderer} from "../lib/rendering/renderer";
import Eyes from "./eyes";


const headImage = require("../../resources/images/head.png");

export default class Head {
    private readonly _head : HTMLImageElement;
    private _eyes: Eyes = new Eyes();

    private _bobDown : boolean = true;
    private _bobY : number = 0;
    private _tick : number = 0;
    private _maxTick : number = 9;


    constructor() {
        this._head = new Image();
        this._head.src = headImage;
    }

    render() : void {
        Renderer.renderImage(this._head , 0, this._bobY, 1024,768);

        this._eyes.render(0, this._bobY);

        this._tick++;

        if (this._tick == this._maxTick) {
            this._tick = 0;

            if (this._bobDown) {
                this._bobY++;
            } else {
                this._bobY--;
            }

        }

        if (this._bobY == 4) {
            this._bobDown = false;
        } else if (this._bobY == 0) {
            this._bobDown = true;
        }

    }
}
