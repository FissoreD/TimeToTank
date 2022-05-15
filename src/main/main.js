
import { scene, engine, canvas, sceneBab } from "../babylon_start/scene.js";
import { level_map, draw_level_map } from "../levels/levels.js";
import { MiniMap } from "../tools/minimap.js";
import { barrels, batteries, delimiters, chars, charsAI, charsAllies, charsDestroyed, bullets, grenades, bonuses, walls, trees, inputStates, rocks, houses, relics } from "./global_vars.js";
import { reloadMultUti } from "./global_vars.js";
import { createSmoke, playSmoke, stopSmoke, createFire } from "../babylon_start/particles.js";


export var playing;

export let sceneInterval;
export var canTire = true;
// INITIALISATION
export function keyListener(evt, isPressed) {
    // tirer
    if (evt.code === "Space") {
        if (!document.getElementById('intro').classList.contains('hide')) {
            scene.menu.show(false);
            scene.menu.displayIntro(false);
            pointerLock()
        }
        else if (isPressed && scene.menu.displayScenario(false)) { }
        else inputStates.mouseclick = isPressed;
    }
    // tourelle
    else if (evt.code === "KeyA") {
        inputStates.rot_minus = isPressed;
    } else if (evt.code === "KeyD") {
        inputStates.rot_plus = isPressed;
    }
    // ??
    else if (evt.code === "KeyW") {
        if (!isPressed) scene.char1.stabilizeTank()
        else if (!inputStates.foreward) scene.char1.stabilizeTank(false)
        inputStates.foreward = isPressed;
    } else if (evt.code === "KeyS") {
        if (!isPressed) scene.char1.stabilizeTank()
        else if (!inputStates.backward) scene.char1.stabilizeTank(false)
        inputStates.backward = isPressed;
    }
    // POUR S'ENFLAMER
    else if (evt.code === "KeyL") {
        inputStates.keyL = isPressed;
    }
    // POUR S'ENFLAMER
    else if (evt.code === "KeyX") {
        inputStates.keyX = isPressed;
    }
    // rotation 
    else if (evt.keyCode == 37) {
        inputStates.keyA = isPressed;
    } else if (evt.keyCode == 39) {
        inputStates.keyD = isPressed;
    }
    // deplacement du char
    else if (evt.keyCode == 38) {
        // turret up
        inputStates.turretUp = isPressed;
    } else if (evt.keyCode == 40) {
        // turret down
        inputStates.turretDown = isPressed;
    } else if (evt.code == "KeyQ" && canTire) {
        canTire = false
        let length = 1000;
        let ray = new BABYLON.Ray(new BABYLON.Vector3(
            scene.char1.shape.position.x + scene.char1.getTurretTank().getDirection(BABYLON.Axis.Z).x * 10,
            scene.char1.shape.position.y + 3 / 40,
            scene.char1.shape.position.z + scene.char1.getTurretTank().getDirection(BABYLON.Axis.X).x * 10), scene.char1.getTurretTank().getDirection(BABYLON.Axis.Z), length);

        setTimeout(() => canTire = true, 300);
        let pickInfo = sceneBab.pickWithRay(ray, (mesh) => {
            return mesh;
        });
        if (pickInfo.pickedMesh) {
            let bounder = pickInfo.pickedMesh;
        }

        // let rayHelper = new BABYLON.RayHelper(ray);
        // rayHelper.show(scene, new BABYLON.Color3(1, 0, 0));
        // setTimeout(() => {
        //     rayHelper.dispose(ray);
        // }, 200);
    } else if (isPressed) {
        scene.char1.specialBonuses.forEach(sp => sp.applyListener(evt));
    }
    // else if (evt.code === "KeyP") {
    //     if (isPressed && scene.menu.canBeSwitched) {
    //         scene.menu.show(!scene.menu.isShown)
    //         scene.menu.canBeSwitched = false
    //     }
    //     if (!isPressed) {
    //         scene.menu.canBeSwitched = true
    //     }
    //     if (!scene.menu.isShown) canvas.requestPointerLock();
    // }
}

export function stabilizeIfNotMoving() {

}

