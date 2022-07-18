import Particle from "../lib/rendering/particle";
import {getRandomBetween, getRandomInt} from "../lib/util/mathUtil";
import {Renderer} from "../lib/rendering/renderer";


export default class DustParticles {

    private _particles:Array<Particle> = [];

    constructor() {

        for (let i =0; i < 100; i++) {
            let particle : Particle = new Particle();
            this._particles.push(DustParticles.refresh(particle));
        }

    }

    private static refresh(particle: Particle) : Particle {
        particle.x = getRandomInt(1500);
        particle.y = getRandomInt(1500);
        particle.velX = getRandomInt(5) / 10;
        particle.velY = getRandomInt(3) * -1;
        particle.lifeSpan= getRandomInt(100);
        particle.decayRate = getRandomInt(3) / 10;
        particle.width = getRandomBetween(30,100);
        particle.height = getRandomBetween(30,100);

        let color = getRandomBetween(0,255);
        particle.color.setRed(color);
        particle.color.setGreen(color);
        particle.color.setBlue(color);

        return particle;
    }

    render() : void {

        Renderer.beginPath();

        for (let i =0; i < this._particles.length; i++) {
            let particle = this._particles[i];


            Renderer.setAlpha(0.0015);

            Renderer.setColor(particle.color);

            Renderer.rect(particle.x, particle.y, particle.width, particle.height);


            particle.x -= particle.velX;
            particle.y -= particle.velY;
            particle.lifeSpan -= particle.decayRate;

            if (particle.lifeSpan <= 0 || particle.y > 768 || particle.x < 0)  {
                this._particles[i] = DustParticles.refresh(particle);
            }


        }

        Renderer.fillAndClosePath();
        Renderer.setAlpha(1);

    }

}
