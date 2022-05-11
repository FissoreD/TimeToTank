class Bonus extends ObjectPos {


    static diameter = 1;
    /**
     * 
     * @param {number} posX
     * @param {number} posY
     * @param {boolean} isSpecial
     */
    constructor(posX, posY, isSpecial = false) {
        super(isSpecial ? ObjectEnum.SpecialBonus : ObjectEnum.Bonus, -width / 2 + posX, Bonus.diameter / 2, -height / 2 + posY, 0, 0, 1);
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this.shape, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 50000, restitution: 0.5 });
        this.createCollider()
        this.bonusEffect = createBonusEffect(this.shape, isSpecial)
        this.isSpecial = isSpecial;
    }

    createCollider() {
        this.physicsImpostor.onCollideEvent = (e1, e2) => {

            let b1 = bonuses.find(e => e.shape == e1.object)
            let tank;
            if (tank = chars.find(c => c.shape == e2.object)) {
                if (tank != char1) return // TODO modify if want other tank to take this
                if (b1) {
                    scene.menu.bonusChoice(Bonus.randomBonus(3, tank, this.isSpecial))
                    b1.dispose(true);
                    current_level_dico.addBonusObtained()
                }
            }
        }
    }

    static randomBonus(num, tank, isSpecial = false) {
        var res = []
        var copy_bonusEnum = isSpecial ? SpecialBonus.createSpecialBonusList(tank) : BonusEnum.bonusEnumList.slice().concat(addedObtainableBonus);
        for (var i = 0; i < num; i++) {
            var rand = Math.floor(Math.random() * copy_bonusEnum.length)
            res.push(copy_bonusEnum[rand])
            copy_bonusEnum.splice(rand, 1)
        }
        return res
    }

    dispose(forceDispose = false) {
        super.dispose(forceDispose)
        this.bonusEffect.dispose()
    }
}