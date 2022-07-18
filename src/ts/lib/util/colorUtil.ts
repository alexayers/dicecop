import {Color} from "../rendering/color";

export function RGBtoHex(red: number, green: number, blue: number) : string{
    return "#" + red.toString(16) + green.toString(16) + blue.toString(16);
}

export class Colors {

    static BLACK() {
        return new Color(0,0,0);
    }

    static RED() {
        return new Color(255,0,0);
    }


}
