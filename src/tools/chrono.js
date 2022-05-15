import { tankExplosion } from "../babylon_start/particles.js";
import { scene } from "../babylon_start/scene.js";
import { playSoundWithDistanceEffect } from "./utils.js";

export class Chrono {
    constructor(cooldown) {
        this.startDate = Date.now()
        this.timeCooled = 0;
        this.cooldown = cooldown;
        this.finished = false;
    }

    update() {
        if (scene.char1.life <= 0 || this.finished) return
        this.timeCooled = Math.max(0, this.startDate + this.cooldown - Date.now());
        if (this.timeCooled <= 0) {
            tankExplosion(scene.char1.shape.position)
            playSoundWithDistanceEffect(scene.char1.vehicleExplosionSound, scene.char1.shape)
            scene.char1.healthLoss(scene.char1.maxHealth, true)
            this.finished = true
        };
    }

    correctTime() {
        this.startDate = Date.now() - this.cooldown + this.timeCooled;
    }
}