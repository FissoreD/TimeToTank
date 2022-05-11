function createMaterial(scene, path) {
  var myMaterial = new BABYLON.StandardMaterial(path, scene);

  myMaterial.diffuseTexture = new BABYLON.Texture(path, scene);
  myMaterial.specularTexture = new BABYLON.Texture(path, scene);
  myMaterial.emissiveTexture = new BABYLON.Texture(path, scene);
  myMaterial.ambientTexture = new BABYLON.Texture(path, scene);

  return myMaterial;
}

function defineBoundingBox(eltList) {
  let childMeshes = eltList;
  let min = childMeshes[0].getBoundingInfo().boundingBox.minimumWorld;
  let max = childMeshes[0].getBoundingInfo().boundingBox.maximumWorld;
  for (let i = 0; i < childMeshes.length; i++) {
    let meshMin = childMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
    let meshMax = childMeshes[i].getBoundingInfo().boundingBox.maximumWorld;

    min = BABYLON.Vector3.Minimize(min, meshMin);
    max = BABYLON.Vector3.Maximize(max, meshMax);
  }
  let newBoundingBox = new BABYLON.BoundingInfo(min, max)
  eltList[0].setBoundingInfo(newBoundingBox);
  eltList[0].showBoundingBox = true;
}