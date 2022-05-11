class MoveAI {


  /**
   * @param {Char} tank 
   */
  static rotateTurret(tank, isEnnemy = true) {
    var turret = tank.getTurretTank()
    var target = char1

    if (!isEnnemy) {
      var distance = 1000
      charsAI.forEach(c => {
        var newDist = Math.sqrt(
          (c.shape.position.x - tank.shape.position.x) ** 2 +
          (c.shape.position.y - tank.shape.position.y) ** 2 +
          (c.shape.position.z - tank.shape.position.z) ** 2);
        if (newDist > 0.2 && newDist < distance) {
          distance = newDist
          target = c
        }
      })
      if (target == char1) return
    }
    else if (charsAllies.length > 0) {
      var distance = 1000
      charsAllAllies.forEach(c => {
        var newDist = Math.sqrt(
          (c.shape.position.x - tank.shape.position.x) ** 2 +
          (c.shape.position.y - tank.shape.position.y) ** 2 +
          (c.shape.position.z - tank.shape.position.z) ** 2);
        if (newDist > 0.2 && newDist < distance) {
          distance = newDist
          target = c
        }
      })
    }

    //char ennemi nous vise en x et z
    var turretDir = turret.getDirection(new BABYLON.Vector3(1, 1, 1));
    var currentAngle = Math.atan2(turretDir.z, turretDir.x);
    var targetDir = target.shape.position.subtract(tank.shape.position);
    var targetAngle = Math.atan2(targetDir.z, targetDir.x);
    var rota = ((currentAngle - targetAngle) + Math.PI / 4)
    if (rota > Math.PI) rota -= 2 * Math.PI
    if (rota > 0) tank.rotateTurretAxisY(Math.min(0.05, rota))
    if (rota < 0) tank.rotateTurretAxisY(Math.max(-0.05, rota))

    //char ennemi nous vise en hauteur:
    var currentAngleY = turret.getDirection(BABYLON.Axis.Z).y;
    targetDir = BABYLON.Vector3.Normalize(target.shape.position.subtract(tank.shape.position));
    let dotVec = BABYLON.Vector3.Dot(new BABYLON.Vector3(0, -1, 0), targetDir);
    let targetAngleY = Math.acos(dotVec) - Math.PI / 2;
    tank.rotateTurretUpDown((currentAngleY <= targetAngleY), 1)
  }

  static rotateTankBody(tank) {
    var turretDir = tank.getTurretTank().getDirection(new BABYLON.Vector3(1, 1, 1));
    var currentAngle = Math.atan2(turretDir.z, turretDir.x);
    var targetDir = target.shape.position.subtract(tank.shape.position);
    var targetAngle = Math.atan2(targetDir.z, targetDir.x);
    tank.rotate(BABYLON.Axis.Y, currentAngle - targetAngle + Math.PI / 4);
    // tank.rotate(BABYLON.Axis.Y, Math.PI / 4);
  }

  /**
   * @param {Char} tank 
   */
  static move(tank) {
    if (Math.random() < 0.02) {
      let randomRotation = (Math.random() - 0.5) / 10;
      tank.shape.rotate(BABYLON.Axis.Y, randomRotation);
    }
    tank.moveTankForeward();
    this.rotate(tank);
  }
}