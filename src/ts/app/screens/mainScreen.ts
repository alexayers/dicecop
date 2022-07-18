import {GameScreen} from "../../lib/application/gameScreen";
import {GameEvent} from "../../lib/event/gameEvent";

import {KeyboardInput} from "../../lib/input/keyboard";
import {Renderer} from "../../lib/rendering/renderer";
import {Color} from "../../lib/rendering/color";

import {getRandomBetween} from "../../lib/util/mathUtil";
// @ts-ignore
import {Colors} from "../../lib/util/colorUtil";
import Head from "../head";
import ClipBoard from "../clipBoard";
import Body from "../body";
import Light from "../light";
import {AudioFile} from "../../lib/audo/audioFile";
import Title from "../title";
import RainParticles from "../rainParticles";
import SteamParticles from "../steamParticles";
import WordBubble from "../wordBubble";
import DustParticles from "../dustParticles";
import DirtParticles from "../dirtParticles";


// images
const tableImage = require("../../../resources/images/table.png");
const backgroundImage = require("../../../resources/images/background.png");
const lieDetectorImage = require("../../../resources/images/lieDetector.png");


const instructionsImage = require("../../../resources/images/instructions.png");
const lieDetectorPanelImage = require("../../../resources/images/lieDetectorPanel.png");
const goodImage = require("../../../resources/images/good.png");

const low1Image = require("../../../resources/images/low1.png");
const low2Image = require("../../../resources/images/low2.png");
const low3Image = require("../../../resources/images/low3.png");

const high1Image = require("../../../resources/images/high1.png");
const high2Image = require("../../../resources/images/high2.png");
const high3Image = require("../../../resources/images/high3.png");

const right1Image = require("../../../resources/images/rightPosition1.png");
const right2Image = require("../../../resources/images/rightPosition2.png");
const right3Image = require("../../../resources/images/rightPosition3.png");

const point1Image = require("../../../resources/images/point1.png");
const point2Image = require("../../../resources/images/point2.png");
const point3Image = require("../../../resources/images/point3.png");

const accuseImage = require("../../../resources/images/accuse.png");
const tooHighImage = require("../../../resources/images/tooHigh.png");
const tooLowImage = require("../../../resources/images/tooLow.png");

const jailImage = require("../../../resources/images/jail.png");

const pencil1Image = require("../../../resources/images/pencil1.png");
const pencil2Image = require("../../../resources/images/pencil2.png");
const pencil3Image = require("../../../resources/images/pencil3.png");
const guessImage = require("../../../resources/images/guess.png");

const armImage = require("../../../resources/images/arm.png");

// sounds

const droneSound = require("../../../resources/audio/drone.wav");
const musicSound = require("../../../resources/audio/music.wav");
const creakSound = require("../../../resources/audio/creak.wav");
const sirenSound = require("../../../resources/audio/siren.wav");
const rainSound = require("../../../resources/audio/rain.wav");
const crashSound = require("../../../resources/audio/crash.wav");

const sadTromboneSound = require("../../../resources/audio/sadTrombone.wav");
const guiltySound = require("../../../resources/audio/guilty.wav");
const paperSound = require("../../../resources/audio/paper.wav");
const pencilSound = require("../../../resources/audio/pencil.wav");

export class MainScreen implements GameScreen {

    private _numbers: Array<number> = [];
    private _lie: Array<number> = [];

    private _playerGuess: Array<number> = [];

    private _answer: number;
    private _guesses: number;

    private _color: Color = new Color();
    private _whiteColor: Color = new Color();
    private _blueColor: Color = new Color();

    private _head: Head = new Head();
    private _body: Body = new Body();
    private _clipBoard: ClipBoard = new ClipBoard();
    private _light: Light = new Light();
    private _title: Title = new Title();

    private _drone: AudioFile;
    //@ts-ignore
    private _music: AudioFile;
    private _creak: AudioFile;
    private _siren: AudioFile;
    private _rain: AudioFile;
    private _crash: AudioFile;
    private _paper: AudioFile;
    private _pencil: AudioFile;

    private _guilty: AudioFile;
    private _sadTrombone: AudioFile;

