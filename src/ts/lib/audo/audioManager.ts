import {EventBus} from "../event/eventBus";
import {GameEvent} from "../event/gameEvent";
import {AudioFile} from "./audioFile";
import {ConfigurationManager} from "../application/configuration";



export class AudioManager {
    private static _soundMap : Map<string, AudioFile> = new Map<string, AudioFile>();
    private static _audioEnabled:boolean;

    public static init() : void {
        let soundCheck = new Audio();

        this._audioEnabled = ConfigurationManager.getValue("audioEnabled") as boolean;

        console.log("Is audio enabled? " + this._audioEnabled);



        if (!soundCheck.canPlayType('audio/ogg')) {
           Error("Your browser doesn't support audio/ogg");
        }

        EventBus.register("audio", AudioManager.handleEvent);
    }

    // @ts-ignore
    private static register(name: string, audioFile: string, loop: boolean = false) : void {
        AudioManager._soundMap.set(name, new AudioFile(audioFile, loop));
    }

    public static play(name: string) : void {
        if (this._audioEnabled) {
            AudioManager._soundMap.get(name).play();
        }

    }

    public static handleEvent(gameEvent: GameEvent): void {
        AudioManager.play(gameEvent.payload);
    }




}
