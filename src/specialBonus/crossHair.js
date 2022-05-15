import { SpecialBonus, SPECIAL_BONUS_ID } from "./bonusSpecial.js";
import { getCannonPoint } from "../game_IA/shootAI.js";
import { sceneBab } from "../babylon_start/scene.js";
import { ShootAI } from "../game_IA/shootAI.js";
import { chars } from "../main/global_vars.js";

export class crossHair extends SpecialBonus {

  constructor(tank) {
    super(tank, SPECIAL_BONUS_ID.CROSS_HAIR, 3000);
    this.isActive = true;
  }

  update() {
    super.update();

    if (this.tank == undefined) return
    if (!this.crossHair) this.load();
    let laserCoolDown = 1;
    let laserRes = ShootAI.targetPlayer(this.tank, 1000, false, laserCoolDown, true, this.crossHair);
    if (laserRes) {
      let [position, hitMesh] = laserRes
      let cannonPoint = getCannonPoint(this.tank)

      let distanceFromTank = Math.sqrt((position.x - cannonPoint.x) ** 2 + (position.y - cannonPoint.y) ** 2 + (position.z - cannonPoint.z) ** 2) * 4
      ShootAI.targetPlayer(this.tank, distanceFromTank, true, laserCoolDown, true, this.crossHair);
      // crossHair.parent = obj.shape
      let char;

      if (char = chars.find(e => e.shape == hitMesh)) {
        this.highlightTank(char, true)

      } else {
        if (scene.hl) scene.hl.removeAllMeshes()
      }
      if (this.crossHair.position) this.crossHair.position = position
    }
    else {
      ShootAI.targetPlayer(this.tank, 1000, true, laserCoolDown, true, this.crossHair);

      if (this.crossHair.position) this.crossHair.position.y -= 200
      if (scene.hl) scene.hl.removeAllMeshes()
    }
  }

  /**
 * @param {Char} tank 
 * @param {boolean} toHighlight 
 */
  highlightTank(tank, toHighlight) {
    if (toHighlight && !scene.hl.hasMesh(tank.shape.getChildMeshes()[0])) {
      let fileterMeshToHigLight = tank.getMeshesToHighlight();
      fileterMeshToHigLight.forEach(m => scene.hl.addMesh(m, new BABYLON.Color3(1, 0, 0)))
    }
  }

  load() {
    super.load()

    var crossHair = new BABYLON.MeshBuilder.CreatePlane("crossHair", { size: 0.5 }, sceneBab);

    crossHair.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_Y;

    crossHair.material = new BABYLON.StandardMaterial("crossHair", sceneBab);
    crossHair.material.diffuseTexture = new BABYLON.Texture("images/gunaims.png", sceneBab);
    crossHair.material.diffuseTexture.hasAlpha = true;
    crossHair.material.emissiveColor = BABYLON.Color3.White()
    crossHair.isPickable = false;
    this.crossHair = crossHair;
  }

  /** Hide bonus graphically but not from thank */
  hide() {
    this.crossHair.dispose()
  }

  use() {
    if (super.use()) {
      let oldSpeed = this.tank.bulletSpeed;
      let oldDamage = this.tank.bulletDamage;
      this.tank.bulletSpeed = 200;
      this.tank.bulletDamage = 5000;
      this.tank.addBullet();
      this.tank.bulletSpeed = oldSpeed;
      this.tank.bulletDamage = oldDamage;
    }
  }
}