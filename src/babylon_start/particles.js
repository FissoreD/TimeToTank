function explode(emitter) {
    BABYLON.ParticleHelper.CreateAsync("explosion", scene).then((set) => {
        set.systems.forEach(s => {
            s.disposeOnStop = true;
        });

        for (var sys of set.systems) {
            sys.emitter = emitter
            sys.worldOffset = new BABYLON.Vector3(emitter.position.x, emitter.position.y, emitter.position.z);
        }
        set.start();

    });
}

function bulletExplode(position, isExploding, isCanonFire) {
    var isCanonFire = isCanonFire || false;

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("bulletParticles", 200, scene);

    // Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

    // Where the particles come from
    particleSystem.emitter = position;

    // Shape of emission
    if (!isCanonFire) {
        var emitterType = new BABYLON.SphereParticleEmitter();
        emitterType.radius = 0.1;
        emitterType.radiusRange = 0;
        particleSystem.particleEmitterType = emitterType;
    } else {
        let d = char1.getTurretTank().getDirection(BABYLON.Axis.Z);
        let r = 0.02;
        let d1 = new BABYLON.Vector3(d.x + r, d.y + r, d.z + r);
        let d2 = new BABYLON.Vector3(d.x - r, d.y - r, d.z - r);
        particleSystem.createPointEmitter(d1, d2)
    }

    // Colors of all particles
    particleSystem.color1 = isExploding ? new BABYLON.Color4(1, 0, 0, 1) : new BABYLON.Color4(1, 0.5, 0, 1);
    particleSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1);
    particleSystem.colorDead = isExploding ? new BABYLON.Color4(1, 0.5, 0, 1) : isCanonFire ? new BABYLON.Color4(0.5, 0.5, 0.2, 0.5) : new BABYLON.Color4(0.75, 0.75, 0.75, 0.75);

    // Life time of each particle
    particleSystem.minLifeTime = isExploding ? 0.5 : isCanonFire ? 0.5 : 0.2;
    particleSystem.maxLifeTime = isExploding ? 1.9 : isCanonFire ? 1.2 : 1.3;

    // Blend mode : BLENDMODE_ONEONE / BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Angular speed
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = isExploding ? 5 / 40 : isCanonFire ? 3 : 1 / 40;
    particleSystem.maxEmitPower = isExploding ? 15 / 40 : isCanonFire ? 5 : 10 / 40;
    particleSystem.updateSpeed = isExploding ? 0.09 : isCanonFire ? 0.10 : 0.12;

    // Size
    particleSystem.minSize = isExploding ? 5 / 40 : isCanonFire ? 6 / 40 : 2 / 40;
    particleSystem.maxSize = isExploding ? 15 / 40 : isCanonFire ? 10 / 40 : 4 / 40;

    particleSystem.manualEmitCount = isExploding ? 6000 : isCanonFire ? 1000 : 50;
    particleSystem.disposeOnStop = true;

    return particleSystem;
}

