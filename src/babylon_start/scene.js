/// <reference path="babylon.d.ts" />

import { playSoundWithDistanceEffect } from "../tools/utils.js";
import { Menu } from "./GUI.js";
import { gravity, width, height, cell_size, cell_x_number, cell_y_number, bullets, chars, charsAI, charsAllAllies, charsAllies, walls, barrels, batteries, relics } from "../main/global_vars.js";
import { level_map, biome } from "../levels/levels.js";
import { ObjectEnum } from "../game_objects/objectEnum.js";
import { pointerLock, getAllMeshList, anime } from "../main/main.js";
import { guaranteedAI } from "../game_IA/guaranteedAI.js";
import { SpecialBonus } from "../specialBonus/bonusSpecial.js";
import { lvlStatus } from "../levels/level.js";
import { levelObjectives } from "../levels/levelObjectives.js";
import { sceneInterval } from "../main/main.js";
import { remove_all_objects, init } from "../main/main.js";
import { Char } from "../game_objects/char.js";
import { Chrono } from "../tools/chrono.js";

export var canvas = document.getElementById("myCanvas");
var ground;
var lightCam;
// canShoot = false;
/** @type {BABYLON.Engine} */
export var engine;
/** @type {BABYLON.ShadowGenerator} */
export var shadowGenerator;
export var light1;
var groundSand;
export var listGrounds = [];
export var listSkyboxes = [];
var w;


/** @type{Scene} */
export var scene;
export var sceneBab;

class Scene {

  constructor() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // tanksAIReady = false;
    this.engine = new BABYLON.Engine(canvas, true, null, false);
    this.pointerLockChange = null;
    this.level = 0;

    /** @type{Level} */
    this.current_level_dico = level_map[0];
    /** @type{Chrono} */
    this.chronoLvl = undefined;
    this.cell_x_number = cell_x_number;
    this.cell_y_number = cell_y_number;
    this.heitht = height;
    this.width = width;
    this.isAdventure = true;

    engine = this.engine;
    engine.enableOfflineSupport = false;
    engine.doNotHandleContextLost = true;

    // window.addEventListener("resize", () => {
    //   engine.resize()
    // })


    this.char1 = undefined;

    scene = this;
    engine.displayLoadingUI();
    this.scene = this.createScene();
    sceneBab = this.scene;
    this.menu = new Menu()
    this.setPhysic()
    this.setGround()
    this.setShadow()
    this.setFog()
    this.setBackground()
    this.setParticles()
    // this.setGizmo()
    this.camera = this.setCamera()

    ObjectEnum.initiate_all_models(this.scene)
    this.setLevelsListener()


