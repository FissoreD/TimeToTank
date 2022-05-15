import { scene } from "../babylon_start/scene.js";
import { Teleport } from "../specialBonus/teleport.js";
import { BullCharge } from "../specialBonus/bullCharge.js";
import { Grenade } from "../specialBonus/grenade.js";
import { Allies } from "../specialBonus/allies.js";
import { crossHair } from "../specialBonus/crossHair.js";
import { MachineGun } from "../specialBonus/machineGun.js";
import { dome } from "../specialBonus/dome.js";
import { MindControl } from "../specialBonus/mindControl.js";
import { SpeedTurbo } from "../specialBonus/speedTurbo.js";

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

export function startingPointRayAhead(tank, dirZ, dirX, coeff = 1) {
    return new BABYLON.Vector3(
        tank.shape.position.x + coeff * dirZ.x,
        tank.shape.position.y + 3 / 40,
        tank.shape.position.z + coeff * dirX.x)
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
let filter;
export function createRay(origin, dir, length, affiche = false, disposeTime = 5, returnPointInpact = false, exclude = undefined, canPickInvisible = false, toReverse = false) {
    let ray = new BABYLON.Ray(origin, dir, length);

    let pickInfo
    if (canPickInvisible) pickInfo = scene.scene.multiPickWithRay(ray, (m) => { return m.isPickable });
    else pickInfo = scene.scene.multiPickWithRay(ray);

    let rayHelper;

    if (affiche) {
        rayHelper = new BABYLON.RayHelper(ray);
        rayHelper.show(scene.scene, new BABYLON.Color4(1, 0, 0, 0.5));
        setTimeout(() => {
            rayHelper.dispose(ray);
        }, disposeTime);
    }
    filter = (pickInfo.filter(e => e != rayHelper && e.pickedMesh.name != exclude))
    // filter.forEach(e => console.log(e.pickedMesh))
    // console.log("done");

    let index = toReverse ? filter.length - 1 : 0

    return filter.length > 0 ? (returnPointInpact ? [filter[index].pickedPoint, filter[index].pickedMesh] : filter[index].pickedMesh) : undefined
}

function createRayPoint(origin, dir, length) {
    let ray = new BABYLON.Ray(origin, dir, length);

    let pickInfo = scene.scene.pickWithRay(ray, (mesh) => {
        return mesh;
    });

    return pickInfo.pickedPoint
}

export function playSoundWithDistanceEffect(sound, mesh, pauseSound = true, play = true) {
    //son et ses réglages
    if (pauseSound) {
        sound.pause();
        sound.currentTime = 0;
    }
    let posChar1 = scene.char1.shape.position
    let posc = mesh.position
    let distanceToChar1 = Math.max(0, Math.sqrt((posc.x - posChar1.x) ** 2 + (posc.y - posChar1.y) ** 2 + (posc.z - posChar1.z) ** 2) - 2)
    sound.volume = sound.volume / (Math.max(1, distanceToChar1) ** 0.3)
    if (play) sound.play();
}

export var remove = (list, elt) => {
    var index = list.indexOf(elt)
    if (index !== -1) list.splice(index, 1)
}



function lights() {
    var gui = new dat.GUI();
    gui.domElement.style.marginTop = "100px";
    gui.domElement.id = "datGUI";
    var options = {
        Emissive: 0.3,
        Specular: 0.3,
        Diffuse: 0.3,
        Ambient: 0.3
    }

    gui.add(options, "Emissive", 0, 1).onChange(function (value) {
        scene.char1.shape.getChildMeshes().forEach(e => { if (e.material) e.material.emissiveColor = new BABYLON.Color3(value, value, value) })
    });
    gui.add(options, "Diffuse", 0, 1).onChange(function (value) {
        scene.char1.shape.getChildMeshes().forEach(e => { if (e.material) e.material.diffuseColor = new BABYLON.Color3(value, value, value) })
    });
    gui.add(options, "Specular", 0, 1).onChange(function (value) {
        scene.char1.shape.getChildMeshes().forEach(e => { if (e.material) e.material.specularColor = new BABYLON.Color3(value, value, value) })
    });
    gui.add(options, "Ambient", 0, 1).onChange(function (value) {
        scene.char1.shape.getChildMeshes().forEach(e => { if (e.material) e.material.ambientColor = new BABYLON.Color3(value, value, value) })
    });

    // myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
    // myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    // myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    // myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
}

export function createSpecialBonusList(tank) {
    return [
        new crossHair(tank),
        new MachineGun(tank),
        new dome(tank),
        new SpeedTurbo(tank),
        new MindControl(tank),
        new Teleport(tank),
        new BullCharge(tank),
        new Grenade(tank),
        new Allies(tank),
    ].filter(e => !tank.specialBonuses.map(e => e.name).includes(e.name));
}