function createSmoke(emitter, isRight = false, isMoving = false, permanent = false) {
    const box = BABYLON.MeshBuilder.CreateBox("smokeTank", { size: 0.05 });
    box.parent = emitter
    box.position.z -= 0.95
    box.position.y += 0.1
    box.position.x += isRight ? 0.12 : -0.08
    box.isVisible = false

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", isMoving ? 2000 : 3000);

    // Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/smoke.png");

    // lifetime
    particleSystem.minLifeTime = isMoving ? 0.1 : 2;
    particleSystem.maxLifeTime = isMoving ? 0.2 : 3;

    // Emit rate
    particleSystem.emitRate = isMoving ? 200 : 300;

    // Gravity
    particleSystem.gravity = new BABYLON.Vector3(0.25, isMoving ? 6 : 4, 0);

    // Size gradient
    if (isMoving) {
        particleSystem.addSizeGradient(0, 0.1 / 20, 0.2 / 20);
        particleSystem.addSizeGradient(0.05 / 20, 0.15 / 20, 0.3 / 20);
        particleSystem.addSizeGradient(0.1 / 20, 0.3 / 20, 0.5 / 20);
        particleSystem.addSizeGradient(0.15 / 20, 1 / 20, 1.2 / 20);
    } else {
        particleSystem.addSizeGradient(0, 0.6 / 20, 1 / 20);
        particleSystem.addSizeGradient(0.3 / 20, 1 / 20, 2 / 20);
        particleSystem.addSizeGradient(0.5 / 20, 2 / 20, 3 / 20);
        particleSystem.addSizeGradient(1.0 / 20, 6 / 20, 8 / 20);
    }

    // Color gradient

    if (isMoving) {
        particleSystem.addColorGradient(0, new BABYLON.Color4(0.1, 0.1, 0.1, 0), new BABYLON.Color4(0.2, 0.2, 0.2, 0.5));
        particleSystem.addColorGradient(0.4, new BABYLON.Color4(0.2, 0.2, 0.2, 0.2), new BABYLON.Color4(0.3, 0.3, 0.3, 0.1));
        particleSystem.updateSpeed = 0.005;
    }
    else {
        particleSystem.addColorGradient(0, new BABYLON.Color4(0.5, 0.5, 0.5, 0), new BABYLON.Color4(0.8, 0.8, 0.8, 0));
        particleSystem.addColorGradient(0.4, new BABYLON.Color4(0.1, 0.1, 0.1, 0.1), new BABYLON.Color4(0.4, 0.4, 0.4, 0.4));
        particleSystem.addColorGradient(0.7, new BABYLON.Color4(0.03, 0.03, 0.03, 0.2), new BABYLON.Color4(0.3, 0.3, 0.3, 0.4));
        particleSystem.addColorGradient(1.0, new BABYLON.Color4(0.0, 0.0, 0.0, 0), new BABYLON.Color4(0.03, 0.03, 0.03, 0));
        particleSystem.updateSpeed = 0.01;
    }

    // Speed gradient
    particleSystem.addVelocityGradient(0, 1, 1.5);
    particleSystem.addVelocityGradient(0.1, 0.8, 0.9);
    particleSystem.addVelocityGradient(0.7, 0.4, 0.5);
    particleSystem.addVelocityGradient(1, 0.1, 0.2);


    // Rotation
    particleSystem.minInitialRotation = 0;
    particleSystem.maxInitialRotation = Math.PI;
    particleSystem.minAngularSpeed = -1;
    particleSystem.maxAngularSpeed = 1;

    // Size
    // particleSystem.minSize = isMoving ? 0.1 : 0.375;
    // particleSystem.maxSize = isMoving ? 0.2 : 0.625;


    particleSystem.addSizeGradient(0, isMoving ? 0.03 : 0.0375);
    particleSystem.addSizeGradient(1, isMoving ? 0.2 : 0.825);


    // Blendmode
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

    // Emitter shape
    //var sphereEmitter = particleSystem.createSphereEmitter(0.1);

    // Where the particles come from
    particleSystem.emitter = isMoving ? box : emitter; // the starting object
    particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, -0.5, -0.5).scale(isMoving ? 0.08 : 1);
    particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0.5, 0.5).scale(isMoving ? 0.08 : 1);


    if (!isMoving && !permanent) particleSystem.targetStopDuration = 12;
    particleSystem.disposeOnStop = true;

    particleSystem.start();

    return particleSystem;
}


function createTurboParticles(emitter, delay){
    createTurboEffect(emitter, delay, true)
    createTurboEffect(emitter, delay, false)
}
function createTurboEffect(emitter, delay, isRight){
    const box = BABYLON.MeshBuilder.CreateBox("turboTank", { size: 0.05 });
    box.parent = emitter
    box.position.z -= 0.95
    box.position.y -= 0.05
    box.position.x += isRight ? 0.22 : -0.18
    box.isVisible = false

    if(isRight){
        var turboLight = new BABYLON.PointLight("turboSpotLight", new BABYLON.Vector3(-0.2, 0, 0), scene);
        turboLight.diffuse = new BABYLON.Color3(0, 0, 1);
        turboLight.specular = new BABYLON.Color3(0, 0, 1);
        turboLight.intensity = 1.2
        turboLight.range = 4.5;
                
        turboLight.parent = box;
    
        setTimeout(()=>{
            turboLight.dispose()
        }, delay)
    }
    

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("turboParticles", 400, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/boost.png", scene);

    // Where the particles come from
    particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0);

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 0.5);
    particleSystem.color2 = new BABYLON.Color4(0.5, 0.8, 1.0, 0.4);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 1, 0);

    // Size of each particle
    // particleSystem.minSize = 0.2;
    // particleSystem.maxSize = 0.2;
    particleSystem.addSizeGradient(0, 0.15);
    particleSystem.addSizeGradient(0.25, 0.12);
    particleSystem.addSizeGradient(0.5, 0.1);
    particleSystem.addSizeGradient(0.75, 0.08);

    // Life time of each particle
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 0.6;

    // Emission rate
    particleSystem.emitRate = 300;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(0, 0, -1);
    particleSystem.direction2 = new BABYLON.Vector3(0, 0, -1);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 2;
    particleSystem.updateSpeed = 0.02;

    particleSystem.disposeOnStop = true;
    particleSystem.targetStopDuration = 15;

    particleSystem.emitter = box
    
    particleSystem.isLocal = true;

    setTimeout(()=>{
        box.dispose()
    }, delay)
    // Start the particle system
    particleSystem.start();
}

