class Barrel extends ObjectPos {

    static height = 0.01;
    static diameter = 0.8;

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        super(ObjectEnum.Barrel, -width / 2 + x, Barrel.height / 2, -height / 2 + y, 0, 0)
        // this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 3000, restitution: 0.2 })
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 3000, restitution: 0.2 })
        this.isBurning = false
        this.damage = 10

        this.explosionSound = new Audio('audio/grenade.wav')
        this.explosionSound.volume = 0.4;
    }

    explose() {
        if (this.isBurning) return
        this.explosionSound.play()
        massiveExplosion(this.position)
        chars.forEach(c => {
            if (Math.sqrt((c.shape.position.x - this.position.x) ** 2 +
                (c.shape.position.y - this.position.y) ** 2 +
                (c.shape.position.z - this.position.z) ** 2) < 3)
                c.healthLoss(this.damage)
        })
    }
}