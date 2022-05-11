class Grenade extends SpecialBonus {
    constructor(tank) {
        super(tank, SPECIAL_BONUS_ID.GRENADE, 5000);
    }

    use() {
        if (super.use()) {
            this.tank.throwGrenade()
        }

    }
}