function createDust(emitter) {
    var particleSystem = new BABYLON.ParticleSystem("particles", 1000);

    // Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/smoke.png");

    // lifetime
    particleSystem.minLifeTime = 2;
    particleSystem.maxLifeTime = 4;

    // Emit rate
    particleSystem.emitRate = 100;

    // Gravity
    particleSystem.gravity = new BABYLON.Vector3(0, -2, 0);

    // Size gradient
    particleSystem.addSizeGradient(0, 0.6 / 20, 1 / 20);
    particleSystem.addSizeGradient(0.3 / 20, 1 / 20, 2 / 20);
    particleSystem.addSizeGradient(0.5 / 20, 2 / 20, 3 / 20);
    particleSystem.addSizeGradient(1.0 / 20, 6 / 20, 8 / 20);


    // Color gradient
    particleSystem.setColor = () => {
        if (biome == "Snow") particleSystem.addColorGradient(0, new BABYLON.Color4(1, 1, 1, 0.2), new BABYLON.Color4(1, 1, 1, 0.2))
        else particleSystem.addColorGradient(0, new BABYLON.Color4(194 / 255, 178 / 255, 128 / 255, 0.2), new BABYLON.Color4(225 / 255, 191 / 255, 146 / 255, 0.1))
    }

    particleSystem.setColor()

    particleSystem.updateColor = () => {
        particleSystem.removeSizeGradient(0);
        particleSystem.setColor()
    }
    // Rotation
    particleSystem.minInitialRotation = 0;
    particleSystem.maxInitialRotation = Math.PI;
    particleSystem.minAngularSpeed = -1;
    particleSystem.maxAngularSpeed = 1;

    // Size
    particleSystem.minSize = 0.5;
    particleSystem.maxSize = 0.7;

    // Blendmode
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;


    // Where the particles come from
    particleSystem.emitter = emitter; // the starting object
    particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, -0.45, -0.5)
    particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, -0.35, 0.5)


    return particleSystem;
}

function playSmoke(particleSystem) {
    particleSystem.start();
}

function stopSmoke(particleSystem) {
    particleSystem.stop();
}

// function createFire(emitter) {
//     BABYLON.ParticleHelper.CreateAsync("fire", scene).then((set) => {
//         set.systems.forEach(s => {
//             s.disposeOnStop = true;

//         });
//         for (var sys of set.systems) {
//             if (sys.name != "sparksEdge") {
//                 sys.minSize = 0.5
//                 sys.maxSize = 2

//             } else {
//                 sys.minSize = 0.1
//                 sys.maxSize = 0.5
//             }
//             sys.targetStopDuration = 20;
//             sys.minEmitBox = new BABYLON.Vector3(-0.1, -0.1, -0.1);
//             sys.maxEmitBox = new BABYLON.Vector3(0.1, 0.1, 0.1);
//             sys.emitter = emitter

//         }

//         set.start();

//     });
// }

function createBonusEffect(emitter, isSpecialBonus) {
    const particleSystem = new BABYLON.ParticleSystem("particles", 50);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/shine.png");

    //Gravity
    particleSystem.gravity = new BABYLON.Vector3(0, -4, 0);

    // Size
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.4;

    particleSystem.minLifeTime = 2
    particleSystem.maxLifeTime = 3

    // Position where the particles are emiited from
    particleSystem.emitter = emitter;
    particleSystem.minEmitBox = isSpecialBonus ? new BABYLON.Vector3(-0.8, -0.4, -0.4) : new BABYLON.Vector3(-0.40, -0.4, -0.4)
    particleSystem.maxEmitBox = isSpecialBonus ? new BABYLON.Vector3(0.8, -0.5, 0.4) : new BABYLON.Vector3(0.40, -0.5, 0.4)
    // Emit rate
    particleSystem.emitRate = 10;

    particleSystem.minEmitPower = 1.8
    particleSystem.maxEmitPower = 3.2

    // Rotation
    particleSystem.minInitialRotation = 0;
    particleSystem.maxInitialRotation = Math.PI;
    particleSystem.minAngularSpeed = -1;
    particleSystem.maxAngularSpeed = 1;


    particleSystem.color1 = new BABYLON.Color4(1, 0.87, 0, 1);
    particleSystem.color2 = new BABYLON.Color4(0.81, 0.71, 0.23, 1);


    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    particleSystem.updateSpeed = 0.005;
    particleSystem.start();

    return particleSystem
}