export function keyApplaier() {


    var speed_angle = 0.05;

    if (scene.char1 == undefined || typeof scene.char1.shape === 'undefined' || scene.menu.isInMenu() || scene.char1.health <= 0) return;

    // On regarde si on doit poser une mine
    // if (inputStates.SPACE) {
    //     scene.char1.addMine(Date.now());
    // }
    // On regarde si on doit tirer
    if (inputStates.mouseclick) {
        scene.char1.addBullet(Date.now());
    }

    if (inputStates.turretUp) {
        scene.char1.rotateTurretUpDown(true);
    }

    if (inputStates.turretDown) {
        scene.char1.rotateTurretUpDown(false);
    }

    // TOURNER LE TANK
    if (inputStates.rot_minus && !inputStates.rot_plus && !scene.char1.bullForce) {
        scene.char1.rotateTurretAxisY(-speed_angle)
        // camera.alpha = -scene.char1.getTurretTank().rotationQuaternion.toEulerAngles().y - Math.PI / 2 - scene.char1.shape.rotationQuaternion.toEulerAngles().y
        scene.char1.rotateAxisY(-speed_angle)

    }
    if (inputStates.rot_plus && !inputStates.rot_minus && !scene.char1.bullForce) {
        scene.char1.rotateTurretAxisY(speed_angle)
        // camera.alpha = -scene.char1.getTurretTank().rotationQuaternion.toEulerAngles().y - Math.PI / 2 - scene.char1.shape.rotationQuaternion.toEulerAngles().y
        scene.char1.rotateAxisY(speed_angle)
    }
    // TOUNER LA TOURELLE
    if (inputStates.keyA) {
        scene.char1.rotateTurretAxisY(-speed_angle)
        // camera.alpha = -scene.char1.getTurretTank().rotationQuaternion.toEulerAngles().y - Math.PI / 2 - scene.char1.shape.rotationQuaternion.toEulerAngles().y

    }
    if (inputStates.keyD) {
        scene.char1.rotateTurretAxisY(speed_angle)
        // camera.alpha = -scene.char1.getTurretTank().rotationQuaternion.toEulerAngles().y - Math.PI / 2 - scene.char1.shape.rotationQuaternion.toEulerAngles().y
    }
    // DEPLACEMENT
    if (inputStates.foreward) {
        scene.char1.moveTankForeward();
        return;
    }
    if (inputStates.backward) {
        scene.char1.moveTankBackward();
        return;
    }
    // destroy
    if (inputStates.keyX) {
        scene.char1.destroyTank(true)

    }
    // destroy
    if (inputStates.keyL) {
        //smoke()
        var smok = createSmoke(scene.char1.shape)
        playSmoke(smok)
        createFire(scene.char1.shape);
    }
}

export function init() {

    scene.minimap = new MiniMap()

    window.onresize()

    // canvas = document.querySelector("#myCanvas");

    playing = 0;

    // musicBackground.play()
    // musicBackground.loop = true


    // level = 0;

    // canvas.addEventListener('mousemove', (evt) => {
    //     mousepos = getMousePos(canvas, evt);
    // }, false);

    // scene.onPointerMove = function (evt) {
    //     mousepos = getMousePos(scene, evt);
    // }, false;

    // window.addEventListener('mousedown', (evt) => {
    //     inputStates.mouseclick = true;
    // });

    // scene.onPointerDown = function (_, _) {
    //     inputStates.mouseclick = true;
    // }, false;

    // scene.onPointerUp = function (_, _0) {
    //     inputStates.mouseclick = false
    // }, false;

    // window.addEventListener('mouseup', (evt) => {
    //     inputStates.mouseclick = false;
    // });

    window.addEventListener('keydown', (evt) => {
        keyListener(evt, true)
    });

    window.addEventListener('keyup', (evt) => {
        keyListener(evt, false)
    });

    canvas.requestPointerLock = canvas.requestPointerLock ||
        canvas.mozRequestPointerLock ||
        canvas.webkitPointerLockElement;

    //turret direction is responding to cursor movements
    window.addEventListener("mousemove", (evt) => {
        if (scene.menu.isInMenu()) return
        if (evt.movementX > 0) scene.char1.rotateTurretAxisY(Math.sqrt(evt.movementX) / 200)
        else if (evt.movementX < 0) scene.char1.rotateTurretAxisY(- (Math.sqrt(Math.abs(evt.movementX)) / 200))
        if (evt.movementY > 0) scene.char1.rotateTurretUpDown(false, Math.min(Math.sqrt(evt.movementY), 4))
        else if (evt.movementY < 0) scene.char1.rotateTurretUpDown(true, Math.min(Math.sqrt(Math.abs(evt.movementY)), 4))
    });

    canvas.onpointerdown = function () {
        if (!scene.menu.isShown && !scene.menu.inOtherMenu() && !isLocked() && !(scene.pointerLockChange != null && Date.now() - scene.pointerLockChange < 1400)) pointerLock();
        else if (isLocked() && engine.activeRenderLoops.length == 1) {
            if (sceneInterval) clearInterval(sceneInterval);
            sceneInterval = setInterval(() => {
                scene.char1.addBullet()
            }, 10);
        }
    }

    canvas.onmouseup = () => {
        clearInterval(sceneInterval);
    }


    function lockChangeAlert() {
        if (!isLocked()) {
            if (!scene.menu.inOtherMenu()) {
                scene.menu.show(true)
            }
            if (sceneInterval) clearInterval(sceneInterval)
        }
    }


    document.addEventListener('pointerlockchange', lockChangeAlert, false);

    // My part
    startgame(scene.level)
    anime();
}

//GAME OVER GO TO MENU

