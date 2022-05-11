const BIOMES = ["Earth", "Sand", "Snow"]
var biome;
const level_map = [
    new Level({
        level:
            [
                "-----------------------------------------",
                "----t------------------------------------",
                "--------------------------------t--------",
                "-----------------------------------------",
                "------------P-c-C------r-----------------",
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
                "------------t--------m-------------------",
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
                "W---W------W--------W---------------------W",
                "W---W--c---W--------W----------WWWWW------W",
                "W---WwwwWWWW--------W----------W---W------W",
                "W---W-----------WWWWW--WWWWWWWWW---W------W",
                "W---W--------------------------W----------W",
                "W---WWWWWWW--------------------W----------W",
                "W----------------------W-------W----------W",
                "W----------------------W-------W---WWWWWWWW",
                "W-------WWWWWWWWWW-----W-------W----------W",
                "W----------------WW----WWWWWW--WWWWWW-----W",
                "WWWWWW------t-----W----W-------W----WW----W",
                "W-----------------W------------W----------W",
                "W-----------------W------------W----WWWWWWW",
                "W--WWWWWWWW----WWWWWWWWWWWW----W---WW-----W",
                "W------------------------------W----------W",
                "W------------------------------W------WWWWW",
                "W-------------------------W----W------W---W",
                "WWWWWWWWWWWWW---WWWWWWWWWWW----W------W---W",
                "W--------------------W--c-W----W------W---W",
                "W--------------------W----W----W----------W",
                "W---W------WWWWWWWWWWWWWwwW---------------W",
                "W-P-W------W--------------W--C-----WWW----W",
                "W---W----WWW--------------W----W-----W----W",
                "W---W----W------W---------W----W-----W----W",
                "W---W-----------W---------W----W-----W----W",
                "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
            ],
        minHeightMap: -0.1,
        lvlObjective: levelObjectives.getAllBonuses,
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
                "-----------------------------------------",
                "-----------------------------------------",
                "-----t-----------------------------------",
                "-----------------------------------------",
                "mm--------------#---------------t--------",
            ],
        minHeightMap: -0.1,
        lvlObjective: levelObjectives.getAllRelicsAndTanks,
        biome: "Sand"
    }),
    new Level({
        level:
            [
                "-----------------------------------------",
                "------#----------------------------------",
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
                "-----------------------------------------",
                "--------------------t--------------------",
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
                "-----------N-----------------N-----------",
                "-----------------------------------------",
                "-----------------------------------------",
                "--------------------N--------------------",
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
                "----------------t-----------r------------",
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
                "---------------------R-------------------",
                "-----------------------------------------",
                "-----------------------------------------",
                "-----------------------------------------",
            ],
        minHeightMap: -1,
        lvlObjective: levelObjectives.killAllTank,
        biome: "Snow"
    }),
]
/** @type{Level} */
let current_level_dico = level_map[0]

/**
 * @param {number} lvl_number 
 */
