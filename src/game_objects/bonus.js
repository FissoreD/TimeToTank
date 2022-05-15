import { ObjectPos } from "./objectPos.js";
import { scene } from "../babylon_start/scene.js";
import { createBonusEffect } from "../babylon_start/particles.js";
import { addedObtainableBonus } from "../main/global_vars.js";
import { ObjectEnum } from "./objectEnum.js";
import { bonuses, chars } from "../main/global_vars.js";
import { levelMemory } from "../levels/levels.js";
import { BonusEnum } from "./bonusEnum.js";
import { createSpecialBonusList } from "../tools/utils.js";

export class Bonus extends ObjectPos {


    static diameter = 1;
    /**
     * 
     * @param {number} posX
     * @param {number} posY
     * @param {boolean} isSpecial
     */
    constructor(posX, posY, isSpecial = false) {
        super(isSpecial ? ObjectEnum.SpecialBonus : ObjectEnum.Bonus, -scene.width / 2 + posX, Bonus.diameter / 2, -scene.height / 2 + posY, 0, 0, 1);
        this.id = posX + "" + posY
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 50000, restitution: 0.5 });
        this.createCollider()
        this.bonusEffect = createBonusEffect(this.shape, isSpecial)
        this.isSpecial = isSpecial;
    }

    createCollider() {
        this.physicsImpostor.onCollideEvent = (e1, e2) => {

            let b1 = bonuses.find(e => e.shape == e1.object)
            let tank;
            if (tank = chars.find(c => c.shape == e2.object)) {
                if (tank != scene.char1) return // TODO modify if want other tank to take this
                if (b1) {
                    let choices = levelMemory[scene.level].bonuses_onHearth[this.id] || Bonus.randomBonus(3, tank, this.isSpecial)

                    levelMemory[scene.level].bonuses_onHearth[this.id] = choices
                    choices.forEach(e => { if (e.tank) e.tank = tank })
                    scene.menu.bonusChoice(choices)
                    b1.dispose(true);
                    scene.current_level_dico.addBonusObtained()
                }
            }
        }
    }

    static randomBonus(num, tank, isSpecial = false) {
        var res = []
        var copy_bonusEnum = isSpecial ? createSpecialBonusList(tank) : BonusEnum.bonusEnumList.slice().concat(addedObtainableBonus);
        for (var i = 0; i < num; i++) {
            var rand = Math.floor(Math.random() * copy_bonusEnum.length)
            res.push(copy_bonusEnum[rand])
            copy_bonusEnum.splice(rand, 1)
        }
        return res
    }

    dispose(forceDispose = false) {
        super.dispose(forceDispose)
        this.bonusEffect.dispose()
    }
}