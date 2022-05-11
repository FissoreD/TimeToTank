var relicCpt = 0;
class Relic extends ObjectPos {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        super(chooseRelic(), -width / 2 + x, Barrel.height / 2, -height / 2 + y, 0, 0)
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 70000, restitution: 0.2 })
        this.createCollider()
    }

    createCollider() {
        this.physicsImpostor.onCollideEvent = (e1, e2) => {

            let r1 = relics.find(e => e.shape == e1.object)
            let tank;
            if (tank = chars.find(c => c.shape == e2.object)) {
                if (tank != char1) return
                if (r1) {
                    r1.dispose(true);
                    current_level_dico.addRelicObtained()
                }
            }
        }
    }

    dispose(forceDispose = false) {
        collectRelicParticle(this.shape.position) 
        super.dispose(forceDispose)
    }

}

function chooseRelic() {
    relicCpt++
    relicCpt = relicCpt % 3

    if (relicCpt == 0) return ObjectEnum.CatRelic
    else if (relicCpt == 1) return ObjectEnum.JackalRelic
    return ObjectEnum.MoonRelic
    
}