    private _wordBubbleDice : WordBubble = new WordBubble();

    private _dustParticles : DustParticles = new DustParticles();
    private _dirtyParticles : DirtParticles = new DirtParticles();
    private _rainParticles: RainParticles = new RainParticles();
    private _steamParticles: SteamParticles = new SteamParticles();

    private _table: HTMLImageElement;
    private _background: HTMLImageElement;
    private _lieDetector: HTMLImageElement;
    private _lieDetectorPanel: HTMLImageElement;

    private _instructions: HTMLImageElement;
    private _good: HTMLImageElement;

    private _arm: HTMLImageElement;

    private _pencil1: HTMLImageElement;
    private _pencil2: HTMLImageElement;
    private _pencil3: HTMLImageElement;
    private _guess: HTMLImageElement;

    private _low1: HTMLImageElement;
    private _low2: HTMLImageElement;
    private _low3: HTMLImageElement;

    private _high1: HTMLImageElement;
    private _high2: HTMLImageElement;
    private _high3: HTMLImageElement;

    private _right1: HTMLImageElement;
    private _right2: HTMLImageElement;
    private _right3: HTMLImageElement;

    private _point1: HTMLImageElement;
    private _point2: HTMLImageElement;
    private _point3: HTMLImageElement;

    private _tooHigh: HTMLImageElement;
    private _tooLow: HTMLImageElement;
    private _accuse: HTMLImageElement;

    private _jail: HTMLImageElement;


    private _startGame: boolean = false;
    private _playSound: boolean = true;

    private _pointing: number = 0;

    private _isGuessing: boolean = false;
    private _guessPosition: number = 0;
    private _isAccusing: boolean = false;

    private _won: boolean = false;
    private _lost: boolean = false;

    private _slamHand: boolean = false;

    public init(): void {
        this._color.setRed(0);
        this._color.setGreen(0);
        this._color.setBlue(0);

        this._whiteColor.setRed(255);
        this._whiteColor.setGreen(255);
        this._whiteColor.setBlue(255);

        this._blueColor.setRed(0);
        this._blueColor.setGreen(0);
        this._blueColor.setBlue(255);


        this.reset();

        this._sadTrombone = new AudioFile(sadTromboneSound, false);
        this._sadTrombone.setVolume(0.20);

        this._guilty = new AudioFile(guiltySound, false);
        this._guilty.setVolume(0.20);

        this._drone = new AudioFile(droneSound, true);
        this._drone.setVolume(0.15);
        this._music = new AudioFile(musicSound, true);
        this._music.setVolume(0.50);

        this._paper = new AudioFile(paperSound, false);
        this._paper.setVolume(0.50);

        this._pencil = new AudioFile(pencilSound, false);

        this._creak = new AudioFile(creakSound, true);
        this._creak.setVolume(0.25);

        this._crash = new AudioFile(crashSound, false);


        this._siren = new AudioFile(sirenSound, false);
        this._siren.setVolume(0.10);

        this._rain = new AudioFile(rainSound, false);
        this._rain.setVolume(0.25);

        this._arm = new Image();
        this._arm.src = armImage;

        this._table = new Image();
        this._table.src = tableImage;

        this._good = new Image();
        this._good.src = goodImage;

        this._jail = new Image();
        this._jail.src = jailImage;

        this._background = new Image();
        this._background.src = backgroundImage;

        this._lieDetector = new Image();
        this._lieDetector.src = lieDetectorImage;

        this._lieDetectorPanel = new Image();
        this._lieDetectorPanel.src = lieDetectorPanelImage;



        this._pencil1 = new Image();
        this._pencil1.src = pencil1Image;
        this._pencil2 = new Image();
        this._pencil2.src = pencil2Image;
        this._pencil3 = new Image();
        this._pencil3.src = pencil3Image;
        this._guess = new Image();
        this._guess.src = guessImage;

        this._low1 = new Image();
        this._low1.src = low1Image;
        this._low2 = new Image();
        this._low2.src = low2Image;
        this._low3 = new Image();
        this._low3.src = low3Image;

        this._high1 = new Image();
        this._high1.src = high1Image;
        this._high2 = new Image();
        this._high2.src = high2Image;
        this._high3 = new Image();
        this._high3.src = high3Image;

        this._right1 = new Image();
        this._right1.src = right1Image;
        this._right2 = new Image();
        this._right2.src = right2Image;
        this._right3 = new Image();
        this._right3.src = right3Image;


        this._point1 = new Image();
        this._point1.src = point1Image;
        this._point2 = new Image();
        this._point2.src = point2Image;
        this._point3 = new Image();
        this._point3.src = point3Image;

        this._accuse = new Image();
        this._accuse.src = accuseImage;
        this._tooHigh = new Image();
        this._tooHigh.src = tooHighImage;
        this._tooLow = new Image();
        this._tooLow.src = tooLowImage;

        this._instructions = new Image();
        this._instructions.src = instructionsImage;

    }

