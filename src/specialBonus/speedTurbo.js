class SpeedTurbo extends SpecialBonus {
    constructor(tank) {
        super(tank, SPECIAL_BONUS_ID.SPEED_TURBO, 6000, 3000);
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
            this.tank.speedNorme = this.oldSpeed + 5;
        }
    }
}