function draw_level_map(progress) {
    setCurrentLevelDico()

    setCurrentBiome()

    setCurrentMusic()

    let widthOffset = (cell_x_number - current_level.length) / 2
    let heightOffset = (cell_y_number - current_level[0].length) / 2

    document.getElementById("level").innerHTML = (level + 1) + "/" + level_map.length

    if (level == 0 && progress) {
        if (char1) char1.dispose(true);
        char1 = new Char("player", 0, 0, 0, 3, 800 * reloadMultUti, 40);
        selected_bonuses = []
        addedObtainableBonus = []
    }

    camera.position =
        char1.position
            .add(new BABYLON.Vector3(40, 5, 40))


    char1.dust.updateColor()

    let setPlayerPosition = () => {
        for (var [l_index, line] of current_level.entries()) {
            for (var [ch_index, ch] of line.split('').entries()) {
                if (ch == "P") {
                    var posX = (ch_index + 1) * cell_size + widthOffset;
                    var posY = (current_level.length - l_index) * cell_size + heightOffset;
                    char1.shape.position = new BABYLON.Vector3(-width / 2 + posX, Char.height / 2 + 1
                        , -height / 2 + posY)
                    // char1 = new Char(ObjectEnum.Player, posX, posY, 0, 3 * speedMultUti, 800 * reloadMultUti, 40);
                    chars.push(char1);
                    // camera.target = char1.getTurretTank();
                    char1.shape.rotate(BABYLON.Axis.Y, Math.PI / 2)
                    // camera.alpha -= Math.PI / 2
                    char1.restoreHealth()
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
                    var char = new Char("mini", posX, posY, 0, 1, 1000, 45, 2, 1, 3, 3);
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
                    break;
                case '@':
                    var char = new Char("boss", posX, posY, 0, 1, 2000, 30, 2, 2, 50, 5);
                    charsAI.push(char);
                    char.setStrategy(new guaranteedAI(char))
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

    tanksAIReady = true;

    // Creation de l'enceinte 
    // walls.push(new WallPerimeter(-width / 2, 0.5, 1, height + 2))
    // walls.push(new WallPerimeter(width / 2 + 1, 0.5, 1, height + 2))
    // walls.push(new WallPerimeter(0.5, height / 2 + 1, width, 1))
    // walls.push(new WallPerimeter(0.5, -height / 2, width, 1))
    delimiters.push(new DelimiterMesh(-width / 2, 0.5, 2, height + 2))
    delimiters.push(new DelimiterMesh(width / 2 + 1, 0.5, 2, height + 2))
    delimiters.push(new DelimiterMesh(0.5, height / 2 + 2, width, 2))
    delimiters.push(new DelimiterMesh(0.5, -height / 2, width, 2))

    if (current_level_dico.lvlObjective == levelObjectives.batteryKillTanks) {
        charsAI.forEach(c => {
            let d = new dome(c, true)
            d.addToChar()
            d.use()
        })
    }
}

function setCurrentLevelDico() {
    current_level_dico = level_map[level]
    chronoLvl = (current_level_dico.lvlObjective == levelObjectives.chronoMission ? new Chrono(50000) : null)

    level_map.forEach(e => e.resetValues())
    if (current_level_dico) {
        current_level = current_level_dico.level;
        cell_x_number = current_level_dico.level.length;
        cell_y_number = current_level_dico.level[0].length;

        height = cell_x_number * cell_size;
        width = cell_y_number * cell_size;

        // current_level_dico.resetValues()
    }

    if ((level == 0 || current_level_dico.biome != level_map[level - 1].biome) && globalProgress) {
        scene.menu.toDisplayScenario = true;
        if (level != 0) scene.menu.show(false)
    } else {
        document.getElementsByClassName('full-screen')[0].classList.add('hide')
    }

    document.getElementsByClassName('level')[level].classList.remove('blocked')


    if (level > 0) {
        document.getElementsByClassName('level')[level - 1].classList.add('done')
    }
}

function setCurrentBiome() {
    biome = current_level_dico.biome;
    document.getElementById("minimap").style.backgroundImage = `url('textures/${biome.toLowerCase()}y_minimap.png')`;
    listGrounds.forEach(g => {
        g.position.y = -10
        g.receiveShadows = false
        g.isVisible = false
        g.checkCollision = false
        if (g.physicsImpostor) g.physicsImpostor.dispose()
    })
    let currentGround = listGrounds[BIOMES.indexOf(biome)]
    currentGround.position.y = 0
    currentGround.receiveShadows = true
    currentGround.isVisible = true
    currentGround.checkCollision = true
    currentGround.physicsImpostor = new BABYLON.PhysicsImpostor(
        currentGround,
        BABYLON.PhysicsImpostor.HeightmapImpostor,
        { mass: 0 },
        scene
    )

    listSkyboxes.forEach(s => {
        s.isVisible = false
    })
    listSkyboxes[biome == "Sand" ? 1 : 0].isVisible = true
}

function setCurrentMusic() {
    // if (level == 0) return
    biome = current_level_dico.biome;
    musicBackground.pause()
    if (biome == "Earth") {
        musicBackground = new Audio('audio/warmusic-cut.mp3')
        musicBackground.volume = 0.2
    }
    if (biome == "Sand") {
        musicBackground = new Audio('audio/Ibn-Al-Noor.mp3')
        musicBackground.volume = 0.2
    }
    if (biome == "Snow") {
        musicBackground = new Audio('audio/GoT.mp3')
        musicBackground.volume = 0.25
    }
    musicBackground.loop = true
    musicBackground.play()
}