    public reset(): void {
        this._numbers = [];
        this._playerGuess = [];

        this._guesses = 6;
        this._answer = 0;
        this._numbers.push(getRandomBetween(1, 6));
        this._numbers.push(getRandomBetween(1, 6));
        this._numbers.push(getRandomBetween(1, 6));

        this._lie.push(getRandomBetween(1, 6));
        this._lie.push(getRandomBetween(1, 6));
        this._lie.push(getRandomBetween(1, 6));

        this._playerGuess.push(this._lie[0]);
        this._playerGuess.push(this._lie[1]);
        this._playerGuess.push(this._lie[2]);

        for (let i = 0; i < this._numbers.length; i++) {
            this._answer += this._numbers[i];
        }
    }

    public logicLoop(): void {

        if (this._guesses == 0) {
            this._pointing = 0;
        }
    }

    renderLoop(): void {

        try {

            Renderer.renderImage(this._background, 0, 0, 1024, 768);
            this._rainParticles.render();

            this._dustParticles.render();
             this._dirtyParticles.render();
            this._light.render();


            this._body.render();
            this._head.render();


            Renderer.renderImage(this._table, 0, 0, 1024, 768);

            if (this._slamHand) {
                Renderer.renderImage(this._arm, 0, -10, 1024, 768);
                this._slamHand = false;
            } else {
                Renderer.renderImage(this._arm, 0, 0, 1024, 768);
            }


            this._steamParticles.render();

            if (this._startGame && !this._isGuessing) {
                this._clipBoard.render(this._answer, this._guesses);
            }

            this.renderLieDetector();

            if (this._startGame && this._pointing == 0) {

                this._wordBubbleDice.render(this._lie[0],this._lie[1],this._lie[2]);
            }

            if (this._pointing == 1) {
                Renderer.renderImage(this._point1, 0, 0, 1024, 768);
                Renderer.renderImage(this._accuse, 0, 0, 1024, 768);

                if (this._lie[0] > this._numbers[0]) {
                    Renderer.renderImage(this._tooHigh, 0, 0, 1024, 768);
                } else if (this._lie[0] < this._numbers[0]) {
                    Renderer.renderImage(this._tooLow, 0, 0, 1024, 768);
                } else {
                    Renderer.renderImage(this._good, 0, 0, 1024, 768);
                }
            }

            if (this._pointing == 2) {
                Renderer.renderImage(this._point2, 0, 0, 1024, 768);
                Renderer.renderImage(this._accuse, 0, 0, 1024, 768);

                if (this._lie[1] > this._numbers[1]) {
                    Renderer.renderImage(this._tooHigh, 0, 0, 1024, 768);
                } else if (this._lie[1] < this._numbers[1]) {
                    Renderer.renderImage(this._tooLow, 0, 0, 1024, 768);
                } else {
                    Renderer.renderImage(this._good, 0, 0, 1024, 768);
                }
            }

            if (this._pointing == 3) {
                Renderer.renderImage(this._point3, 0, 0, 1024, 768);
                Renderer.renderImage(this._accuse, 0, 0, 1024, 768);

                if (this._lie[2] > this._numbers[2]) {
                    Renderer.renderImage(this._tooHigh, 0, 0, 1024, 768);
                } else if (this._lie[2] < this._numbers[2]) {
                    Renderer.renderImage(this._tooLow, 0, 0, 1024, 768);
                } else {
                    Renderer.renderImage(this._good, 0, 0, 1024, 768);
                }
            }



            if (this._isGuessing) {
                this.renderGuess();
            }

            if (this._won) {
                Renderer.renderImage(this._jail, 0, 0, 1024, 768);
            }

            if (this._lost) {

            }

            if (this._isAccusing) {
                this.renderCharge();
            }

            if (!this._startGame) {
                this._title.render();
                Renderer.print("Press Enter to Start", 300, 710, "Arial", 50, this._whiteColor);
            }
        } catch (e) {
            console.error(e);
        }
    }

