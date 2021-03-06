import { Char } from "./char.js"
import { guaranteedAI } from "../game_IA/guaranteedAI.js"
import { charsAI } from "../main/global_vars.js"
import { dome } from "../specialBonus/dome.js"
import { SPECIAL_BONUS_ID } from "../specialBonus/bonusSpecial.js"
import { chars } from "../main/global_vars.js"
import { scene } from "../babylon_start/scene.js"

export class CharBoss extends Char {

    constructor(type, x, y, angle, vitesse, tempsMinEntreTirsEnMillisecondes, bulletSpeed = 40, bulletLife = 2, life = 1, health = 50, bulletDamage = 5, inclinaisonTurretIncrement = 0.002) {
        super(type, x, y, angle, vitesse, tempsMinEntreTirsEnMillisecondes, bulletSpeed, bulletLife, life, health, bulletDamage, inclinaisonTurretIncrement)
        this.nbDmgBeforeShield = 15
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
                var char = new Char("normal", scene.width / 2 + this.shape.position.x + 2, scene.height / 2 + this.shape.position.y - 2, 0, 1, 2000, 30);
                charsAI.push(char);
                char.setStrategy(new guaranteedAI(char))
                chars.push(char);
                char.applyStrategy()

                var char2 = new Char("normal", scene.width / 2 + this.shape.position.x - 2, scene.height / 2 + this.shape.position.y + 2, 0, 1, 2000, 30);
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