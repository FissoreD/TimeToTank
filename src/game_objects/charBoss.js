class CharBoss extends Char {

    constructor(type, x, y, angle, vitesse, tempsMinEntreTirsEnMillisecondes, bulletSpeed = 40, bulletLife = 2, life = 1, health = 50, bulletDamage = 5, inclinaisonTurretIncrement = 0.002) {
        super(type, x, y, angle, vitesse, tempsMinEntreTirsEnMillisecondes, bulletSpeed, bulletLife, life, health, bulletDamage, inclinaisonTurretIncrement)
        this.nbDmgBeforeShield = 10
        this.dmgTakenSinceShield = 0
        this.domeBoss = new dome(this, true)
        this.domeBoss.addToChar()
        this.domeBoss.delay = 0
    }

    healthLoss(damage) {
        if (this.specialBonuses.some(b => b.name == SPECIAL_BONUS_ID.DOME.name && b.isActive)) return

        damage = Math.min(damage, this.nbDmgBeforeShield)
        this.nbDmgBeforeShield -= damage

        if (damage < this.health) {
            if (this.nbDmgBeforeShield <= 0) {
                var char = new Char("mini", width / 2 + this.shape.position.x + 2, height / 2 + this.shape.position.y - 2, 0, 1, 1000, 45, 2, 1, 3, 3);
                charsAI.push(char);
                char.setStrategy(new guaranteedAI(char))
                chars.push(char);
                char.applyStrategy()

                var char2 = new Char("mini", width / 2 + this.shape.position.x - 2, height / 2 + this.shape.position.y + 2, 0, 1, 1000, 45, 2, 1, 3, 3);
                charsAI.push(char2);
                char2.setStrategy(new guaranteedAI(char2))
                chars.push(char2);
                char2.applyStrategy()

                this.domeBoss.isPermanent = true
                this.domeBoss.use()

                this.nbDmgBeforeShield = 10
            }
            this.health -= damage
        }
        else {
            this.health = 0
            this.life--
        }
        //update barre de vie
        this.healtBar.updatePartition()
    }
}