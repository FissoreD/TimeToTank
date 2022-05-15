import { shadowGenerator, scene, light1, listGrounds, listSkyboxes } from "../babylon_start/scene.js";
import { Level } from "./level.js";
import { levelObjectives } from "./levelObjectives.js";
import { batteries, barrels, chars, cell_size, globalProgress, musicBackground, reloadMultUti, selected_bonuses, addedObtainableBonus, trees, bonuses, houses, rocks, relics, walls, charsAI, delimiters } from "../main/global_vars.js";
import { Barrel } from "../game_objects/barrel.js";
import { Char } from "../game_objects/char.js";
import { Wall } from "../game_objects/wall.js";
import { Battery } from "../game_objects/battery.js";
import { CharBoss } from "../game_objects/charBoss.js";
import { Bonus } from "../game_objects/bonus.js";
import { Tree } from "../game_objects/tree.js";
import { Rock } from "../game_objects/rock.js";
import { House } from "../game_objects/house.js";
import { Relic } from "../game_objects/egyptianRelic.js";
import { guaranteedAI } from "../game_IA/guaranteedAI.js";
import { DelimiterMesh } from "../game_objects/delimiterMesh.js";
import { dome } from "../specialBonus/dome.js";
import { ObjectEnum } from "../game_objects/objectEnum.js";
import { BonusEnum } from "../game_objects/bonusEnum.js";
import { Chrono } from "../tools/chrono.js";

const BIOMES = ["Earth", "Sand", "Snow"]
let current_level;

