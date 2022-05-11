class dome extends SpecialBonus {

    constructor(tank, isPermanent = false) {
        super(tank, SPECIAL_BONUS_ID.DOME, 15000, 15000, isPermanent);
        this.life = 3;
        this.maxLife = 3;
        this.radius = 3;
    }

    createDome() {
        this.dome = new BABYLON.MeshBuilder.CreateSphere("dome", { diameter: this.radius }, scene)
        var domeMaterial = new BABYLON.StandardMaterial("domeMaterial", scene);
        domeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0.2);
        domeMaterial.emissiveTexture = new BABYLON.Texture("textures/dome.jpg", scene)
        domeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        domeMaterial.backFaceCulling = false
        this.dome.material = domeMaterial
        this.dome.visibility = 0.1;
        this.dome.parent = this.tank.shape
        this.dome.isVisible = false
    }

    disable() {
        if (super.disable()) {
            shieldEffect(this.tank.shape, this.radius, true)
            this.dome.dispose();
            this.resetTime()
            this.life = this.maxLife;
        }

    }

    update() {
        super.update()
        if (this.isActive) {
            [...bullets, ...grenades].forEach(e => {
                if (this.dome.intersectsMesh(e) && e.char != this.tank) {
                    this.life--;
                    shieldImpact(e.position)
                    e.destroySound()
                    e.dispose(true, true);
                }
            })
            if (this.life <= 0) {
                this.disable()
            }
        }

    }

    use() {
        if (super.use() && !this.isActive) {
            this.bonusStartedDate = Date.now();
            this.createDome()
            this.dome.isVisible = true
            super.activate()
            shieldEffect(this.dome, this.radius)
        }
    }
}