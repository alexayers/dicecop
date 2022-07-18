import Particle from "../lib/rendering/particle";
import {getRandomBetween, getRandomInt} from "../lib/util/mathUtil";
import {Renderer} from "../lib/rendering/renderer";


export default class SteamParticles {

    private _particles:Array<Particle> = [];

    constructor() {

        for (let i =0; i < 50; i++) {
            let particle : Particle = new Particle();
            this._particles.push(SteamParticles.refresh(particle));
        }

    }

    private static refresh(particle: Particle) : Particle {
        particle.x = getRandomBetween(130, 170);
        particle.y = 495;
        particle.velX = 0;
        particle.velY = (getRandomBetween(10,20)) / 100;
        particle.lifeSpan= 40;
        particle.decayRate = getRandomInt(3) / 10;
        particle.width = getRandomBetween(2,50);
        particle.height = getRandomBetween(2,5);

        let randColor = getRandomBetween(100,255);
        particle.color.setRed(randColor);
        particle.color.setGreen(randColor);
        particle.color.setBlue(randColor);

        return particle;
    }

    render() : void {

        Renderer.beginPath();

        for (let i =0; i < this._particles.length; i++) {
            let particle = this._particles[i];


            Renderer.setAlpha(particle.lifeSpan / 100);

            Renderer.setColor(particle.color);

            Renderer.rect(particle.x, particle.y, particle.width, particle.height);


            particle.x -= particle.velX;
            particle.y -= particle.velY;
            particle.lifeSpan -= particle.decayRate;

            if (particle.lifeSpan <= 0)  {
                this._particles[i] = SteamParticles.refresh(particle);
            }


        }

        Renderer.fillAndClosePath();
        Renderer.setAlpha(1);

    }

}
