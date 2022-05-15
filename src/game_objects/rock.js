import { ObjectPos } from "./objectPos.js";
import { scene } from "../babylon_start/scene.js";
import { biome } from "../levels/levels.js";
import { ObjectEnum } from "./objectEnum.js";
import { Barrel } from "./barrel.js";

export class Rock extends ObjectPos {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        super(chooseRock(), -scene.width / 2 + x, Barrel.height / 2, -scene.height / 2 + y, 0, 0)
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 70000, restitution: 0.2 })

        this.shape.rotate(BABYLON.Axis.Y, Math.random() * Math.PI)

    }
}

function chooseRock() {
    switch (biome[0]) {
        case "Earth": return ObjectEnum.Rock;
        case "Sand": return ObjectEnum.DesertRock;
        default: return ObjectEnum.SnowyRock;
    }
}