function batteryEffect(emitter) {
    const particleSystem = new BABYLON.ParticleSystem("particles", 25);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/spark.png")

    //Gravity
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Size
    particleSystem.minSize = 0.2
    particleSystem.maxSize = 0.4

    // Position where the particles are emitted from
    particleSystem.emitter = emitter;

    // Emit rate
    particleSystem.emitRate = 10

    particleSystem.minEmitPower = 0
    particleSystem.maxEmitPower = 0
    particleSystem.minLifeTime = 0.5
    particleSystem.maxLifeTime = 1.5
    particleSystem.createCylinderEmitter(0.25, 0.5, 0.3);

    // Rotation
    particleSystem.minInitialRotation = 0;
    particleSystem.maxInitialRotation = Math.PI;
    particleSystem.minAngularSpeed = -1;
    particleSystem.maxAngularSpeed = 1;


    particleSystem.color1 = new BABYLON.Color4(0.31, 0.51, 0.81, 1)
    particleSystem.color2 = new BABYLON.Color4(0.31, 0.71, 0.81, 1)

    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD

    particleSystem.updateSpeed = 0.005;
    particleSystem.start();

    return particleSystem
}

function createFire(emitter) {
    //Smoke
    var smokeSystem = new BABYLON.ParticleSystem("particles", 1000, scene);
    smokeSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
    smokeSystem.minEmitBox = new BABYLON.Vector3(-0.5, 1, -0.5); // Starting all from
    smokeSystem.maxEmitBox = new BABYLON.Vector3(0.5, 1, 0.5); // To...

    smokeSystem.color1 = new BABYLON.Color4(0.02, 0.02, 0.02, .02);
    smokeSystem.color2 = new BABYLON.Color4(0.02, 0.02, 0.02, .02);
    smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    smokeSystem.minSize = 1;
    smokeSystem.maxSize = 3;

    smokeSystem.minLifeTime = 0.3;
    smokeSystem.maxLifeTime = 1.5;

    smokeSystem.emitRate = 350;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    smokeSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    smokeSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    smokeSystem.direction1 = new BABYLON.Vector3(-1.5, 8, -1.5);
    smokeSystem.direction2 = new BABYLON.Vector3(1.5, 8, 1.5);

    smokeSystem.minAngularSpeed = 0;
    smokeSystem.maxAngularSpeed = Math.PI;

    smokeSystem.minEmitPower = 0.5;
    smokeSystem.maxEmitPower = 1.5;
    smokeSystem.updateSpeed = 0.005;
    smokeSystem.emitter = emitter
    smokeSystem.disposeOnStop = true;

    smokeSystem.start();



    // Create a particle system
    var fireSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    fireSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

    // Where the particles come from
    fireSystem.minEmitBox = new BABYLON.Vector3(-0.25, 0, -0.25); // Starting all from
    fireSystem.maxEmitBox = new BABYLON.Vector3(0.25, 0, 0.25); // To...

    // Colors of all particles
    fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
    fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
    fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    // Size of each particle (random between...
    fireSystem.minSize = 0.1;
    fireSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    fireSystem.minLifeTime = 0.2;
    fireSystem.maxLifeTime = 0.4;

    // Emission rate
    fireSystem.emitRate = 600;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    fireSystem.gravity = new BABYLON.Vector3(0, 20, 0);

    // Direction of each particle after it has been emitted
    // fireSystem.direction1 = new BABYLON.Vector3(0, 4, 0);
    // fireSystem.direction2 = new BABYLON.Vector3(0, 4, 0);

    // Angular speed, in radians
    fireSystem.minAngularSpeed = 0;
    fireSystem.maxAngularSpeed = Math.PI;

    // Speed
    fireSystem.minEmitPower = 0.5;
    fireSystem.maxEmitPower = 2;
    fireSystem.updateSpeed = 0.005;

    fireSystem.disposeOnStop = true;

    fireSystem.emitter = emitter

    // Start the particle system
    fireSystem.start();
}