export var biome = ["Earth"];
export const level_map = [
    new Level({
        level:
            [
                "-----------------------------------------",
                "----t------------------------------------",
                "--------------------------------t--------",
                "-----------------------------------------",
                "------------P----C----r-----------------",
                "-----------------------------------------",
                "---------------------------------------r-",
                "-----------------------------------------",
                "------------------t----------------------",
                "------------t---------------r------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "---------------WWWWWWWWWWWW--------------",
                "--------r--------------------------------",
                "---------------------------------------t-",
                "-----------------------------------------",
                "-----------------t-----------------------",
                "---------------------------R-------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----t------------------------------t----",
                "--------------------------------------t--",
                "-----------------------------------------",
            ],
        minHeightMap: -0.1,
        lvlObjective: levelObjectives.getBonusesAndKillTanks,
        biome: "Earth"
    }),
    new Level({
        level:
            [
                "----------------------------t-----t------",
                "----------------------------r--t--tt-t---",
                "--------------------------------t--t-----",
                "---------t---------------t--------t------",
                "-----------------r-------------------t---",
                "-----------------------------------------",
                "---------------m-----m-------------------",
                "----------------------------------t------",
                "-----t------------------r----------------",
                "-----------------------------------------",
                "----------------------------N------------",
                "-----------------W--W--------------h-----",
                "----------P---------w----t---------------",
                "--------------------w--------------h-----",
                "-----------------W--W----------R---------",
                "------r----------------------------------",
                "------------c----------------------------",
                "-----------------------------------------",
                "-------------------------t---------r-----",
                "-----------t-----------------------------",
                "------------------t----t-----------------",
                "--------------------------------t--------",
                "--t--------------------------------------",
                "------------r----------------------------",
            ],
        minHeightMap: -0.1,
        lvlObjective: levelObjectives.getBonusesAndKillTanks,
        biome: "Earth"
    }),
    new Level({
        level:
            [
                "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
                "W---W----c-W--------W---------------------W",
                "W---W------W--------W---------------------W",
                "W---W------W--------W----------WWWWW------W",
                "W---WwwwWWWW--------W----------W---W------W",
                "W---W-----------WWWWW--WWWWWWWWW-c-W------W",
                "W---W--------------------------W----------W",
                "W---WWWWWWW-------t------------W----------W",
                "W----------------------W-------W----------W",
                "W----------------------W-------W---WWWWWWWW",
                "W-------WWWWWWWWWW-----W-------W----------W",
                "W-----------W----------W-------W----------W",
                "W-----------W----WW----WWWWWW--WWWWWW-----W",
                "WWWWWW------t-----W----W-------W----WW----W",
                "W-----------------W------------W----------W",
                "W-----------------W--------t---W----------W",
                "W-----------------W------------W----WWWWWWW",
                "W--WWWWWWWW----WWWWWWWWWWWW----W---WW-----W",
                "W------------------------------W----------W",
                "W-------t----------------------W------WWWWW",
                "W-------------------------W----W------W---W",
                "WWWWWWWWWWWWW---WWWWWWWWWWW----W------W---W",
                "W--------------------W----w----W------W---W",
                "W--------------------W-c--W----W----------W",
                "W---W------WWWWWWWWWWWWWwwW---------------W",
                "W-P-W------W--------------W-------WWW-----W",
                "W---W----WWW--------------W----W-----W----W",
                "W---W----W------W---------W----W-----W----W",
                "W---W-----------W---------W----W-----W----W",
                "W---W-----------W---------W----W-----W----W",
                "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
            ],
        minHeightMap: -0.1,
        lvlObjective: levelObjectives.labyrinth,
        biome: "Earth",
    }),
    new Level({
        level:
            [
                "----------------------------------------#",
                "----------------------t------------------",
                "---t---------------------------------t---",
                "-----------------------------------------",
                "----------------------------t------------",
                "#----------------------------------------",
                "---------------h-------------------r-----",
                "----------t------------------------------",
                "-----r--------------------t--------------",
                "-----------------------------------------",
                "--------------P-----w------R-------------",
                "-----------------------------------------",
                "--------------------C---t----------------",
                "-----------------------------------------",
                "-----t-----------------------------------",
                "-------------------t-----------------t---",
                "-----------c-----------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "----m---m---m----------------------------",
                "--------#-----------------------t--------",
            ],
        minHeightMap: -0.1,
        lvlObjective: levelObjectives.getAllRelicsAndTanks,
        biome: "Sand"
    }),
    new Level({
        level:
            [
                "-----------------------------------------",
                "------#-----------------c----------------",
                "---------------------------------t-------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-------------h---h---h--h----------------",
                "-----------------------------------------",
                "-----------------------------R-----------",
                "-------------h---h---h---h---------------",
                "-----------------------------------------",
                "--------------------R--------------------",
                "------------------------------------t----",
                "-----t-----------------------------------",
                "-------------WWWWWWWWWWWWW---------------",
                "-----------------------------------------",
                "----------------c-----------------------#",
                "----------P------------------------------",
                "-----------------------------------------",
                "m----------------------------------------",
                "---m---m-m----------t--------------------",
                "#----------------------------------------",
            ],
        minHeightMap: -1,
        lvlObjective: levelObjectives.getAllRelicsAndTanks,
        biome: "Sand"
    }),
    new Level({
        level:
            [
                "-----------------------------------------",
                "-----------------------------------------",
                "----------------------------N------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-------------h---h------h----------------",
                "-----------------------------------------",
                "-----------------------------N-----------",
                "-----------------------------------------",
                "-----------------------------------------",
                "--------------------N--------------N-----",
                "-----------------------------------------",
                "-----------------------------------------",
                "-------------WWWWWWWWWWWWW---------------",
                "-----------------------------------------",
                "----------------c------------------------",
                "----------P------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
            ],
        minHeightMap: -1,
        lvlObjective: levelObjectives.chronoMission,
        biome: "Sand"
    }),
    new Level({
        level:
            [
                "-----------------------------------------",
                "-----------------------------------------",
                "-------m---------------------------------",
                "-------------------t------r--------------",
                "------------P----------------------------",
                "-----------------------C-----------------",
                "---------WWWWWWWWWWW---------------------",
                "------------------------------------b----",
                "---------------------t-------------------",
                "-----------------t------t----------------",
                "----------r-------t--t-------------------",
                "--------------------t--r------t----------",
                "----------t------------------------------",
                "-----------------------------------------",
                "------c---------t-----------r------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-------b----R------------------R---------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
            ],
        minHeightMap: -1,
        lvlObjective: levelObjectives.batteryKillTanks,
        biome: "Snow"
    }),
    new Level({
        level:
            [
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-------------------t------r--------------",
                "------------P-----c----------------------",
                "-----------------------------------------",
                "---------WWWWWWWWWWW---------------------",
                "-----------------------------------------",
                "---------------------t-------------------",
                "-----------------t------t-----R----------",
                "----------r-------t--t-------------------",
                "--------------------t--r------t----------",
                "----------t------------------------------",
                "-----------------------------------------",
                "----------------t-----------r------------",
                "----------b------------------------------",
                "---------------------b-------------------",
                "------------R------------------R---------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "----------------------------------------c",
            ],
        minHeightMap: -1,
        lvlObjective: levelObjectives.batteryKillTanks,
        biome: "Snow"
    }),
    new Level({
        level:
            [
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-------------------t------r--------------",
                "------------P----------------------------",
                "-----------------------------------------",
                "---------WWWWWWWWWWW---------------------",
                "-----------------------------------------",
                "---------------------t-------------------",
                "-----------------t------t----------------",
                "----------r-------t--t-------------------",
                "--------------------t--r------t----------",
                "----------t------------------------------",
                "-----------------------------------------",
                "----------------t-----------r------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "---------------------@-------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
            ],
        minHeightMap: -1,
        lvlObjective: levelObjectives.killBoss,
        biome: "Snow"
    }),
]

