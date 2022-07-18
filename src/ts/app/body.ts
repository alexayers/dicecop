import {Renderer} from "../lib/rendering/renderer";


const bodyImage = require("../../resources/images/body.png");

export default class Body {
    private _body : HTMLImageElement;

    private _breathIn : boolean = true;
    private _width : number = 0;
    private _tick : number = 0;
    private _maxTick : number = 9;


    constructor() {
        this._body = new Image();
        this._body.src = bodyImage;
    }

    render():void {
        Renderer.renderImage(this._body , 0,0, 1024 + this._width,768 + this._width);

        this._tick++;

        if (this._tick == this._maxTick) {
            this._tick = 0;

            if (this._breathIn) {
                this._width++;
            } else {
                this._width--;
            }

        }

        if (this._width == 4) {
            this._breathIn = false;
        } else if (this._width == 0) {
            this._breathIn = true;
        }

    }
}
