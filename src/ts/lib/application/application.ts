import {EventBus} from "../event/eventBus";
import {GameEvent} from "../event/gameEvent";
import {AudioManager} from "../audo/audioManager";
import {Renderer} from "../rendering/renderer";
import {WebStorage} from "../filesystem/webStorage";
import {ConfigurationManager} from "./configuration";


export class Application {

    constructor() {

        WebStorage.init();
        ConfigurationManager.init();
        Renderer.init();
        AudioManager.init();

        document.addEventListener('keydown', (event : KeyboardEvent) => {
            EventBus.publish(
                new GameEvent("keyboardEvent", event.keyCode)
            );
        });
    }

    resize() {
        Renderer.resize();
    }

}

