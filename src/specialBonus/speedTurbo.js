import { createTurboParticles } from "../babylon_start/particles.js";
import { SpecialBonus, SPECIAL_BONUS_ID } from "./bonusSpecial.js";


export class SpeedTurbo extends SpecialBonus {
    constructor(tank) {
        super(tank, SPECIAL_BONUS_ID.SPEED_TURBO, 5000, 4000);
    }

    disable() {
        super.disable()
        this.tank.speedNorme = this.oldSpeed;
    }

    use() {
        if (super.use() && !this.isActive) {
            this.bonusStartedDate = Date.now();
            super.activate()
            createTurboParticles(this.tank.shape, this.bonusStartedDelay)
            this.oldSpeed = this.tank.speedNorme;
            this.tank.speedNorme = this.oldSpeed + 6;
        }
    }
}