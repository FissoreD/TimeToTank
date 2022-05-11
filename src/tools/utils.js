
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
let filter;
function createRay(origin, dir, length, affiche = false, disposeTime = 5, returnPointInpact = false, exclude = undefined, canPickInvisible = false, toReverse = false) {
    let ray = new BABYLON.Ray(origin, dir, length);

    let pickInfo
    if (canPickInvisible) pickInfo = scene.multiPickWithRay(ray, (m) => { return m.isPickable });
    else pickInfo = scene.multiPickWithRay(ray);

    let rayHelper;

    if (affiche) {
        rayHelper = new BABYLON.RayHelper(ray);
        rayHelper.show(scene, new BABYLON.Color4(1, 0, 0, 0.5));
        setTimeout(() => {
            rayHelper.dispose(ray);
        }, disposeTime);
    }
    filter = (pickInfo.filter(e => e != rayHelper && e != exclude))

    let index = toReverse ? filter.length - 1 : 0

    // if (filter.length > 0) {console.log("--------------start--------------");}
    // filter.forEach(e => console.log(e.pickedMesh.id))
    return filter.length > 0 ? (returnPointInpact ? [filter[index].pickedPoint, filter[index].pickedMesh] : filter[index].pickedMesh) : undefined
}

function createRayPoint(origin, dir, length) {
    let ray = new BABYLON.Ray(origin, dir, length);

    let pickInfo = scene.pickWithRay(ray, (mesh) => {
        return mesh;
    });

    return pickInfo.pickedPoint
}

function playSoundWithDistanceEffect(sound, mesh, pauseSound = true, play = true) {
    //son et ses réglages
    if (pauseSound) {
        sound.pause();
        sound.currentTime = 0;
    }
    let posChar1 = char1.shape.position
    let posc = mesh.position
    let distanceToChar1 = Math.max(0, Math.sqrt((posc.x - posChar1.x) ** 2 + (posc.y - posChar1.y) ** 2 + (posc.z - posChar1.z) ** 2) - 2)
    sound.volume = sound.volume / (Math.max(1, distanceToChar1) ** 0.3)
    if (play) sound.play();
}

var remove = (list, elt) => {
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
        char1.shape.getChildMeshes().forEach(e => { if (e.material) e.material.emissiveColor = new BABYLON.Color3(value, value, value) })
    });
    gui.add(options, "Diffuse", 0, 1).onChange(function (value) {
        char1.shape.getChildMeshes().forEach(e => { if (e.material) e.material.diffuseColor = new BABYLON.Color3(value, value, value) })
    });
    gui.add(options, "Specular", 0, 1).onChange(function (value) {
        char1.shape.getChildMeshes().forEach(e => { if (e.material) e.material.specularColor = new BABYLON.Color3(value, value, value) })
    });
    gui.add(options, "Ambient", 0, 1).onChange(function (value) {
        char1.shape.getChildMeshes().forEach(e => { if (e.material) e.material.ambientColor = new BABYLON.Color3(value, value, value) })
    });

    // myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
    // myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    // myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    // myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
}