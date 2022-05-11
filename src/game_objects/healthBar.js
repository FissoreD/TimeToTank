let health;
let maxHealth;

class Healthbar {
  /** @type{Char} */
  tank;
  /**
   * @param {Char} tank 
   */
  constructor(tank, width) {
    this.tank = tank;
    this.barWidth = width;
    this.destroyed = false
    if (this.isPlayer()) {
      this.barWidth = document.getElementById("healthBar").width
    } else {
      var dynamicTexture = new BABYLON.DynamicTexture("dt1", 512, scene, true);
      dynamicTexture.hasAlpha = true;

      var healthBarContainerMaterial = new BABYLON.StandardMaterial("hb2mat", scene);
      var healthBarContainer = BABYLON.MeshBuilder.CreatePlane("hb2", { width: this.barWidth, height: 0.1, subdivisions: 4 }, scene);
      healthBarContainer.isPickable = false;

      healthBarContainerMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      healthBarContainerMaterial.emissiveColor = new BABYLON.Color4(0.08, 0.08, 0.08);
      // healthBarContainerMaterial.backFaceCulling = false;


      healthBarContainer.position = new BABYLON.Vector3(0, 0.7, 0);     // Position above player.

      healthBarContainer.parent = tank.shape;
      healthBarContainer.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_Y;
      healthBarContainer.material = healthBarContainerMaterial;
      this.healthBarContainerMaterial = healthBarContainerMaterial;
      this.healthBarContainer = healthBarContainer;


      // var healthBarTextMaterial = new BABYLON.StandardMaterial("hb3mat", scene);
      // healthBarTextMaterial.diffuseColor = new BABYLON.Color3(20 / 255, 112 / 255, 25 / 255);


      var healthBarTextMaterial = new BABYLON.StandardMaterial("hb3mat", scene);
      healthBarTextMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      // healthBarTextMaterial.emissiveColor = new BABYLON.Color3(20.0 / 255, 112.0 / 255, 25.0 / 255);
      healthBarTextMaterial.emissiveColor = new BABYLON.Color3(186.0 / 255, 33.0 / 255, 0 / 255);
      this.healthBarTextMaterial = healthBarTextMaterial;
    }
    this.updatePartition()
  }

  updatePartition() {
    this.partitions = maxHealth || this.tank.maxHealth;
    let barsToDisplay = health || this.tank.health
    var paddingBar = this.isPlayer() ? 3 : 0.01;
    let partitionWidth = (this.barWidth - (this.partitions + 1) * paddingBar) / this.partitions;

    if (this.isPlayer()) {
      document.getElementById("healthPlayer").innerHTML = Math.ceil(barsToDisplay) + "/" + this.partitions
      this.clearCanvas()
    } else {
      this.healthBarContainer.getChildMeshes().forEach(e => e.dispose())
    }

    let createSmallBar = (offset, i) => {
      if (this.isPlayer()) {
        let xPos = i * (partitionWidth + paddingBar) + paddingBar
        /** @type {HTMLCanvasElement} */
        let canvas = this.getCanvas()
        let context = this.getContext()
        let verticalOffset = canvas.height * 0.1
        context.beginPath();
        context.fillStyle = "rgb(33, 186, 0)"
        context.rect(xPos, verticalOffset, partitionWidth, canvas.height - verticalOffset * 2)
        context.fill()
      } else {
        let xPos = offset * this.barWidth / 2 - offset * (i * (partitionWidth + paddingBar) + partitionWidth / 2) + paddingBar;
        var healthBarText = BABYLON.MeshBuilder.CreatePlane("hb3", { width: partitionWidth, height: 0.07, subdivisions: 4, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
        healthBarText.position = new BABYLON.Vector3(xPos, 0, offset * 0.01);
        healthBarText.material = this.healthBarTextMaterial;
        healthBarText.parent = this.healthBarContainer
      }
    }

    for (let i = 0; i < barsToDisplay; i++) {
      createSmallBar(-1, i)
      // createSmallBar(1, i)
    }
  }

  isPlayer() {
    return this.tank.type.name == ObjectEnum.Player.name
  }

  /**
   * @returns {HTMLCanvasElement}
   */
  getCanvas() {
    return document.getElementById("healthBar")
  }

  /**
   * @returns {CanvasRenderingContext2D}
   */
  getContext() {
    return this.getCanvas().getContext("2d")
  }

  clearCanvas() {
    let cv = this.getCanvas()
    this.getContext().clearRect(0, 0, cv.width, cv.height)
  }

  disposeBar() {
    if (!this.isPlayer() && !this.destroyed) {
      this.healthBarContainerMaterial.dispose()
      this.healthBarContainer.dispose()
      this.destroyed = true;
    }
  }
}