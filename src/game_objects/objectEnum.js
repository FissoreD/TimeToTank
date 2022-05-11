

class ObjectEnum {
  // Create new instances of the same class as static attributes

  //Element of decor
  static Barrel = new ObjectEnum("barrel", "barrel", 0.65, 0.375, 0.6, 0.375)
  static WallD = new ObjectEnum(wallDTexture.src, "")
  static Wall = new ObjectEnum(wallTexture.src, "")
  static SpecialBonus = new ObjectEnum("special_bonus", "military_box", 0.60, 1.15, 0.4, 0.6)
  static Battery = new ObjectEnum("battery", "battery", 0.9, 0.375, 0.6, 0.375)

  //Player
  static Player = new ObjectEnum("player", "modern_tank", 0.25, 1.1, 0.625, 1.85)
  static Bonus = new ObjectEnum("bonus", "box", 0.008, 0.4, 0.4, 0.4)
  static Bullet = new ObjectEnum(bulletImage.src, "")
  static GrenadeObj = new ObjectEnum(bulletImage.src, "")

  //Opponent Tanks
  static MiniTank = new ObjectEnum("miniTank", "mini_tank", 0.25, 0.625, 0.625, 0.625)
  static EarthTank = new ObjectEnum("earthTank", "tiger_tank", 0.25, 0.95, 0.625, 1.75)
  static SandTank = new ObjectEnum("sandTank", "desert_tank", 0.5, 0.95, 0.625, 1.85)
  static SnowTank = new ObjectEnum("snowTank", "battle_tank", 0.2, 0.95, 0.625, 1.75)
  static BossTank = new ObjectEnum("boss_tank", "boss_tank", 0.5, 1.9 ,1.3, 3.7)

  //Earthy Biome items
  static Rock = new ObjectEnum("rock", "rock", 0.5, 0.95, 0.7, 0.7)
  static PalmTree1 = new ObjectEnum("ground_palm", "ground_palm", 1, 0.8, 1, 0.8)
  static PalmTree2 = new ObjectEnum("merged_palm_tree", "merged_palm_tree", 0.4, 0.8, 1, 0.8)
  static PalmTree3 = new ObjectEnum("coconut_tree", "coconut_tree", 0.02, 0.8, 1, 0.8)
  static EarthyHouse = new ObjectEnum("ww2_house", "ww2_house", 0.75, 2, 2, 2)

  //Sandy Biome items
  static Cactus1 = new ObjectEnum("cactus1", "cactus1", 0.5, 0.8, 1, 0.8)
  static Cactus2 = new ObjectEnum("cactus2", "cactus2", 0.2, 0.8, 1, 0.8)
  static DesertRock = new ObjectEnum("desert_rock", "desert_rock", 0.5, 0.8, 0.8, 0.8)
  static Tumbleweed = new ObjectEnum("tumbleweed", "tumbleweed", 1, 0.4, 0.4, 0.4)
  static DesertHouse = new ObjectEnum("desert_house", "desert_house", 0.5, 2, 2, 2)
  
  //Egyptian Relics
  static CatRelic = new ObjectEnum("egyptian_cat", "egyptian_cat", 0.5, 0.6, 0.8, 0.6)
  static JackalRelic = new ObjectEnum("egyptian_jackal", "egyptian_jackal", 0.5, 0.7, 1, 0.7)
  static MoonRelic = new ObjectEnum("egyptian_moon", "egyptian_moon", 0.75, 0.6, 0.8, 0.6)


  //Snowy Biome items
  static SnowyTree = new ObjectEnum("snowy_tree", "snowy_tree", 0.025, 0.8, 1, 0.8)
  static SnowyFir = new ObjectEnum("snowy_fir", "snowy_fir", 0.5, 0.8, 1, 0.8)
  static SnowyRock = new ObjectEnum("snowy_rock", "snowy_rock", 0.15, 0.5, 0.4, 0.5)
  static SnowyHut = new ObjectEnum("wintercabin", "wintercabin", 0.01, 3, 2, 2)


  /** @type {BABYLON.Mesh}*/
  container;
  remainingLoad;

