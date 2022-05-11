class House extends ObjectPos {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        super(chooseHouse(), -width / 2 + x, -height / 2, -height / 2 + y, 0, 0)
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 90000, restitution: 0.2 })
    }
}

function chooseHouse() {
    switch (biome) {
        case "Earth": return ObjectEnum.EarthyHouse;
        case "Sand": return ObjectEnum.DesertHouse;
        default: return ObjectEnum.SnowyHut;
    }
}