function mindControlParticle(emitter, radius) {
    var position = emitter.clone()
    position.y += 0.2
    // Create & launch a particule system
    var particleSystem = new BABYLON.ParticleSystem("mindControlParticles", 10000, scene);
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
    particleSystem.color1 = new BABYLON.Color4(0.34, 0.04, 0.3);
    particleSystem.color2 = new BABYLON.Color4(0.37, 0.05, 0.28);
    particleSystem.colorDead = new BABYLON.Color4(0.33, 0.04, 0.33, 0.76);
    particleSystem.emitter = position;
    particleSystem.minSize = 0.25;
    particleSystem.maxSize = 0.5;
    particleSystem.emitRate = 5000;
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;     // to manage alpha
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    //particleSystem.direction1 = new BABYLON.Vector3(-1, 1, -1);
    //particleSystem.direction2 = new BABYLON.Vector3(1, 1, 1);
    particleSystem.minEmitPower = 0;
    particleSystem.maxEmitPower = 0;

    particleSystem.minLifeTime = 0.2;
    particleSystem.maxLifeTime = 1;
    particleSystem.disposeOnStop;
    //particleSystem.updateSpeed = 0.1;
    //particleSystem.targetStopDuration = 0.8

    var currentRadius = 0;
    var goalRadius = radius;
    var speedRadius = 0.0015

    // Custom function to get the circle effect
    particleSystem.startPositionFunction = function (worldMatrix, positionToUpdate) {
        currentRadius = Math.min(goalRadius, currentRadius + speedRadius)

        if (currentRadius >= goalRadius) {
            particleSystem.stop()
        }

        particleSystem.emitRate += 10;
        var rndAngle = 2 * Math.random() * Math.PI;
        var randX = currentRadius * Math.sin(rndAngle);
        var randY = this.minEmitBox.y;
        var randZ = currentRadius * Math.cos(rndAngle);

        BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);
    }


    particleSystem.disposeOnStop = true;

    // Start
    particleSystem.start();
}

function teleportationParticle(emitter) {
    teleportationEffect(emitter, 0)
    teleportationEffect(emitter, 180)
}

function teleportationEffect(emitter, position) {
    // Create & launch a particule system
    var particleSystem = new BABYLON.ParticleSystem("spawnParticles", 400, scene);
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
    particleSystem.emitter = emitter;
    particleSystem.minSize = 0.2;
    particleSystem.maxSize = 0.4;
    particleSystem.emitRate = 400;
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;     // to manage alpha
    particleSystem.gravity = new BABYLON.Vector3(0, 10, 0);
    //particleSystem.direction1 = new BABYLON.Vector3(-1, 1, -1);
    //particleSystem.direction2 = new BABYLON.Vector3(1, 1, 1);
    // particleSystem.minEmitPower = 1;
    // particleSystem.maxEmitPower = 5;
    particleSystem.updateSpeed = 0.02;
    // particleSystem.minLifeTime = 1;
    // particleSystem.maxLifeTime = 3;

    particleSystem.minLifeTime = 0.5;
    particleSystem.maxLifeTime = 0.5;

    particleSystem.cpt = position; // Number of particles


    // Custom function to get the circle effect
    particleSystem.startPositionFunction = function (worldMatrix, positionToUpdate) {
        var randX = Math.sin(this.cpt * Math.PI / 180) * 1.5;
        var randY = this.minEmitBox.y + 0.5;
        var randZ = Math.cos(this.cpt * Math.PI / 180) * 1.5;

        BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);
        particleSystem.minSize = Math.max(0.0001, particleSystem.minSize -= 0.00015);
        particleSystem.maxSize = Math.max(0.0006, particleSystem.maxSize -= 0.0009);

        this.cpt++;
    }


    particleSystem.targetStopDuration = 3;
    particleSystem.disposeOnStop = true;

    // Start
    particleSystem.start();
}

function shieldEffect(emitter, radius, isExploding = false) {
    var particleSystem = new BABYLON.ParticleSystem("particles", isExploding ? 500 : 300, scene);
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

    particleSystem.emitter = emitter

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle
    particleSystem.minSize = 0.05;
    particleSystem.maxSize = 0.1;

    // Life time of each particle
    particleSystem.minLifeTime = 1;
    particleSystem.maxLifeTime = isExploding ? 3 : 6;

    // Emission rate
    particleSystem.emitRate = isExploding ? 500 : 300;

    // Emission space
    particleSystem.createSphereEmitter(radius / 2, 0)

    // Speed
    particleSystem.minEmitPower = isExploding ? 1 : 0;
    particleSystem.maxEmitPower = isExploding ? 20 : 0;
    particleSystem.updateSpeed = isExploding ? 0.01 : 0.05

    particleSystem.targetStopDuration = isExploding ? 0.4 : 1.5
    particleSystem.disposeOnStop = true


    particleSystem.start();
}

