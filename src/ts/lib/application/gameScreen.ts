import {GameEvent} from "../event/gameEvent";


export interface GameScreen  {
    init(): void;
    logicLoop(): void;
    renderLoop(): void;
    keyboard(gameEvent:GameEvent): void;
}
