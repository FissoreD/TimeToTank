import { ObjectPos } from "./objectPos.js";
import { scene } from "../babylon_start/scene.js";
import { biome } from "../levels/levels.js";
import { createSmoke, playSmoke, stopSmoke, createFire } from "../babylon_start/particles.js";
import { ObjectEnum } from "./objectEnum.js";
import { Barrel } from "./barrel.js";

export class Tree extends ObjectPos {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y, isBurning = undefined) {
        let tree = randomTree(isBurning)
        super(tree, -scene.width / 2 + x, Barrel.height / 2, -scene.height / 2 + y, 0, 0)
        this.physicsImpostor = tree == ObjectEnum.Tumbleweed ? new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1000, restitution: 0.2 }) :
            (tree == ObjectEnum.Cactus1 || tree == ObjectEnum.SnowyTree || tree == ObjectEnum.SnowyFir || tree == ObjectEnum.PalmTree2 || tree == ObjectEnum.PalmTree3) ? new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 30000, restitution: 0.2 }) :
                new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 40000, restitution: 0.2 })
        this.isBurning = isBurning
    }

    burnTree() {
        if (this.isBurning == false) {
            var smok = createSmoke(this.shape, false, false, true)
            playSmoke(smok)
            createFire(this.shape);
            this.isBurning = true
        }
    }
}

function randomTree(isBurning) {
    if (biome[0] == "Snow") return Math.random() >= 0.50 ? ObjectEnum.SnowyTree : ObjectEnum.SnowyFir;
    let rng = Math.floor(Math.random() * 3);
    switch (rng) {
        case 0: return (biome[0] == "Earth" || isBurning != undefined) ? ObjectEnum.PalmTree1 : ObjectEnum.Cactus1;
        case 1: return (biome[0] == "Earth" || isBurning != undefined) ? ObjectEnum.PalmTree2 : ObjectEnum.Cactus2;
        default: return (biome[0] == "Earth" || isBurning != undefined) ? ObjectEnum.PalmTree3 : ObjectEnum.Tumbleweed;
    }
}