function shieldImpact(emitter) {
    var particleSystem = new BABYLON.ParticleSystem("particles", 200, scene);
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
    particleSystem.emitter = emitter

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle
    particleSystem.minSize = 0.05;
    particleSystem.maxSize = 0.1;

    // Life time of each particle
    particleSystem.minLifeTime = 0.05;
    particleSystem.maxLifeTime = 0.1;

    // Emission rate
    particleSystem.emitRate = 200;

    particleSystem.minEmitPower = -5;
    particleSystem.maxEmitPower = -10;

    particleSystem.createSphereEmitter(0.4, 0)

    particleSystem.targetStopDuration = 0.2
    particleSystem.disposeOnStop = true;

    // Speed
    particleSystem.updateSpeed = 0.01;

    // Start the particle system
    particleSystem.start();
}

function bullChargeEffect(emitter, delay) {
    var bullLight = new BABYLON.SpotLight("bullSpotLight", new BABYLON.Vector3(0, 3, 0), new BABYLON.Vector3(0, -1, 0), Math.PI / 4, 50, scene, true);
    bullLight.diffuse = new BABYLON.Color3(1, 0, 0);
    bullLight.specular = new BABYLON.Color3(1, 0, 0);
    bullLight.intensity = 3
            
    bullLight.parent = emitter;

    setTimeout(()=>{
        bullLight.dispose()
    }, delay)
    bullChargeParticle(emitter, 0)
    bullChargeParticle(emitter, 180)
}

function bullChargeParticle(emitter, position){

    // Create & launch a particule system
    var particleSystem = new BABYLON.ParticleSystem("bullCharge", 500, scene);
    particleSystem.particleTexture = new BABYLON.Texture("textures/spark.png", scene);

    // particleSystem.addColorGradient(0, new BABYLON.Color4(0.87, 0, 0, 0.6));
    // particleSystem.addColorGradient(0.5, new BABYLON.Color4(0.95, 0, 0, 0.71, 0.5));
    // particleSystem.addColorGradient(1, new BABYLON.Color4(1, 0, 0, 0.82, 0.1));

    particleSystem.color1 = new BABYLON.Color4(0.8, 0, 0, 0.4);
	particleSystem.color2 = new BABYLON.Color4(0.9, 0, 0, 0.3);
	particleSystem.colorDead = new BABYLON.Color4(1, 0, 0, 0);
    
    particleSystem.minSize = 0.5;
    particleSystem.maxSize = 0.5;
    particleSystem.emitRate = 150;
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    particleSystem.minEmitPower = 0;
    particleSystem.maxEmitPower = 0;
    particleSystem.minLifeTime = 2;
    particleSystem.maxLifeTime = 2;
    particleSystem.updateSpeed = 0.1;

    particleSystem.cpt = position; // Number of particles

    // Custom function to get the circle effect
    particleSystem.startPositionFunction = function(worldMatrix, positionToUpdate)
    {
        var randX = -Math.sin(this.cpt * Math.PI/180)/2;
        var randY = Math.cos(this.cpt * Math.PI/180)/2;
        var randZ = this.minEmitBox.z + 1.25;
        
        BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);
    
        this.cpt++;
    }
    particleSystem.targetStopDuration = 8;
    particleSystem.disposeOnStop = true;
    particleSystem.emitter = emitter;

    // Start
    particleSystem.start();
}

function bullChargeEffect2(emitter) {
    var particleSystem = new BABYLON.ParticleSystem('bullCharge', 600, scene);
    particleSystem.particleTexture = new BABYLON.Texture('textures/flare.png', scene);

    particleSystem.minLifeTime = 1;
    particleSystem.maxLifeTime = 3;

    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    particleSystem.minEmitPower = 0;
    particleSystem.maxEmitPower = 0;
    particleSystem.updateSpeed = 0.05;
    particleSystem.emitRate = 600;

    // Start the system before rendering
    // particleSystem.preWarmCycles = 100;
    // particleSystem.preWarmStepOffset = 5;


    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.1;

    particleSystem.addColorGradient(0, new BABYLON.Color4(0.53, 0.02, 0.2));
    particleSystem.addColorGradient(0.5, new BABYLON.Color4(0.89, 0, 0.04, 0.71));
    particleSystem.addColorGradient(1, new BABYLON.Color4(1, 0, 0.17, 0.82));

    let dir = emitter.getDirection(BABYLON.Axis.Z)
    // dir.x *= -1
    // particleSystem.createDirectedSphereEmitter(1, dir.scale(-1), dir.scale(-1));
    particleSystem.emitter = emitter;

    particleSystem.targetStopDuration = 4;
    particleSystem.disposeOnStop = true;

    particleSystem.start();
}

