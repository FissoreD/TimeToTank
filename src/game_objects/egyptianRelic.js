import { ObjectPos } from "./objectPos.js";
import { scene } from "../babylon_start/scene.js";
import { createBonusEffect, collectRelicParticle } from "../babylon_start/particles.js";
import { Barrel } from "./barrel.js";
import { ObjectEnum } from "./objectEnum.js";
import { relicSound } from "../main/global_vars.js";
import { relics, chars } from "../main/global_vars.js";

var relicCpt = 0;
export class Relic extends ObjectPos {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        super(chooseRelic(), -scene.width / 2 + x, Barrel.height / 2, -scene.height / 2 + y, 0, 0)
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 70000, restitution: 0.2 })
        this.createCollider()
        this.relicEffect = createBonusEffect(this.shape, false)
    }

    createCollider() {
        this.physicsImpostor.onCollideEvent = (e1, e2) => {

            let r1 = relics.find(e => e.shape == e1.object)
            let tank;
            if (tank = chars.find(c => c.shape == e2.object)) {
                if (tank != scene.char1) return
                if (r1) {
                    r1.dispose(true);
                    scene.current_level_dico.addRelicObtained()
                    relicSound.play()
                }
            }
        }
    }

    dispose(forceDispose = false) {
        collectRelicParticle(this.shape.position)
        super.dispose(forceDispose)
        this.relicEffect.dispose()
    }

}

function chooseRelic() {
    relicCpt++
    relicCpt = relicCpt % 3

    if (relicCpt == 0) return ObjectEnum.CatRelic
    else if (relicCpt == 1) return ObjectEnum.JackalRelic
    return ObjectEnum.MoonRelic

}

