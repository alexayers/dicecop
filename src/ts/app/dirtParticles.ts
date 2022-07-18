import Particle from "../lib/rendering/particle";
import {getRandomBetween, getRandomInt} from "../lib/util/mathUtil";
import {Renderer} from "../lib/rendering/renderer";


export default class DirtParticles {

    private _particles:Array<Particle> = [];

    constructor() {

        for (let i =0; i < 25; i++) {
            let particle : Particle = new Particle();
            this._particles.push(DirtParticles.refresh(particle));
        }

    }

    private static refresh(particle: Particle) : Particle {
        particle.x = getRandomBetween(-120, 1500);
        particle.y = getRandomInt(1500);
        particle.velX = (getRandomInt(5) / 10) * -1;
        particle.velY = getRandomInt(3);
        particle.lifeSpan= getRandomInt(100);
        particle.decayRate = getRandomInt(3) / 10;
        particle.width = getRandomBetween(120,500);
        particle.height = getRandomBetween(120,500);

        let color = getRandomBetween(0,255);
        particle.color.setRed(color);
        particle.color.setGreen(46);
        particle.color.setBlue(26);

        return particle;
    }

    render() : void {

        Renderer.beginPath();

        for (let i =0; i < this._particles.length; i++) {
            let particle = this._particles[i];


            Renderer.setAlpha(0.02);

            Renderer.setColor(particle.color);

            Renderer.rect(particle.x, particle.y, particle.width, particle.height);


            particle.x -= particle.velX;
            particle.y -= particle.velY;
            particle.lifeSpan -= particle.decayRate;

            if (particle.lifeSpan <= 0)  {
                this._particles[i] = DirtParticles.refresh(particle);
            }


        }

        Renderer.fillAndClosePath();
        Renderer.setAlpha(1);

    }

}
