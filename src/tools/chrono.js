class Chrono {
    constructor(cooldown) {
        this.startDate = Date.now()
        this.timeCooled = 0;
        this.cooldown = cooldown;
        this.finished = false;
    }

    update() {
        if (char1.life <= 0 || this.finished) return
        this.timeCooled = Math.max(0, this.startDate + this.cooldown - Date.now());
        if (this.timeCooled <= 0) {
            tankExplosion(char1.shape.position)
            playSoundWithDistanceEffect(char1.vehicleExplosionSound, char1.shape)
            char1.healthLoss(char1.maxHealth, true)
            this.finished = true
        };
    }

    correctTime() {
        this.startDate = Date.now() - this.cooldown + this.timeCooled;
    }
}