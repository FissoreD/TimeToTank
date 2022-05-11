class GrenadeObj extends ObjectPos {


    static diameter = 0.2;
    /**
     * 
     * @param {Char} char 
     */
    constructor(char) {
        super(
            ObjectEnum.GrenadeObj,
            char.shape.position.x, char.shape.position.y + 1, char.shape.position.z, 0, 0, 0);

        this.char = char;
        this.damage = char.grenadeDamage;

        this.explosionGrenadeSound = new Audio('audio/grenade.wav')
        this.explosionGrenadeSound.volume = 0.4;

        this.physicsImpostor = new BABYLON.PhysicsImpostor(this, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 10, restitution: 1 });


        this.physicsImpostor.onCollideEvent = (e1, e2) => {
            let g = grenades.find(e => e == e1.object)
            g.destroySound()

            chars.forEach(c => {
                if (Math.sqrt((c.shape.position.x - g.position.x) ** 2 +
                    (c.shape.position.y - g.position.y) ** 2 +
                    (c.shape.position.z - g.position.z) ** 2) < 4)
                    c.healthLoss(g.damage)
            })

            barrels.forEach(c => {
                if (Math.sqrt((c.shape.position.x - g.position.x) ** 2 +
                    (c.shape.position.y - g.position.y) ** 2 +
                    (c.shape.position.z - g.position.z) ** 2) < 4) {
                    createFire(c.shape);
                    createSmoke(c.shape);
                    c.explose()
                    c.isBurning = true
                }
            })

            walls.forEach(c => {
                if (Math.sqrt((c.shape.position.x - g.position.x) ** 2 +
                    (c.shape.position.y - g.position.y) ** 2 +
                    (c.shape.position.z - g.position.z) ** 2) < 4) {
                    c.destroy()
                }
            })

            if (g) {
                g.dispose()
            }
        }

        // console.log(new BABYLON.Vector3(
        //     this.char.getTurretTank().getDirection(BABYLON.Axis.Z).x * 6000,
        //     1000,
        //     this.char.getTurretTank().getDirection(BABYLON.Axis.X).x * 6000));
        // console.log(this.position);

        // this.physicsImpostor.applyForce(
        //     new BABYLON.Vector3(
        //         this.char.getTurretTank().getDirection(BABYLON.Axis.Z).x * 6000,
        //         1000,
        //         this.char.getTurretTank().getDirection(BABYLON.Axis.X).x * 6000),
        //     this.position)

        let frontVec = char.getTurretTank().getDirection(BABYLON.Axis.Z)
        frontVec.y = 0.1
        let moveVec = frontVec.scale(50)
        // let moveVec = new BABYLON.Vector3(moveVec.x, 0, moveVec.z)
        this.physicsImpostor.setLinearVelocity(moveVec)

        grenades.push(this)
    }

    destroySound() {
        this.explosionGrenadeSound.play()
    }

    createShape() {
        var shape = BABYLON.MeshBuilder.CreateSphere("bullet", { diameter: Bullet.diameter, segments: 5 }, scene);
        shape.material = createMaterial(scene, "textures/grenade.png");
        hlBalls.addMesh(shape, new BABYLON.Color3(1, 0, 0))
        return shape;
    }

    dispose() {
        remove(grenades, this);
        //bulletExplode(this.position, true).start();
        massiveExplosion(this.position)
        this.physicsImpostor.dispose()
        this.shape.dispose();
    }
}