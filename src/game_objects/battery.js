import { ObjectPos } from "./objectPos.js";
import { scene } from "../babylon_start/scene.js";
import { batteryEffect, electricExplosion } from "../babylon_start/particles.js";
import { ObjectEnum } from "./objectEnum.js";

export class Battery extends ObjectPos {

    static height = 0.01;
    static diameter = 0.8;

    /**
     * 
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        super(ObjectEnum.Battery, -scene.width / 2 + x, Battery.height / 2, -scene.height / 2 + y, 0, 0)
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 3000, restitution: 0.2 })

        this.batteryEffect = batteryEffect(this.shape)
        this.isDestroyed = false
        scene.hlBattery.addMesh(this.shape.getChildMeshes()[1], new BABYLON.Color3(0, 0.75, 1))

        this.explosionSound = new Audio('audio/grenade.wav')
        this.explosionSound.volume = 0.2;
    }

    dispose() {
        super.dispose(true)
    }

    destroy() {
        electricExplosion(this.shape.position)
        this.explosionSound.play()
        super.dispose(true)
    }
}