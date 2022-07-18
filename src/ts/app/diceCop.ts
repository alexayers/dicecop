import {GameMode} from "./screens/modes";
import {MainScreen} from "./screens/mainScreen";
import {EventBus} from "../lib/event/eventBus";
import {GameEvent} from "../lib/event/gameEvent";
import {Renderer} from "../lib/rendering/renderer";
import {Application} from "../lib/application/application";
import {OverLayScreen} from "../lib/application/overLayScreen";


const framesPerSecond: number = 60;

export class DiceCop extends Application {

    private _gameScreens:Map<GameMode,MainScreen>;
    private _gameOverlayScreen:Map<string,OverLayScreen>;

    private _gameMode:GameMode;

    init() {


        Renderer.init();

        this._gameScreens = new Map<GameMode, MainScreen>();
        this._gameOverlayScreen = new Map<string,OverLayScreen>();

        this._gameScreens.set(GameMode.PLAYING, new MainScreen());
        this._gameScreens.get(GameMode.PLAYING).init();



        this._gameMode = GameMode.PLAYING;

        EventBus.register("keyboardEvent", this.handleEvent.bind(this));
        this.gameLoop();
    }

    gameLoop() {

        this._gameScreens.get(this._gameMode).logicLoop();
        Renderer.clearScreen();

        this._gameScreens.get(this._gameMode).renderLoop();

        for (let key of this._gameOverlayScreen.keys()) {
            if (this._gameOverlayScreen.get(key).isActive()) {
                this._gameOverlayScreen.get(key).gameLoop();
            }
        }

        Renderer.finalRender();

        setTimeout(() => {
            requestAnimationFrame(this.gameLoop.bind(this));
        }, 1000 / framesPerSecond);
    }



    handleEvent(gameEvent: GameEvent): void {
        this._gameScreens.get(this._gameMode).keyboard(gameEvent);
    }




}