/**
 * @param {number} lvl_number 
 */
export function draw_level_map(progress) {
    setCurrentLevelDico()

    setCurrentBiome()

    setCurrentMusic()

    let widthOffset = (scene.cell_x_number - current_level.length) / 2
    let heightOffset = (scene.cell_y_number - current_level[0].length) / 2

    document.getElementById("level").innerHTML = (scene.level + 1) + "/" + level_map.length

    if (scene.level == 0 && progress) {
        if (scene.char1) scene.char1.dispose(true);
        scene.char1 = new Char("player", 0, 0, 0, 3, 800 * reloadMultUti[0], 40);
        selected_bonuses.length = 0
        addedObtainableBonus.length = 0
    }

    scene.camera.position =
        scene.char1.position
            .add(new BABYLON.Vector3(40, 5, 40))


    scene.char1.dust.updateColor()

    let setPlayerPosition = () => {
        for (var [l_index, line] of current_level.entries()) {
            for (var [ch_index, ch] of line.split('').entries()) {
                if (ch == "P") {
                    var posX = (ch_index + 1) * cell_size + widthOffset;
                    var posY = (current_level.length - l_index) * cell_size + heightOffset;
                    scene.char1.shape.position = new BABYLON.Vector3(-scene.width / 2 + posX, Char.height / 2 + 1
                        , -scene.height / 2 + posY)
                    // scene.char1 = new Char(ObjectEnum.Player, posX, posY, 0, 3 * speedMultUti, 800 * reloadMultUti[0], 40);
                    chars.push(scene.char1);
                    // camera.target = scene.char1.getTurretTank();
                    scene.char1.shape.rotate(BABYLON.Axis.Y, Math.PI / 2)
                    // camera.alpha -= Math.PI / 2
                    scene.char1.restoreHealth()
                    return
                }
            }
        }
    }
    setPlayerPosition()
    for (var [l_index, line] of current_level.entries()) {
        for (var [ch_index, ch] of line.split('').entries()) {
            var posX = (ch_index + 1) * cell_size + widthOffset;
            var posY = (current_level.length - l_index) * cell_size + heightOffset;
            switch (ch) {
                case '-':
                    break;
                case 'N':
                    var char = new Char("mini", posX, posY, 0, 1, 2000, 40, 2, 1, 3, 3);
                    charsAI.push(char);
                    char.setStrategy(new guaranteedAI(char))
                    chars.push(char);

                    char.applyStrategy()
                    break;
                case 'R':
                    var char = new Char("normal", posX, posY, 0, 1, 2000, 30);
                    charsAI.push(char);
                    char.setStrategy(new guaranteedAI(char))
                    chars.push(char);

                    char.applyStrategy()
                    break;
                // case 'B':
                //     var char = new Char(ObjectEnum.SnowTank, posX, posY, 0, 2, 10000, 30);
                //     charsAI.push(char);
                //     chars.push(char);
                //     char.setStrategy(new guaranteedAI(char))
                //     char.applyStrategy()
                //     break;
                // case 'G':
                //     var char = new Char(ObjectEnum.EarthTank, posX, posY, 0, 2, 4000, 30);
                //     charsAI.push(char);
                //     chars.push(char);
                //     char.setStrategy(new guaranteedAI(char))
                //     char.applyStrategy()
                //break;
                case '@':
                    var char = new CharBoss("boss", posX, posY, 0, 1, 2000, 30, 2, 1, 30);
                    charsAI.push(char);
                    char.setStrategy(new guaranteedAI(char, true, true))
                    chars.push(char);

                    char.applyStrategy()
                    break;
                case 'W':
                    walls.push(new Wall(posX, posY, false));
                    break;
                case 'w':
                    walls.push(new Wall(posX, posY, true));
                    break;
                case 'c':
                    if (progress) bonuses.push(new Bonus(posX, posY, false));
                    break;
                case 'C':
                    if (progress) bonuses.push(new Bonus(posX, posY, true));
                    break;
                case 'h':
                    barrels.push(new Barrel(posX, posY))
                    break;
                case 't':
                    trees.push(new Tree(posX, posY))
                    break;
                case 'r':
                    rocks.push(new Rock(posX, posY))
                    break;
                case 'b':
                    batteries.push(new Battery(posX, posY))
                    break;
                case 'm':
                    houses.push(new House(posX, posY))
                    break;
                case '#':
                    relics.push(new Relic(posX, posY))
                    break;

            }
        }
    }

    // tanksAIReady = true;

    // Creation de l'enceinte 
    // walls.push(new WallPerimeter(-width / 2, 0.5, 1, height + 2))
    // walls.push(new WallPerimeter(width / 2 + 1, 0.5, 1, height + 2))
    // walls.push(new WallPerimeter(0.5, height / 2 + 1, width, 1))
    // walls.push(new WallPerimeter(0.5, -height / 2, width, 1))
    delimiters.push(new DelimiterMesh(-scene.width / 2, 0.5, 2, scene.height + 2))
    delimiters.push(new DelimiterMesh(scene.width / 2 + 1, 0.5, 2, scene.height + 2))
    delimiters.push(new DelimiterMesh(0.5, scene.height / 2 + 2, scene.width, 2))
    delimiters.push(new DelimiterMesh(0.5, -scene.height / 2, scene.width, 2))

    if (scene.current_level_dico.lvlObjective == levelObjectives.batteryKillTanks) {
        charsAI.forEach(c => {
            let d = new dome(c, true)
            d.addToChar()
            d.use()
        })
    }
}