  constructor(name, babylon_model, resize, width, height, depth) {
    this.name = name
    this.babylon_model = babylon_model;
    this.resize = resize
    this.width = width;
    this.height = height;
    this.depth = depth;
  }
  create_model() {
    let name = this.babylon_model
    if (name == "") { ObjectEnum.loadingDone(); return; }

    BABYLON.SceneLoader.ImportMesh("", "models/" + name + "/", name + ".obj", scene, (meshes) => {
      this.callback(meshes, this.babylon_model)
    })

  }

  callback(meshes, model) {

    this.meshes = [...meshes];

    this.meshes.forEach(x => {
      x.scaling = new BABYLON.Vector3(this.resize, this.resize, this.resize)
      if (model == "desert_house") {
        x.material.transparencyMode = 1;
        x.material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5)
      } else if (model == "snowy_fir") {
        x.material.transparencyMode = 1;
      } else if (model == "ww2_house") {
        x.material.specularColor = new BABYLON.Color3(0, 0, 0)
      } else if (model == "egyptian_cat" || model == "egyptian_jackal" || model == "egyptian_moon"){
        x.material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5)
      }
      //x.forceSharedVertices();
      // x.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY
    })

    if (model == "sand_tank") {
      [this.meshes[0], this.meshes[3]] = [this.meshes[3], this.meshes[0]];
    } else if (model == "boss_tank") {
      [this.meshes[0], this.meshes[2]] = [this.meshes[2], this.meshes[0]];
    }

    

    // Parent mesh (the original which we will duplicate to create our objects)
    if (model == "tumbleweed") {
      this.container = BABYLON.MeshBuilder.CreateSphere("model_container", { diameter: 0.50 }, scene);
    } else if (model == "cactus1" || model == "barrel" || model == "battery" || model == "snowy_tree" || model == "snowy_fir" || model == "merged_palm_tree" || model == "coconut_tree") {
      this.container = BABYLON.MeshBuilder.CreateCylinder("model_container", { height: this.height, diameter: 0.37 }, scene);
    } else {
      this.container = BABYLON.MeshBuilder.CreateBox("model_container", { height: this.height, width: this.width, depth: this.depth }, scene);
    }
    // this.container = BABYLON.MeshBuilder.CreateBox("container", { height: this.height, width: this.width, depth: this.depth }, scene);
    this.container.position.y += this.height / 2;
    this.meshes.forEach(e => this.container.addChild(e));

    // Hiding of the mesh
    // this.container.visibility = 1;
    this.container.visibility = false;
    // this.container.showBoundingBox = true;
    this.meshes.forEach(e => e.visibility = false)

    ObjectEnum.loadingDone();
  }

  static initiate_all_models() {
    var list_obj = [
      this.Bullet, this.SnowTank, this.EarthTank, this.SandTank, this.MiniTank, this.BossTank,
      this.Barrel, this.Battery, this.Player, this.Wall, this.WallD, this.Bonus, this.SpecialBonus,
      this.Rock, this.PalmTree1, this.PalmTree2,
      this.PalmTree3, this.EarthyHouse, this.Cactus1, this.Cactus2, this.DesertRock,
      this.Tumbleweed, this.DesertHouse, this.SnowyTree, this.SnowyFir, this.SnowyRock, this.SnowyHut,
      this.CatRelic, this.JackalRelic, this.MoonRelic
    ]
    this.remainingLoad = list_obj.length + 1 // + 1 for earthy ground
    this.globalLen = this.remainingLoad;
    list_obj.forEach(e => e.create_model())

  }

  static loadingDone() {
    this.remainingLoad--;
    let done = this.globalLen - this.remainingLoad;
    let stat = Math.round(done / this.globalLen * 100 * 100) / 100 + "%";
    let bar = document.getElementsByClassName('loadingBarChild')[0];
    bar.style.width = stat;
    bar.innerHTML = stat;
    if (this.remainingLoad == 0) {
      setTimeout(() => {
        document.getElementsByClassName('loadingBarChild')[0].innerHTML = "Loading Done - Game Will Start Soon";
        setTimeout(() => {
          document.getElementsByClassName('loadingBarMain')[0].classList.add('hide')
          engine.hideLoadingUI()
          runRenderLoop()
          init()
        }, 1000);
      }, 500);

    }
  }
}