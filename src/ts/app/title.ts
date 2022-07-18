import {Renderer} from "../lib/rendering/renderer";


const titleImage = require("../../resources/images/title.png");

export default class Title {
    private _title : HTMLImageElement;

    private _breathIn : boolean = true;
    private _width : number = 0;
    private _tick : number = 0;
    private _maxTick : number = 7;


    constructor() {
        this._title = new Image();
        this._title.src = titleImage;
    }

    render():void {
        Renderer.renderImage(this._title , this._width,this._width, 1024 + this._width,768 + this._width);

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