    private renderCharge(): void {
        Renderer.renderImage(this._accuse, 0, 0, 1024, 768);
        Renderer.renderImage(this._point1, 0, 0, 1024, 768);

        if (this._playerGuess[0] == this._numbers[0] &&
            this._playerGuess[1] == this._numbers[1] &&
        this._playerGuess[2] == this._numbers[2]) {
            Renderer.print("Lock 'em up!", 530, 300, "Arial", 60, this._blueColor);
        } else {
            Renderer.print( "Ha... kidding", 530, 300, "Arial", 60, this._blueColor);
        }

    }



    private renderLieDetector(): void {
        Renderer.renderImage(this._lieDetector, 0, 0, 1024, 768);



        Renderer.print(this._lie[0].toString(), 520, 595, "Arial", 30, this._color);
        Renderer.print(this._lie[1].toString(), 610, 595, "Arial", 30, this._color);
        Renderer.print(this._lie[2].toString(), 690, 595, "Arial", 30, this._color);

        if (this._lie[0] > this._numbers[0]) {
            Renderer.renderImage(this._high1, 0, 0, 1024, 768);
        } else if (this._lie[0] < this._numbers[0]) {
            Renderer.renderImage(this._low1, 0, 0, 1024, 768);
        } else {
            Renderer.renderImage(this._right1, 0, 0, 1024, 768);
        }

        if (this._lie[1] > this._numbers[1]) {
            Renderer.renderImage(this._high2, 0, 0, 1024, 768);
        } else if (this._lie[1] < this._numbers[1]) {
            Renderer.renderImage(this._low2, 0, 0, 1024, 768);
        } else {
            Renderer.renderImage(this._right2, 0, 0, 1024, 768);
        }

        if (this._lie[2] > this._numbers[2]) {
            Renderer.renderImage(this._high3, 0, 0, 1024, 768);
        } else if (this._lie[2] < this._numbers[2]) {
            Renderer.renderImage(this._low3, 0, 0, 1024, 768);
        } else {
            Renderer.renderImage(this._right3, 0, 0, 1024, 768);
        }


        Renderer.renderImage(this._lieDetectorPanel, 0, 0, 1024, 768);
    }


