let getCannonPoint = (tank) => new BABYLON.Vector3(
    tank.shape.position.x + tank.getTurretTank().getDirection(BABYLON.Axis.Z).x * 6,
    tank.shape.position.y + tank.getTurretTank().getDirection(BABYLON.Axis.Z).y * 6,
    tank.shape.position.z + tank.getTurretTank().getDirection(BABYLON.Axis.X).x * 6
);

class ShootAI {
    /**
     * @param {Char} tank 
     * @returns {BABYLON.Mesh} the mesh targeted
     */
    static targetPlayer(tank, length = 1000, affiche =  false, temps = 1000, pickedPoint = false, exclude = undefined) {
        let origin = getCannonPoint(tank)
        let dir = tank.getTurretTank().getDirection(BABYLON.Axis.Z)
        let toReverse = tank.type.name == ObjectEnum.SandTank.name
        // let hitted = createRay(
        //     origin, dir, length, affiche, temps, pickedPoint, exclude);
        // console.log(hitted);
        // return hitted
        return createRay(
            origin, dir, length, affiche, temps, pickedPoint, exclude, false, toReverse);
    }
}