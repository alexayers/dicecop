import {Renderer} from "../lib/rendering/renderer";
import {getRandomInt} from "../lib/util/mathUtil";


const lightImage = require("../../resources/images/lamp.png");
const lightSourceImage = require("../../resources/images/lightSource.png");

export default class Light {
    private readonly _lamp : HTMLImageElement;
    private readonly _lightSource : HTMLImageElement;

    private _bobLeft : boolean = true;
    private _bobX : number = 0;
    private _tick : number = 0;
    private _maxTick : number = 9;


    constructor() {
        this._lamp = new Image();
        this._lamp.src = lightImage;

        this._lightSource = new Image();
        this._lightSource.src = lightSourceImage



    }

    render() : void {
        this.renderLightSource();
        this.renderLight();
        this._tick++;

        if (this._tick == this._maxTick) {
            this._tick = 0;

            if (this._bobLeft) {
                this._bobX++;
            } else {
                this._bobX--;
            }

        }

        if (this._bobX == 4) {
            this._bobLeft = false;
        } else if (this._bobX == 0) {
            this._bobLeft = true;
        }
    }

    private renderLight() : void {
        Renderer.renderImage(this._lamp , this._bobX, 0, 1024,768);




    }

    private renderLightSource() : void {

        if (getRandomInt(100) < 98) {
            Renderer.renderImage(this._lightSource, this._bobX, 0, 1024, 768);

            Renderer.setAlpha(1);

            Renderer.rect(0,0, 768, 1024);

        }

        Renderer.setAlpha(1);

    }
}