    public keyboard(gameEvent: GameEvent): void {

        if (!this._startGame) {
            if (gameEvent.payload == KeyboardInput.ENTER) {

                if (!this._startGame) {
                    this._startGame = true;

                    if (this._playSound) {
                        this._siren.play();
                        this._drone.play();
                        this._rain.play();
                        this._music.play();
                        this._creak.play();
                    }
                }
            } else {
                return;
            }
        }



        if (!this._isGuessing && !this._isAccusing && this._guesses > 0) {
            if (gameEvent.payload == KeyboardInput.ONE) {

                if (this._pointing == 1) {
                    this._pointing = 0;
                } else {
                    this._crash.play();

                    if (this._lie[0] != this._numbers[0]) {
                        this._guesses--;

                        if (this._lie[0] > this._numbers[0]) {
                            this._lie[0] = getRandomBetween(1, this._lie[0]);
                        } else if (this._lie[0] < this._numbers[0]) {
                            this._lie[0] = getRandomBetween(this._lie[0], 6);
                        }
                    }
                    this._pointing = 1;
                }
            } else if (gameEvent.payload == KeyboardInput.TWO) {
                if (this._pointing == 2) {
                    this._pointing = 0;
                } else {
                    this._crash.play();


                    if (this._lie[1] != this._numbers[1]) {
                        this._guesses--;

                        if (this._lie[1] > this._numbers[1]) {
                            this._lie[1] = getRandomBetween(1, this._lie[1]);
                        } else if (this._lie[1] < this._numbers[0]) {
                            this._lie[1] = getRandomBetween(this._lie[1], 6);
                        }
                    }

                  this._pointing = 2;
                }
            } else if (gameEvent.payload == KeyboardInput.THREE) {
                if (this._pointing == 3) {
                    this._pointing = 0;
                } else {
                    this._crash.play();


                    if (this._lie[2] != this._numbers[2]) {
                        this._guesses--;

                        if (this._lie[2] > this._numbers[2]) {
                            this._lie[2] = getRandomBetween(1, this._lie[2]);
                        } else if (this._lie[2] < this._numbers[2]) {
                            this._lie[2] = getRandomBetween(this._lie[2], 6);
                        }
                    }
                   this._pointing = 3;
                }
            } else if (gameEvent.payload == KeyboardInput.SPACE) {
                this._isAccusing = true;
                this._isGuessing = false;

                this._pointing = 0;

                if (this._playerGuess[0] == this._numbers[0] &&
                    this._playerGuess[1] == this._numbers[1] &&
                    this._playerGuess[2] == this._numbers[2]) {
                    this._guilty.play();

                    this._drone.stop();
                    this._rain.stop();
                    this._creak.stop();
                    this._music.stop();

                    this._won = true;
                } else {
                    this._lost = true;
                    this._sadTrombone.play();
                }
            }
        } else if (this._isGuessing) {

            let currentGuess : number= 0;

            if (gameEvent.payload == KeyboardInput.ONE) {
                currentGuess = 1;
            } else if (gameEvent.payload == KeyboardInput.TWO) {
                currentGuess = 2;
            } else if (gameEvent.payload == KeyboardInput.THREE) {
                currentGuess = 3;
            } else if (gameEvent.payload == KeyboardInput.FOUR) {
                currentGuess = 4;
            } else if (gameEvent.payload == KeyboardInput.FIVE) {
                currentGuess = 5;
            } else if (gameEvent.payload == KeyboardInput.SIX) {
                currentGuess = 6;
            }

            if (currentGuess > 0) {
                if (this._guessPosition == 1) {
                    this._playerGuess[0] = currentGuess;
                } else if (this._guessPosition == 2) {
                    this._playerGuess[1] = currentGuess;
                } else if (this._guessPosition == 3) {
                    this._playerGuess[2] = currentGuess;
                }
            }
        } else if (this._isAccusing) {
            this._isAccusing = false;
            this._isGuessing = false;
        }

        if (gameEvent.payload == KeyboardInput.ESCAPE) {

            this._paper.play();

            if (this._isGuessing) {
                this._isGuessing = false;
            } else {
                this._isGuessing = true;
            }
        }

        if (this._isGuessing) {
            if (gameEvent.payload == KeyboardInput.A) {
                this._guessPosition = 1;
                this._pencil.play();
            } else if (gameEvent.payload == KeyboardInput.B) {
                this._guessPosition = 2;
                this._pencil.play();
            } else if (gameEvent.payload == KeyboardInput.C) {
                this._guessPosition = 3;
                this._pencil.play();
            }
        }
    }


    private renderGuess() {
        Renderer.renderImage(this._guess, -100, 0, 1024, 768);

        Renderer.print(this._playerGuess[0].toString(), 110, 560, "Arial", 50, this._blueColor);
        Renderer.print(this._playerGuess[1].toString(), 210, 560, "Arial", 50, this._blueColor);
        Renderer.print(this._playerGuess[2].toString(), 320, 560, "Arial", 50, this._blueColor);

        Renderer.print("Clue: " + this._answer, 110, 650, "Arial", 50, this._color);

        if (this._guessPosition == 1) {
            Renderer.renderImage(this._pencil1, -100, 0, 1024, 768);
        } else if (this._guessPosition == 2) {
            Renderer.renderImage(this._pencil2, -100, 0, 1024, 768);
        } else if (this._guessPosition == 3) {
            Renderer.renderImage(this._pencil3, -100, 0, 1024, 768);
        }
    }
}