/** @type{{special_taken_bonuses: SpecialBonus[], normal_taken_bonuses: BonusEnum[], bonuses_onHearth: {[key: string]: BonusEnum[]}}[]} */
export const levelMemory = []
for (let index = 0; index < level_map.length; index++) {
    levelMemory.push({ special_taken_bonuses: [], normal_taken_bonuses: [], bonuses_onHearth: {} })
}

function setCurrentLevelDico() {
    scene.current_level_dico = level_map[scene.level]
    let current_level_dico = scene.current_level_dico;
    scene.chronoLvl = (current_level_dico.lvlObjective == levelObjectives.chronoMission ? new Chrono(50000) : null)

    if (current_level_dico.lvlObjective == levelObjectives.labyrinth) {
        shadowGenerator.getShadowMap().refreshRate = 0;
        light1.autoUpdateExtends = false;
    } else {
        shadowGenerator.getShadowMap().refreshRate = 3;
        light1.autoUpdateExtends = true;
    }

    level_map.forEach(e => e.resetValues())
    if (current_level_dico) {
        current_level = current_level_dico.level;
        scene.cell_x_number = current_level_dico.level.length;
        scene.cell_y_number = current_level_dico.level[0].length;

        scene.height = scene.cell_x_number * cell_size;
        scene.width = scene.cell_y_number * cell_size;

        // current_level_dico.resetValues()
    }


    if ((scene.level == 0 || current_level_dico.biome != level_map[scene.level - 1].biome) && globalProgress[0]) {
        scene.menu.toDisplayScenario = true;
        if (scene.level != 0) scene.menu.show(false)
    } else {
        document.getElementById('storyFullScreen').classList.add('hide')
    }

    document.getElementsByClassName('level')[scene.level].classList.remove('blocked')


    if (scene.level > 0 && !window.fromLevelChooser) {
        document.getElementsByClassName('level')[scene.level - 1].classList.add('done')
        levelMemory[scene.level].normal_taken_bonuses = selected_bonuses.map(e => e);
        levelMemory[scene.level].special_taken_bonuses = scene.char1.specialBonuses.map(e => e);
    }

    if (window.fromLevelChooser && scene.char1) {
        window.fromLevelChooser = false
        scene.char1.dispose()
        scene.char1 = new Char("player", 0, 0, 0, 3, 800 * reloadMultUti[0], 40);
        BonusEnum.bonusEnumList.forEach(e => e.resetCounter())
        document.getElementById('specialBonus').innerHTML = ''
        selected_bonuses.length = 0
        levelMemory[scene.level].normal_taken_bonuses.forEach(e => e.addToChar())
        levelMemory[scene.level].special_taken_bonuses.forEach(e => e.addToChar(scene.char1))
    } else if (!window.fromLevelChooser && scene.char1) {
        levelMemory[scene.level].bonuses_onHearth = {}
    }
}

