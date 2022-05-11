class Teleport extends SpecialBonus {
    constructor(tank) {
        super(tank, SPECIAL_BONUS_ID.TELEPORT, 5000);
    }

    use() {
        if (super.use()) {
            // var dir = this.tank.getTurretTank().getDirection(new BABYLON.Vector3(1, 0, 1))
            // this.tank.shape.position.x += dir.x * 20
            // this.tank.shape.position.z += dir.z * 20

            this.tank.shape.position = new BABYLON.Vector3(
                this.tank.shape.position.x + this.tank.getTurretTank().getDirection(BABYLON.Axis.Z).x * 40,
                Math.max(this.tank.shape.position.y + this.tank.getTurretTank().getDirection(BABYLON.Axis.Z).y * 40 + 0.4, 1),
                this.tank.shape.position.z + this.tank.getTurretTank().getDirection(BABYLON.Axis.X).x * 40
            );

            teleportationParticle(this.tank.shape)
        }

    }
}