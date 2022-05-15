import { ObjectPos } from "./objectPos.js";
import { scene } from "../babylon_start/scene.js";
import { biome } from "../levels/levels.js";
import { ObjectEnum } from "./objectEnum.js";

export class House extends ObjectPos {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        super(chooseHouse(), -scene.width / 2 + x, -scene.height / 2, -scene.height / 2 + y, 0, 0, 1, chooseHouse() == ObjectEnum.EarthyHouse ? 0.5 : 0.4)
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.2 })
    }
}

function chooseHouse() {
    switch (biome[0]) {
        case "Earth": return ObjectEnum.EarthyHouse;
        case "Sand": return ObjectEnum.DesertHouse;
        default: return ObjectEnum.SnowyHut;
    }
}