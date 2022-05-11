class ObjectPos extends BABYLON.Mesh {

  /** @type {number} */
  speedAngle;
  /** @type {number} */
  speedNorme;
  /** @type {BABYLON.Mesh} */
  shape;
  /** @type {number} */
  life;


  static counter = 0;

  /**
   * @param {ObjectEnum} type 
   * @param {number} posX 
   * @param {number} posY 
   * @param {number} posZ 
   * @param {number} speedNorme 
   * @param {number} speedAngle 
   */
  constructor(type, posX, posY, posZ, speedNorme, speedAngle, life = 1) {
    super('')

    var meshBabylon = true;
    let shape;
    this.type = type;
    this.life = life;

    switch (type.name) {
      case ObjectEnum.Barrel.name: { shape = ObjectEnum.Barrel.container.clone(); break; }
      case ObjectEnum.Battery.name: { shape = ObjectEnum.Battery.container.clone(); break; }
      case ObjectEnum.Bonus.name: { shape = ObjectEnum.Bonus.container.clone(); break; }
      case ObjectEnum.SpecialBonus.name: { shape = ObjectEnum.SpecialBonus.container.clone(); break; }
      case ObjectEnum.Player.name: { shape = ObjectEnum.Player.container.clone(); break; }
      case ObjectEnum.MiniTank.name: { shape = ObjectEnum.MiniTank.container.clone(); break; }
      case ObjectEnum.SnowTank.name: { shape = ObjectEnum.SnowTank.container.clone(); break; }
      case ObjectEnum.EarthTank.name: { shape = ObjectEnum.EarthTank.container.clone(); break; }
      case ObjectEnum.SandTank.name: { shape = ObjectEnum.SandTank.container.clone(); break; }
      case ObjectEnum.BossTank.name: { shape = ObjectEnum.BossTank.container.clone(); break; }
      case ObjectEnum.Rock.name: { shape = ObjectEnum.Rock.container.clone(); break; }
      case ObjectEnum.PalmTree1.name: { shape = ObjectEnum.PalmTree1.container.clone(); break; }
      case ObjectEnum.PalmTree2.name: { shape = ObjectEnum.PalmTree2.container.clone(); break; }
      case ObjectEnum.PalmTree3.name: { shape = ObjectEnum.PalmTree3.container.clone(); break; }
      case ObjectEnum.EarthyHouse.name: { shape = ObjectEnum.EarthyHouse.container.clone(); break; }
      case ObjectEnum.Cactus1.name: { shape = ObjectEnum.Cactus1.container.clone(); break; }
      case ObjectEnum.Cactus2.name: { shape = ObjectEnum.Cactus2.container.clone(); break; }
      case ObjectEnum.DesertRock.name: { shape = ObjectEnum.DesertRock.container.clone(); break; }
      case ObjectEnum.Tumbleweed.name: { shape = ObjectEnum.Tumbleweed.container.clone(); break; }
      case ObjectEnum.DesertHouse.name: { shape = ObjectEnum.DesertHouse.container.clone(); break; }
      case ObjectEnum.SnowyTree.name: { shape = ObjectEnum.SnowyTree.container.clone(); break; }
      case ObjectEnum.SnowyFir.name: { shape = ObjectEnum.SnowyFir.container.clone(); break; }
      case ObjectEnum.SnowyRock.name: { shape = ObjectEnum.SnowyRock.container.clone(); break; }
      case ObjectEnum.SnowyHut.name: { shape = ObjectEnum.SnowyHut.container.clone(); break; }
      case ObjectEnum.CatRelic.name: { shape = ObjectEnum.CatRelic.container.clone(); break; }
      case ObjectEnum.JackalRelic.name: { shape = ObjectEnum.JackalRelic.container.clone(); break; }
      case ObjectEnum.MoonRelic.name: { shape = ObjectEnum.MoonRelic.container.clone(); break; }
      default: meshBabylon = false;
    }

    /** @type {BABYLON.Mesh} */

    if (meshBabylon) {

      // shape.visibility = 1;
      shape.isVisible = true;
      // shape.showBoundingBox = true;

      shape.getChildMeshes().forEach(e => {
        e.visibility = true
        e.isVisible = true
        e.checkCollisions = true;
      });

      // TODO RENAME OBJECT.PLAYER in this.type
      this.position = new BABYLON.Vector3(posX, ObjectEnum.Player.height / 2 + 1, posZ);
      shape.position = this.position;

      this.shape = shape;
    }
    else {
      shape = this.createShape()
      this.addChild(shape)
      this.defineBoundingBox()
      this.position = new BABYLON.Vector3(posX, posY, posZ);
      // shape.position = this.position;
      this.shape = shape;
      // this.shape.position = this.position;
    }
    shadowGenerator.addShadowCaster(shape)
    shadowGenerator.getShadowMap().renderList.push(shape)

    //   this.showBoundingBox = true;
    this.speedNorme = speedNorme;
    this.speedAngle = speedAngle;

    this.checkCollisions = true;
    //this.center_camera()
  }

  defineBoundingBox() {
    let childMeshes = this.getChildMeshes();
    let min = childMeshes[0].getBoundingInfo().boundingBox.minimumWorld;
    let max = childMeshes[0].getBoundingInfo().boundingBox.maximumWorld;
    for (let i = 0; i < childMeshes.length; i++) {
      let meshMin = childMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
      let meshMax = childMeshes[i].getBoundingInfo().boundingBox.maximumWorld;

      min = BABYLON.Vector3.Minimize(min, meshMin);
      max = BABYLON.Vector3.Maximize(max, meshMax);
    }
    let newBoundingBox = new BABYLON.BoundingInfo(min, max)
    this.setBoundingInfo(newBoundingBox);
  }


  addChild(child) {
    child.parent = this;
    child.setParent(this)
    super.addChild(child)
    child.rotation = this.rotation
  }

  isRenversed(degree = 1, correct = false) {
    let currentDeg = this.shape.rotationQuaternion.toEulerAngles().z
    let currentDegAbs = Math.abs(currentDeg)
    if (correct && currentDegAbs < degree * 2 && currentDegAbs > degree / 1.5) {
      var dirZ = this.shape.getDirection(BABYLON.Axis.Z);
      var dirX = this.shape.getDirection(BABYLON.Axis.X);
      let forceDir = Math.atan2(dirX.x, dirZ.x) + (currentDeg < 0 ? -Math.PI / 2 : Math.PI / 2);
      this.physicsImpostor.applyForce(
        new BABYLON.Vector3(-Math.cos(forceDir) * 200000, 0, -Math.sin(forceDir) * 200000),
        new BABYLON.Vector3(this.shape.position.x, this.shape.position.y + 0.5, this.shape.position.z))
      this.physicsImpostor.applyForce(
        new BABYLON.Vector3(Math.cos(forceDir) * 200000, 0, Math.sin(forceDir) * 200000),
        new BABYLON.Vector3(this.shape.position.x, this.shape.position.y - 0.5, this.shape.position.z))
    }
    if (currentDegAbs < degree) return false
    return true
  }

  dispose(forceDispose) {
    this.life--
    if (forceDispose || this.life <= 0) {

      switch (this.type.name) {
        case ObjectEnum.Barrel.name: { remove(barrels, this); break; }
        case ObjectEnum.Battery.name: { remove(batteries, this); break; }
        case ObjectEnum.Bullet.name: { remove(bullets, this); break; }
        // case ObjectEnum.GrenadeObj.name: { remove(grenades, this); break; }
        case ObjectEnum.Bonus.name:
        case ObjectEnum.SpecialBonus.name: { remove(bonuses, this); break; }
        case ObjectEnum.Wall.name:
        case ObjectEnum.WallD.name: { remove(walls, this); break; }
        case ObjectEnum.MiniTank.name:
        case ObjectEnum.SnowTank.name:
        case ObjectEnum.EarthTank.name:
        case ObjectEnum.SandTank.name:
        case ObjectEnum.BossTank.name: { this.moveSound.pause(); break; }
        case ObjectEnum.Player.name: { this.moveSound.pause(); remove(impostorCharList, this.physicsImpostor); remove(chars, this); break; }
        case ObjectEnum.Rock.name:
        case ObjectEnum.SnowyRock.name:
        case ObjectEnum.DesertRock.name: { remove(rocks, this); break }
        case ObjectEnum.DesertHouse.name:
        case ObjectEnum.EarthyHouse.name:
        case ObjectEnum.SnowyHut.name: { remove(houses, this); break }
        case ObjectEnum.PalmTree1.name:
        case ObjectEnum.PalmTree2.name:
        case ObjectEnum.PalmTree3.name:
        case ObjectEnum.Cactus1.name:
        case ObjectEnum.Cactus2.name:
        case ObjectEnum.Tumbleweed.name:
        case ObjectEnum.SnowyTree.name:
        case ObjectEnum.SnowyFir.name: { remove(trees, this); break }
        case ObjectEnum.CatRelic.name:
        case ObjectEnum.JackalRelic.name:
        case ObjectEnum.MoonRelic.name: { remove(relics, this); break }
        default:
          throw `Unknown object type (ObjectPos.dispose)`;
      }
      if (this.physicsImpostor) this.physicsImpostor.dispose()
      this.shape.dispose();
    }
  }


}