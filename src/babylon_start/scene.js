/// <reference path="babylon.d.ts" />

var canvas = document.getElementById("myCanvas");
var ground;
var lightCam;
canShoot = false;
/** @type {BABYLON.Mesh} */
var tankMeshes;
var opponentContainer;
var opponentMeshes;
var opponentMaterials;
/** @type {BABYLON.Engine} */
var engine;
var shadowGenerator;
var tanksAIReady;
var inMenu = true;
var light1;
var groundSand;
var listGrounds = [];
var listSkyboxes = [];
var w;

class Scene {

  constructor() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    tanksAIReady = false;
    this.engine = new BABYLON.Engine(canvas, true, null, true);

    engine = this.engine;
    engine.enableOfflineSupport = false;
    engine.doNotHandleContextLost = true;

    // window.addEventListener("resize", () => {
    //   engine.resize()
    // })

    engine.displayLoadingUI();
    this.scene = this.createScene();
    this.scene.menu = new Menu()
    this.setPhysic()
    this.setGround()
    this.setShadow()
    this.setFog()
    this.setBackground()
    this.setParticles()
    // this.setGizmo()
    this.setCamera()

    ObjectEnum.initiate_all_models()
  }

  /**
   * @returns {BABYLON.Scene}
   */
  createScene() {
    scene = new BABYLON.Scene(this.engine);

    // engine.runRenderLoop(() => scene.render())
    // var options = new BABYLON.SceneOptimizerOptions(50, 2000);
    // BABYLON.SceneOptimizerOptions.LowDegradationAllowed()
    // BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed()
    // var optimizer = new BABYLON.SceneOptimizer(scene, options, false);
    // optimizer.start();


    //to improve performance
    scene.skipPointerMovePicking = true;
    scene.autoClear = false; // Color buffer
    scene.autoClearDepthAndStencil = false; // Depth and stencil, obviously

    hl = new BABYLON.HighlightLayer("hl", scene);

    hl.blurHorizontalSize = hl.blurVerticalSize = 0.3;

    hlBalls = new BABYLON.HighlightLayer("hlBalls", scene);

    hlBalls.blurHorizontalSize = hlBalls.blurVerticalSize = 0.001;

    hlControlled = new BABYLON.HighlightLayer("hlControlled", scene);

    hlControlled.blurHorizontalSize = hlControlled.blurVerticalSize = 0.3;

    hlMinigun = new BABYLON.HighlightLayer("hlMinigun", scene);

    hlMinigun.blurHorizontalSize = hlMinigun.blurVerticalSize = 0.3;

    hlAllies = new BABYLON.HighlightLayer("hlAllies", scene);

    hlAllies.blurHorizontalSize = hlAllies.blurVerticalSize = 0.3;

    hlBattery = new BABYLON.HighlightLayer("hlBattery", scene);

    hlBattery.blurHorizontalSize = hlBattery.blurVerticalSize = 0.3;

    let date = Date.now()

    scene.beforeRender = () => {


      // if (Date.now() - date > 100) {
      //   this.scene.renderTargetsEnabled = true
      //   date = Date.now()
      // } else if (this.scene.renderTargetsEnabled) {
      //   this.scene.renderTargetsEnabled = false
      // }

      document.getElementById("fps").innerHTML = engine.getFps().toFixed() + " fps" + (chronoLvl ? (" <br> Chrono : " + Math.ceil(chronoLvl.timeCooled / 1000) + "." + (chronoLvl.timeCooled % 1000 + "").padEnd(3, "0")) : "")

      if (!this.scene.menu.isShown) {
        current_level_dico.updateTipMessage()
        scene.minimap.redraw()
        // char1.physicsImpostor.applyForce(new BABYLON.Vector3(0, -gravity * 30000, 0), char1.shape.position)
        bullets.forEach(bullet => bullet.physicsImpostor.applyForce(new BABYLON.Vector3(0, -gravity, 0), bullet.position))

        // chars.forEach(c => {
        //   let p = getCannonPoint(c)
        //   c.test.position = p
        // })

        getAllMeshList(true).forEach(obj => {
          let outOfBound = (obj) => {
            return obj.position && (
              obj.position.x <= width / 2 - 60 ||
              obj.position.x >= width / 2 + 40 ||
              obj.position.z <= height / 2 - 60 ||
              obj.position.z >= height / 2 + 40 ||
              obj.position.y < current_level_dico.minHeightMap - 0.8 ||
              obj.position.y >= +8)
          }
          if (outOfBound(obj.shape) || outOfBound(obj)) {
            if (obj == char1) {
              if (char1.life > 0) char1.healthLoss(char1.maxHealth + 1)
            }
            else obj.dispose(true, true)
          }
        })
        let velocity = char1.physicsImpostor.getLinearVelocity()
        let speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2) * 10
        document.getElementById("speed").innerHTML = Math.round(speed)

        // let posChar1 = char1.shape.position

        chars.forEach(c => {

          if (c.life <= 0) return

          //le char prend des degats si il est retourné
          if (c.isRenversed(1.4, true)) {
            c.healthLoss(c.maxHealth / 120)
          }

          if (c.shape.position.y <= w.position.y + 0.4) {
            console.log(c + ' is losing health in water');
            c.healthLoss(c.maxHealth / 180)
          }

          //réglage son de déplacement selon la vitesse
          let velocityc = c.physicsImpostor.getLinearVelocity()
          let speedc = Math.sqrt(velocityc.x ** 2 + velocityc.y ** 2 + velocityc.z ** 2) * 10
          c.moveSound.volume = Math.max(Math.min(1, 0.01 * speedc), 0.2)

          //réglage son de déplacement selon la distance
          playSoundWithDistanceEffect(c.moveSound, c.shape, false, false)
        })

        // charsAI.forEach(c => MoveAI.move(c));
        // if (tanksAIReady) charsAI.forEach(c => c.strategy.applyMovement())
        anime()


        //VERIFICATION TOUS CHARS ENNEMIS ELIMINES

        charsAI.forEach(c => {
          if (c.life <= 0) {
            let index = chars.indexOf(c)
            if (index !== -1) chars.splice(index, 1)
            index = charsAI.indexOf(c)
            if (index !== -1) charsAI.splice(index, 1)
            c.destroyTank()
          }
        })

        charsAllies.forEach(c => {
          if (c.life <= 0) {
            let index = chars.indexOf(c)
            if (index !== -1) chars.splice(index, 1)
            index = charsAllies.indexOf(c)
            if (index !== -1) charsAllies.splice(index, 1)
            c.destroyTank()
          }
        })


        batteries.forEach(b => {
          if (b.shape.position.y <= w.position.y + 0.2) {
            b.isDestroyed = true
            b.destroy()
            current_level_dico.addBatteryDestroyed()
            if (batteries.length <= 0) {
              charsAI.forEach(c => c.specialBonuses.forEach(e => e.isPermanent = false))
            }
          }
        })


        char1.applyBullForce();

        //si le char joueur meurt
        if (char1.life <= 0 && !this.scene.menu.isInMenu() || level == level_map.length) {
          if (pointerLockChange != null && Date.now() - pointerLockChange < 1400) console.log('entering pointer lock too fast!')
          else {
            chars.forEach(c => c.stabilizeTank())
            playSoundWithDistanceEffect(char1.charExploseSound, char1, false)
            current_level_dico.goNextLevel(lvlStatus.DIE)
          }
          //si le char joueur fini le niveau
        } else if (current_level_dico.canGoNextLevel()) {
          if (pointerLockChange != null && Date.now() - pointerLockChange < 1400) console.log('entering pointer lock too fast!')
          else {
            chars.forEach(c => c.stabilizeTank())
            char1.bullForce = null
            //si il vient de finir le dernier niveau
            if (level + 1 == level_map.length) {
              current_level_dico.goNextLevel(lvlStatus.WIN)
            } else if (!this.scene.menu.inOtherMenu()) {
              current_level_dico.goNextLevel()
              if (sceneInterval) {
                clearInterval(sceneInterval)
              }
            }
          }
        }

        else {
          charsAllAllies = charsAllies.slice()
          charsAllAllies.push(char1)
          charsAI.forEach(c => c.strategy.applyStrategy());
          charsAllies.forEach(c => c.strategy.applyStrategy());
          chars.forEach(c => SpecialBonus.updateAllThankBonuses(c));
          if (chronoLvl) chronoLvl.update()
        }// TODO : Here update all bonuses list !!!
        //charsAI.forEach(c => MoveAI.move(c));

      }
    }

    return scene;
  }

  setPhysic() {
    var gravityVector = new BABYLON.Vector3(0, gravity, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);
  }

  setCamera() {
    camera = new BABYLON.FollowCamera("tankCamera", ground.position, scene, ground);
    // camera.attachControl(canvas, true);
    camera.radius = 40;
    camera.heightOffset = 14;
    camera.rotationOffset = 50;
    camera.cameraAcceleration = .1;
    camera.maxCameraSpeed = 10;

  }

  setGround() {
    // const groundOptions = {
    //   width: width * 1.5 + cell_size,
    //   height: height * 1.5 + cell_size,
    //   subdivisions: 80,
    //   minHeight: current_level_dico.minHeightMap,
    //   maxHeight: 0,

    //   onReady: () => onGroundCreated(this),
    // };
    //scene is optional and defaults to the current scene

    let groundOptions = (name, index) => {
      return {
        width: width * 1.5 + cell_size,
        height: height * 1.5 + cell_size,
        subdivisions: 28,
        minHeight: current_level_dico.minHeightMap,
        maxHeight: 1.5,

        onReady: () => onGroundCreated(this, name, index),
      }
    }

    listGrounds.push(BABYLON.MeshBuilder.CreateGroundFromHeightMap(
      "gdhm",
      `textures/earthy_ground.png`,
      groundOptions("earthy", 0),
      scene
    ));
    listGrounds.push(BABYLON.MeshBuilder.CreateGroundFromHeightMap(
      "gdhm",
      `textures/sandy_ground.png`,
      groundOptions("sandy", 1),
      scene
    ));
    listGrounds.push(BABYLON.MeshBuilder.CreateGroundFromHeightMap(
      "gdhm",
      `textures/snowy_ground.png`,
      groundOptions("snowy", 2),
      scene
    ));

    function onGroundCreated(myScene, name, index) {
      const groundMaterial = new BABYLON.StandardMaterial(
        "groundMaterial",
        scene
      );
      groundMaterial.diffuseTexture = new BABYLON.Texture(`textures/${name}_ground_diffuse.png`, scene, null, true, null, function () {
        if (name == "earthy") ObjectEnum.loadingDone();
      });
      listGrounds[index].material = groundMaterial;

      listGrounds[index].receiveShadows = false
      // to be taken into account by collision detection
      //groundMaterial.wireframe=true;

      // for physic engine
      // listGrounds[index].physicsImpostor = new BABYLON.PhysicsImpostor(
      //   listGrounds[index],
      //   BABYLON.PhysicsImpostor.HeightmapImpostor,
      //   { mass: 0 },
      //   scene
      // );


      groundMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9)
      groundMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3)
      groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0)

      myScene.setWater(listGrounds[index]);

      listGrounds[index].position.y = -10
      listGrounds[index].forceSharedVertices();

    }
    ground = listGrounds[1]

    return ground;
  }

  setWater(gr) {
    //sand ground
    var groundTexture = new BABYLON.Texture("textures/sand.jpg", scene);
    groundTexture.vScale = groundTexture.uScale = 4.0;

    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = groundTexture;

    groundSand = BABYLON.MeshBuilder.CreateGround("groundSand", { height: 128, width: 128, subdivisions: 32 }, scene);
    groundSand.position.y = gr.position.y - 0.1
    groundSand.material = groundMaterial;
    groundSand.physicsImpostor = new BABYLON.PhysicsImpostor(
      groundSand,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0 },
      scene
    );
    // var collidedChar
    // groundSand.physicsImpostor.onCollideEvent = (e1, e2) => {
    //   if (collidedChar = chars.find(e => e.shape == e2.object)) {
    //     collidedChar.healthLoss(1)
    //   }
    // }


    //water ground
    var waterMesh = BABYLON.MeshBuilder.CreateGround("waterMesh", { height: 256, width: 256, subdivisions: 32 }, scene);
    waterMesh.position.y = gr.position.y - 0.1
    var water = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(256, 256));
    water.backFaceCulling = true;
    water.bumpTexture = new BABYLON.Texture("textures/waterbump.png", scene);
    water.windForce = -5;
    water.waveHeight = 0.1;
    water.bumpHeight = 0.1;
    water.waveLength = 0.1;
    water.colorBlendFactor = 0;
    w = waterMesh

    listSkyboxes.forEach(s => water.addToRenderList(s))
    water.addToRenderList(groundSand);
    waterMesh.material = water;
  }

  setShadow() {

    light1 = new BABYLON.PointLight("spotLight1", new BABYLON.Vector3(0, 10, 0), scene);
    light1.emissive = new BABYLON.Color3(0, 0, 0);
    light1.specular = new BABYLON.Color3(0.2, 0.2, 0.2);

    light1.diffuse = new BABYLON.Color3(0.8, 0.8, 0.8);
    light1.intensity = 3

    shadowGenerator = new BABYLON.ShadowGenerator(128, light1)
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurScale = 1;
    shadowGenerator.setDarkness(0.1);
  }

  setFog() {
    if (biome != "Snow") return;
    // scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    //BABYLON.Scene.FOGMODE_NONE;
    //BABYLON.Scene.FOGMODE_EXP2;
    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogColor = new BABYLON.Color3(1, 1, 1);
    scene.fogDensity = 0.3;
    scene.fogStart = 0.1;
    scene.fogEnd = 30.0;
  }


  setBackground() {

    let createSkybox = (name) => {
      let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 512.0 }, scene);
      let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(`images/${name}_sky/skybox`, scene);
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.disableLighting = true;
      skybox.material = skyboxMaterial;
      skybox.isVisible = false
      return skybox
    }

    listSkyboxes.push(createSkybox("cloudy"))
    listSkyboxes.push(createSkybox("sunny"))


  }

  setParticles() {
    // Set up new rendering pipeline
    var pipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene);

    // Tone mapping
    scene.imageProcessingConfiguration.toneMappingEnabled = true;
    scene.imageProcessingConfiguration.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;
    scene.imageProcessingConfiguration.exposure = 1;

    // Bloom
    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.8;
    pipeline.bloomWeight = 0.3;
    pipeline.bloomKernel = 64;
    pipeline.bloomScale = 0.5;
  }

  setGizmo() {
    var gizmoManager = new BABYLON.GizmoManager(scene);
    gizmoManager.positionGizmoEnabled = true;
    gizmoManager.rotationGizmoEnabled = true;
    gizmoManager.scaleGizmoEnabled = true;
    gizmoManager.boundingBoxGizmoEnabled = true;
  }

}