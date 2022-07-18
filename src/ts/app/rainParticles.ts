import Particle from "../lib/rendering/particle";
import {getRandomBetween, getRandomInt} from "../lib/util/mathUtil";
import {Renderer} from "../lib/rendering/renderer";


export default class RainParticles {

    private _particles:Array<Particle> = [];

    constructor() {

        for (let i =0; i < 50; i++) {
            let particle : Particle = new Particle();
            this._particles.push(RainParticles.refresh(particle));
        }

    }

    private static refresh(particle: Particle) : Particle {
        particle.x = getRandomBetween(620, 910);
        particle.y = getRandomBetween(170,190);
        particle.velX = 0;
        particle.velY = (getRandomBetween(10,20) * -1);
        particle.lifeSpan= getRandomInt(100);
        particle.decayRate = getRandomInt(3) / 10;
        particle.width = 2;
        particle.height = getRandomBetween(56,90);


        particle.color.setRed(255);
        particle.color.setGreen(255);
        particle.color.setBlue(255);

        return particle;
    }

    render() : void {

        Renderer.beginPath();

        for (let i =0; i < this._particles.length; i++) {
            let particle = this._particles[i];


            Renderer.setAlpha(0.25);

            Renderer.setColor(particle.color);

            Renderer.rect(particle.x, particle.y, particle.width, particle.height);


            particle.x -= particle.velX;
            particle.y -= particle.velY;
            particle.lifeSpan -= particle.decayRate;

            if (particle.lifeSpan <= 0 || particle.y > 480)  {
                this._particles[i] = RainParticles.refresh(particle);
            }


        }

        Renderer.fillAndClosePath();
        Renderer.setAlpha(1);

    }

}
