class Rock extends ObjectPos {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        super(chooseRock(), -width / 2 + x, Barrel.height / 2, -height / 2 + y, 0, 0)
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 70000, restitution: 0.2 })
    }
}

function chooseRock() {
    switch (biome) {
        case "Earth": return ObjectEnum.Rock;
        case "Sand": return ObjectEnum.DesertRock;
        default: return ObjectEnum.SnowyRock;
    }
}