export function stopgame() {
    pausebackgroundMusic();
    playing = 0;
}

//DEBUT D'UNE NOUVELLE PARTIE

export function startgame(level, progress = true) {

    playing = 1;

    barrels.length = 0;
    batteries.length = 0;
    walls.length = 0;
    delimiters.length = 0;
    chars.length = 0;
    charsAI.length = 0;
    charsAllies.length = 0;
    charsDestroyed.length = 0;

    //BULLETS AND GRENADES INIT
    bullets.length = 0;
    grenades.length = 0;

    bonuses.length = 0;

    console.log(level, level_map);
    if (level < level_map.length) {
        draw_level_map(progress)
    }

    // TOP, BOTTOM, RIGHT, LEFT WALLS - ALWAYS HERE NO MATTER THE LEVEL
    // for (var i = 0; i <= cell_x_number; i++) {
    //     //top wall
    //     walls.push(new Wall(i * Wall.width, 0, false));
    //     //bottom wall
    //     walls.push(new Wall(i * Wall.width, cell_y_number * Wall.depth, false));
    // }

    // for (var i = 1; i < cell_y_number; i++) {
    //     //left wall
    //     walls.push(new Wall(0, i * Wall.width, false));
    //     //right wall
    //     walls.push(new Wall(cell_x_number * Wall.depth, i * Wall.width, false));
    // }
}

//BACKGROUND MUSIC

export function playBackgroundMusic() {
    let audioPlayer = document.querySelector("#audioPlayer");
    audioPlayer.loop = true;
    audioPlayer.play();
}

export function pausebackgroundMusic() {
    let audioPlayer = document.querySelector("#audioPlayer");
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
}

export function remove_all_objects(withPlayer = false, progress = true) {
    scene.blockfreeActiveMeshesAndRenderingGroups = true;
    let allElts = getAllMeshList(withPlayer)
    if (level == 0 && progress) allElts.push(scene.char1)

    allElts.forEach(e => e.dispose(true))
    walls.length = 0;
    barrels.length = 0;
    batteries.length = 0;
    bullets.length = 0;
    grenades.length = 0;
    chars.length = 0;
    charsAI.length = 0;
    charsAllies.length = 0;
    charsDestroyed.length = 0;
    bonuses.length = 0;
    trees.length = 0;
    rocks.length = 0;
    houses.length = 0;
    delimiters.length = 0;
    relics.length = 0;

    scene.blockfreeActiveMeshesAndRenderingGroups = false;
}


export function getAllMeshList(withPlayer = false) {
    return [...walls, ...barrels, ...batteries, ...bullets, ...grenades, ...bonuses, ...trees, ...rocks, ...houses, ...delimiters, ...relics, ...charsAI, ...charsAllies, ...charsDestroyed].concat(withPlayer ? [scene.char1] : [])
}

//ANIMATION

export function anime() {

    playing = 1;
    //MENU
    if (playing == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "50px Arial";
        if (scene.level >= 0) ctx.fillText('You reached level : ' + Math.min((scene.level + 1), 5), 250, 200);
        ctx.fillText('Click the MOUSE or SPACE to start', 100, 350);
        if (inputStates.mouseclick || inputStates.SPACE) {
            scene.level = 0;
            playBackgroundMusic();
            startgame(scene.level);
            inputStates.mouseclick = false;
            inputStates.SPACE = false;
        }
    }

    //CONGRATULATIONS
    if (playing == 2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "50px Arial";
        ctx.fillText('You have beaten level : ' + scene.level, 240, 100);
        ctx.fillText('Congratulations, you defeated the game!', 70, 200);
        ctx.fillText('Press SPACE', 340, 400);
        ctx.fillText('to go back to main menu', 250, 500);
        if (inputStates.SPACE) {
            playing = 0;
            inputStates.SPACE = false;
        }
    }

    keyApplaier();

    //window.requestAnimationFrame(anime);
}

export var inputVitMult = document.getElementById("mutlvit")
if (inputVitMult !== null) inputVitMult.oninput = function () { changeVitesseChar(inputVitMult.value) };

export var inputReloadMult = document.getElementById("multReload")
if (inputReloadMult !== null) inputReloadMult.oninput = function () { changeCadenceTir(inputReloadMult.value) };

export function changeCadenceTir(value) {
    reloadMultUti[0] = value;
}

export let isLocked = () => document.pointerLockElement === canvas ||
    document.mozPointerLockElement === canvas

export let exitPointerLoc = () => {
    if (scene) {
        scene.pointerLockChange = Date.now()
        document.exitPointerLock();
    }
}
export let pointerLock = () => {
    if (scene) {
        scene.pointerLockChange = Date.now()
        canvas.requestPointerLock();
    }
}
export let runRenderLoop = () => {
    if (scene) {
        if (engine.activeRenderLoops.length == 0) engine.runRenderLoop(() => scene.render())
    }
}