    window.onresize = function () {
      if (engine) engine.resize();
    }
    window.onresize()
  }

  setLevelsListener() {
    let mainDiv = document.getElementById('main')
    let levelBox = document.getElementById('levelBox')
    window.fromLevelChooser = false;

    {
      let levelDiv = document.getElementsByClassName('levels')[0]
      level_map.forEach((e, pos) => {
        let child = document.createElement('div')
        child.classList.add('level', 'blocked')
        child.innerHTML = pos + 1
        levelDiv.appendChild(child)
      })
    }
    document.getElementById('backButton').onclick = () => {
      mainDiv.classList.remove('hide')
      levelBox.classList.add('hide')
    }

    document.getElementById('goToLevels').onclick = () => {
      levelBox.classList.remove('hide')
      mainDiv.classList.add('hide')
    }

    Array.from(document.getElementsByClassName('level')).forEach((e, pos) => {
      e.onclick = () => {
        if (!e.classList.contains('blocked') || true) {
          window.fromLevelChooser = true
          this.level = pos;
          remove_all_objects();
          init();
          this.menu.show(false);
          this.menu.displayScenario(false)
          levelBox.classList.add('hide')
          pointerLock()
        }
      }
    })
  }

  render() {
    sceneBab.render()
  }

  /**
   * @returns {BABYLON.Scene}
   */
  createScene() {
    var scene = new BABYLON.Scene(this.engine);

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

    this.hl = new BABYLON.HighlightLayer("hl", scene);

    this.hl.blurHorizontalSize = this.hl.blurVerticalSize = 0.3;

    this.hlBalls = new BABYLON.HighlightLayer("hlBalls", scene);

    this.hlBalls.blurHorizontalSize = this.hlBalls.blurVerticalSize = 0.001;

    this.hlControlled = new BABYLON.HighlightLayer("hl-Controlled", scene);

    this.hlControlled.blurHorizontalSize = this.hlControlled.blurVerticalSize = 0.3;

    this.hlMinigun = new BABYLON.HighlightLayer("hl-Minigun", scene);

    this.hlMinigun.blurHorizontalSize = this.hlMinigun.blurVerticalSize = 0.3;

    this.hlAllies = new BABYLON.HighlightLayer("hl-Allies", scene);

    this.hlAllies.blurHorizontalSize = this.hlAllies.blurVerticalSize = 0.3;

    this.hlBattery = new BABYLON.HighlightLayer("hl-Battery", scene);

    this.hlBattery.blurHorizontalSize = this.hlBattery.blurVerticalSize = 0.3;

    scene.checkBullet = 0

    scene.beforeRender = () => {


      // if (Date.now() - date > 100) {
      //   scene.renderTargetsEnabled = true
      //   date = Date.now()
      // } else if (scene.renderTargetsEnabled) {
      //   scene.renderTargetsEnabled = false
      // }

      if (this.chronoLvl) {
        let chronoTxt = "Chrono : " + Math.floor(this.chronoLvl.timeCooled / 1000) + "." + (this.chronoLvl.timeCooled % 1000 + "").padEnd(3, "0")

        if (this.chronoLvl.timeCooled < 10000) {
          chronoTxt = "<they>" + chronoTxt + "</they>"
        }
        document.getElementById("fps").innerHTML = engine.getFps().toFixed() + " fps<br>" + chronoTxt
      } else {
        document.getElementById("fps").innerHTML = engine.getFps().toFixed()
      }



      if (!this.menu.isShown) {
        this.current_level_dico.updateTipMessage()
        this.minimap.redraw()
        // this.char1.physicsImpostor.applyForce(new BABYLON.Vector3(0, -gravity * 30000, 0), this.char1.shape.position)
        bullets.forEach(bullet => {
          bullet.physicsImpostor.applyForce(new BABYLON.Vector3(0, -gravity, 0), bullet.position)
          scene.checkBullet++
          if (scene.checkBullet > 60) {
            let velocity = bullet.physicsImpostor.getLinearVelocity()
            if (Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2) * 10 < 20) {
              bullet.dispose(true, true)
            }
            scene.checkBullet = 0
          }
        })

        // chars.forEach(c => {
        //   let p = getCannonPoint(c)
        //   c.test.position = p
        // })

        batteries.forEach(b => {
          if (b.shape.position.y <= w.position.y + 0.2) {
            b.isDestroyed = true
            b.destroy()
            this.current_level_dico.addBatteryDestroyed()
            if (batteries.length <= 0) {
              charsAI.forEach(c => c.specialBonuses.forEach(e => e.isPermanent = false))
            }
          }
        })

        getAllMeshList(true).forEach(obj => {
          let outOfBound = (obj) => {
            return obj.position && (
              obj.position.x <= width / 2 - 60 ||
              obj.position.x >= width / 2 + 40 ||
              obj.position.z <= height / 2 - 60 ||
              obj.position.z >= height / 2 + 40 ||
              obj.position.y < this.current_level_dico.minHeightMap - 0.8 ||
              obj.position.y >= +8)
          }
          if (outOfBound(obj.shape) || outOfBound(obj)) {
            if (obj == this.char1) {
              if (this.char1.life > 0) this.char1.healthLoss(this.char1.maxHealth + 1)
            }
            else obj.dispose(true, true)
          }
        })
        let velocity = this.char1.physicsImpostor.getLinearVelocity()
        let speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2) * 10
        document.getElementById("speed").innerHTML = Math.round(speed)

        // let posthis.char1 = this.char1.shape.position

        chars.forEach(c => {

          if (c.life <= 0) return

          //le char prend des degats si il est retourné
          if (c.isRenversed(1.4, true)) {
            c.healthLoss(c.maxHealth / 120)
          }

          if (c.shape.position.y <= w.position.y + 0.4) {
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

            setTimeout(() => {
              if (!c.shape.isDisposed()) c.dispose(true, true)
            }, 5000)

            if (this.current_level_dico.lvlObjective == levelObjectives.getAllRelicsAndTanks && relics.length != 0) {
              setTimeout(() => {
                if (relics.length != 0) {
                  var char = new Char("normal", 5, 5, 0, 1, 2000, 30);
                  char.shape.position.y += 3
                  charsAI.push(char);
                  char.setStrategy(new guaranteedAI(char))
                  chars.push(char);
                  char.applyStrategy()
                }
              }, 10000)
            }


            //niveau boss
            if (this.current_level_dico.lvlObjective == levelObjectives.killBoss) {
              if (charsAI.length == 1) {
                if (charsAI[0].domeBoss.isActive) {
                  charsAI[0].domeBoss.isPermanent = false
                  charsAI[0].domeBoss.disable()
                }
              }
            }
          }
        }
        )

        charsAllies.forEach(c => {
          if (c.life <= 0) {
            let index = chars.indexOf(c)
            if (index !== -1) chars.splice(index, 1)
            index = charsAllies.indexOf(c)
            if (index !== -1) charsAllies.splice(index, 1)
            c.destroyTank()
            setTimeout(() => {
              if (!c.shape.isDisposed()) c.dispose(true, true)
            }, 5000)
          }
        })


        batteries.forEach(b => {
          if (b.shape.position.y <= w.position.y + 0.2) {
            b.isDestroyed = true
            b.destroy()
            this.current_level_dico.addBatteryDestroyed()
            if (batteries.length <= 0) {
              charsAI.forEach(c => c.specialBonuses.forEach(e => e.isPermanent = false))
            }
          }
        })


        this.char1.applyBullForce();

        //si le char joueur meurt
        if (this.char1.life <= 0 && !this.menu.isInMenu() || level == level_map.length) {
          if (this.pointerlockchange != null && Date.now() - this.pointerlockchange < 1400) console.log('entering pointer lock too fast!')
          else {
            chars.forEach(c => c.stabilizeTank())
            playSoundWithDistanceEffect(this.char1.charExploseSound, this.char1, false)
            this.current_level_dico.goNextLevel(lvlStatus.DIE)
          }
          //si le char joueur fini le niveau
        } else if (this.current_level_dico.canGoNextLevel()) {
          if (this.pointerlockchange != null && Date.now() - this.pointerlockchange < 1400) console.log('entering pointer lock too fast!')
          else {
            chars.forEach(c => c.stabilizeTank())
            this.char1.bullForce = null
            console.log(22222222);
            //si il vient de finir le dernier niveau
            if (this.level + 1 == level_map.length) {
              console.log(1111111);
              this.current_level_dico.goNextLevel(lvlStatus.WIN)
            } else if (!this.menu.inOtherMenu()) {
              this.current_level_dico.goNextLevel()
              if (sceneInterval) {
                clearInterval(sceneInterval)
              }
            }
          }
        }

        else {
          charsAllAllies.length = 0
          for (const char of charsAllies) {
            charsAllAllies.push(char)
          }
          charsAllAllies.push(this.char1)
          charsAI.forEach(c => c.strategy.applyStrategy());
          charsAllies.forEach(c => c.strategy.applyStrategy());
          chars.forEach(c => SpecialBonus.updateAllThankBonuses(c));
          this.char1.regenUpdate()
          if (this.chronoLvl) this.chronoLvl.update()
        }// TODO : Here update all bonuses list !!!
        //charsAI.forEach(c => MoveAI.move(c));

      }
    }

    return scene;
  }

  setPhysic() {
    var gravityVector = new BABYLON.Vector3(0, gravity, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    this.scene.enablePhysics(gravityVector, physicsPlugin);
  }

  setCamera() {
    let camera = new BABYLON.FollowCamera("tankCamera", ground.position, this.scene, ground);
    // camera.attachControl(canvas, true);
    camera.radius = 40;
    camera.heightOffset = 14;
    camera.rotationOffset = 50;
    camera.cameraAcceleration = .1;
    camera.maxCameraSpeed = 10;

    return camera
  }

  setGround() {
    // const groundOptions = {
    //   width: width * 1.5 + cell_size,
    //   height: height * 1.5 + cell_size,
    //   subdivisions: 80,
    //   minHeight: this.current_level_dico.minHeightMap,
    //   maxHeight: 0,

    //   onReady: () => onGroundCreated(this),
    // };
    //this.scene is optional and defaults to the current this.scene

    let groundOptions = (name, index) => {
      return {
        width: width * 1.5 + cell_size,
        height: height * 1.5 + cell_size,
        subdivisions: 28,
        minHeight: this.current_level_dico.minHeightMap,
        maxHeight: 1.5,

        onReady: () => onGroundCreated(this, name, index),
      }
    }

    listGrounds.push(BABYLON.MeshBuilder.CreateGroundFromHeightMap(
      "gdhm",
      `textures/earthy_ground.png`,
      groundOptions("earthy", 0),
      this.scene
    ));
    listGrounds.push(BABYLON.MeshBuilder.CreateGroundFromHeightMap(
      "gdhm",
      `textures/sandy_ground.png`,
      groundOptions("sandy", 1),
      this.scene
    ));
    listGrounds.push(BABYLON.MeshBuilder.CreateGroundFromHeightMap(
      "gdhm",
      `textures/snowy_ground.png`,
      groundOptions("snowy", 2),
      this.scene
    ));

    function onGroundCreated(myScene, name, index) {
      const groundMaterial = new BABYLON.StandardMaterial(
        "groundMaterial",
        sceneBab
      );
      groundMaterial.diffuseTexture = new BABYLON.Texture(`textures/${name}_ground_diffuse.png`, sceneBab, null, true, null, function () {
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
      //   this.scene
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
    var groundTexture = new BABYLON.Texture("textures/sand.jpg", this.scene);
    groundTexture.vScale = groundTexture.uScale = 4.0;

    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
    groundMaterial.diffuseTexture = groundTexture;

    groundSand = BABYLON.MeshBuilder.CreateGround("groundSand", { height: 128, width: 128, subdivisions: 32 }, this.scene);
    groundSand.position.y = gr.position.y - 0.1
    groundSand.material = groundMaterial;
    groundSand.physicsImpostor = new BABYLON.PhysicsImpostor(
      groundSand,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0 },
      this.scene
    );
    // var collidedChar
    // groundSand.physicsImpostor.onCollideEvent = (e1, e2) => {
    //   if (collidedChar = chars.find(e => e.shape == e2.object)) {
    //     collidedChar.healthLoss(1)
    //   }
    // }


    //water ground
    var waterMesh = BABYLON.MeshBuilder.CreateGround("waterMesh", { height: 256, width: 256, subdivisions: 32 }, this.scene);
    waterMesh.position.y = gr.position.y - 0.1
    var water = new BABYLON.WaterMaterial("water", this.scene, new BABYLON.Vector2(256, 256));
    water.backFaceCulling = true;
    water.bumpTexture = new BABYLON.Texture("textures/waterbump.png", this.scene);
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

    light1 = new BABYLON.PointLight("spotLight1", new BABYLON.Vector3(0, 10, 0), this.scene);
    light1.emissive = new BABYLON.Color3(0, 0, 0);
    light1.specular = new BABYLON.Color3(0.2, 0.2, 0.2);

    light1.diffuse = new BABYLON.Color3(0.8, 0.8, 0.8);
    light1.intensity = 3

    shadowGenerator = new BABYLON.ShadowGenerator(128, light1)
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurScale = 1;
    shadowGenerator.setDarkness(0.1);

    shadowGenerator.refreshRate = BABYLON.
      RenderTargetTexture.
      REFRESHRATE_RENDER_ONEVERYTWOFRAMES;
  }

  setFog() {
    if (biome[0] != "Snow") return;
    // this.scene.fogMode = BABYLON.this.scene.FOGMODE_EXP;
    //BABYLON.this.scene.FOGMODE_NONE;
    //BABYLON.this.scene.FOGMODE_EXP2;
    this.scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    this.scene.fogColor = new BABYLON.Color3(1, 1, 1);
    this.scene.fogDensity = 0.3;
    this.scene.fogStart = 0.1;
    this.scene.fogEnd = 30.0;
  }


  setBackground() {

    let createSkybox = (name) => {
      let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 512.0 }, this.scene);
      let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(`images/${name}_sky/skybox`, this.scene);
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
    var pipeline = new BABYLON.DefaultRenderingPipeline("default", true, this.scene);

    // Tone mapping
    this.scene.imageProcessingConfiguration.toneMappingEnabled = true;
    this.scene.imageProcessingConfiguration.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;
    this.scene.imageProcessingConfiguration.exposure = 1;

    // Bloom
    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.8;
    pipeline.bloomWeight = 0.3;
    pipeline.bloomKernel = 64;
    pipeline.bloomScale = 0.5;
  }

  setGizmo() {
    var gizmoManager = new BABYLON.GizmoManager(this.scene);
    gizmoManager.positionGizmoEnabled = true;
    gizmoManager.rotationGizmoEnabled = true;
    gizmoManager.scaleGizmoEnabled = true;
    gizmoManager.boundingBoxGizmoEnabled = true;
  }

}

console.log("THIS IS A TEXT");

window.addEventListener('load', () => {
  new Scene()
  window.scene = scene
  window.pointerLock = pointerLock
});