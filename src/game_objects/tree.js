class Tree extends ObjectPos {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        super(ObjectEnum.PalmTree1, -width / 2 + x, Barrel.height / 2, -height / 2 + y, 0, 0)
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 30000, restitution: 0.2 })
    }
}