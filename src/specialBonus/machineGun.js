import { SpecialBonus, SPECIAL_BONUS_ID } from "./bonusSpecial.js";
import { scene } from "../babylon_start/scene.js";

export class MachineGun extends SpecialBonus {
  constructor(tank) {
    super(tank, SPECIAL_BONUS_ID.MACHINE_GUN, 10000, 3000);
  }

  disable() {
    super.disable()
    scene.hlMinigun.removeAllMeshes()
    this.tank.bulletSpeed = this.oldSpeed;
    this.tank.delayMinBetweenBullets = this.oldDelay;
  }

  use() {
    if (super.use() && !this.isActive) {
      this.bonusStartedDate = Date.now();
      super.activate()
      scene.hlMinigun.addMesh(this.tank.getTurretTank(), new BABYLON.Color3(0.94, 0.85, 0.03))
      this.oldSpeed = this.tank.bulletSpeed;
      this.oldDelay = this.tank.delayMinBetweenBullets
      this.tank.delayMinBetweenBullets = 50;
      this.tank.bulletSpeed = 200;
    }
  }
}