function massiveExplosion(emitter) {
    //---------------------------------------------------------------------------
    // Create the core of the explosion
    var particleSystem1 = new BABYLON.ParticleSystem("core", 600, scene);

    //Texture of each particle
    particleSystem1.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

    // Where the particles come from
    particleSystem1.emitter = emitter

    //Shape of the explosion
    var emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 0.5;
    emitterType.radiusRange = 1;

    particleSystem1.particleEmitterType = emitterType;

    // Colors of all particles
    particleSystem1.color1 = new BABYLON.Color4(1, 0, 0, 1);
    particleSystem1.color2 = new BABYLON.Color4(1, 0.5, 0, 1);
    particleSystem1.colorDead = new BABYLON.Color4(0.5, 0.27, 0, 0.77);

    // Size of each particle
    particleSystem1.minSize = 0.4;
    particleSystem1.maxSize = 0.8;

    // Life time of each particle
    particleSystem1.minLifeTime = 0.5;
    particleSystem1.maxLifeTime = 2;

    // Emission rate
    particleSystem1.emitRate = 600;
    particleSystem1.manualEmitCount = 2000;

    // Blend mode
    particleSystem1.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem1.gravity = new BABYLON.Vector3(0, 0, 0);

    // Angular speed, in radians
    particleSystem1.minAngularSpeed = 0;
    particleSystem1.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem1.minEmitPower = 0.5;
    particleSystem1.maxEmitPower = 1.5;
    particleSystem1.updateSpeed = 0.1;

    particleSystem1.disposeOnStop = true;

    //---------------------------------------------------------------------------
    // Create the little fragments
    var particleSystem2 = new BABYLON.ParticleSystem("fragments", 200, scene);

    //Texture of each particle
    particleSystem2.particleTexture = new BABYLON.Texture("textures/star.jpg", scene);

    // Where the particles come from
    particleSystem2.emitter = emitter;
    var emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 0.4;
    emitterType.radiusRange = 0.5;

    particleSystem2.particleEmitterType = emitterType;


    // Colors of all particles
    particleSystem2.color1 = new BABYLON.Color4(0.97, 0.77, 0.11);
    particleSystem2.color2 = new BABYLON.Color4(0.95, 0.49, 0.02);
    particleSystem2.colorDead = new BABYLON.Color4(0.9, 0.6, 0.11, 0.86);

    // Size of each particle
    particleSystem2.minSize = 0.1;
    particleSystem2.maxSize = 0.3;

    // Life time of each particle
    particleSystem2.minLifeTime = 0.5;
    particleSystem2.maxLifeTime = 3;

    // Emission rate
    particleSystem2.emitRate = 200;
    particleSystem2.manualEmitCount = 1000;

    // Blend mode
    particleSystem2.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem2.gravity = new BABYLON.Vector3(0, -2.81, 0);

    // Angular speed, in radians
    particleSystem2.minAngularSpeed = 0;
    particleSystem2.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem2.minEmitPower = 5;
    particleSystem2.maxEmitPower = 6;

    particleSystem2.updateSpeed = 0.015;
    particleSystem2.disposeOnStop = true;

    //---------------------------------------------------------------------------
    //Create the smoke of the explosion
    var particleSystem3 = new BABYLON.ParticleSystem("particles", 600);

    // Texture of each particle
    particleSystem3.particleTexture = new BABYLON.Texture("textures/smoke.png");

    // lifetime
    particleSystem3.minLifeTime = 0.5;
    particleSystem3.maxLifeTime = 2;

    // Emit rate
    particleSystem3.emitRate = 600;
    particleSystem3.minEmitPower = 2;
    particleSystem3.maxEmitPower = 4;

    // Gravity
    particleSystem3.gravity = new BABYLON.Vector3(0.25, 4, 0);
    // Size gradient

    particleSystem3.addSizeGradient(0, 0.6 / 20, 1 / 20);
    particleSystem3.addSizeGradient(0.3 / 20, 1 / 20, 2 / 20);
    particleSystem3.addSizeGradient(0.5 / 20, 2 / 20, 3 / 20);
    particleSystem3.addSizeGradient(1.0 / 20, 6 / 20, 8 / 20);


    // Color gradient

    particleSystem3.addColorGradient(0, new BABYLON.Color4(0.1, 0.1, 0.1, 0.5), new BABYLON.Color4(0.2, 0.2, 0.2, 0.5));
    particleSystem3.addColorGradient(0.4, new BABYLON.Color4(0.2, 0.2, 0.2, 0.5), new BABYLON.Color4(0.4, 0.4, 0.4, 0.5));
    particleSystem3.addColorGradient(0.7, new BABYLON.Color4(0.3, 0.3, 0.3, 0.2), new BABYLON.Color4(0.5, 0.5, 0.5, 0.4));
    particleSystem3.addColorGradient(1.0, new BABYLON.Color4(0.5, 0.5, 0.5, 0), new BABYLON.Color4(0.6, 0.6, 0.6, 0.1));
    particleSystem3.updateSpeed = 0.01;


    // Speed gradient
    particleSystem3.addVelocityGradient(0, 1, 1.5);
    particleSystem3.addVelocityGradient(0.1, 0.8, 0.9);
    particleSystem3.addVelocityGradient(0.7, 0.4, 0.5);
    particleSystem3.addVelocityGradient(1, 0.1, 0.2);


    // Rotation
    particleSystem3.minInitialRotation = 0;
    particleSystem3.maxInitialRotation = Math.PI;
    particleSystem3.minAngularSpeed = -1;
    particleSystem3.maxAngularSpeed = 1;

    // Size
    // particleSystem3.minSize = isMoving ? 0.1 : 0.375;
    // particleSystem3.maxSize = isMoving ? 0.2 : 0.625;


    particleSystem3.addSizeGradient(0, 1);
    particleSystem3.addSizeGradient(0.6, 1.6);


    // Blendmode
    particleSystem3.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

    // Emitter shape
    particleSystem3.emitter = emitter;
    var emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 2;
    emitterType.radiusRange = 0.5;

    particleSystem3.particleEmitterType = emitterType;

    particleSystem3.manualEmitCount = 2000;
    particleSystem3.disposeOnStop = true;

    particleSystem1.start();
    particleSystem2.start();
    particleSystem3.start();
}

