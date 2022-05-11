class Allies extends SpecialBonus {
    constructor(tank) {
        super(tank, SPECIAL_BONUS_ID.ALLIES, 30000);
    }

    use() {
        if (super.use()) {
            var allie1 = new Char("normal", 5, 5, 0, 1, 2000, 40, 1, 1, 5, 3);
            allie1.shape.position.y += 3
            charsAllies.push(allie1);
            allie1.setStrategy(new guaranteedAI(allie1, false))
            chars.push(allie1);
            let fileterMeshToHigLight = allie1.getMeshesToHighlight();
            fileterMeshToHigLight.forEach(m => hl.addMesh(m, new BABYLON.Color3(0, 1, 0)))
            allie1.healtBar.healthBarTextMaterial.emissiveColor = new BABYLON.Color3(20.0 / 255, 112.0 / 255, 25.0 / 255);
              

            // var allie2 = new Char("normal", 3, 3, 0, 1, 2000, 40, 1, 1, 5, 3);
            // allie2.shape.position.y += 3
            // charsAllies.push(allie2);
            // allie2.setStrategy(new guaranteedAI(allie2, false))
            // chars.push(allie2);
        }

    }
}