function setCurrentBiome() {
    biome[0] = scene.current_level_dico.biome;
    document.getElementById("minimap").style.backgroundImage = `url('textures/${biome[0].toLowerCase()}y_minimap.png')`;
    listGrounds.forEach(g => {
        g.position.y = -10
        g.receiveShadows = false
        g.isVisible = false
        g.checkCollision = false
        if (g.physicsImpostor) g.physicsImpostor.dispose()
    })
    let currentGround = listGrounds[BIOMES.indexOf(biome[0])]
    currentGround.position.y = 0
    currentGround.receiveShadows = true
    currentGround.isVisible = true
    currentGround.checkCollision = true
    currentGround.physicsImpostor = new BABYLON.PhysicsImpostor(
        currentGround,
        BABYLON.PhysicsImpostor.HeightmapImpostor,
        { mass: 0 },
        scene.scene
    )

    listSkyboxes.forEach(s => {
        s.isVisible = false
    })
    listSkyboxes[biome == "Sand" ? 1 : 0].isVisible = true
}

function setCurrentMusic() {
    // if (level == 0) return
    biome[0] = scene.current_level_dico.biome;
    musicBackground[0].pause()
    if (biome[0] == "Earth") {
        musicBackground[0] = new Audio('audio/warmusic-cut.mp3')
        musicBackground[0].volume = 0.2
    }
    if (biome[0] == "Sand") {
        musicBackground[0] = new Audio('audio/Ibn-Al-Noor.mp3')
        musicBackground[0].volume = 0.2
    }
    if (biome[0] == "Snow") {
        musicBackground[0] = new Audio('audio/GoT.mp3')
        musicBackground[0].volume = 0.25
    }
    musicBackground[0].loop = true
    musicBackground[0].play()
}