function electricExplosion(emitter) {
    // Create the core of the electric explosion
    var particleSystem = new BABYLON.ParticleSystem("electric", 80, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/spark.png", scene);

    // Where the particles come from
    particleSystem.emitter = emitter

    //Shape of the explosion
    var emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 0.5;
    emitterType.radiusRange = 0.5;

    particleSystem.particleEmitterType = emitterType;

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.31, 0.51, 0.81, 1);
    particleSystem.color2 = new BABYLON.Color4(0.31, 0.71, 0.81, 0.8);
    particleSystem.colorDead = new BABYLON.Color4(0, 0.75, 1, 0.5);


    // Size of each particle
    particleSystem.minSize = 0.4;
    particleSystem.maxSize = 0.8;

    // Life time of each particle
    particleSystem.minLifeTime = 0.5;
    particleSystem.maxLifeTime = 2;

    // Emission rate
    particleSystem.emitRate = 80;
    particleSystem.manualEmitCount = 500;

    // Blend mode
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 0.5;
    particleSystem.maxEmitPower = 1.5;
    particleSystem.updateSpeed = 0.05;

    particleSystem.addSizeGradient(0, 1.6);
    particleSystem.addSizeGradient(0.6, 1);

    particleSystem.disposeOnStop = true;

    particleSystem.start()
}

function collectRelicParticle(emitter) {
    collectRelicEffect(emitter, 0)
    collectRelicEffect(emitter, 180)
}

function collectRelicEffect(emitter, position) {
    // Create & launch the particule system
    var particleSystem = new BABYLON.ParticleSystem("spawnParticles", 600, scene);
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
    particleSystem.color1 = new BABYLON.Color4(0, 0.4, 0, 0.6);
    particleSystem.color2 = new BABYLON.Color4(0, 0.5, 0, 0.4);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0);

    particleSystem.emitter = emitter;
    particleSystem.minSize = 0.15;
    particleSystem.maxSize = 0.35;
    particleSystem.emitRate = 450;

    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    particleSystem.gravity = new BABYLON.Vector3(0, 8, 0);
    particleSystem.updateSpeed = 0.03;


    particleSystem.minLifeTime = 0.4;
    particleSystem.maxLifeTime = 0.6;

    particleSystem.cpt = position;
    
    particleSystem.preWarmCycles = 10;
    particleSystem.preWarmStepOffset = 1;

    // Custom function to get the circle effect
    particleSystem.startPositionFunction = function (worldMatrix, positionToUpdate) {
        var randX = Math.sin(this.cpt * Math.PI / 180)/3;
        var randY = this.minEmitBox.y;
        var randZ = Math.cos(this.cpt * Math.PI / 180)/3;

        BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);
        particleSystem.minSize = Math.max(0.0001, particleSystem.minSize -= 0.00015);
        particleSystem.maxSize = Math.max(0.0006, particleSystem.maxSize -= 0.0009);

        this.cpt++;
    }

    particleSystem.targetStopDuration = 2;
    particleSystem.disposeOnStop = true;

    // Start
    particleSystem.start();
}