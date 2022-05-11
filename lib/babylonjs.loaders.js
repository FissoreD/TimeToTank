(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory(require("babylonjs"));
    else if (typeof define === 'function' && define.amd)
        define("babylonjs-loaders", ["babylonjs"], factory);
    else if (typeof exports === 'object')
        exports["babylonjs-loaders"] = factory(require("babylonjs"));
    else
        root["LOADERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), function (__WEBPACK_EXTERNAL_MODULE_core_Misc_observable__) {
    return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../lts/loaders/dist/OBJ/index.js":
/*!**********************************************!*\
  !*** ../../../lts/loaders/dist/OBJ/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MTLFileLoader": () => (/* reexport safe */ _mtlFileLoader__WEBPACK_IMPORTED_MODULE_0__.MTLFileLoader),
/* harmony export */   "OBJFileLoader": () => (/* reexport safe */ _objFileLoader__WEBPACK_IMPORTED_MODULE_3__.OBJFileLoader),
/* harmony export */   "SolidParser": () => (/* reexport safe */ _solidParser__WEBPACK_IMPORTED_MODULE_2__.SolidParser)
                        /* harmony export */
});
/* harmony import */ var _mtlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mtlFileLoader */ "../../../lts/loaders/dist/OBJ/mtlFileLoader.js");
/* harmony import */ var _objLoadingOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objLoadingOptions */ "../../../lts/loaders/dist/OBJ/objLoadingOptions.js");
/* harmony import */ var _solidParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solidParser */ "../../../lts/loaders/dist/OBJ/solidParser.js");
/* harmony import */ var _objFileLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objFileLoader */ "../../../lts/loaders/dist/OBJ/objFileLoader.js");






                    /***/
}),

/***/ "../../../lts/loaders/dist/OBJ/mtlFileLoader.js":
/*!******************************************************!*\
  !*** ../../../lts/loaders/dist/OBJ/mtlFileLoader.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MTLFileLoader": () => (/* binding */ MTLFileLoader)
                        /* harmony export */
});
/* harmony import */ var core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/standardMaterial */ "core/Misc/observable");
/* harmony import */ var core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__);



                    /**
                     * Class reading and parsing the MTL file bundled with the obj file.
                     */
                    class MTLFileLoader {
                        constructor() {
                            /**
                             * All material loaded from the mtl will be set here
                             */
                            this.materials = [];
                        }
                        /**
                         * This function will read the mtl file and create each material described inside
                         * This function could be improve by adding :
                         * -some component missing (Ni, Tf...)
                         * -including the specific options available
                         *
                         * @param scene defines the scene the material will be created in
                         * @param data defines the mtl data to parse
                         * @param rootUrl defines the rooturl to use in order to load relative dependencies
                         * @param assetContainer defines the asset container to store the material in (can be null)
                         */
                        parseMTL(scene, data, rootUrl, assetContainer) {
                            if (data instanceof ArrayBuffer) {
                                return;
                            }
                            //Split the lines from the file
                            const lines = data.split("\n");
                            // whitespace char ie: [ \t\r\n\f]
                            const delimiter_pattern = /\s+/;
                            //Array with RGB colors
                            let color;
                            //New material
                            let material = null;
                            //Look at each line
                            for (let i = 0; i < lines.length; i++) {
                                const line = lines[i].trim();
                                // Blank line or comment
                                if (line.length === 0 || line.charAt(0) === "#") {
                                    continue;
                                }
                                //Get the first parameter (keyword)
                                const pos = line.indexOf(" ");
                                let key = pos >= 0 ? line.substring(0, pos) : line;
                                key = key.toLowerCase();
                                //Get the data following the key
                                const value = pos >= 0 ? line.substring(pos + 1).trim() : "";
                                //This mtl keyword will create the new material
                                if (key === "newmtl") {
                                    //Check if it is the first material.
                                    // Materials specifications are described after this keyword.
                                    if (material) {
                                        //Add the previous material in the material array.
                                        this.materials.push(material);
                                    }
                                    //Create a new material.
                                    // value is the name of the material read in the mtl file
                                    scene._blockEntityCollection = !!assetContainer;
                                    material = new core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(value, scene);
                                    material._parentContainer = assetContainer;
                                    scene._blockEntityCollection = false;
                                }
                                else if (key === "kd" && material) {
                                    // Diffuse color (color under white light) using RGB values
                                    //value  = "r g b"
                                    color = value.split(delimiter_pattern, 3).map(parseFloat);
                                    //color = [r,g,b]
                                    //Set tghe color into the material
                                    material.diffuseColor = core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
                                }
                                else if (key === "ka" && material) {
                                    // Ambient color (color under shadow) using RGB values
                                    //value = "r g b"
                                    color = value.split(delimiter_pattern, 3).map(parseFloat);
                                    //color = [r,g,b]
                                    //Set tghe color into the material
                                    material.ambientColor = core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
                                }
                                else if (key === "ks" && material) {
                                    // Specular color (color when light is reflected from shiny surface) using RGB values
                                    //value = "r g b"
                                    color = value.split(delimiter_pattern, 3).map(parseFloat);
                                    //color = [r,g,b]
                                    //Set the color into the material
                                    material.specularColor = core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
                                }
                                else if (key === "ke" && material) {
                                    // Emissive color using RGB values
                                    color = value.split(delimiter_pattern, 3).map(parseFloat);
                                    material.emissiveColor = core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
                                }
                                else if (key === "ns" && material) {
                                    //value = "Integer"
                                    material.specularPower = parseFloat(value);
                                }
                                else if (key === "d" && material) {
                                    //d is dissolve for current material. It mean alpha for BABYLON
                                    material.alpha = parseFloat(value);
                                    //Texture
                                    //This part can be improved by adding the possible options of texture
                                }
                                else if (key === "map_ka" && material) {
                                    // ambient texture map with a loaded image
                                    //We must first get the folder of the image
                                    material.ambientTexture = MTLFileLoader._getTexture(rootUrl, value, scene);
                                }
                                else if (key === "map_kd" && material) {
                                    // Diffuse texture map with a loaded image
                                    material.diffuseTexture = MTLFileLoader._getTexture(rootUrl, value, scene);
                                }
                                else if (key === "map_ks" && material) {
                                    // Specular texture map with a loaded image
                                    //We must first get the folder of the image
                                    material.specularTexture = MTLFileLoader._getTexture(rootUrl, value, scene);
                                }
                                else if (key === "map_ns") {
                                    //Specular
                                    //Specular highlight component
                                    //We must first get the folder of the image
                                    //
                                    //Not supported by BABYLON
                                    //
                                    //    continue;
                                }
                                else if (key === "map_bump" && material) {
                                    //The bump texture
                                    const values = value.split(delimiter_pattern);
                                    const bumpMultiplierIndex = values.indexOf("-bm");
                                    let bumpMultiplier = null;
                                    if (bumpMultiplierIndex >= 0) {
                                        bumpMultiplier = values[bumpMultiplierIndex + 1];
                                        values.splice(bumpMultiplierIndex, 2); // remove
                                    }
                                    material.bumpTexture = MTLFileLoader._getTexture(rootUrl, values.join(" "), scene);
                                    if (material.bumpTexture && bumpMultiplier !== null) {
                                        material.bumpTexture.level = parseFloat(bumpMultiplier);
                                    }
                                }
                                else if (key === "map_d" && material) {
                                    // The dissolve of the material
                                    material.opacityTexture = MTLFileLoader._getTexture(rootUrl, value, scene);
                                    //Options for illumination
                                }
                                else if (key === "illum") {
                                    //Illumination
                                    if (value === "0") {
                                        //That mean Kd == Kd
                                    }
                                    else if (value === "1") {
                                        //Color on and Ambient on
                                    }
                                    else if (value === "2") {
                                        //Highlight on
                                    }
                                    else if (value === "3") {
                                        //Reflection on and Ray trace on
                                    }
                                    else if (value === "4") {
                                        //Transparency: Glass on, Reflection: Ray trace on
                                    }
                                    else if (value === "5") {
                                        //Reflection: Fresnel on and Ray trace on
                                    }
                                    else if (value === "6") {
                                        //Transparency: Refraction on, Reflection: Fresnel off and Ray trace on
                                    }
                                    else if (value === "7") {
                                        //Transparency: Refraction on, Reflection: Fresnel on and Ray trace on
                                    }
                                    else if (value === "8") {
                                        //Reflection on and Ray trace off
                                    }
                                    else if (value === "9") {
                                        //Transparency: Glass on, Reflection: Ray trace off
                                    }
                                    else if (value === "10") {
                                        //Casts shadows onto invisible surfaces
                                    }
                                }
                                else {
                                    // console.log("Unhandled expression at line : " + i +'\n' + "with value : " + line);
                                }
                            }
                            //At the end of the file, add the last material
                            if (material) {
                                this.materials.push(material);
                            }
                        }
                        /**
                         * Gets the texture for the material.
                         *
                         * If the material is imported from input file,
                         * We sanitize the url to ensure it takes the textre from aside the material.
                         *
                         * @param rootUrl The root url to load from
                         * @param value The value stored in the mtl
                         * @param scene
                         * @return The Texture
                         */
                        static _getTexture(rootUrl, value, scene) {
                            if (!value) {
                                return null;
                            }
                            let url = rootUrl;
                            // Load from input file.
                            if (rootUrl === "file:") {
                                let lastDelimiter = value.lastIndexOf("\\");
                                if (lastDelimiter === -1) {
                                    lastDelimiter = value.lastIndexOf("/");
                                }
                                if (lastDelimiter > -1) {
                                    url += value.substr(lastDelimiter + 1);
                                }
                                else {
                                    url += value;
                                }
                            }
                            // Not from input file.
                            else {
                                url += value;
                            }
                            return new core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Texture(url, scene, false, MTLFileLoader.INVERT_TEXTURE_Y);
                        }
                    }
                    /**
                     * Invert Y-Axis of referenced textures on load
                     */
                    MTLFileLoader.INVERT_TEXTURE_Y = true;


                    /***/
}),

/***/ "../../../lts/loaders/dist/OBJ/objFileLoader.js":
/*!******************************************************!*\
  !*** ../../../lts/loaders/dist/OBJ/objFileLoader.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OBJFileLoader": () => (/* binding */ OBJFileLoader)
                        /* harmony export */
});
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/assetContainer */ "core/Misc/observable");
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mtlFileLoader */ "../../../lts/loaders/dist/OBJ/mtlFileLoader.js");
/* harmony import */ var _solidParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solidParser */ "../../../lts/loaders/dist/OBJ/solidParser.js");






                    /**
                     * OBJ file type loader.
                     * This is a babylon scene loader plugin.
                     */
                    class OBJFileLoader {
                        /**
                         * Creates loader for .OBJ files
                         *
                         * @param loadingOptions options for loading and parsing OBJ/MTL files.
                         */
                        constructor(loadingOptions) {
                            /**
                             * Defines the name of the plugin.
                             */
                            this.name = "obj";
                            /**
                             * Defines the extension the plugin is able to load.
                             */
                            this.extensions = ".obj";
                            this._assetContainer = null;
                            this._loadingOptions = loadingOptions || OBJFileLoader.DefaultLoadingOptions;
                        }
                        /**
                         * Invert Y-Axis of referenced textures on load
                         */
                        static get INVERT_TEXTURE_Y() {
                            return _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader.INVERT_TEXTURE_Y;
                        }
                        static set INVERT_TEXTURE_Y(value) {
                            _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader.INVERT_TEXTURE_Y = value;
                        }
                        static get DefaultLoadingOptions() {
                            return {
                                computeNormals: OBJFileLoader.COMPUTE_NORMALS,
                                optimizeNormals: OBJFileLoader.OPTIMIZE_NORMALS,
                                importVertexColors: OBJFileLoader.IMPORT_VERTEX_COLORS,
                                invertY: OBJFileLoader.INVERT_Y,
                                invertTextureY: OBJFileLoader.INVERT_TEXTURE_Y,
                                UVScaling: OBJFileLoader.UV_SCALING,
                                materialLoadingFailsSilently: OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY,
                                optimizeWithUV: OBJFileLoader.OPTIMIZE_WITH_UV,
                                skipMaterials: OBJFileLoader.SKIP_MATERIALS,
                            };
                        }
                        /**
                         * Calls synchronously the MTL file attached to this obj.
                         * Load function or importMesh function don't enable to load 2 files in the same time asynchronously.
                         * Without this function materials are not displayed in the first frame (but displayed after).
                         * In consequence it is impossible to get material information in your HTML file
                         *
                         * @param url The URL of the MTL file
                         * @param rootUrl defines where to load data from
                         * @param onSuccess Callback function to be called when the MTL file is loaded
                         * @param onFailure
                         */
                        _loadMTL(url, rootUrl, onSuccess, onFailure) {
                            //The complete path to the mtl file
                            const pathOfFile = rootUrl + url;
                            // Loads through the babylon tools to allow fileInput search.
                            core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.LoadFile(pathOfFile, onSuccess, undefined, undefined, false, (request, exception) => {
                                onFailure(pathOfFile, exception);
                            });
                        }
                        /**
                         * Instantiates a OBJ file loader plugin.
                         * @returns the created plugin
                         */
                        createPlugin() {
                            return new OBJFileLoader(OBJFileLoader.DefaultLoadingOptions);
                        }
                        /**
                         * If the data string can be loaded directly.
                         *
                         * @param data string containing the file data
                         * @returns if the data can be loaded directly
                         */
                        canDirectLoad(data) {
                            return false;
                        }
                        /**
                         * Imports one or more meshes from the loaded OBJ data and adds them to the scene
                         * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
                         * @param scene the scene the meshes should be added to
                         * @param data the OBJ data to load
                         * @param rootUrl root url to load from
                         * @param onProgress event that fires when loading progress has occured
                         * @param fileName Defines the name of the file to load
                         * @returns a promise containg the loaded meshes, particles, skeletons and animations
                         */
                        importMeshAsync(meshesNames, scene, data, rootUrl, onProgress, fileName) {
                            //get the meshes from OBJ file
                            return this._parseSolid(meshesNames, scene, data, rootUrl).then((meshes) => {
                                return {
                                    meshes: meshes,
                                    particleSystems: [],
                                    skeletons: [],
                                    animationGroups: [],
                                    transformNodes: [],
                                    geometries: [],
                                    lights: [],
                                };
                            });
                        }
                        /**
                         * Imports all objects from the loaded OBJ data and adds them to the scene
                         * @param scene the scene the objects should be added to
                         * @param data the OBJ data to load
                         * @param rootUrl root url to load from
                         * @param onProgress event that fires when loading progress has occured
                         * @param fileName Defines the name of the file to load
                         * @returns a promise which completes when objects have been loaded to the scene
                         */
                        loadAsync(scene, data, rootUrl, onProgress, fileName) {
                            //Get the 3D model
                            return this.importMeshAsync(null, scene, data, rootUrl, onProgress).then(() => {
                                // return void
                            });
                        }
                        /**
                         * Load into an asset container.
                         * @param scene The scene to load into
                         * @param data The data to import
                         * @param rootUrl The root url for scene and resources
                         * @param onProgress The callback when the load progresses
                         * @param fileName Defines the name of the file to load
                         * @returns The loaded asset container
                         */
                        loadAssetContainerAsync(scene, data, rootUrl, onProgress, fileName) {
                            const container = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
                            this._assetContainer = container;
                            return this.importMeshAsync(null, scene, data, rootUrl)
                                .then((result) => {
                                    result.meshes.forEach((mesh) => container.meshes.push(mesh));
                                    result.meshes.forEach((mesh) => {
                                        const material = mesh.material;
                                        if (material) {
                                            // Materials
                                            if (container.materials.indexOf(material) == -1) {
                                                container.materials.push(material);
                                                // Textures
                                                const textures = material.getActiveTextures();
                                                textures.forEach((t) => {
                                                    if (container.textures.indexOf(t) == -1) {
                                                        container.textures.push(t);
                                                    }
                                                });
                                            }
                                        }
                                    });
                                    this._assetContainer = null;
                                    return container;
                                })
                                .catch((ex) => {
                                    this._assetContainer = null;
                                    throw ex;
                                });
                        }
                        /**
                         * Read the OBJ file and create an Array of meshes.
                         * Each mesh contains all information given by the OBJ and the MTL file.
                         * i.e. vertices positions and indices, optional normals values, optional UV values, optional material
                         * @param meshesNames defines a string or array of strings of the mesh names that should be loaded from the file
                         * @param scene defines the scene where are displayed the data
                         * @param data defines the content of the obj file
                         * @param rootUrl defines the path to the folder
                         * @returns the list of loaded meshes
                         */
                        _parseSolid(meshesNames, scene, data, rootUrl) {
                            let fileToLoad = ""; //The name of the mtlFile to load
                            const materialsFromMTLFile = new _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader();
                            const materialToUse = new Array();
                            const babylonMeshesArray = []; //The mesh for babylon
                            // Main function
                            const solidParser = new _solidParser__WEBPACK_IMPORTED_MODULE_2__.SolidParser(materialToUse, babylonMeshesArray, this._loadingOptions);
                            solidParser.parse(meshesNames, data, scene, this._assetContainer, (fileName) => {
                                fileToLoad = fileName;
                            });
                            // load the materials
                            const mtlPromises = [];
                            // Check if we have a file to load
                            if (fileToLoad !== "" && !this._loadingOptions.skipMaterials) {
                                //Load the file synchronously
                                mtlPromises.push(new Promise((resolve, reject) => {
                                    this._loadMTL(fileToLoad, rootUrl, (dataLoaded) => {
                                        try {
                                            //Create materials thanks MTLLoader function
                                            materialsFromMTLFile.parseMTL(scene, dataLoaded, rootUrl, this._assetContainer);
                                            //Look at each material loaded in the mtl file
                                            for (let n = 0; n < materialsFromMTLFile.materials.length; n++) {
                                                //Three variables to get all meshes with the same material
                                                let startIndex = 0;
                                                const _indices = [];
                                                var _index;
                                                //The material from MTL file is used in the meshes loaded
                                                //Push the indice in an array
                                                //Check if the material is not used for another mesh
                                                while ((_index = materialToUse.indexOf(materialsFromMTLFile.materials[n].name, startIndex)) > -1) {
                                                    _indices.push(_index);
                                                    startIndex = _index + 1;
                                                }
                                                //If the material is not used dispose it
                                                if (_index === -1 && _indices.length === 0) {
                                                    //If the material is not needed, remove it
                                                    materialsFromMTLFile.materials[n].dispose();
                                                }
                                                else {
                                                    for (let o = 0; o < _indices.length; o++) {
                                                        //Apply the material to the Mesh for each mesh with the material
                                                        const mesh = babylonMeshesArray[_indices[o]];
                                                        const material = materialsFromMTLFile.materials[n];
                                                        mesh.material = material;
                                                        if (!mesh.getTotalIndices()) {
                                                            // No indices, we need to turn on point cloud
                                                            material.pointsCloud = true;
                                                        }
                                                    }
                                                }
                                            }
                                            resolve();
                                        }
                                        catch (e) {
                                            core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn(`Error processing MTL file: '${fileToLoad}'`);
                                            if (this._loadingOptions.materialLoadingFailsSilently) {
                                                resolve();
                                            }
                                            else {
                                                reject(e);
                                            }
                                        }
                                    }, (pathOfFile, exception) => {
                                        core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn(`Error downloading MTL file: '${fileToLoad}'`);
                                        if (this._loadingOptions.materialLoadingFailsSilently) {
                                            resolve();
                                        }
                                        else {
                                            reject(exception);
                                        }
                                    });
                                }));
                            }
                            //Return an array with all Mesh
                            return Promise.all(mtlPromises).then(() => {
                                return babylonMeshesArray;
                            });
                        }
                    }
                    /**
                     * Defines if UVs are optimized by default during load.
                     */
                    OBJFileLoader.OPTIMIZE_WITH_UV = true;
                    /**
                     * Invert model on y-axis (does a model scaling inversion)
                     */
                    OBJFileLoader.INVERT_Y = false;
                    /**
                     * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
                     */
                    OBJFileLoader.IMPORT_VERTEX_COLORS = false;
                    /**
                     * Compute the normals for the model, even if normals are present in the file.
                     */
                    OBJFileLoader.COMPUTE_NORMALS = false;
                    /**
                     * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
                     * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
                     */
                    OBJFileLoader.OPTIMIZE_NORMALS = false;
                    /**
                     * Defines custom scaling of UV coordinates of loaded meshes.
                     */
                    OBJFileLoader.UV_SCALING = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(1, 1);
                    /**
                     * Skip loading the materials even if defined in the OBJ file (materials are ignored).
                     */
                    OBJFileLoader.SKIP_MATERIALS = false;
                    /**
                     * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
                     *
                     * Defaults to true for backwards compatibility.
                     */
                    OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY = true;
                    if (core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.SceneLoader) {
                        //Add this loader into the register plugin
                        core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.RegisterPlugin(new OBJFileLoader());
                    }


                    /***/
}),

/***/ "../../../lts/loaders/dist/OBJ/objLoadingOptions.js":
/*!**********************************************************!*\
  !*** ../../../lts/loaders/dist/OBJ/objLoadingOptions.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);



                    /***/
}),

/***/ "../../../lts/loaders/dist/OBJ/solidParser.js":
/*!****************************************************!*\
  !*** ../../../lts/loaders/dist/OBJ/solidParser.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SolidParser": () => (/* binding */ SolidParser)
                        /* harmony export */
});
/* harmony import */ var core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Meshes/mesh.vertexData */ "core/Misc/observable");
/* harmony import */ var core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__);







                    /**
                     * Class used to load mesh data from OBJ content
                     */
                    class SolidParser {
                        /**
                         * Creates a new SolidParser
                         * @param materialToUse defines the array to fill with the list of materials to use (it will be filled by the parse function)
                         * @param babylonMeshesArray defines the array to fill with the list of loaded meshes (it will be filled by the parse function)
                         * @param loadingOptions defines the loading options to use
                         */
                        constructor(materialToUse, babylonMeshesArray, loadingOptions) {
                            this._positions = []; //values for the positions of vertices
                            this._normals = []; //Values for the normals
                            this._uvs = []; //Values for the textures
                            this._colors = [];
                            this._meshesFromObj = []; //[mesh] Contains all the obj meshes
                            this._indicesForBabylon = []; //The list of indices for VertexData
                            this._wrappedPositionForBabylon = []; //The list of position in vectors
                            this._wrappedUvsForBabylon = []; //Array with all value of uvs to match with the indices
                            this._wrappedColorsForBabylon = []; // Array with all color values to match with the indices
                            this._wrappedNormalsForBabylon = []; //Array with all value of normals to match with the indices
                            this._tuplePosNorm = []; //Create a tuple with indice of Position, Normal, UV  [pos, norm, uvs]
                            this._curPositionInIndices = 0;
                            this._hasMeshes = false; //Meshes are defined in the file
                            this._unwrappedPositionsForBabylon = []; //Value of positionForBabylon w/o Vector3() [x,y,z]
                            this._unwrappedColorsForBabylon = []; // Value of colorForBabylon w/o Color4() [r,g,b,a]
                            this._unwrappedNormalsForBabylon = []; //Value of normalsForBabylon w/o Vector3()  [x,y,z]
                            this._unwrappedUVForBabylon = []; //Value of uvsForBabylon w/o Vector3()      [x,y,z]
                            this._triangles = []; //Indices from new triangles coming from polygons
                            this._materialNameFromObj = ""; //The name of the current material
                            this._objMeshName = ""; //The name of the current obj mesh
                            this._increment = 1; //Id for meshes created by the multimaterial
                            this._isFirstMaterial = true;
                            this._grayColor = new core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color4(0.5, 0.5, 0.5, 1);
                            this._materialToUse = materialToUse;
                            this._babylonMeshesArray = babylonMeshesArray;
                            this._loadingOptions = loadingOptions;
                        }
                        /**
                         * Search for obj in the given array.
                         * This function is called to check if a couple of data already exists in an array.
                         *
                         * If found, returns the index of the founded tuple index. Returns -1 if not found
                         * @param arr Array<{ normals: Array<number>, idx: Array<number> }>
                         * @param obj Array<number>
                         * @returns {boolean}
                         */
                        _isInArray(arr, obj) {
                            if (!arr[obj[0]]) {
                                arr[obj[0]] = { normals: [], idx: [] };
                            }
                            const idx = arr[obj[0]].normals.indexOf(obj[1]);
                            return idx === -1 ? -1 : arr[obj[0]].idx[idx];
                        }
                        _isInArrayUV(arr, obj) {
                            if (!arr[obj[0]]) {
                                arr[obj[0]] = { normals: [], idx: [], uv: [] };
                            }
                            const idx = arr[obj[0]].normals.indexOf(obj[1]);
                            if (idx != 1 && obj[2] === arr[obj[0]].uv[idx]) {
                                return arr[obj[0]].idx[idx];
                            }
                            return -1;
                        }
                        /**
                         * This function set the data for each triangle.
                         * Data are position, normals and uvs
                         * If a tuple of (position, normal) is not set, add the data into the corresponding array
                         * If the tuple already exist, add only their indice
                         *
                         * @param indicePositionFromObj Integer The index in positions array
                         * @param indiceUvsFromObj Integer The index in uvs array
                         * @param indiceNormalFromObj Integer The index in normals array
                         * @param positionVectorFromOBJ Vector3 The value of position at index objIndice
                         * @param textureVectorFromOBJ Vector3 The value of uvs
                         * @param normalsVectorFromOBJ Vector3 The value of normals at index objNormale
                         * @param positionColorsFromOBJ
                         */
                        _setData(indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, positionVectorFromOBJ, textureVectorFromOBJ, normalsVectorFromOBJ, positionColorsFromOBJ) {
                            //Check if this tuple already exists in the list of tuples
                            let _index;
                            if (this._loadingOptions.optimizeWithUV) {
                                _index = this._isInArrayUV(this._tuplePosNorm, [indicePositionFromObj, indiceNormalFromObj, indiceUvsFromObj]);
                            }
                            else {
                                _index = this._isInArray(this._tuplePosNorm, [indicePositionFromObj, indiceNormalFromObj]);
                            }
                            //If it not exists
                            if (_index === -1) {
                                //Add an new indice.
                                //The array of indices is only an array with his length equal to the number of triangles - 1.
                                //We add vertices data in this order
                                this._indicesForBabylon.push(this._wrappedPositionForBabylon.length);
                                //Push the position of vertice for Babylon
                                //Each element is a Vector3(x,y,z)
                                this._wrappedPositionForBabylon.push(positionVectorFromOBJ);
                                //Push the uvs for Babylon
                                //Each element is a Vector3(u,v)
                                this._wrappedUvsForBabylon.push(textureVectorFromOBJ);
                                //Push the normals for Babylon
                                //Each element is a Vector3(x,y,z)
                                this._wrappedNormalsForBabylon.push(normalsVectorFromOBJ);
                                if (positionColorsFromOBJ !== undefined) {
                                    //Push the colors for Babylon
                                    //Each element is a BABYLON.Color4(r,g,b,a)
                                    this._wrappedColorsForBabylon.push(positionColorsFromOBJ);
                                }
                                //Add the tuple in the comparison list
                                this._tuplePosNorm[indicePositionFromObj].normals.push(indiceNormalFromObj);
                                this._tuplePosNorm[indicePositionFromObj].idx.push(this._curPositionInIndices++);
                                if (this._loadingOptions.optimizeWithUV) {
                                    this._tuplePosNorm[indicePositionFromObj].uv.push(indiceUvsFromObj);
                                }
                            }
                            else {
                                //The tuple already exists
                                //Add the index of the already existing tuple
                                //At this index we can get the value of position, normal, color and uvs of vertex
                                this._indicesForBabylon.push(_index);
                            }
                        }
                        /**
                         * Transform Vector() and BABYLON.Color() objects into numbers in an array
                         */
                        _unwrapData() {
                            //Every array has the same length
                            for (let l = 0; l < this._wrappedPositionForBabylon.length; l++) {
                                //Push the x, y, z values of each element in the unwrapped array
                                this._unwrappedPositionsForBabylon.push(this._wrappedPositionForBabylon[l].x, this._wrappedPositionForBabylon[l].y, this._wrappedPositionForBabylon[l].z);
                                this._unwrappedNormalsForBabylon.push(this._wrappedNormalsForBabylon[l].x, this._wrappedNormalsForBabylon[l].y, this._wrappedNormalsForBabylon[l].z);
                                this._unwrappedUVForBabylon.push(this._wrappedUvsForBabylon[l].x, this._wrappedUvsForBabylon[l].y); //z is an optional value not supported by BABYLON
                                if (this._loadingOptions.importVertexColors) {
                                    //Push the r, g, b, a values of each element in the unwrapped array
                                    this._unwrappedColorsForBabylon.push(this._wrappedColorsForBabylon[l].r, this._wrappedColorsForBabylon[l].g, this._wrappedColorsForBabylon[l].b, this._wrappedColorsForBabylon[l].a);
                                }
                            }
                            // Reset arrays for the next new meshes
                            this._wrappedPositionForBabylon = [];
                            this._wrappedNormalsForBabylon = [];
                            this._wrappedUvsForBabylon = [];
                            this._wrappedColorsForBabylon = [];
                            this._tuplePosNorm = [];
                            this._curPositionInIndices = 0;
                        }
                        /**
                         * Create triangles from polygons
                         * It is important to notice that a triangle is a polygon
                         * We get 5 patterns of face defined in OBJ File :
                         * facePattern1 = ["1","2","3","4","5","6"]
                         * facePattern2 = ["1/1","2/2","3/3","4/4","5/5","6/6"]
                         * facePattern3 = ["1/1/1","2/2/2","3/3/3","4/4/4","5/5/5","6/6/6"]
                         * facePattern4 = ["1//1","2//2","3//3","4//4","5//5","6//6"]
                         * facePattern5 = ["-1/-1/-1","-2/-2/-2","-3/-3/-3","-4/-4/-4","-5/-5/-5","-6/-6/-6"]
                         * Each pattern is divided by the same method
                         * @param face Array[String] The indices of elements
                         * @param faces
                         * @param v Integer The variable to increment
                         */
                        _getTriangles(faces, v) {
                            //Work for each element of the array
                            for (let faceIndex = v; faceIndex < faces.length - 1; faceIndex++) {
                                //Add on the triangle variable the indexes to obtain triangles
                                this._triangles.push(faces[0], faces[faceIndex], faces[faceIndex + 1]);
                            }
                            //Result obtained after 2 iterations:
                            //Pattern1 => triangle = ["1","2","3","1","3","4"];
                            //Pattern2 => triangle = ["1/1","2/2","3/3","1/1","3/3","4/4"];
                            //Pattern3 => triangle = ["1/1/1","2/2/2","3/3/3","1/1/1","3/3/3","4/4/4"];
                            //Pattern4 => triangle = ["1//1","2//2","3//3","1//1","3//3","4//4"];
                            //Pattern5 => triangle = ["-1/-1/-1","-2/-2/-2","-3/-3/-3","-1/-1/-1","-3/-3/-3","-4/-4/-4"];
                        }
                        /**
                         * Create triangles and push the data for each polygon for the pattern 1
                         * In this pattern we get vertice positions
                         * @param face
                         * @param v
                         */
                        _setDataForCurrentFaceWithPattern1(face, v) {
                            //Get the indices of triangles for each polygon
                            this._getTriangles(face, v);
                            //For each element in the triangles array.
                            //This var could contains 1 to an infinity of triangles
                            for (let k = 0; k < this._triangles.length; k++) {
                                // Set position indice
                                const indicePositionFromObj = parseInt(this._triangles[k]) - 1;
                                this._setData(indicePositionFromObj, 0, 0, // In the pattern 1, normals and uvs are not defined
                                    this._positions[indicePositionFromObj], // Get the vectors data
                                    core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), // Create default vectors
                                    this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
                            }
                            //Reset variable for the next line
                            this._triangles = [];
                        }
                        /**
                         * Create triangles and push the data for each polygon for the pattern 2
                         * In this pattern we get vertice positions and uvsu
                         * @param face
                         * @param v
                         */
                        _setDataForCurrentFaceWithPattern2(face, v) {
                            //Get the indices of triangles for each polygon
                            this._getTriangles(face, v);
                            for (let k = 0; k < this._triangles.length; k++) {
                                //triangle[k] = "1/1"
                                //Split the data for getting position and uv
                                const point = this._triangles[k].split("/"); // ["1", "1"]
                                //Set position indice
                                const indicePositionFromObj = parseInt(point[0]) - 1;
                                //Set uv indice
                                const indiceUvsFromObj = parseInt(point[1]) - 1;
                                this._setData(indicePositionFromObj, indiceUvsFromObj, 0, //Default value for normals
                                    this._positions[indicePositionFromObj], //Get the values for each element
                                    this._uvs[indiceUvsFromObj], core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), //Default value for normals
                                    this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
                            }
                            //Reset variable for the next line
                            this._triangles = [];
                        }
                        /**
                         * Create triangles and push the data for each polygon for the pattern 3
                         * In this pattern we get vertice positions, uvs and normals
                         * @param face
                         * @param v
                         */
                        _setDataForCurrentFaceWithPattern3(face, v) {
                            //Get the indices of triangles for each polygon
                            this._getTriangles(face, v);
                            for (let k = 0; k < this._triangles.length; k++) {
                                //triangle[k] = "1/1/1"
                                //Split the data for getting position, uv, and normals
                                const point = this._triangles[k].split("/"); // ["1", "1", "1"]
                                // Set position indice
                                const indicePositionFromObj = parseInt(point[0]) - 1;
                                // Set uv indice
                                const indiceUvsFromObj = parseInt(point[1]) - 1;
                                // Set normal indice
                                const indiceNormalFromObj = parseInt(point[2]) - 1;
                                this._setData(indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, this._positions[indicePositionFromObj], this._uvs[indiceUvsFromObj], this._normals[indiceNormalFromObj] //Set the vector for each component
                                );
                            }
                            //Reset variable for the next line
                            this._triangles = [];
                        }
                        /**
                         * Create triangles and push the data for each polygon for the pattern 4
                         * In this pattern we get vertice positions and normals
                         * @param face
                         * @param v
                         */
                        _setDataForCurrentFaceWithPattern4(face, v) {
                            this._getTriangles(face, v);
                            for (let k = 0; k < this._triangles.length; k++) {
                                //triangle[k] = "1//1"
                                //Split the data for getting position and normals
                                const point = this._triangles[k].split("//"); // ["1", "1"]
                                // We check indices, and normals
                                const indicePositionFromObj = parseInt(point[0]) - 1;
                                const indiceNormalFromObj = parseInt(point[1]) - 1;
                                this._setData(indicePositionFromObj, 1, //Default value for uv
                                    indiceNormalFromObj, this._positions[indicePositionFromObj], //Get each vector of data
                                    core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), this._normals[indiceNormalFromObj], this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
                            }
                            //Reset variable for the next line
                            this._triangles = [];
                        }
                        /*
                         * Create triangles and push the data for each polygon for the pattern 3
                         * In this pattern we get vertice positions, uvs and normals
                         * @param face
                         * @param v
                         */
                        _setDataForCurrentFaceWithPattern5(face, v) {
                            //Get the indices of triangles for each polygon
                            this._getTriangles(face, v);
                            for (let k = 0; k < this._triangles.length; k++) {
                                //triangle[k] = "-1/-1/-1"
                                //Split the data for getting position, uv, and normals
                                const point = this._triangles[k].split("/"); // ["-1", "-1", "-1"]
                                // Set position indice
                                const indicePositionFromObj = this._positions.length + parseInt(point[0]);
                                // Set uv indice
                                const indiceUvsFromObj = this._uvs.length + parseInt(point[1]);
                                // Set normal indice
                                const indiceNormalFromObj = this._normals.length + parseInt(point[2]);
                                this._setData(indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, this._positions[indicePositionFromObj], this._uvs[indiceUvsFromObj], this._normals[indiceNormalFromObj], //Set the vector for each component
                                    this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
                            }
                            //Reset variable for the next line
                            this._triangles = [];
                        }
                        _addPreviousObjMesh() {
                            //Check if it is not the first mesh. Otherwise we don't have data.
                            if (this._meshesFromObj.length > 0) {
                                //Get the previous mesh for applying the data about the faces
                                //=> in obj file, faces definition append after the name of the mesh
                                this._handledMesh = this._meshesFromObj[this._meshesFromObj.length - 1];
                                //Set the data into Array for the mesh
                                this._unwrapData();
                                // Reverse tab. Otherwise face are displayed in the wrong sens
                                this._indicesForBabylon.reverse();
                                //Set the information for the mesh
                                //Slice the array to avoid rewriting because of the fact this is the same var which be rewrited
                                this._handledMesh.indices = this._indicesForBabylon.slice();
                                this._handledMesh.positions = this._unwrappedPositionsForBabylon.slice();
                                this._handledMesh.normals = this._unwrappedNormalsForBabylon.slice();
                                this._handledMesh.uvs = this._unwrappedUVForBabylon.slice();
                                if (this._loadingOptions.importVertexColors) {
                                    this._handledMesh.colors = this._unwrappedColorsForBabylon.slice();
                                }
                                //Reset the array for the next mesh
                                this._indicesForBabylon = [];
                                this._unwrappedPositionsForBabylon = [];
                                this._unwrappedColorsForBabylon = [];
                                this._unwrappedNormalsForBabylon = [];
                                this._unwrappedUVForBabylon = [];
                            }
                        }
                        _optimizeNormals(mesh) {
                            const positions = mesh.getVerticesData(core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
                            const normals = mesh.getVerticesData(core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
                            const mapVertices = {};
                            if (!positions || !normals) {
                                return;
                            }
                            for (let i = 0; i < positions.length / 3; i++) {
                                const x = positions[i * 3 + 0];
                                const y = positions[i * 3 + 1];
                                const z = positions[i * 3 + 2];
                                const key = x + "_" + y + "_" + z;
                                let lst = mapVertices[key];
                                if (!lst) {
                                    lst = [];
                                    mapVertices[key] = lst;
                                }
                                lst.push(i);
                            }
                            const normal = new core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3();
                            for (const key in mapVertices) {
                                const lst = mapVertices[key];
                                if (lst.length < 2) {
                                    continue;
                                }
                                const v0Idx = lst[0];
                                for (let i = 1; i < lst.length; ++i) {
                                    const vIdx = lst[i];
                                    normals[v0Idx * 3 + 0] += normals[vIdx * 3 + 0];
                                    normals[v0Idx * 3 + 1] += normals[vIdx * 3 + 1];
                                    normals[v0Idx * 3 + 2] += normals[vIdx * 3 + 2];
                                }
                                normal.copyFromFloats(normals[v0Idx * 3 + 0], normals[v0Idx * 3 + 1], normals[v0Idx * 3 + 2]);
                                normal.normalize();
                                for (let i = 0; i < lst.length; ++i) {
                                    const vIdx = lst[i];
                                    normals[vIdx * 3 + 0] = normal.x;
                                    normals[vIdx * 3 + 1] = normal.y;
                                    normals[vIdx * 3 + 2] = normal.z;
                                }
                            }
                            mesh.setVerticesData(core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
                        }
                        /**
                         * Function used to parse an OBJ string
                         * @param meshesNames defines the list of meshes to load (all if not defined)
                         * @param data defines the OBJ string
                         * @param scene defines the hosting scene
                         * @param assetContainer defines the asset container to load data in
                         * @param onFileToLoadFound defines a callback that will be called if a MTL file is found
                         */
                        parse(meshesNames, data, scene, assetContainer, onFileToLoadFound) {
                            var _a;
                            // Split the file into lines
                            const lines = data.split("\n");
                            // Look at each line
                            for (let i = 0; i < lines.length; i++) {
                                const line = lines[i].trim().replace(/\s\s/g, " ");
                                var result;
                                // Comment or newLine
                                if (line.length === 0 || line.charAt(0) === "#") {
                                    continue;
                                    //Get information about one position possible for the vertices
                                }
                                else if (SolidParser.VertexPattern.test(line)) {
                                    result = line.match(/[^ ]+/g); // match will return non-null due to passing regex pattern
                                    // Value of result with line: "v 1.0 2.0 3.0"
                                    // ["v", "1.0", "2.0", "3.0"]
                                    // Create a Vector3 with the position x, y, z
                                    this._positions.push(new core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])));
                                    if (this._loadingOptions.importVertexColors) {
                                        if (result.length >= 7) {
                                            const r = parseFloat(result[4]);
                                            const g = parseFloat(result[5]);
                                            const b = parseFloat(result[6]);
                                            this._colors.push(new core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color4(r > 1 ? r / 255 : r, g > 1 ? g / 255 : g, b > 1 ? b / 255 : b, result.length === 7 || result[7] === undefined ? 1 : parseFloat(result[7])));
                                        }
                                        else {
                                            // TODO: maybe push NULL and if all are NULL to skip (and remove grayColor var).
                                            this._colors.push(this._grayColor);
                                        }
                                    }
                                }
                                else if ((result = SolidParser.NormalPattern.exec(line)) !== null) {
                                    //Create a Vector3 with the normals x, y, z
                                    //Value of result
                                    // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                                    //Add the Vector in the list of normals
                                    this._normals.push(new core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])));
                                }
                                else if ((result = SolidParser.UVPattern.exec(line)) !== null) {
                                    //Create a Vector2 with the normals u, v
                                    //Value of result
                                    // ["vt 0.1 0.2 0.3", "0.1", "0.2"]
                                    //Add the Vector in the list of uvs
                                    this._uvs.push(new core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2(parseFloat(result[1]) * this._loadingOptions.UVScaling.x, parseFloat(result[2]) * this._loadingOptions.UVScaling.y));
                                    //Identify patterns of faces
                                    //Face could be defined in different type of pattern
                                }
                                else if ((result = SolidParser.FacePattern3.exec(line)) !== null) {
                                    //Value of result:
                                    //["f 1/1/1 2/2/2 3/3/3", "1/1/1 2/2/2 3/3/3"...]
                                    //Set the data for this face
                                    this._setDataForCurrentFaceWithPattern3(result[1].trim().split(" "), // ["1/1/1", "2/2/2", "3/3/3"]
                                        1);
                                }
                                else if ((result = SolidParser.FacePattern4.exec(line)) !== null) {
                                    //Value of result:
                                    //["f 1//1 2//2 3//3", "1//1 2//2 3//3"...]
                                    //Set the data for this face
                                    this._setDataForCurrentFaceWithPattern4(result[1].trim().split(" "), // ["1//1", "2//2", "3//3"]
                                        1);
                                }
                                else if ((result = SolidParser.FacePattern5.exec(line)) !== null) {
                                    //Value of result:
                                    //["f -1/-1/-1 -2/-2/-2 -3/-3/-3", "-1/-1/-1 -2/-2/-2 -3/-3/-3"...]
                                    //Set the data for this face
                                    this._setDataForCurrentFaceWithPattern5(result[1].trim().split(" "), // ["-1/-1/-1", "-2/-2/-2", "-3/-3/-3"]
                                        1);
                                }
                                else if ((result = SolidParser.FacePattern2.exec(line)) !== null) {
                                    //Value of result:
                                    //["f 1/1 2/2 3/3", "1/1 2/2 3/3"...]
                                    //Set the data for this face
                                    this._setDataForCurrentFaceWithPattern2(result[1].trim().split(" "), // ["1/1", "2/2", "3/3"]
                                        1);
                                }
                                else if ((result = SolidParser.FacePattern1.exec(line)) !== null) {
                                    //Value of result
                                    //["f 1 2 3", "1 2 3"...]
                                    //Set the data for this face
                                    this._setDataForCurrentFaceWithPattern1(result[1].trim().split(" "), // ["1", "2", "3"]
                                        1);
                                    // Define a mesh or an object
                                    // Each time this keyword is analysed, create a new Object with all data for creating a babylonMesh
                                }
                                else if (SolidParser.GroupDescriptor.test(line) || SolidParser.ObjectDescriptor.test(line)) {
                                    // Create a new mesh corresponding to the name of the group.
                                    // Definition of the mesh
                                    var objMesh = {
                                        name: line.substring(2).trim(),
                                        indices: undefined,
                                        positions: undefined,
                                        normals: undefined,
                                        uvs: undefined,
                                        colors: undefined,
                                        materialName: "",
                                    };
                                    this._addPreviousObjMesh();
                                    //Push the last mesh created with only the name
                                    this._meshesFromObj.push(objMesh);
                                    //Set this variable to indicate that now meshesFromObj has objects defined inside
                                    this._hasMeshes = true;
                                    this._isFirstMaterial = true;
                                    this._increment = 1;
                                    //Keyword for applying a material
                                }
                                else if (SolidParser.UseMtlDescriptor.test(line)) {
                                    //Get the name of the material
                                    this._materialNameFromObj = line.substring(7).trim();
                                    //If this new material is in the same mesh
                                    if (!this._isFirstMaterial || !this._hasMeshes) {
                                        //Set the data for the previous mesh
                                        this._addPreviousObjMesh();
                                        //Create a new mesh
                                        var objMesh =
                                        //Set the name of the current obj mesh
                                        {
                                            name: (this._objMeshName || "mesh") + "_mm" + this._increment.toString(),
                                            indices: undefined,
                                            positions: undefined,
                                            normals: undefined,
                                            uvs: undefined,
                                            colors: undefined,
                                            materialName: this._materialNameFromObj,
                                        };
                                        this._increment++;
                                        //If meshes are already defined
                                        this._meshesFromObj.push(objMesh);
                                        this._hasMeshes = true;
                                    }
                                    //Set the material name if the previous line define a mesh
                                    if (this._hasMeshes && this._isFirstMaterial) {
                                        //Set the material name to the previous mesh (1 material per mesh)
                                        this._meshesFromObj[this._meshesFromObj.length - 1].materialName = this._materialNameFromObj;
                                        this._isFirstMaterial = false;
                                    }
                                    // Keyword for loading the mtl file
                                }
                                else if (SolidParser.MtlLibGroupDescriptor.test(line)) {
                                    // Get the name of mtl file
                                    onFileToLoadFound(line.substring(7).trim());
                                    // Apply smoothing
                                }
                                else if (SolidParser.SmoothDescriptor.test(line)) {
                                    // smooth shading => apply smoothing
                                    // Today I don't know it work with babylon and with obj.
                                    // With the obj file  an integer is set
                                }
                                else {
                                    //If there is another possibility
                                    //console.log("Unhandled expression at line : " + line);
                                }
                            }
                            // At the end of the file, add the last mesh into the meshesFromObj array
                            if (this._hasMeshes) {
                                // Set the data for the last mesh
                                this._handledMesh = this._meshesFromObj[this._meshesFromObj.length - 1];
                                //Reverse indices for displaying faces in the good sense
                                this._indicesForBabylon.reverse();
                                //Get the good array
                                this._unwrapData();
                                //Set array
                                this._handledMesh.indices = this._indicesForBabylon;
                                this._handledMesh.positions = this._unwrappedPositionsForBabylon;
                                this._handledMesh.normals = this._unwrappedNormalsForBabylon;
                                this._handledMesh.uvs = this._unwrappedUVForBabylon;
                                if (this._loadingOptions.importVertexColors) {
                                    this._handledMesh.colors = this._unwrappedColorsForBabylon;
                                }
                            }
                            // If any o or g keyword not found, create a mesh with a random id
                            if (!this._hasMeshes) {
                                let newMaterial = null;
                                if (this._indicesForBabylon.length) {
                                    // reverse tab of indices
                                    this._indicesForBabylon.reverse();
                                    //Get positions normals uvs
                                    this._unwrapData();
                                }
                                else {
                                    // There is no indices in the file. We will have to switch to point cloud rendering
                                    for (const pos of this._positions) {
                                        this._unwrappedPositionsForBabylon.push(pos.x, pos.y, pos.z);
                                    }
                                    if (this._normals.length) {
                                        for (const normal of this._normals) {
                                            this._unwrappedNormalsForBabylon.push(normal.x, normal.y, normal.z);
                                        }
                                    }
                                    if (this._uvs.length) {
                                        for (const uv of this._uvs) {
                                            this._unwrappedUVForBabylon.push(uv.x, uv.y);
                                        }
                                    }
                                    if (this._colors.length) {
                                        for (const color of this._colors) {
                                            this._unwrappedColorsForBabylon.push(color.r, color.g, color.b, color.a);
                                        }
                                    }
                                    if (!this._materialNameFromObj) {
                                        // Create a material with point cloud on
                                        newMaterial = new core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Geometry.RandomId(), scene);
                                        newMaterial.pointsCloud = true;
                                        this._materialNameFromObj = newMaterial.name;
                                        if (!this._normals.length) {
                                            newMaterial.disableLighting = true;
                                            newMaterial.emissiveColor = core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
                                        }
                                    }
                                }
                                //Set data for one mesh
                                this._meshesFromObj.push({
                                    name: core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Geometry.RandomId(),
                                    indices: this._indicesForBabylon,
                                    positions: this._unwrappedPositionsForBabylon,
                                    colors: this._unwrappedColorsForBabylon,
                                    normals: this._unwrappedNormalsForBabylon,
                                    uvs: this._unwrappedUVForBabylon,
                                    materialName: this._materialNameFromObj,
                                    directMaterial: newMaterial,
                                });
                            }
                            //Set data for each mesh
                            for (let j = 0; j < this._meshesFromObj.length; j++) {
                                //check meshesNames (stlFileLoader)
                                if (meshesNames && this._meshesFromObj[j].name) {
                                    if (meshesNames instanceof Array) {
                                        if (meshesNames.indexOf(this._meshesFromObj[j].name) === -1) {
                                            continue;
                                        }
                                    }
                                    else {
                                        if (this._meshesFromObj[j].name !== meshesNames) {
                                            continue;
                                        }
                                    }
                                }
                                //Get the current mesh
                                //Set the data with VertexBuffer for each mesh
                                this._handledMesh = this._meshesFromObj[j];
                                //Create a Mesh with the name of the obj mesh
                                scene._blockEntityCollection = !!assetContainer;
                                const babylonMesh = new core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Mesh(this._meshesFromObj[j].name, scene);
                                babylonMesh._parentContainer = assetContainer;
                                scene._blockEntityCollection = false;
                                //Push the name of the material to an array
                                //This is indispensable for the importMesh function
                                this._materialToUse.push(this._meshesFromObj[j].materialName);
                                if (((_a = this._handledMesh.positions) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                                    //Push the mesh into an array
                                    this._babylonMeshesArray.push(babylonMesh);
                                    continue;
                                }
                                const vertexData = new core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexData(); //The container for the values
                                //Set the data for the babylonMesh
                                vertexData.uvs = this._handledMesh.uvs;
                                vertexData.indices = this._handledMesh.indices;
                                vertexData.positions = this._handledMesh.positions;
                                if (this._loadingOptions.computeNormals) {
                                    const normals = new Array();
                                    core_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexData.ComputeNormals(this._handledMesh.positions, this._handledMesh.indices, normals);
                                    vertexData.normals = normals;
                                }
                                else {
                                    vertexData.normals = this._handledMesh.normals;
                                }
                                if (this._loadingOptions.importVertexColors) {
                                    vertexData.colors = this._handledMesh.colors;
                                }
                                //Set the data from the VertexBuffer to the current Mesh
                                vertexData.applyToMesh(babylonMesh);
                                if (this._loadingOptions.invertY) {
                                    babylonMesh.scaling.y *= -1;
                                }
                                if (this._loadingOptions.optimizeNormals) {
                                    this._optimizeNormals(babylonMesh);
                                }
                                //Push the mesh into an array
                                this._babylonMeshesArray.push(babylonMesh);
                                if (this._handledMesh.directMaterial) {
                                    babylonMesh.material = this._handledMesh.directMaterial;
                                }
                            }
                        }
                    }
                    // Descriptor
                    /** Object descriptor */
                    SolidParser.ObjectDescriptor = /^o/;
                    /** Group descriptor */
                    SolidParser.GroupDescriptor = /^g/;
                    /** Material lib descriptor */
                    SolidParser.MtlLibGroupDescriptor = /^mtllib /;
                    /** Use a material descriptor */
                    SolidParser.UseMtlDescriptor = /^usemtl /;
                    /** Smooth descriptor */
                    SolidParser.SmoothDescriptor = /^s /;
                    // Patterns
                    /** Pattern used to detect a vertex */
                    SolidParser.VertexPattern = /v(\s+[\d|\.|\+|\-|e|E]+){3,7}/;
                    /** Pattern used to detect a normal */
                    SolidParser.NormalPattern = /vn(\s+[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
                    /** Pattern used to detect a UV set */
                    SolidParser.UVPattern = /vt(\s+[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
                    /** Pattern used to detect a first kind of face (f vertex vertex vertex) */
                    SolidParser.FacePattern1 = /f\s+(([\d]{1,}[\s]?){3,})+/;
                    /** Pattern used to detect a second kind of face (f vertex/uvs vertex/uvs vertex/uvs) */
                    SolidParser.FacePattern2 = /f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
                    /** Pattern used to detect a third kind of face (f vertex/uvs/normal vertex/uvs/normal vertex/uvs/normal) */
                    SolidParser.FacePattern3 = /f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
                    /** Pattern used to detect a fourth kind of face (f vertex//normal vertex//normal vertex//normal)*/
                    SolidParser.FacePattern4 = /f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/;
                    /** Pattern used to detect a fifth kind of face (f -vertex/-uvs/-normal -vertex/-uvs/-normal -vertex/-uvs/-normal) */
                    SolidParser.FacePattern5 = /f\s+(((-[\d]{1,}\/-[\d]{1,}\/-[\d]{1,}[\s]?){3,})+)/;


                    /***/
}),

/***/ "../../../lts/loaders/dist/STL/index.js":
/*!**********************************************!*\
  !*** ../../../lts/loaders/dist/STL/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STLFileLoader": () => (/* reexport safe */ _stlFileLoader__WEBPACK_IMPORTED_MODULE_0__.STLFileLoader)
                        /* harmony export */
});
/* harmony import */ var _stlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stlFileLoader */ "../../../lts/loaders/dist/STL/stlFileLoader.js");



                    /***/
}),

/***/ "../../../lts/loaders/dist/STL/stlFileLoader.js":
/*!******************************************************!*\
  !*** ../../../lts/loaders/dist/STL/stlFileLoader.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STLFileLoader": () => (/* binding */ STLFileLoader)
                        /* harmony export */
});
/* harmony import */ var core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/assetContainer */ "core/Misc/observable");
/* harmony import */ var core_Misc_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__);





                    /**
                     * STL file type loader.
                     * This is a babylon scene loader plugin.
                     */
                    class STLFileLoader {
                        constructor() {
                            /** @hidden */
                            this.solidPattern = /solid (\S*)([\S\s]*?)endsolid[ ]*(\S*)/g;
                            /** @hidden */
                            this.facetsPattern = /facet([\s\S]*?)endfacet/g;
                            /** @hidden */
                            this.normalPattern = /normal[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
                            /** @hidden */
                            this.vertexPattern = /vertex[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
                            /**
                             * Defines the name of the plugin.
                             */
                            this.name = "stl";
                            /**
                             * Defines the extensions the stl loader is able to load.
                             * force data to come in as an ArrayBuffer
                             * we'll convert to string if it looks like it's an ASCII .stl
                             */
                            this.extensions = {
                                ".stl": { isBinary: true },
                            };
                        }
                        /**
                         * Import meshes into a scene.
                         * @param meshesNames An array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
                         * @param scene The scene to import into
                         * @param data The data to import
                         * @param rootUrl The root url for scene and resources
                         * @param meshes The meshes array to import into
                         * @param particleSystems The particle systems array to import into
                         * @param skeletons The skeletons array to import into
                         * @param onError The callback when import fails
                         * @returns True if successful or false otherwise
                         */
                        importMesh(meshesNames, scene, data, rootUrl, meshes, particleSystems, skeletons) {
                            let matches;
                            if (typeof data !== "string") {
                                if (this._isBinary(data)) {
                                    // binary .stl
                                    var babylonMesh = new core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Mesh("stlmesh", scene);
                                    this._parseBinary(babylonMesh, data);
                                    if (meshes) {
                                        meshes.push(babylonMesh);
                                    }
                                    return true;
                                }
                                // ASCII .stl
                                // convert to string
                                const array_buffer = new Uint8Array(data);
                                let str = "";
                                for (let i = 0; i < data.byteLength; i++) {
                                    str += String.fromCharCode(array_buffer[i]); // implicitly assumes little-endian
                                }
                                data = str;
                            }
                            //if arrived here, data is a string, containing the STLA data.
                            while ((matches = this.solidPattern.exec(data))) {
                                let meshName = matches[1];
                                const meshNameFromEnd = matches[3];
                                if (meshName != meshNameFromEnd) {
                                    core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Error in STL, solid name != endsolid name");
                                    return false;
                                }
                                // check meshesNames
                                if (meshesNames && meshName) {
                                    if (meshesNames instanceof Array) {
                                        if (!meshesNames.indexOf(meshName)) {
                                            continue;
                                        }
                                    }
                                    else {
                                        if (meshName !== meshesNames) {
                                            continue;
                                        }
                                    }
                                }
                                // stl mesh name can be empty as well
                                meshName = meshName || "stlmesh";
                                var babylonMesh = new core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Mesh(meshName, scene);
                                this._parseASCII(babylonMesh, matches[2]);
                                if (meshes) {
                                    meshes.push(babylonMesh);
                                }
                            }
                            return true;
                        }
                        /**
                         * Load into a scene.
                         * @param scene The scene to load into
                         * @param data The data to import
                         * @param rootUrl The root url for scene and resources
                         * @param onError The callback when import fails
                         * @returns true if successful or false otherwise
                         */
                        load(scene, data, rootUrl) {
                            const result = this.importMesh(null, scene, data, rootUrl, null, null, null);
                            return result;
                        }
                        /**
                         * Load into an asset container.
                         * @param scene The scene to load into
                         * @param data The data to import
                         * @param rootUrl The root url for scene and resources
                         * @param onError The callback when import fails
                         * @returns The loaded asset container
                         */
                        loadAssetContainer(scene, data, rootUrl, onError) {
                            const container = new core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
                            scene._blockEntityCollection = true;
                            this.importMesh(null, scene, data, rootUrl, container.meshes, null, null);
                            scene._blockEntityCollection = false;
                            return container;
                        }
                        _isBinary(data) {
                            // check if file size is correct for binary stl
                            let faceSize, nFaces, reader;
                            reader = new DataView(data);
                            // A Binary STL header is 80 bytes, if the data size is not great than
                            // that then it's not a binary STL.
                            if (reader.byteLength <= 80) {
                                return false;
                            }
                            faceSize = (32 / 8) * 3 + (32 / 8) * 3 * 3 + 16 / 8;
                            nFaces = reader.getUint32(80, true);
                            if (80 + 32 / 8 + nFaces * faceSize === reader.byteLength) {
                                return true;
                            }
                            // check characters higher than ASCII to confirm binary
                            const fileLength = reader.byteLength;
                            for (let index = 0; index < fileLength; index++) {
                                if (reader.getUint8(index) > 127) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        _parseBinary(mesh, data) {
                            const reader = new DataView(data);
                            const faces = reader.getUint32(80, true);
                            const dataOffset = 84;
                            const faceLength = 12 * 4 + 2;
                            let offset = 0;
                            const positions = new Float32Array(faces * 3 * 3);
                            const normals = new Float32Array(faces * 3 * 3);
                            const indices = new Uint32Array(faces * 3);
                            let indicesCount = 0;
                            for (let face = 0; face < faces; face++) {
                                const start = dataOffset + face * faceLength;
                                const normalX = reader.getFloat32(start, true);
                                const normalY = reader.getFloat32(start + 4, true);
                                const normalZ = reader.getFloat32(start + 8, true);
                                for (let i = 1; i <= 3; i++) {
                                    const vertexstart = start + i * 12;
                                    // ordering is intentional to match ascii import
                                    positions[offset] = reader.getFloat32(vertexstart, true);
                                    normals[offset] = normalX;
                                    if (!STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                                        positions[offset + 2] = reader.getFloat32(vertexstart + 4, true);
                                        positions[offset + 1] = reader.getFloat32(vertexstart + 8, true);
                                        normals[offset + 2] = normalY;
                                        normals[offset + 1] = normalZ;
                                    }
                                    else {
                                        positions[offset + 1] = reader.getFloat32(vertexstart + 4, true);
                                        positions[offset + 2] = reader.getFloat32(vertexstart + 8, true);
                                        normals[offset + 1] = normalY;
                                        normals[offset + 2] = normalZ;
                                    }
                                    offset += 3;
                                }
                                indices[indicesCount] = indicesCount++;
                                indices[indicesCount] = indicesCount++;
                                indices[indicesCount] = indicesCount++;
                            }
                            mesh.setVerticesData(core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, positions);
                            mesh.setVerticesData(core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
                            mesh.setIndices(indices);
                            mesh.computeWorldMatrix(true);
                        }
                        _parseASCII(mesh, solidData) {
                            const positions = [];
                            const normals = [];
                            const indices = [];
                            let indicesCount = 0;
                            //load facets, ignoring loop as the standard doesn't define it can contain more than vertices
                            let matches;
                            while ((matches = this.facetsPattern.exec(solidData))) {
                                const facet = matches[1];
                                //one normal per face
                                const normalMatches = this.normalPattern.exec(facet);
                                this.normalPattern.lastIndex = 0;
                                if (!normalMatches) {
                                    continue;
                                }
                                const normal = [Number(normalMatches[1]), Number(normalMatches[5]), Number(normalMatches[3])];
                                var vertexMatch;
                                while ((vertexMatch = this.vertexPattern.exec(facet))) {
                                    if (!STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                                        positions.push(Number(vertexMatch[1]), Number(vertexMatch[5]), Number(vertexMatch[3]));
                                        normals.push(normal[0], normal[1], normal[2]);
                                    }
                                    else {
                                        positions.push(Number(vertexMatch[1]), Number(vertexMatch[3]), Number(vertexMatch[5]));
                                        // Flipping the second and third component because inverted
                                        // when normal was declared.
                                        normals.push(normal[0], normal[2], normal[1]);
                                    }
                                }
                                indices.push(indicesCount++, indicesCount++, indicesCount++);
                                this.vertexPattern.lastIndex = 0;
                            }
                            this.facetsPattern.lastIndex = 0;
                            mesh.setVerticesData(core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, positions);
                            mesh.setVerticesData(core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
                            mesh.setIndices(indices);
                            mesh.computeWorldMatrix(true);
                        }
                    }
                    /**
                     * Defines if Y and Z axes are swapped or not when loading an STL file.
                     * The default is false to maintain backward compatibility. When set to
                     * true, coordinates from the STL file are used without change.
                     */
                    STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES = false;
                    if (core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.SceneLoader) {
                        core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.RegisterPlugin(new STLFileLoader());
                    }


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/1.0/glTFBinaryExtension.js":
/*!*****************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/1.0/glTFBinaryExtension.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTFBinaryExtension": () => (/* binding */ GLTFBinaryExtension)
                        /* harmony export */
});
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFLoader */ "../../../lts/loaders/dist/glTF/1.0/glTFLoader.js");
/* harmony import */ var _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFLoaderUtils */ "../../../lts/loaders/dist/glTF/1.0/glTFLoaderUtils.js");
/* harmony import */ var _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFLoaderInterfaces */ "../../../lts/loaders/dist/glTF/1.0/glTFLoaderInterfaces.js");



                    const BinaryExtensionBufferName = "binary_glTF";
                    /** @hidden */
                    class GLTFBinaryExtension extends _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderExtension {
                        constructor() {
                            super("KHR_binary_glTF");
                        }
                        loadRuntimeAsync(scene, data, rootUrl, onSuccess, onError) {
                            const extensionsUsed = data.json.extensionsUsed;
                            if (!extensionsUsed || extensionsUsed.indexOf(this.name) === -1 || !data.bin) {
                                return false;
                            }
                            this._bin = data.bin;
                            onSuccess(_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderBase.CreateRuntime(data.json, scene, rootUrl));
                            return true;
                        }
                        loadBufferAsync(gltfRuntime, id, onSuccess, onError) {
                            if (gltfRuntime.extensionsUsed.indexOf(this.name) === -1) {
                                return false;
                            }
                            if (id !== BinaryExtensionBufferName) {
                                return false;
                            }
                            this._bin.readAsync(0, this._bin.byteLength).then(onSuccess, (error) => onError(error.message));
                            return true;
                        }
                        loadTextureBufferAsync(gltfRuntime, id, onSuccess, onError) {
                            const texture = gltfRuntime.textures[id];
                            const source = gltfRuntime.images[texture.source];
                            if (!source.extensions || !(this.name in source.extensions)) {
                                return false;
                            }
                            const sourceExt = source.extensions[this.name];
                            const bufferView = gltfRuntime.bufferViews[sourceExt.bufferView];
                            const buffer = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_1__.GLTFUtils.GetBufferFromBufferView(gltfRuntime, bufferView, 0, bufferView.byteLength, _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EComponentType.UNSIGNED_BYTE);
                            onSuccess(buffer);
                            return true;
                        }
                        loadShaderStringAsync(gltfRuntime, id, onSuccess, onError) {
                            const shader = gltfRuntime.shaders[id];
                            if (!shader.extensions || !(this.name in shader.extensions)) {
                                return false;
                            }
                            const binaryExtensionShader = shader.extensions[this.name];
                            const bufferView = gltfRuntime.bufferViews[binaryExtensionShader.bufferView];
                            const shaderBytes = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_1__.GLTFUtils.GetBufferFromBufferView(gltfRuntime, bufferView, 0, bufferView.byteLength, _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EComponentType.UNSIGNED_BYTE);
                            setTimeout(() => {
                                const shaderString = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_1__.GLTFUtils.DecodeBufferToText(shaderBytes);
                                onSuccess(shaderString);
                            });
                            return true;
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(new GLTFBinaryExtension());


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/1.0/glTFLoader.js":
/*!********************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/1.0/glTFLoader.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTFLoader": () => (/* binding */ GLTFLoader),
/* harmony export */   "GLTFLoaderBase": () => (/* binding */ GLTFLoaderBase),
/* harmony export */   "GLTFLoaderExtension": () => (/* binding */ GLTFLoaderExtension)
                        /* harmony export */
});
/* harmony import */ var _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFLoaderInterfaces */ "../../../lts/loaders/dist/glTF/1.0/glTFLoaderInterfaces.js");
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/Engines/constants */ "core/Misc/observable");
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFLoaderUtils */ "../../../lts/loaders/dist/glTF/1.0/glTFLoaderUtils.js");
/* harmony import */ var _glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../glTFFileLoader */ "../../../lts/loaders/dist/glTF/glTFFileLoader.js");




























                    /**
                     * Tokenizer. Used for shaders compatibility
                     * Automatically map world, view, projection, worldViewProjection, attributes and so on
                     */
                    var ETokenType;
                    (function (ETokenType) {
                        ETokenType[ETokenType["IDENTIFIER"] = 1] = "IDENTIFIER";
                        ETokenType[ETokenType["UNKNOWN"] = 2] = "UNKNOWN";
                        ETokenType[ETokenType["END_OF_INPUT"] = 3] = "END_OF_INPUT";
                    })(ETokenType || (ETokenType = {}));
                    class Tokenizer {
                        constructor(toParse) {
                            this._pos = 0;
                            this.currentToken = ETokenType.UNKNOWN;
                            this.currentIdentifier = "";
                            this.currentString = "";
                            this.isLetterOrDigitPattern = /^[a-zA-Z0-9]+$/;
                            this._toParse = toParse;
                            this._maxPos = toParse.length;
                        }
                        getNextToken() {
                            if (this.isEnd()) {
                                return ETokenType.END_OF_INPUT;
                            }
                            this.currentString = this.read();
                            this.currentToken = ETokenType.UNKNOWN;
                            if (this.currentString === "_" || this.isLetterOrDigitPattern.test(this.currentString)) {
                                this.currentToken = ETokenType.IDENTIFIER;
                                this.currentIdentifier = this.currentString;
                                while (!this.isEnd() && (this.isLetterOrDigitPattern.test((this.currentString = this.peek())) || this.currentString === "_")) {
                                    this.currentIdentifier += this.currentString;
                                    this.forward();
                                }
                            }
                            return this.currentToken;
                        }
                        peek() {
                            return this._toParse[this._pos];
                        }
                        read() {
                            return this._toParse[this._pos++];
                        }
                        forward() {
                            this._pos++;
                        }
                        isEnd() {
                            return this._pos >= this._maxPos;
                        }
                    }
                    /**
                     * Values
                     */
                    const glTFTransforms = ["MODEL", "VIEW", "PROJECTION", "MODELVIEW", "MODELVIEWPROJECTION", "JOINTMATRIX"];
                    const babylonTransforms = ["world", "view", "projection", "worldView", "worldViewProjection", "mBones"];
                    const glTFAnimationPaths = ["translation", "rotation", "scale"];
                    const babylonAnimationPaths = ["position", "rotationQuaternion", "scaling"];
                    /**
                     * Parse
                     * @param parsedBuffers
                     * @param gltfRuntime
                     */
                    const parseBuffers = (parsedBuffers, gltfRuntime) => {
                        for (const buf in parsedBuffers) {
                            const parsedBuffer = parsedBuffers[buf];
                            gltfRuntime.buffers[buf] = parsedBuffer;
                            gltfRuntime.buffersCount++;
                        }
                    };
                    const parseShaders = (parsedShaders, gltfRuntime) => {
                        for (const sha in parsedShaders) {
                            const parsedShader = parsedShaders[sha];
                            gltfRuntime.shaders[sha] = parsedShader;
                            gltfRuntime.shaderscount++;
                        }
                    };
                    const parseObject = (parsedObjects, runtimeProperty, gltfRuntime) => {
                        for (const object in parsedObjects) {
                            const parsedObject = parsedObjects[object];
                            gltfRuntime[runtimeProperty][object] = parsedObject;
                        }
                    };
                    /**
                     * Utils
                     * @param buffer
                     */
                    const normalizeUVs = (buffer) => {
                        if (!buffer) {
                            return;
                        }
                        for (let i = 0; i < buffer.length / 2; i++) {
                            buffer[i * 2 + 1] = 1.0 - buffer[i * 2 + 1];
                        }
                    };
                    const getAttribute = (attributeParameter) => {
                        if (attributeParameter.semantic === "NORMAL") {
                            return "normal";
                        }
                        else if (attributeParameter.semantic === "POSITION") {
                            return "position";
                        }
                        else if (attributeParameter.semantic === "JOINT") {
                            return "matricesIndices";
                        }
                        else if (attributeParameter.semantic === "WEIGHT") {
                            return "matricesWeights";
                        }
                        else if (attributeParameter.semantic === "COLOR") {
                            return "color";
                        }
                        else if (attributeParameter.semantic && attributeParameter.semantic.indexOf("TEXCOORD_") !== -1) {
                            const channel = Number(attributeParameter.semantic.split("_")[1]);
                            return "uv" + (channel === 0 ? "" : channel + 1);
                        }
                        return null;
                    };
                    /**
                     * Loads and creates animations
                     * @param gltfRuntime
                     */
                    const loadAnimations = (gltfRuntime) => {
                        for (const anim in gltfRuntime.animations) {
                            const animation = gltfRuntime.animations[anim];
                            if (!animation.channels || !animation.samplers) {
                                continue;
                            }
                            let lastAnimation = null;
                            for (let i = 0; i < animation.channels.length; i++) {
                                // Get parameters and load buffers
                                const channel = animation.channels[i];
                                const sampler = animation.samplers[channel.sampler];
                                if (!sampler) {
                                    continue;
                                }
                                let inputData = null;
                                let outputData = null;
                                if (animation.parameters) {
                                    inputData = animation.parameters[sampler.input];
                                    outputData = animation.parameters[sampler.output];
                                }
                                else {
                                    inputData = sampler.input;
                                    outputData = sampler.output;
                                }
                                const bufferInput = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetBufferFromAccessor(gltfRuntime, gltfRuntime.accessors[inputData]);
                                const bufferOutput = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetBufferFromAccessor(gltfRuntime, gltfRuntime.accessors[outputData]);
                                const targetId = channel.target.id;
                                let targetNode = gltfRuntime.scene.getNodeById(targetId);
                                if (targetNode === null) {
                                    targetNode = gltfRuntime.scene.getNodeByName(targetId);
                                }
                                if (targetNode === null) {
                                    core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Creating animation named " + anim + ". But cannot find node named " + targetId + " to attach to");
                                    continue;
                                }
                                const isBone = targetNode instanceof core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Bone;
                                // Get target path (position, rotation or scaling)
                                let targetPath = channel.target.path;
                                const targetPathIndex = glTFAnimationPaths.indexOf(targetPath);
                                if (targetPathIndex !== -1) {
                                    targetPath = babylonAnimationPaths[targetPathIndex];
                                }
                                // Determine animation type
                                let animationType = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Animation.ANIMATIONTYPE_MATRIX;
                                if (!isBone) {
                                    if (targetPath === "rotationQuaternion") {
                                        animationType = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Animation.ANIMATIONTYPE_QUATERNION;
                                        targetNode.rotationQuaternion = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion();
                                    }
                                    else {
                                        animationType = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Animation.ANIMATIONTYPE_VECTOR3;
                                    }
                                }
                                // Create animation and key frames
                                let babylonAnimation = null;
                                const keys = [];
                                let arrayOffset = 0;
                                let modifyKey = false;
                                if (isBone && lastAnimation && lastAnimation.getKeys().length === bufferInput.length) {
                                    babylonAnimation = lastAnimation;
                                    modifyKey = true;
                                }
                                if (!modifyKey) {
                                    gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
                                    babylonAnimation = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Animation(anim, isBone ? "_matrix" : targetPath, 1, animationType, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Animation.ANIMATIONLOOPMODE_CYCLE);
                                    gltfRuntime.scene._blockEntityCollection = false;
                                }
                                // For each frame
                                for (let j = 0; j < bufferInput.length; j++) {
                                    let value = null;
                                    if (targetPath === "rotationQuaternion") {
                                        // VEC4
                                        value = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion.FromArray([bufferOutput[arrayOffset], bufferOutput[arrayOffset + 1], bufferOutput[arrayOffset + 2], bufferOutput[arrayOffset + 3]]);
                                        arrayOffset += 4;
                                    }
                                    else {
                                        // Position and scaling are VEC3
                                        value = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray([bufferOutput[arrayOffset], bufferOutput[arrayOffset + 1], bufferOutput[arrayOffset + 2]]);
                                        arrayOffset += 3;
                                    }
                                    if (isBone) {
                                        const bone = targetNode;
                                        let translation = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero();
                                        let rotationQuaternion = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion();
                                        let scaling = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero();
                                        // Warning on decompose
                                        let mat = bone.getBaseMatrix();
                                        if (modifyKey && lastAnimation) {
                                            mat = lastAnimation.getKeys()[j].value;
                                        }
                                        mat.decompose(scaling, rotationQuaternion, translation);
                                        if (targetPath === "position") {
                                            translation = value;
                                        }
                                        else if (targetPath === "rotationQuaternion") {
                                            rotationQuaternion = value;
                                        }
                                        else {
                                            scaling = value;
                                        }
                                        value = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.Compose(scaling, rotationQuaternion, translation);
                                    }
                                    if (!modifyKey) {
                                        keys.push({
                                            frame: bufferInput[j],
                                            value: value,
                                        });
                                    }
                                    else if (lastAnimation) {
                                        lastAnimation.getKeys()[j].value = value;
                                    }
                                }
                                // Finish
                                if (!modifyKey && babylonAnimation) {
                                    babylonAnimation.setKeys(keys);
                                    targetNode.animations.push(babylonAnimation);
                                }
                                lastAnimation = babylonAnimation;
                                gltfRuntime.scene.stopAnimation(targetNode);
                                gltfRuntime.scene.beginAnimation(targetNode, 0, bufferInput[bufferInput.length - 1], true, 1.0);
                            }
                        }
                    };
                    /**
                     * Returns the bones transformation matrix
                     * @param node
                     */
                    const configureBoneTransformation = (node) => {
                        let mat = null;
                        if (node.translation || node.rotation || node.scale) {
                            const scale = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(node.scale || [1, 1, 1]);
                            const rotation = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion.FromArray(node.rotation || [0, 0, 0, 1]);
                            const position = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(node.translation || [0, 0, 0]);
                            mat = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.Compose(scale, rotation, position);
                        }
                        else {
                            mat = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.FromArray(node.matrix);
                        }
                        return mat;
                    };
                    /**
                     * Returns the parent bone
                     * @param gltfRuntime
                     * @param skins
                     * @param jointName
                     * @param newSkeleton
                     */
                    var getParentBone = (gltfRuntime, skins, jointName, newSkeleton) => {
                        // Try to find
                        for (var i = 0; i < newSkeleton.bones.length; i++) {
                            if (newSkeleton.bones[i].name === jointName) {
                                return newSkeleton.bones[i];
                            }
                        }
                        // Not found, search in gltf nodes
                        const nodes = gltfRuntime.nodes;
                        for (const nde in nodes) {
                            const node = nodes[nde];
                            if (!node.jointName) {
                                continue;
                            }
                            const children = node.children;
                            for (var i = 0; i < children.length; i++) {
                                const child = gltfRuntime.nodes[children[i]];
                                if (!child.jointName) {
                                    continue;
                                }
                                if (child.jointName === jointName) {
                                    const mat = configureBoneTransformation(node);
                                    const bone = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Bone(node.name || "", newSkeleton, getParentBone(gltfRuntime, skins, node.jointName, newSkeleton), mat);
                                    bone.id = nde;
                                    return bone;
                                }
                            }
                        }
                        return null;
                    };
                    /**
                     * Returns the appropriate root node
                     * @param nodesToRoot
                     * @param id
                     */
                    const getNodeToRoot = (nodesToRoot, id) => {
                        for (let i = 0; i < nodesToRoot.length; i++) {
                            const nodeToRoot = nodesToRoot[i];
                            for (let j = 0; j < nodeToRoot.node.children.length; j++) {
                                const child = nodeToRoot.node.children[j];
                                if (child === id) {
                                    return nodeToRoot.bone;
                                }
                            }
                        }
                        return null;
                    };
                    /**
                     * Returns the node with the joint name
                     * @param gltfRuntime
                     * @param jointName
                     */
                    const getJointNode = (gltfRuntime, jointName) => {
                        const nodes = gltfRuntime.nodes;
                        let node = nodes[jointName];
                        if (node) {
                            return {
                                node: node,
                                id: jointName,
                            };
                        }
                        for (const nde in nodes) {
                            node = nodes[nde];
                            if (node.jointName === jointName) {
                                return {
                                    node: node,
                                    id: nde,
                                };
                            }
                        }
                        return null;
                    };
                    /**
                     * Checks if a nodes is in joints
                     * @param skins
                     * @param id
                     */
                    const nodeIsInJoints = (skins, id) => {
                        for (let i = 0; i < skins.jointNames.length; i++) {
                            if (skins.jointNames[i] === id) {
                                return true;
                            }
                        }
                        return false;
                    };
                    /**
                     * Fills the nodes to root for bones and builds hierarchy
                     * @param gltfRuntime
                     * @param newSkeleton
                     * @param skins
                     * @param nodesToRoot
                     */
                    const getNodesToRoot = (gltfRuntime, newSkeleton, skins, nodesToRoot) => {
                        // Creates nodes for root
                        for (const nde in gltfRuntime.nodes) {
                            const node = gltfRuntime.nodes[nde];
                            const id = nde;
                            if (!node.jointName || nodeIsInJoints(skins, node.jointName)) {
                                continue;
                            }
                            // Create node to root bone
                            const mat = configureBoneTransformation(node);
                            const bone = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Bone(node.name || "", newSkeleton, null, mat);
                            bone.id = id;
                            nodesToRoot.push({ bone: bone, node: node, id: id });
                        }
                        // Parenting
                        for (let i = 0; i < nodesToRoot.length; i++) {
                            const nodeToRoot = nodesToRoot[i];
                            const children = nodeToRoot.node.children;
                            for (let j = 0; j < children.length; j++) {
                                let child = null;
                                for (let k = 0; k < nodesToRoot.length; k++) {
                                    if (nodesToRoot[k].id === children[j]) {
                                        child = nodesToRoot[k];
                                        break;
                                    }
                                }
                                if (child) {
                                    child.bone._parent = nodeToRoot.bone;
                                    nodeToRoot.bone.children.push(child.bone);
                                }
                            }
                        }
                    };
                    /**
                     * Imports a skeleton
                     * @param gltfRuntime
                     * @param skins
                     * @param mesh
                     * @param newSkeleton
                     * @param id
                     */
                    const importSkeleton = (gltfRuntime, skins, mesh, newSkeleton, id) => {
                        if (!newSkeleton) {
                            newSkeleton = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Skeleton(skins.name || "", "", gltfRuntime.scene);
                        }
                        if (!skins.babylonSkeleton) {
                            return newSkeleton;
                        }
                        // Find the root bones
                        const nodesToRoot = [];
                        const nodesToRootToAdd = [];
                        getNodesToRoot(gltfRuntime, newSkeleton, skins, nodesToRoot);
                        newSkeleton.bones = [];
                        // Joints
                        for (var i = 0; i < skins.jointNames.length; i++) {
                            var jointNode = getJointNode(gltfRuntime, skins.jointNames[i]);
                            if (!jointNode) {
                                continue;
                            }
                            const node = jointNode.node;
                            if (!node) {
                                core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Joint named " + skins.jointNames[i] + " does not exist");
                                continue;
                            }
                            var id = jointNode.id;
                            // Optimize, if the bone already exists...
                            const existingBone = gltfRuntime.scene.getBoneById(id);
                            if (existingBone) {
                                newSkeleton.bones.push(existingBone);
                                continue;
                            }
                            // Search for parent bone
                            let foundBone = false;
                            let parentBone = null;
                            for (var j = 0; j < i; j++) {
                                const jointNode = getJointNode(gltfRuntime, skins.jointNames[j]);
                                if (!jointNode) {
                                    continue;
                                }
                                const joint = jointNode.node;
                                if (!joint) {
                                    core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Joint named " + skins.jointNames[j] + " does not exist when looking for parent");
                                    continue;
                                }
                                const children = joint.children;
                                if (!children) {
                                    continue;
                                }
                                foundBone = false;
                                for (let k = 0; k < children.length; k++) {
                                    if (children[k] === id) {
                                        parentBone = getParentBone(gltfRuntime, skins, skins.jointNames[j], newSkeleton);
                                        foundBone = true;
                                        break;
                                    }
                                }
                                if (foundBone) {
                                    break;
                                }
                            }
                            // Create bone
                            const mat = configureBoneTransformation(node);
                            if (!parentBone && nodesToRoot.length > 0) {
                                parentBone = getNodeToRoot(nodesToRoot, id);
                                if (parentBone) {
                                    if (nodesToRootToAdd.indexOf(parentBone) === -1) {
                                        nodesToRootToAdd.push(parentBone);
                                    }
                                }
                            }
                            const bone = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Bone(node.jointName || "", newSkeleton, parentBone, mat);
                            bone.id = id;
                        }
                        // Polish
                        const bones = newSkeleton.bones;
                        newSkeleton.bones = [];
                        for (var i = 0; i < skins.jointNames.length; i++) {
                            var jointNode = getJointNode(gltfRuntime, skins.jointNames[i]);
                            if (!jointNode) {
                                continue;
                            }
                            for (var j = 0; j < bones.length; j++) {
                                if (bones[j].id === jointNode.id) {
                                    newSkeleton.bones.push(bones[j]);
                                    break;
                                }
                            }
                        }
                        newSkeleton.prepare();
                        // Finish
                        for (var i = 0; i < nodesToRootToAdd.length; i++) {
                            newSkeleton.bones.push(nodesToRootToAdd[i]);
                        }
                        return newSkeleton;
                    };
                    /**
                     * Imports a mesh and its geometries
                     * @param gltfRuntime
                     * @param node
                     * @param meshes
                     * @param id
                     * @param newMesh
                     */
                    const importMesh = (gltfRuntime, node, meshes, id, newMesh) => {
                        if (!newMesh) {
                            gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
                            newMesh = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Mesh(node.name || "", gltfRuntime.scene);
                            newMesh._parentContainer = gltfRuntime.assetContainer;
                            gltfRuntime.scene._blockEntityCollection = false;
                            newMesh.id = id;
                        }
                        if (!node.babylonNode) {
                            return newMesh;
                        }
                        const subMaterials = [];
                        let vertexData = null;
                        const verticesStarts = new Array();
                        const verticesCounts = new Array();
                        const indexStarts = new Array();
                        const indexCounts = new Array();
                        for (var meshIndex = 0; meshIndex < meshes.length; meshIndex++) {
                            var meshId = meshes[meshIndex];
                            var mesh = gltfRuntime.meshes[meshId];
                            if (!mesh) {
                                continue;
                            }
                            // Positions, normals and UVs
                            for (var i = 0; i < mesh.primitives.length; i++) {
                                // Temporary vertex data
                                const tempVertexData = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.VertexData();
                                const primitive = mesh.primitives[i];
                                if (primitive.mode !== 4) {
                                    // continue;
                                }
                                const attributes = primitive.attributes;
                                let accessor = null;
                                let buffer = null;
                                // Set positions, normal and uvs
                                for (const semantic in attributes) {
                                    // Link accessor and buffer view
                                    accessor = gltfRuntime.accessors[attributes[semantic]];
                                    buffer = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetBufferFromAccessor(gltfRuntime, accessor);
                                    if (semantic === "NORMAL") {
                                        tempVertexData.normals = new Float32Array(buffer.length);
                                        tempVertexData.normals.set(buffer);
                                    }
                                    else if (semantic === "POSITION") {
                                        if (_glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader.HomogeneousCoordinates) {
                                            tempVertexData.positions = new Float32Array(buffer.length - buffer.length / 4);
                                            for (var j = 0; j < buffer.length; j += 4) {
                                                tempVertexData.positions[j] = buffer[j];
                                                tempVertexData.positions[j + 1] = buffer[j + 1];
                                                tempVertexData.positions[j + 2] = buffer[j + 2];
                                            }
                                        }
                                        else {
                                            tempVertexData.positions = new Float32Array(buffer.length);
                                            tempVertexData.positions.set(buffer);
                                        }
                                        verticesCounts.push(tempVertexData.positions.length);
                                    }
                                    else if (semantic.indexOf("TEXCOORD_") !== -1) {
                                        const channel = Number(semantic.split("_")[1]);
                                        const uvKind = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.VertexBuffer.UVKind + (channel === 0 ? "" : channel + 1);
                                        const uvs = new Float32Array(buffer.length);
                                        uvs.set(buffer);
                                        normalizeUVs(uvs);
                                        tempVertexData.set(uvs, uvKind);
                                    }
                                    else if (semantic === "JOINT") {
                                        tempVertexData.matricesIndices = new Float32Array(buffer.length);
                                        tempVertexData.matricesIndices.set(buffer);
                                    }
                                    else if (semantic === "WEIGHT") {
                                        tempVertexData.matricesWeights = new Float32Array(buffer.length);
                                        tempVertexData.matricesWeights.set(buffer);
                                    }
                                    else if (semantic === "COLOR") {
                                        tempVertexData.colors = new Float32Array(buffer.length);
                                        tempVertexData.colors.set(buffer);
                                    }
                                }
                                // Indices
                                accessor = gltfRuntime.accessors[primitive.indices];
                                if (accessor) {
                                    buffer = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetBufferFromAccessor(gltfRuntime, accessor);
                                    tempVertexData.indices = new Int32Array(buffer.length);
                                    tempVertexData.indices.set(buffer);
                                    indexCounts.push(tempVertexData.indices.length);
                                }
                                else {
                                    // Set indices on the fly
                                    const indices = [];
                                    for (var j = 0; j < tempVertexData.positions.length / 3; j++) {
                                        indices.push(j);
                                    }
                                    tempVertexData.indices = new Int32Array(indices);
                                    indexCounts.push(tempVertexData.indices.length);
                                }
                                if (!vertexData) {
                                    vertexData = tempVertexData;
                                }
                                else {
                                    vertexData.merge(tempVertexData);
                                }
                                // Sub material
                                const material = gltfRuntime.scene.getMaterialById(primitive.material);
                                subMaterials.push(material === null ? _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetDefaultMaterial(gltfRuntime.scene) : material);
                                // Update vertices start and index start
                                verticesStarts.push(verticesStarts.length === 0 ? 0 : verticesStarts[verticesStarts.length - 1] + verticesCounts[verticesCounts.length - 2]);
                                indexStarts.push(indexStarts.length === 0 ? 0 : indexStarts[indexStarts.length - 1] + indexCounts[indexCounts.length - 2]);
                            }
                        }
                        let material;
                        gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
                        if (subMaterials.length > 1) {
                            material = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.MultiMaterial("multimat" + id, gltfRuntime.scene);
                            material.subMaterials = subMaterials;
                        }
                        else {
                            material = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial("multimat" + id, gltfRuntime.scene);
                        }
                        if (subMaterials.length === 1) {
                            material = subMaterials[0];
                        }
                        material._parentContainer = gltfRuntime.assetContainer;
                        if (!newMesh.material) {
                            newMesh.material = material;
                        }
                        // Apply geometry
                        new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Geometry(id, gltfRuntime.scene, vertexData, false, newMesh);
                        newMesh.computeWorldMatrix(true);
                        gltfRuntime.scene._blockEntityCollection = false;
                        // Apply submeshes
                        newMesh.subMeshes = [];
                        let index = 0;
                        for (var meshIndex = 0; meshIndex < meshes.length; meshIndex++) {
                            var meshId = meshes[meshIndex];
                            var mesh = gltfRuntime.meshes[meshId];
                            if (!mesh) {
                                continue;
                            }
                            for (var i = 0; i < mesh.primitives.length; i++) {
                                if (mesh.primitives[i].mode !== 4) {
                                    //continue;
                                }
                                core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.SubMesh.AddToMesh(index, verticesStarts[index], verticesCounts[index], indexStarts[index], indexCounts[index], newMesh, newMesh, true);
                                index++;
                            }
                        }
                        // Finish
                        return newMesh;
                    };
                    /**
                     * Configure node transformation from position, rotation and scaling
                     * @param newNode
                     * @param position
                     * @param rotation
                     * @param scaling
                     */
                    const configureNode = (newNode, position, rotation, scaling) => {
                        if (newNode.position) {
                            newNode.position = position;
                        }
                        if (newNode.rotationQuaternion || newNode.rotation) {
                            newNode.rotationQuaternion = rotation;
                        }
                        if (newNode.scaling) {
                            newNode.scaling = scaling;
                        }
                    };
                    /**
                     * Configures node from transformation matrix
                     * @param newNode
                     * @param node
                     * @param parent
                     */
                    const configureNodeFromMatrix = (newNode, node, parent) => {
                        if (node.matrix) {
                            const position = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);
                            const rotation = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion();
                            const scaling = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);
                            const mat = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.FromArray(node.matrix);
                            mat.decompose(scaling, rotation, position);
                            configureNode(newNode, position, rotation, scaling);
                        }
                        else if (node.translation && node.rotation && node.scale) {
                            configureNode(newNode, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(node.translation), core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion.FromArray(node.rotation), core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(node.scale));
                        }
                        newNode.computeWorldMatrix(true);
                    };
                    /**
                     * Imports a node
                     * @param gltfRuntime
                     * @param node
                     * @param id
                     * @param parent
                     */
                    const importNode = (gltfRuntime, node, id, parent) => {
                        let lastNode = null;
                        if (gltfRuntime.importOnlyMeshes && (node.skin || node.meshes)) {
                            if (gltfRuntime.importMeshesNames && gltfRuntime.importMeshesNames.length > 0 && gltfRuntime.importMeshesNames.indexOf(node.name || "") === -1) {
                                return null;
                            }
                        }
                        // Meshes
                        if (node.skin) {
                            if (node.meshes) {
                                const skin = gltfRuntime.skins[node.skin];
                                var newMesh = importMesh(gltfRuntime, node, node.meshes, id, node.babylonNode);
                                newMesh.skeleton = gltfRuntime.scene.getLastSkeletonById(node.skin);
                                if (newMesh.skeleton === null) {
                                    newMesh.skeleton = importSkeleton(gltfRuntime, skin, newMesh, skin.babylonSkeleton, node.skin);
                                    if (!skin.babylonSkeleton) {
                                        skin.babylonSkeleton = newMesh.skeleton;
                                    }
                                }
                                lastNode = newMesh;
                            }
                        }
                        else if (node.meshes) {
                            /**
                             * Improve meshes property
                             */
                            var newMesh = importMesh(gltfRuntime, node, node.mesh ? [node.mesh] : node.meshes, id, node.babylonNode);
                            lastNode = newMesh;
                        }
                        // Lights
                        else if (node.light && !node.babylonNode && !gltfRuntime.importOnlyMeshes) {
                            const light = gltfRuntime.lights[node.light];
                            if (light) {
                                if (light.type === "ambient") {
                                    const ambienLight = light[light.type];
                                    const hemiLight = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.HemisphericLight(node.light, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), gltfRuntime.scene);
                                    hemiLight.name = node.name || "";
                                    if (ambienLight.color) {
                                        hemiLight.diffuse = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(ambienLight.color);
                                    }
                                    lastNode = hemiLight;
                                }
                                else if (light.type === "directional") {
                                    const directionalLight = light[light.type];
                                    const dirLight = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(node.light, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), gltfRuntime.scene);
                                    dirLight.name = node.name || "";
                                    if (directionalLight.color) {
                                        dirLight.diffuse = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(directionalLight.color);
                                    }
                                    lastNode = dirLight;
                                }
                                else if (light.type === "point") {
                                    const pointLight = light[light.type];
                                    const ptLight = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.PointLight(node.light, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), gltfRuntime.scene);
                                    ptLight.name = node.name || "";
                                    if (pointLight.color) {
                                        ptLight.diffuse = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(pointLight.color);
                                    }
                                    lastNode = ptLight;
                                }
                                else if (light.type === "spot") {
                                    const spotLight = light[light.type];
                                    const spLight = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.SpotLight(node.light, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), 0, 0, gltfRuntime.scene);
                                    spLight.name = node.name || "";
                                    if (spotLight.color) {
                                        spLight.diffuse = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(spotLight.color);
                                    }
                                    if (spotLight.fallOfAngle) {
                                        spLight.angle = spotLight.fallOfAngle;
                                    }
                                    if (spotLight.fallOffExponent) {
                                        spLight.exponent = spotLight.fallOffExponent;
                                    }
                                    lastNode = spLight;
                                }
                            }
                        }
                        // Cameras
                        else if (node.camera && !node.babylonNode && !gltfRuntime.importOnlyMeshes) {
                            const camera = gltfRuntime.cameras[node.camera];
                            if (camera) {
                                gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
                                if (camera.type === "orthographic") {
                                    const orthoCamera = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.FreeCamera(node.camera, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), gltfRuntime.scene, false);
                                    orthoCamera.name = node.name || "";
                                    orthoCamera.mode = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Camera.ORTHOGRAPHIC_CAMERA;
                                    orthoCamera.attachControl();
                                    lastNode = orthoCamera;
                                    orthoCamera._parentContainer = gltfRuntime.assetContainer;
                                }
                                else if (camera.type === "perspective") {
                                    const perspectiveCamera = camera[camera.type];
                                    const persCamera = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.FreeCamera(node.camera, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), gltfRuntime.scene, false);
                                    persCamera.name = node.name || "";
                                    persCamera.attachControl();
                                    if (!perspectiveCamera.aspectRatio) {
                                        perspectiveCamera.aspectRatio = gltfRuntime.scene.getEngine().getRenderWidth() / gltfRuntime.scene.getEngine().getRenderHeight();
                                    }
                                    if (perspectiveCamera.znear && perspectiveCamera.zfar) {
                                        persCamera.maxZ = perspectiveCamera.zfar;
                                        persCamera.minZ = perspectiveCamera.znear;
                                    }
                                    lastNode = persCamera;
                                    persCamera._parentContainer = gltfRuntime.assetContainer;
                                }
                                gltfRuntime.scene._blockEntityCollection = false;
                            }
                        }
                        // Empty node
                        if (!node.jointName) {
                            if (node.babylonNode) {
                                return node.babylonNode;
                            }
                            else if (lastNode === null) {
                                gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
                                const dummy = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Mesh(node.name || "", gltfRuntime.scene);
                                dummy._parentContainer = gltfRuntime.assetContainer;
                                gltfRuntime.scene._blockEntityCollection = false;
                                node.babylonNode = dummy;
                                lastNode = dummy;
                            }
                        }
                        if (lastNode !== null) {
                            if (node.matrix && lastNode instanceof core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Mesh) {
                                configureNodeFromMatrix(lastNode, node, parent);
                            }
                            else {
                                const translation = node.translation || [0, 0, 0];
                                const rotation = node.rotation || [0, 0, 0, 1];
                                const scale = node.scale || [1, 1, 1];
                                configureNode(lastNode, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(translation), core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion.FromArray(rotation), core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(scale));
                            }
                            lastNode.updateCache(true);
                            node.babylonNode = lastNode;
                        }
                        return lastNode;
                    };
                    /**
                     * Traverses nodes and creates them
                     * @param gltfRuntime
                     * @param id
                     * @param parent
                     * @param meshIncluded
                     */
                    var traverseNodes = (gltfRuntime, id, parent, meshIncluded = false) => {
                        const node = gltfRuntime.nodes[id];
                        let newNode = null;
                        if (gltfRuntime.importOnlyMeshes && !meshIncluded && gltfRuntime.importMeshesNames) {
                            if (gltfRuntime.importMeshesNames.indexOf(node.name || "") !== -1 || gltfRuntime.importMeshesNames.length === 0) {
                                meshIncluded = true;
                            }
                            else {
                                meshIncluded = false;
                            }
                        }
                        else {
                            meshIncluded = true;
                        }
                        if (!node.jointName && meshIncluded) {
                            newNode = importNode(gltfRuntime, node, id, parent);
                            if (newNode !== null) {
                                newNode.id = id;
                                newNode.parent = parent;
                            }
                        }
                        if (node.children) {
                            for (let i = 0; i < node.children.length; i++) {
                                traverseNodes(gltfRuntime, node.children[i], newNode, meshIncluded);
                            }
                        }
                    };
                    /**
                     * do stuff after buffers, shaders are loaded (e.g. hook up materials, load animations, etc.)
                     * @param gltfRuntime
                     */
                    const postLoad = (gltfRuntime) => {
                        // Nodes
                        let currentScene = gltfRuntime.currentScene;
                        if (currentScene) {
                            for (var i = 0; i < currentScene.nodes.length; i++) {
                                traverseNodes(gltfRuntime, currentScene.nodes[i], null);
                            }
                        }
                        else {
                            for (const thing in gltfRuntime.scenes) {
                                currentScene = gltfRuntime.scenes[thing];
                                for (var i = 0; i < currentScene.nodes.length; i++) {
                                    traverseNodes(gltfRuntime, currentScene.nodes[i], null);
                                }
                            }
                        }
                        // Set animations
                        loadAnimations(gltfRuntime);
                        for (var i = 0; i < gltfRuntime.scene.skeletons.length; i++) {
                            const skeleton = gltfRuntime.scene.skeletons[i];
                            gltfRuntime.scene.beginAnimation(skeleton, 0, Number.MAX_VALUE, true, 1.0);
                        }
                    };
                    /**
                     * onBind shaderrs callback to set uniforms and matrices
                     * @param mesh
                     * @param gltfRuntime
                     * @param shaderMaterial
                     * @param technique
                     * @param material
                     * @param onSuccess
                     */
                    const onBindShaderMaterial = (mesh, gltfRuntime, unTreatedUniforms, shaderMaterial, technique, material, onSuccess) => {
                        const materialValues = material.values || technique.parameters;
                        for (const unif in unTreatedUniforms) {
                            const uniform = unTreatedUniforms[unif];
                            const type = uniform.type;
                            if (type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT2 || type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT3 || type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT4) {
                                if (uniform.semantic && !uniform.source && !uniform.node) {
                                    _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.SetMatrix(gltfRuntime.scene, mesh, uniform, unif, shaderMaterial.getEffect());
                                }
                                else if (uniform.semantic && (uniform.source || uniform.node)) {
                                    let source = gltfRuntime.scene.getNodeByName(uniform.source || uniform.node || "");
                                    if (source === null) {
                                        source = gltfRuntime.scene.getNodeById(uniform.source || uniform.node || "");
                                    }
                                    if (source === null) {
                                        continue;
                                    }
                                    _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.SetMatrix(gltfRuntime.scene, source, uniform, unif, shaderMaterial.getEffect());
                                }
                            }
                            else {
                                const value = materialValues[technique.uniforms[unif]];
                                if (!value) {
                                    continue;
                                }
                                if (type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.SAMPLER_2D) {
                                    const texture = gltfRuntime.textures[material.values ? value : uniform.value].babylonTexture;
                                    if (texture === null || texture === undefined) {
                                        continue;
                                    }
                                    shaderMaterial.getEffect().setTexture(unif, texture);
                                }
                                else {
                                    _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.SetUniform(shaderMaterial.getEffect(), unif, value, type);
                                }
                            }
                        }
                        onSuccess(shaderMaterial);
                    };
                    /**
                     * Prepare uniforms to send the only one time
                     * Loads the appropriate textures
                     * @param gltfRuntime
                     * @param shaderMaterial
                     * @param technique
                     * @param material
                     */
                    const prepareShaderMaterialUniforms = (gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms) => {
                        const materialValues = material.values || technique.parameters;
                        const techniqueUniforms = technique.uniforms;
                        /**
                         * Prepare values here (not matrices)
                         */
                        for (const unif in unTreatedUniforms) {
                            var uniform = unTreatedUniforms[unif];
                            const type = uniform.type;
                            let value = materialValues[techniqueUniforms[unif]];
                            if (value === undefined) {
                                // In case the value is the same for all materials
                                value = uniform.value;
                            }
                            if (!value) {
                                continue;
                            }
                            var onLoadTexture = (uniformName) => {
                                return (texture) => {
                                    if (uniform.value && uniformName) {
                                        // Static uniform
                                        shaderMaterial.setTexture(uniformName, texture);
                                        delete unTreatedUniforms[uniformName];
                                    }
                                };
                            };
                            // Texture (sampler2D)
                            if (type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.SAMPLER_2D) {
                                GLTFLoaderExtension.LoadTextureAsync(gltfRuntime, material.values ? value : uniform.value, onLoadTexture(unif), () => onLoadTexture(null));
                            }
                            // Others
                            else {
                                if (uniform.value && _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.SetUniform(shaderMaterial, unif, material.values ? value : uniform.value, type)) {
                                    // Static uniform
                                    delete unTreatedUniforms[unif];
                                }
                            }
                        }
                    };
                    /**
                     * Shader compilation failed
                     * @param program
                     * @param shaderMaterial
                     * @param onError
                     */
                    const onShaderCompileError = (program, shaderMaterial, onError) => {
                        return (effect, error) => {
                            shaderMaterial.dispose(true);
                            onError("Cannot compile program named " + program.name + ". Error: " + error + ". Default material will be applied");
                        };
                    };
                    /**
                     * Shader compilation success
                     * @param gltfRuntime
                     * @param shaderMaterial
                     * @param technique
                     * @param material
                     * @param onSuccess
                     */
                    const onShaderCompileSuccess = (gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms, onSuccess) => {
                        return (_) => {
                            prepareShaderMaterialUniforms(gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms);
                            shaderMaterial.onBind = (mesh) => {
                                onBindShaderMaterial(mesh, gltfRuntime, unTreatedUniforms, shaderMaterial, technique, material, onSuccess);
                            };
                        };
                    };
                    /**
                     * Returns the appropriate uniform if already handled by babylon
                     * @param tokenizer
                     * @param technique
                     */
                    const parseShaderUniforms = (tokenizer, technique, unTreatedUniforms) => {
                        for (const unif in technique.uniforms) {
                            const uniform = technique.uniforms[unif];
                            const uniformParameter = technique.parameters[uniform];
                            if (tokenizer.currentIdentifier === unif) {
                                if (uniformParameter.semantic && !uniformParameter.source && !uniformParameter.node) {
                                    const transformIndex = glTFTransforms.indexOf(uniformParameter.semantic);
                                    if (transformIndex !== -1) {
                                        delete unTreatedUniforms[unif];
                                        return babylonTransforms[transformIndex];
                                    }
                                }
                            }
                        }
                        return tokenizer.currentIdentifier;
                    };
                    /**
                     * All shaders loaded. Create materials one by one
                     * @param gltfRuntime
                     */
                    const importMaterials = (gltfRuntime) => {
                        // Create materials
                        for (const mat in gltfRuntime.materials) {
                            GLTFLoaderExtension.LoadMaterialAsync(gltfRuntime, mat, (material) => { }, () => { });
                        }
                    };
                    /**
                     * Implementation of the base glTF spec
                     * @hidden
                     */
                    class GLTFLoaderBase {
                        static CreateRuntime(parsedData, scene, rootUrl) {
                            const gltfRuntime = {
                                extensions: {},
                                accessors: {},
                                buffers: {},
                                bufferViews: {},
                                meshes: {},
                                lights: {},
                                cameras: {},
                                nodes: {},
                                images: {},
                                textures: {},
                                shaders: {},
                                programs: {},
                                samplers: {},
                                techniques: {},
                                materials: {},
                                animations: {},
                                skins: {},
                                extensionsUsed: [],
                                scenes: {},
                                buffersCount: 0,
                                shaderscount: 0,
                                scene: scene,
                                rootUrl: rootUrl,
                                loadedBufferCount: 0,
                                loadedBufferViews: {},
                                loadedShaderCount: 0,
                                importOnlyMeshes: false,
                                dummyNodes: [],
                                assetContainer: null,
                            };
                            // Parse
                            if (parsedData.extensions) {
                                parseObject(parsedData.extensions, "extensions", gltfRuntime);
                            }
                            if (parsedData.extensionsUsed) {
                                parseObject(parsedData.extensionsUsed, "extensionsUsed", gltfRuntime);
                            }
                            if (parsedData.buffers) {
                                parseBuffers(parsedData.buffers, gltfRuntime);
                            }
                            if (parsedData.bufferViews) {
                                parseObject(parsedData.bufferViews, "bufferViews", gltfRuntime);
                            }
                            if (parsedData.accessors) {
                                parseObject(parsedData.accessors, "accessors", gltfRuntime);
                            }
                            if (parsedData.meshes) {
                                parseObject(parsedData.meshes, "meshes", gltfRuntime);
                            }
                            if (parsedData.lights) {
                                parseObject(parsedData.lights, "lights", gltfRuntime);
                            }
                            if (parsedData.cameras) {
                                parseObject(parsedData.cameras, "cameras", gltfRuntime);
                            }
                            if (parsedData.nodes) {
                                parseObject(parsedData.nodes, "nodes", gltfRuntime);
                            }
                            if (parsedData.images) {
                                parseObject(parsedData.images, "images", gltfRuntime);
                            }
                            if (parsedData.textures) {
                                parseObject(parsedData.textures, "textures", gltfRuntime);
                            }
                            if (parsedData.shaders) {
                                parseShaders(parsedData.shaders, gltfRuntime);
                            }
                            if (parsedData.programs) {
                                parseObject(parsedData.programs, "programs", gltfRuntime);
                            }
                            if (parsedData.samplers) {
                                parseObject(parsedData.samplers, "samplers", gltfRuntime);
                            }
                            if (parsedData.techniques) {
                                parseObject(parsedData.techniques, "techniques", gltfRuntime);
                            }
                            if (parsedData.materials) {
                                parseObject(parsedData.materials, "materials", gltfRuntime);
                            }
                            if (parsedData.animations) {
                                parseObject(parsedData.animations, "animations", gltfRuntime);
                            }
                            if (parsedData.skins) {
                                parseObject(parsedData.skins, "skins", gltfRuntime);
                            }
                            if (parsedData.scenes) {
                                gltfRuntime.scenes = parsedData.scenes;
                            }
                            if (parsedData.scene && parsedData.scenes) {
                                gltfRuntime.currentScene = parsedData.scenes[parsedData.scene];
                            }
                            return gltfRuntime;
                        }
                        static LoadBufferAsync(gltfRuntime, id, onSuccess, onError, onProgress) {
                            const buffer = gltfRuntime.buffers[id];
                            if (core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.IsBase64(buffer.uri)) {
                                setTimeout(() => onSuccess(new Uint8Array(core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.DecodeBase64(buffer.uri))));
                            }
                            else {
                                core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.LoadFile(gltfRuntime.rootUrl + buffer.uri, (data) => onSuccess(new Uint8Array(data)), onProgress, undefined, true, (request) => {
                                    if (request) {
                                        onError(request.status + " " + request.statusText);
                                    }
                                });
                            }
                        }
                        static LoadTextureBufferAsync(gltfRuntime, id, onSuccess, onError) {
                            const texture = gltfRuntime.textures[id];
                            if (!texture || !texture.source) {
                                onError("");
                                return;
                            }
                            if (texture.babylonTexture) {
                                onSuccess(null);
                                return;
                            }
                            const source = gltfRuntime.images[texture.source];
                            if (core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.IsBase64(source.uri)) {
                                setTimeout(() => onSuccess(new Uint8Array(core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.DecodeBase64(source.uri))));
                            }
                            else {
                                core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.LoadFile(gltfRuntime.rootUrl + source.uri, (data) => onSuccess(new Uint8Array(data)), undefined, undefined, true, (request) => {
                                    if (request) {
                                        onError(request.status + " " + request.statusText);
                                    }
                                });
                            }
                        }
                        static CreateTextureAsync(gltfRuntime, id, buffer, onSuccess, onError) {
                            const texture = gltfRuntime.textures[id];
                            if (texture.babylonTexture) {
                                onSuccess(texture.babylonTexture);
                                return;
                            }
                            const sampler = gltfRuntime.samplers[texture.sampler];
                            const createMipMaps = sampler.minFilter === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.NEAREST_MIPMAP_NEAREST ||
                                sampler.minFilter === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.NEAREST_MIPMAP_LINEAR ||
                                sampler.minFilter === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.LINEAR_MIPMAP_NEAREST ||
                                sampler.minFilter === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.LINEAR_MIPMAP_LINEAR;
                            const samplingMode = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.BILINEAR_SAMPLINGMODE;
                            const blob = buffer == null ? new Blob() : new Blob([buffer]);
                            const blobURL = URL.createObjectURL(blob);
                            const revokeBlobURL = () => URL.revokeObjectURL(blobURL);
                            const newTexture = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture(blobURL, gltfRuntime.scene, !createMipMaps, true, samplingMode, revokeBlobURL, revokeBlobURL);
                            if (sampler.wrapS !== undefined) {
                                newTexture.wrapU = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetWrapMode(sampler.wrapS);
                            }
                            if (sampler.wrapT !== undefined) {
                                newTexture.wrapV = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetWrapMode(sampler.wrapT);
                            }
                            newTexture.name = id;
                            texture.babylonTexture = newTexture;
                            onSuccess(newTexture);
                        }
                        static LoadShaderStringAsync(gltfRuntime, id, onSuccess, onError) {
                            const shader = gltfRuntime.shaders[id];
                            if (core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.IsBase64(shader.uri)) {
                                const shaderString = atob(shader.uri.split(",")[1]);
                                if (onSuccess) {
                                    onSuccess(shaderString);
                                }
                            }
                            else {
                                core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.LoadFile(gltfRuntime.rootUrl + shader.uri, onSuccess, undefined, undefined, false, (request) => {
                                    if (request && onError) {
                                        onError(request.status + " " + request.statusText);
                                    }
                                });
                            }
                        }
                        static LoadMaterialAsync(gltfRuntime, id, onSuccess, onError) {
                            const material = gltfRuntime.materials[id];
                            if (!material.technique) {
                                if (onError) {
                                    onError("No technique found.");
                                }
                                return;
                            }
                            const technique = gltfRuntime.techniques[material.technique];
                            if (!technique) {
                                gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
                                const defaultMaterial = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial(id, gltfRuntime.scene);
                                defaultMaterial._parentContainer = gltfRuntime.assetContainer;
                                gltfRuntime.scene._blockEntityCollection = false;
                                defaultMaterial.diffuseColor = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3(0.5, 0.5, 0.5);
                                defaultMaterial.sideOrientation = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Material.CounterClockWiseSideOrientation;
                                onSuccess(defaultMaterial);
                                return;
                            }
                            const program = gltfRuntime.programs[technique.program];
                            const states = technique.states;
                            const vertexShader = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore[program.vertexShader + "VertexShader"];
                            const pixelShader = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore[program.fragmentShader + "PixelShader"];
                            let newVertexShader = "";
                            let newPixelShader = "";
                            const vertexTokenizer = new Tokenizer(vertexShader);
                            const pixelTokenizer = new Tokenizer(pixelShader);
                            const unTreatedUniforms = {};
                            const uniforms = [];
                            const attributes = [];
                            const samplers = [];
                            // Fill uniform, sampler2D and attributes
                            for (const unif in technique.uniforms) {
                                const uniform = technique.uniforms[unif];
                                const uniformParameter = technique.parameters[uniform];
                                unTreatedUniforms[unif] = uniformParameter;
                                if (uniformParameter.semantic && !uniformParameter.node && !uniformParameter.source) {
                                    const transformIndex = glTFTransforms.indexOf(uniformParameter.semantic);
                                    if (transformIndex !== -1) {
                                        uniforms.push(babylonTransforms[transformIndex]);
                                        delete unTreatedUniforms[unif];
                                    }
                                    else {
                                        uniforms.push(unif);
                                    }
                                }
                                else if (uniformParameter.type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.SAMPLER_2D) {
                                    samplers.push(unif);
                                }
                                else {
                                    uniforms.push(unif);
                                }
                            }
                            for (var attr in technique.attributes) {
                                var attribute = technique.attributes[attr];
                                var attributeParameter = technique.parameters[attribute];
                                if (attributeParameter.semantic) {
                                    const name = getAttribute(attributeParameter);
                                    if (name) {
                                        attributes.push(name);
                                    }
                                }
                            }
                            // Configure vertex shader
                            while (!vertexTokenizer.isEnd() && vertexTokenizer.getNextToken()) {
                                var tokenType = vertexTokenizer.currentToken;
                                if (tokenType !== ETokenType.IDENTIFIER) {
                                    newVertexShader += vertexTokenizer.currentString;
                                    continue;
                                }
                                let foundAttribute = false;
                                for (var attr in technique.attributes) {
                                    var attribute = technique.attributes[attr];
                                    var attributeParameter = technique.parameters[attribute];
                                    if (vertexTokenizer.currentIdentifier === attr && attributeParameter.semantic) {
                                        newVertexShader += getAttribute(attributeParameter);
                                        foundAttribute = true;
                                        break;
                                    }
                                }
                                if (foundAttribute) {
                                    continue;
                                }
                                newVertexShader += parseShaderUniforms(vertexTokenizer, technique, unTreatedUniforms);
                            }
                            // Configure pixel shader
                            while (!pixelTokenizer.isEnd() && pixelTokenizer.getNextToken()) {
                                var tokenType = pixelTokenizer.currentToken;
                                if (tokenType !== ETokenType.IDENTIFIER) {
                                    newPixelShader += pixelTokenizer.currentString;
                                    continue;
                                }
                                newPixelShader += parseShaderUniforms(pixelTokenizer, technique, unTreatedUniforms);
                            }
                            // Create shader material
                            const shaderPath = {
                                vertex: program.vertexShader + id,
                                fragment: program.fragmentShader + id,
                            };
                            const options = {
                                attributes: attributes,
                                uniforms: uniforms,
                                samplers: samplers,
                                needAlphaBlending: states && states.enable && states.enable.indexOf(3042) !== -1,
                            };
                            core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore[program.vertexShader + id + "VertexShader"] = newVertexShader;
                            core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore[program.fragmentShader + id + "PixelShader"] = newPixelShader;
                            const shaderMaterial = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.ShaderMaterial(id, gltfRuntime.scene, shaderPath, options);
                            shaderMaterial.onError = onShaderCompileError(program, shaderMaterial, onError);
                            shaderMaterial.onCompiled = onShaderCompileSuccess(gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms, onSuccess);
                            shaderMaterial.sideOrientation = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Material.CounterClockWiseSideOrientation;
                            if (states && states.functions) {
                                const functions = states.functions;
                                if (functions.cullFace && functions.cullFace[0] !== _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ECullingType.BACK) {
                                    shaderMaterial.backFaceCulling = false;
                                }
                                const blendFunc = functions.blendFuncSeparate;
                                if (blendFunc) {
                                    if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.SRC_ALPHA &&
                                        blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE_MINUS_SRC_ALPHA &&
                                        blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                                        blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                                        shaderMaterial.alphaMode = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_COMBINE;
                                    }
                                    else if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                                        blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                                        blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ZERO &&
                                        blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                                        shaderMaterial.alphaMode = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_ONEONE;
                                    }
                                    else if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.SRC_ALPHA &&
                                        blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                                        blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ZERO &&
                                        blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                                        shaderMaterial.alphaMode = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_ADD;
                                    }
                                    else if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ZERO &&
                                        blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE_MINUS_SRC_COLOR &&
                                        blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                                        blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                                        shaderMaterial.alphaMode = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_SUBTRACT;
                                    }
                                    else if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.DST_COLOR &&
                                        blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ZERO &&
                                        blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                                        blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                                        shaderMaterial.alphaMode = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_MULTIPLY;
                                    }
                                    else if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.SRC_ALPHA &&
                                        blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE_MINUS_SRC_COLOR &&
                                        blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                                        blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                                        shaderMaterial.alphaMode = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_MAXIMIZED;
                                    }
                                }
                            }
                        }
                    }
                    /**
                     * glTF V1 Loader
                     * @hidden
                     */
                    class GLTFLoader {
                        static RegisterExtension(extension) {
                            if (GLTFLoader.Extensions[extension.name]) {
                                core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error('Tool with the same name "' + extension.name + '" already exists');
                                return;
                            }
                            GLTFLoader.Extensions[extension.name] = extension;
                        }
                        dispose() {
                            // do nothing
                        }
                        _importMeshAsync(meshesNames, scene, data, rootUrl, assetContainer, onSuccess, onProgress, onError) {
                            scene.useRightHandedSystem = true;
                            GLTFLoaderExtension.LoadRuntimeAsync(scene, data, rootUrl, (gltfRuntime) => {
                                gltfRuntime.assetContainer = assetContainer;
                                gltfRuntime.importOnlyMeshes = true;
                                if (meshesNames === "") {
                                    gltfRuntime.importMeshesNames = [];
                                }
                                else if (typeof meshesNames === "string") {
                                    gltfRuntime.importMeshesNames = [meshesNames];
                                }
                                else if (meshesNames && !(meshesNames instanceof Array)) {
                                    gltfRuntime.importMeshesNames = [meshesNames];
                                }
                                else {
                                    gltfRuntime.importMeshesNames = [];
                                    core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Argument meshesNames must be of type string or string[]");
                                }
                                // Create nodes
                                this._createNodes(gltfRuntime);
                                const meshes = new Array();
                                const skeletons = new Array();
                                // Fill arrays of meshes and skeletons
                                for (const nde in gltfRuntime.nodes) {
                                    const node = gltfRuntime.nodes[nde];
                                    if (node.babylonNode instanceof core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.AbstractMesh) {
                                        meshes.push(node.babylonNode);
                                    }
                                }
                                for (const skl in gltfRuntime.skins) {
                                    const skin = gltfRuntime.skins[skl];
                                    if (skin.babylonSkeleton instanceof core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Skeleton) {
                                        skeletons.push(skin.babylonSkeleton);
                                    }
                                }
                                // Load buffers, shaders, materials, etc.
                                this._loadBuffersAsync(gltfRuntime, () => {
                                    this._loadShadersAsync(gltfRuntime, () => {
                                        importMaterials(gltfRuntime);
                                        postLoad(gltfRuntime);
                                        if (!_glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader.IncrementalLoading && onSuccess) {
                                            onSuccess(meshes, skeletons);
                                        }
                                    });
                                }, onProgress);
                                if (_glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader.IncrementalLoading && onSuccess) {
                                    onSuccess(meshes, skeletons);
                                }
                            }, onError);
                            return true;
                        }
                        /**
                         * Imports one or more meshes from a loaded gltf file and adds them to the scene
                         * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
                         * @param scene the scene the meshes should be added to
                         * @param assetContainer defines the asset container to use (can be null)
                         * @param data gltf data containing information of the meshes in a loaded file
                         * @param rootUrl root url to load from
                         * @param onProgress event that fires when loading progress has occured
                         * @returns a promise containg the loaded meshes, particles, skeletons and animations
                         */
                        importMeshAsync(meshesNames, scene, assetContainer, data, rootUrl, onProgress) {
                            return new Promise((resolve, reject) => {
                                this._importMeshAsync(meshesNames, scene, data, rootUrl, assetContainer, (meshes, skeletons) => {
                                    resolve({
                                        meshes: meshes,
                                        particleSystems: [],
                                        skeletons: skeletons,
                                        animationGroups: [],
                                        lights: [],
                                        transformNodes: [],
                                        geometries: [],
                                    });
                                }, onProgress, (message) => {
                                    reject(new Error(message));
                                });
                            });
                        }
                        _loadAsync(scene, data, rootUrl, onSuccess, onProgress, onError) {
                            scene.useRightHandedSystem = true;
                            GLTFLoaderExtension.LoadRuntimeAsync(scene, data, rootUrl, (gltfRuntime) => {
                                // Load runtime extensios
                                GLTFLoaderExtension.LoadRuntimeExtensionsAsync(gltfRuntime, () => {
                                    // Create nodes
                                    this._createNodes(gltfRuntime);
                                    // Load buffers, shaders, materials, etc.
                                    this._loadBuffersAsync(gltfRuntime, () => {
                                        this._loadShadersAsync(gltfRuntime, () => {
                                            importMaterials(gltfRuntime);
                                            postLoad(gltfRuntime);
                                            if (!_glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader.IncrementalLoading) {
                                                onSuccess();
                                            }
                                        });
                                    });
                                    if (_glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader.IncrementalLoading) {
                                        onSuccess();
                                    }
                                }, onError);
                            }, onError);
                        }
                        /**
                         * Imports all objects from a loaded gltf file and adds them to the scene
                         * @param scene the scene the objects should be added to
                         * @param data gltf data containing information of the meshes in a loaded file
                         * @param rootUrl root url to load from
                         * @param onProgress event that fires when loading progress has occured
                         * @returns a promise which completes when objects have been loaded to the scene
                         */
                        loadAsync(scene, data, rootUrl, onProgress) {
                            return new Promise((resolve, reject) => {
                                this._loadAsync(scene, data, rootUrl, () => {
                                    resolve();
                                }, onProgress, (message) => {
                                    reject(new Error(message));
                                });
                            });
                        }
                        _loadShadersAsync(gltfRuntime, onload) {
                            let hasShaders = false;
                            const processShader = (sha, shader) => {
                                GLTFLoaderExtension.LoadShaderStringAsync(gltfRuntime, sha, (shaderString) => {
                                    if (shaderString instanceof ArrayBuffer) {
                                        return;
                                    }
                                    gltfRuntime.loadedShaderCount++;
                                    if (shaderString) {
                                        core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore[sha + (shader.type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EShaderType.VERTEX ? "VertexShader" : "PixelShader")] = shaderString;
                                    }
                                    if (gltfRuntime.loadedShaderCount === gltfRuntime.shaderscount) {
                                        onload();
                                    }
                                }, () => {
                                    core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error("Error when loading shader program named " + sha + " located at " + shader.uri);
                                });
                            };
                            for (const sha in gltfRuntime.shaders) {
                                hasShaders = true;
                                const shader = gltfRuntime.shaders[sha];
                                if (shader) {
                                    processShader.bind(this, sha, shader)();
                                }
                                else {
                                    core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error("No shader named: " + sha);
                                }
                            }
                            if (!hasShaders) {
                                onload();
                            }
                        }
                        _loadBuffersAsync(gltfRuntime, onLoad, onProgress) {
                            let hasBuffers = false;
                            const processBuffer = (buf, buffer) => {
                                GLTFLoaderExtension.LoadBufferAsync(gltfRuntime, buf, (bufferView) => {
                                    gltfRuntime.loadedBufferCount++;
                                    if (bufferView) {
                                        if (bufferView.byteLength != gltfRuntime.buffers[buf].byteLength) {
                                            core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error("Buffer named " + buf + " is length " + bufferView.byteLength + ". Expected: " + buffer.byteLength); // Improve error message
                                        }
                                        gltfRuntime.loadedBufferViews[buf] = bufferView;
                                    }
                                    if (gltfRuntime.loadedBufferCount === gltfRuntime.buffersCount) {
                                        onLoad();
                                    }
                                }, () => {
                                    core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error("Error when loading buffer named " + buf + " located at " + buffer.uri);
                                });
                            };
                            for (const buf in gltfRuntime.buffers) {
                                hasBuffers = true;
                                const buffer = gltfRuntime.buffers[buf];
                                if (buffer) {
                                    processBuffer.bind(this, buf, buffer)();
                                }
                                else {
                                    core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error("No buffer named: " + buf);
                                }
                            }
                            if (!hasBuffers) {
                                onLoad();
                            }
                        }
                        _createNodes(gltfRuntime) {
                            let currentScene = gltfRuntime.currentScene;
                            if (currentScene) {
                                // Only one scene even if multiple scenes are defined
                                for (var i = 0; i < currentScene.nodes.length; i++) {
                                    traverseNodes(gltfRuntime, currentScene.nodes[i], null);
                                }
                            }
                            else {
                                // Load all scenes
                                for (const thing in gltfRuntime.scenes) {
                                    currentScene = gltfRuntime.scenes[thing];
                                    for (var i = 0; i < currentScene.nodes.length; i++) {
                                        traverseNodes(gltfRuntime, currentScene.nodes[i], null);
                                    }
                                }
                            }
                        }
                    }
                    GLTFLoader.Extensions = {};
                    /** @hidden */
                    class GLTFLoaderExtension {
                        constructor(name) {
                            this._name = name;
                        }
                        get name() {
                            return this._name;
                        }
                        /**
                         * Defines an override for loading the runtime
                         * Return true to stop further extensions from loading the runtime
                         * @param scene
                         * @param data
                         * @param rootUrl
                         * @param onSuccess
                         * @param onError
                         */
                        loadRuntimeAsync(scene, data, rootUrl, onSuccess, onError) {
                            return false;
                        }
                        /**
                         * Defines an onverride for creating gltf runtime
                         * Return true to stop further extensions from creating the runtime
                         * @param gltfRuntime
                         * @param onSuccess
                         * @param onError
                         */
                        loadRuntimeExtensionsAsync(gltfRuntime, onSuccess, onError) {
                            return false;
                        }
                        /**
                         * Defines an override for loading buffers
                         * Return true to stop further extensions from loading this buffer
                         * @param gltfRuntime
                         * @param id
                         * @param onSuccess
                         * @param onError
                         * @param onProgress
                         */
                        loadBufferAsync(gltfRuntime, id, onSuccess, onError, onProgress) {
                            return false;
                        }
                        /**
                         * Defines an override for loading texture buffers
                         * Return true to stop further extensions from loading this texture data
                         * @param gltfRuntime
                         * @param id
                         * @param onSuccess
                         * @param onError
                         */
                        loadTextureBufferAsync(gltfRuntime, id, onSuccess, onError) {
                            return false;
                        }
                        /**
                         * Defines an override for creating textures
                         * Return true to stop further extensions from loading this texture
                         * @param gltfRuntime
                         * @param id
                         * @param buffer
                         * @param onSuccess
                         * @param onError
                         */
                        createTextureAsync(gltfRuntime, id, buffer, onSuccess, onError) {
                            return false;
                        }
                        /**
                         * Defines an override for loading shader strings
                         * Return true to stop further extensions from loading this shader data
                         * @param gltfRuntime
                         * @param id
                         * @param onSuccess
                         * @param onError
                         */
                        loadShaderStringAsync(gltfRuntime, id, onSuccess, onError) {
                            return false;
                        }
                        /**
                         * Defines an override for loading materials
                         * Return true to stop further extensions from loading this material
                         * @param gltfRuntime
                         * @param id
                         * @param onSuccess
                         * @param onError
                         */
                        loadMaterialAsync(gltfRuntime, id, onSuccess, onError) {
                            return false;
                        }
                        // ---------
                        // Utilities
                        // ---------
                        static LoadRuntimeAsync(scene, data, rootUrl, onSuccess, onError) {
                            GLTFLoaderExtension.ApplyExtensions((loaderExtension) => {
                                return loaderExtension.loadRuntimeAsync(scene, data, rootUrl, onSuccess, onError);
                            }, () => {
                                setTimeout(() => {
                                    if (!onSuccess) {
                                        return;
                                    }
                                    onSuccess(GLTFLoaderBase.CreateRuntime(data.json, scene, rootUrl));
                                });
                            });
                        }
                        static LoadRuntimeExtensionsAsync(gltfRuntime, onSuccess, onError) {
                            GLTFLoaderExtension.ApplyExtensions((loaderExtension) => {
                                return loaderExtension.loadRuntimeExtensionsAsync(gltfRuntime, onSuccess, onError);
                            }, () => {
                                setTimeout(() => {
                                    onSuccess();
                                });
                            });
                        }
                        static LoadBufferAsync(gltfRuntime, id, onSuccess, onError, onProgress) {
                            GLTFLoaderExtension.ApplyExtensions((loaderExtension) => {
                                return loaderExtension.loadBufferAsync(gltfRuntime, id, onSuccess, onError, onProgress);
                            }, () => {
                                GLTFLoaderBase.LoadBufferAsync(gltfRuntime, id, onSuccess, onError, onProgress);
                            });
                        }
                        static LoadTextureAsync(gltfRuntime, id, onSuccess, onError) {
                            GLTFLoaderExtension.LoadTextureBufferAsync(gltfRuntime, id, (buffer) => {
                                if (buffer) {
                                    GLTFLoaderExtension.CreateTextureAsync(gltfRuntime, id, buffer, onSuccess, onError);
                                }
                            }, onError);
                        }
                        static LoadShaderStringAsync(gltfRuntime, id, onSuccess, onError) {
                            GLTFLoaderExtension.ApplyExtensions((loaderExtension) => {
                                return loaderExtension.loadShaderStringAsync(gltfRuntime, id, onSuccess, onError);
                            }, () => {
                                GLTFLoaderBase.LoadShaderStringAsync(gltfRuntime, id, onSuccess, onError);
                            });
                        }
                        static LoadMaterialAsync(gltfRuntime, id, onSuccess, onError) {
                            GLTFLoaderExtension.ApplyExtensions((loaderExtension) => {
                                return loaderExtension.loadMaterialAsync(gltfRuntime, id, onSuccess, onError);
                            }, () => {
                                GLTFLoaderBase.LoadMaterialAsync(gltfRuntime, id, onSuccess, onError);
                            });
                        }
                        static LoadTextureBufferAsync(gltfRuntime, id, onSuccess, onError) {
                            GLTFLoaderExtension.ApplyExtensions((loaderExtension) => {
                                return loaderExtension.loadTextureBufferAsync(gltfRuntime, id, onSuccess, onError);
                            }, () => {
                                GLTFLoaderBase.LoadTextureBufferAsync(gltfRuntime, id, onSuccess, onError);
                            });
                        }
                        static CreateTextureAsync(gltfRuntime, id, buffer, onSuccess, onError) {
                            GLTFLoaderExtension.ApplyExtensions((loaderExtension) => {
                                return loaderExtension.createTextureAsync(gltfRuntime, id, buffer, onSuccess, onError);
                            }, () => {
                                GLTFLoaderBase.CreateTextureAsync(gltfRuntime, id, buffer, onSuccess, onError);
                            });
                        }
                        static ApplyExtensions(func, defaultFunc) {
                            for (const extensionName in GLTFLoader.Extensions) {
                                const loaderExtension = GLTFLoader.Extensions[extensionName];
                                if (func(loaderExtension)) {
                                    return;
                                }
                            }
                            defaultFunc();
                        }
                    }
                    _glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader._CreateGLTF1Loader = () => new GLTFLoader();


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/1.0/glTFLoaderInterfaces.js":
/*!******************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/1.0/glTFLoaderInterfaces.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EBlendingFunction": () => (/* binding */ EBlendingFunction),
/* harmony export */   "EComponentType": () => (/* binding */ EComponentType),
/* harmony export */   "ECullingType": () => (/* binding */ ECullingType),
/* harmony export */   "EParameterType": () => (/* binding */ EParameterType),
/* harmony export */   "EShaderType": () => (/* binding */ EShaderType),
/* harmony export */   "ETextureFilterType": () => (/* binding */ ETextureFilterType),
/* harmony export */   "ETextureFormat": () => (/* binding */ ETextureFormat),
/* harmony export */   "ETextureWrapMode": () => (/* binding */ ETextureWrapMode)
                        /* harmony export */
});
                    /**
                     * Enums
                     * @hidden
                     */
                    var EComponentType;
                    (function (EComponentType) {
                        EComponentType[EComponentType["BYTE"] = 5120] = "BYTE";
                        EComponentType[EComponentType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
                        EComponentType[EComponentType["SHORT"] = 5122] = "SHORT";
                        EComponentType[EComponentType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
                        EComponentType[EComponentType["FLOAT"] = 5126] = "FLOAT";
                    })(EComponentType || (EComponentType = {}));
                    /** @hidden */
                    var EShaderType;
                    (function (EShaderType) {
                        EShaderType[EShaderType["FRAGMENT"] = 35632] = "FRAGMENT";
                        EShaderType[EShaderType["VERTEX"] = 35633] = "VERTEX";
                    })(EShaderType || (EShaderType = {}));
                    /** @hidden */
                    var EParameterType;
                    (function (EParameterType) {
                        EParameterType[EParameterType["BYTE"] = 5120] = "BYTE";
                        EParameterType[EParameterType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
                        EParameterType[EParameterType["SHORT"] = 5122] = "SHORT";
                        EParameterType[EParameterType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
                        EParameterType[EParameterType["INT"] = 5124] = "INT";
                        EParameterType[EParameterType["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
                        EParameterType[EParameterType["FLOAT"] = 5126] = "FLOAT";
                        EParameterType[EParameterType["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
                        EParameterType[EParameterType["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
                        EParameterType[EParameterType["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
                        EParameterType[EParameterType["INT_VEC2"] = 35667] = "INT_VEC2";
                        EParameterType[EParameterType["INT_VEC3"] = 35668] = "INT_VEC3";
                        EParameterType[EParameterType["INT_VEC4"] = 35669] = "INT_VEC4";
                        EParameterType[EParameterType["BOOL"] = 35670] = "BOOL";
                        EParameterType[EParameterType["BOOL_VEC2"] = 35671] = "BOOL_VEC2";
                        EParameterType[EParameterType["BOOL_VEC3"] = 35672] = "BOOL_VEC3";
                        EParameterType[EParameterType["BOOL_VEC4"] = 35673] = "BOOL_VEC4";
                        EParameterType[EParameterType["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
                        EParameterType[EParameterType["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
                        EParameterType[EParameterType["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
                        EParameterType[EParameterType["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
                    })(EParameterType || (EParameterType = {}));
                    /** @hidden */
                    var ETextureWrapMode;
                    (function (ETextureWrapMode) {
                        ETextureWrapMode[ETextureWrapMode["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
                        ETextureWrapMode[ETextureWrapMode["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
                        ETextureWrapMode[ETextureWrapMode["REPEAT"] = 10497] = "REPEAT";
                    })(ETextureWrapMode || (ETextureWrapMode = {}));
                    /** @hidden */
                    var ETextureFilterType;
                    (function (ETextureFilterType) {
                        ETextureFilterType[ETextureFilterType["NEAREST"] = 9728] = "NEAREST";
                        ETextureFilterType[ETextureFilterType["LINEAR"] = 9728] = "LINEAR";
                        ETextureFilterType[ETextureFilterType["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
                        ETextureFilterType[ETextureFilterType["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
                        ETextureFilterType[ETextureFilterType["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
                        ETextureFilterType[ETextureFilterType["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
                    })(ETextureFilterType || (ETextureFilterType = {}));
                    /** @hidden */
                    var ETextureFormat;
                    (function (ETextureFormat) {
                        ETextureFormat[ETextureFormat["ALPHA"] = 6406] = "ALPHA";
                        ETextureFormat[ETextureFormat["RGB"] = 6407] = "RGB";
                        ETextureFormat[ETextureFormat["RGBA"] = 6408] = "RGBA";
                        ETextureFormat[ETextureFormat["LUMINANCE"] = 6409] = "LUMINANCE";
                        ETextureFormat[ETextureFormat["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
                    })(ETextureFormat || (ETextureFormat = {}));
                    /** @hidden */
                    var ECullingType;
                    (function (ECullingType) {
                        ECullingType[ECullingType["FRONT"] = 1028] = "FRONT";
                        ECullingType[ECullingType["BACK"] = 1029] = "BACK";
                        ECullingType[ECullingType["FRONT_AND_BACK"] = 1032] = "FRONT_AND_BACK";
                    })(ECullingType || (ECullingType = {}));
                    /** @hidden */
                    var EBlendingFunction;
                    (function (EBlendingFunction) {
                        EBlendingFunction[EBlendingFunction["ZERO"] = 0] = "ZERO";
                        EBlendingFunction[EBlendingFunction["ONE"] = 1] = "ONE";
                        EBlendingFunction[EBlendingFunction["SRC_COLOR"] = 768] = "SRC_COLOR";
                        EBlendingFunction[EBlendingFunction["ONE_MINUS_SRC_COLOR"] = 769] = "ONE_MINUS_SRC_COLOR";
                        EBlendingFunction[EBlendingFunction["DST_COLOR"] = 774] = "DST_COLOR";
                        EBlendingFunction[EBlendingFunction["ONE_MINUS_DST_COLOR"] = 775] = "ONE_MINUS_DST_COLOR";
                        EBlendingFunction[EBlendingFunction["SRC_ALPHA"] = 770] = "SRC_ALPHA";
                        EBlendingFunction[EBlendingFunction["ONE_MINUS_SRC_ALPHA"] = 771] = "ONE_MINUS_SRC_ALPHA";
                        EBlendingFunction[EBlendingFunction["DST_ALPHA"] = 772] = "DST_ALPHA";
                        EBlendingFunction[EBlendingFunction["ONE_MINUS_DST_ALPHA"] = 773] = "ONE_MINUS_DST_ALPHA";
                        EBlendingFunction[EBlendingFunction["CONSTANT_COLOR"] = 32769] = "CONSTANT_COLOR";
                        EBlendingFunction[EBlendingFunction["ONE_MINUS_CONSTANT_COLOR"] = 32770] = "ONE_MINUS_CONSTANT_COLOR";
                        EBlendingFunction[EBlendingFunction["CONSTANT_ALPHA"] = 32771] = "CONSTANT_ALPHA";
                        EBlendingFunction[EBlendingFunction["ONE_MINUS_CONSTANT_ALPHA"] = 32772] = "ONE_MINUS_CONSTANT_ALPHA";
                        EBlendingFunction[EBlendingFunction["SRC_ALPHA_SATURATE"] = 776] = "SRC_ALPHA_SATURATE";
                    })(EBlendingFunction || (EBlendingFunction = {}));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/1.0/glTFLoaderUtils.js":
/*!*************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/1.0/glTFLoaderUtils.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTFUtils": () => (/* binding */ GLTFUtils)
                        /* harmony export */
});
/* harmony import */ var _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFLoaderInterfaces */ "../../../lts/loaders/dist/glTF/1.0/glTFLoaderInterfaces.js");
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/Materials/Textures/texture */ "core/Misc/observable");
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__);






                    /**
                     * Utils functions for GLTF
                     * @hidden
                     */
                    class GLTFUtils {
                        /**
                         * Sets the given "parameter" matrix
                         * @param scene: the Scene object
                         * @param source: the source node where to pick the matrix
                         * @param parameter: the GLTF technique parameter
                         * @param uniformName: the name of the shader's uniform
                         * @param shaderMaterial: the shader material
                         * @param scene
                         * @param source
                         * @param parameter
                         * @param uniformName
                         * @param shaderMaterial
                         */
                        static SetMatrix(scene, source, parameter, uniformName, shaderMaterial) {
                            let mat = null;
                            if (parameter.semantic === "MODEL") {
                                mat = source.getWorldMatrix();
                            }
                            else if (parameter.semantic === "PROJECTION") {
                                mat = scene.getProjectionMatrix();
                            }
                            else if (parameter.semantic === "VIEW") {
                                mat = scene.getViewMatrix();
                            }
                            else if (parameter.semantic === "MODELVIEWINVERSETRANSPOSE") {
                                mat = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.Transpose(source.getWorldMatrix().multiply(scene.getViewMatrix()).invert());
                            }
                            else if (parameter.semantic === "MODELVIEW") {
                                mat = source.getWorldMatrix().multiply(scene.getViewMatrix());
                            }
                            else if (parameter.semantic === "MODELVIEWPROJECTION") {
                                mat = source.getWorldMatrix().multiply(scene.getTransformMatrix());
                            }
                            else if (parameter.semantic === "MODELINVERSE") {
                                mat = source.getWorldMatrix().invert();
                            }
                            else if (parameter.semantic === "VIEWINVERSE") {
                                mat = scene.getViewMatrix().invert();
                            }
                            else if (parameter.semantic === "PROJECTIONINVERSE") {
                                mat = scene.getProjectionMatrix().invert();
                            }
                            else if (parameter.semantic === "MODELVIEWINVERSE") {
                                mat = source.getWorldMatrix().multiply(scene.getViewMatrix()).invert();
                            }
                            else if (parameter.semantic === "MODELVIEWPROJECTIONINVERSE") {
                                mat = source.getWorldMatrix().multiply(scene.getTransformMatrix()).invert();
                            }
                            else if (parameter.semantic === "MODELINVERSETRANSPOSE") {
                                mat = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.Transpose(source.getWorldMatrix().invert());
                            }
                            else {
                                debugger;
                            }
                            if (mat) {
                                switch (parameter.type) {
                                    case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT2:
                                        shaderMaterial.setMatrix2x2(uniformName, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.GetAsMatrix2x2(mat));
                                        break;
                                    case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT3:
                                        shaderMaterial.setMatrix3x3(uniformName, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.GetAsMatrix3x3(mat));
                                        break;
                                    case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT4:
                                        shaderMaterial.setMatrix(uniformName, mat);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        /**
                         * Sets the given "parameter" matrix
                         * @param shaderMaterial: the shader material
                         * @param uniform: the name of the shader's uniform
                         * @param value: the value of the uniform
                         * @param type: the uniform's type (EParameterType FLOAT, VEC2, VEC3 or VEC4)
                         * @param shaderMaterial
                         * @param uniform
                         * @param value
                         * @param type
                         */
                        static SetUniform(shaderMaterial, uniform, value, type) {
                            switch (type) {
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT:
                                    shaderMaterial.setFloat(uniform, value);
                                    return true;
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_VEC2:
                                    shaderMaterial.setVector2(uniform, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector2.FromArray(value));
                                    return true;
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_VEC3:
                                    shaderMaterial.setVector3(uniform, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(value));
                                    return true;
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_VEC4:
                                    shaderMaterial.setVector4(uniform, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector4.FromArray(value));
                                    return true;
                                default:
                                    return false;
                            }
                        }
                        /**
                         * Returns the wrap mode of the texture
                         * @param mode: the mode value
                         * @param mode
                         */
                        static GetWrapMode(mode) {
                            switch (mode) {
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureWrapMode.CLAMP_TO_EDGE:
                                    return core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.CLAMP_ADDRESSMODE;
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureWrapMode.MIRRORED_REPEAT:
                                    return core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.MIRROR_ADDRESSMODE;
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureWrapMode.REPEAT:
                                    return core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.WRAP_ADDRESSMODE;
                                default:
                                    return core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.WRAP_ADDRESSMODE;
                            }
                        }
                        /**
                         * Returns the byte stride giving an accessor
                         * @param accessor: the GLTF accessor objet
                         * @param accessor
                         */
                        static GetByteStrideFromType(accessor) {
                            // Needs this function since "byteStride" isn't requiered in glTF format
                            const type = accessor.type;
                            switch (type) {
                                case "VEC2":
                                    return 2;
                                case "VEC3":
                                    return 3;
                                case "VEC4":
                                    return 4;
                                case "MAT2":
                                    return 4;
                                case "MAT3":
                                    return 9;
                                case "MAT4":
                                    return 16;
                                default:
                                    return 1;
                            }
                        }
                        /**
                         * Returns the texture filter mode giving a mode value
                         * @param mode: the filter mode value
                         * @param mode
                         */
                        static GetTextureFilterMode(mode) {
                            switch (mode) {
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.LINEAR:
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.LINEAR_MIPMAP_NEAREST:
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.LINEAR_MIPMAP_LINEAR:
                                    return core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.TRILINEAR_SAMPLINGMODE;
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.NEAREST:
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.NEAREST_MIPMAP_NEAREST:
                                    return core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.NEAREST_SAMPLINGMODE;
                                default:
                                    return core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.BILINEAR_SAMPLINGMODE;
                            }
                        }
                        static GetBufferFromBufferView(gltfRuntime, bufferView, byteOffset, byteLength, componentType) {
                            var byteOffset = bufferView.byteOffset + byteOffset;
                            const loadedBufferView = gltfRuntime.loadedBufferViews[bufferView.buffer];
                            if (byteOffset + byteLength > loadedBufferView.byteLength) {
                                throw new Error("Buffer access is out of range");
                            }
                            const buffer = loadedBufferView.buffer;
                            byteOffset += loadedBufferView.byteOffset;
                            switch (componentType) {
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EComponentType.BYTE:
                                    return new Int8Array(buffer, byteOffset, byteLength);
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EComponentType.UNSIGNED_BYTE:
                                    return new Uint8Array(buffer, byteOffset, byteLength);
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EComponentType.SHORT:
                                    return new Int16Array(buffer, byteOffset, byteLength);
                                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EComponentType.UNSIGNED_SHORT:
                                    return new Uint16Array(buffer, byteOffset, byteLength);
                                default:
                                    return new Float32Array(buffer, byteOffset, byteLength);
                            }
                        }
                        /**
                         * Returns a buffer from its accessor
                         * @param gltfRuntime: the GLTF runtime
                         * @param accessor: the GLTF accessor
                         * @param gltfRuntime
                         * @param accessor
                         */
                        static GetBufferFromAccessor(gltfRuntime, accessor) {
                            const bufferView = gltfRuntime.bufferViews[accessor.bufferView];
                            const byteLength = accessor.count * GLTFUtils.GetByteStrideFromType(accessor);
                            return GLTFUtils.GetBufferFromBufferView(gltfRuntime, bufferView, accessor.byteOffset, byteLength, accessor.componentType);
                        }
                        /**
                         * Decodes a buffer view into a string
                         * @param view: the buffer view
                         * @param view
                         */
                        static DecodeBufferToText(view) {
                            let result = "";
                            const length = view.byteLength;
                            for (let i = 0; i < length; ++i) {
                                result += String.fromCharCode(view[i]);
                            }
                            return result;
                        }
                        /**
                         * Returns the default material of gltf. Related to
                         * https://github.com/KhronosGroup/glTF/tree/master/specification/1.0#appendix-a-default-material
                         * @param scene: the Babylon.js scene
                         * @param scene
                         */
                        static GetDefaultMaterial(scene) {
                            if (!GLTFUtils._DefaultMaterial) {
                                core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore.GLTFDefaultMaterialVertexShader = [
                                    "precision highp float;",
                                    "",
                                    "uniform mat4 worldView;",
                                    "uniform mat4 projection;",
                                    "",
                                    "attribute vec3 position;",
                                    "",
                                    "void main(void)",
                                    "{",
                                    "    gl_Position = projection * worldView * vec4(position, 1.0);",
                                    "}",
                                ].join("\n");
                                core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore.GLTFDefaultMaterialPixelShader = [
                                    "precision highp float;",
                                    "",
                                    "uniform vec4 u_emission;",
                                    "",
                                    "void main(void)",
                                    "{",
                                    "    gl_FragColor = u_emission;",
                                    "}",
                                ].join("\n");
                                const shaderPath = {
                                    vertex: "GLTFDefaultMaterial",
                                    fragment: "GLTFDefaultMaterial",
                                };
                                const options = {
                                    attributes: ["position"],
                                    uniforms: ["worldView", "projection", "u_emission"],
                                    samplers: new Array(),
                                    needAlphaBlending: false,
                                };
                                GLTFUtils._DefaultMaterial = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.ShaderMaterial("GLTFDefaultMaterial", scene, shaderPath, options);
                                GLTFUtils._DefaultMaterial.setColor4("u_emission", new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color4(0.5, 0.5, 0.5, 1.0));
                            }
                            return GLTFUtils._DefaultMaterial;
                        }
                    }
                    // The GLTF default material
                    GLTFUtils._DefaultMaterial = null;


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/1.0/glTFMaterialsCommonExtension.js":
/*!**************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/1.0/glTFMaterialsCommonExtension.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTFMaterialsCommonExtension": () => (/* binding */ GLTFMaterialsCommonExtension)
                        /* harmony export */
});
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFLoader */ "../../../lts/loaders/dist/glTF/1.0/glTFLoader.js");
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/Lights/spotLight */ "core/Misc/observable");
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__);










                    /** @hidden */
                    class GLTFMaterialsCommonExtension extends _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderExtension {
                        constructor() {
                            super("KHR_materials_common");
                        }
                        loadRuntimeExtensionsAsync(gltfRuntime, onSuccess, onError) {
                            if (!gltfRuntime.extensions) {
                                return false;
                            }
                            const extension = gltfRuntime.extensions[this.name];
                            if (!extension) {
                                return false;
                            }
                            // Create lights
                            const lights = extension.lights;
                            if (lights) {
                                for (const thing in lights) {
                                    const light = lights[thing];
                                    switch (light.type) {
                                        case "ambient":
                                            var ambientLight = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.HemisphericLight(light.name, new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0), gltfRuntime.scene);
                                            var ambient = light.ambient;
                                            if (ambient) {
                                                ambientLight.diffuse = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(ambient.color || [1, 1, 1]);
                                            }
                                            break;
                                        case "point":
                                            var pointLight = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.PointLight(light.name, new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(10, 10, 10), gltfRuntime.scene);
                                            var point = light.point;
                                            if (point) {
                                                pointLight.diffuse = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(point.color || [1, 1, 1]);
                                            }
                                            break;
                                        case "directional":
                                            var dirLight = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(light.name, new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, 0), gltfRuntime.scene);
                                            var directional = light.directional;
                                            if (directional) {
                                                dirLight.diffuse = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(directional.color || [1, 1, 1]);
                                            }
                                            break;
                                        case "spot":
                                            var spot = light.spot;
                                            if (spot) {
                                                const spotLight = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.SpotLight(light.name, new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 10, 0), new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, 0), spot.fallOffAngle || Math.PI, spot.fallOffExponent || 0.0, gltfRuntime.scene);
                                                spotLight.diffuse = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(spot.color || [1, 1, 1]);
                                            }
                                            break;
                                        default:
                                            core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn('GLTF Material Common extension: light type "' + light.type + "” not supported");
                                            break;
                                    }
                                }
                            }
                            return false;
                        }
                        loadMaterialAsync(gltfRuntime, id, onSuccess, onError) {
                            const material = gltfRuntime.materials[id];
                            if (!material || !material.extensions) {
                                return false;
                            }
                            const extension = material.extensions[this.name];
                            if (!extension) {
                                return false;
                            }
                            const standardMaterial = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial(id, gltfRuntime.scene);
                            standardMaterial.sideOrientation = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Material.CounterClockWiseSideOrientation;
                            if (extension.technique === "CONSTANT") {
                                standardMaterial.disableLighting = true;
                            }
                            standardMaterial.backFaceCulling = extension.doubleSided === undefined ? false : !extension.doubleSided;
                            standardMaterial.alpha = extension.values.transparency === undefined ? 1.0 : extension.values.transparency;
                            standardMaterial.specularPower = extension.values.shininess === undefined ? 0.0 : extension.values.shininess;
                            // Ambient
                            if (typeof extension.values.ambient === "string") {
                                this._loadTexture(gltfRuntime, extension.values.ambient, standardMaterial, "ambientTexture", onError);
                            }
                            else {
                                standardMaterial.ambientColor = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(extension.values.ambient || [0, 0, 0]);
                            }
                            // Diffuse
                            if (typeof extension.values.diffuse === "string") {
                                this._loadTexture(gltfRuntime, extension.values.diffuse, standardMaterial, "diffuseTexture", onError);
                            }
                            else {
                                standardMaterial.diffuseColor = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(extension.values.diffuse || [0, 0, 0]);
                            }
                            // Emission
                            if (typeof extension.values.emission === "string") {
                                this._loadTexture(gltfRuntime, extension.values.emission, standardMaterial, "emissiveTexture", onError);
                            }
                            else {
                                standardMaterial.emissiveColor = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(extension.values.emission || [0, 0, 0]);
                            }
                            // Specular
                            if (typeof extension.values.specular === "string") {
                                this._loadTexture(gltfRuntime, extension.values.specular, standardMaterial, "specularTexture", onError);
                            }
                            else {
                                standardMaterial.specularColor = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(extension.values.specular || [0, 0, 0]);
                            }
                            return true;
                        }
                        _loadTexture(gltfRuntime, id, material, propertyPath, onError) {
                            // Create buffer from texture url
                            _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderBase.LoadTextureBufferAsync(gltfRuntime, id, (buffer) => {
                                // Create texture from buffer
                                _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderBase.CreateTextureAsync(gltfRuntime, id, buffer, (texture) => (material[propertyPath] = texture), onError);
                            }, onError);
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(new GLTFMaterialsCommonExtension());


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/1.0/index.js":
/*!***************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/1.0/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EBlendingFunction": () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EBlendingFunction),
/* harmony export */   "EComponentType": () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EComponentType),
/* harmony export */   "ECullingType": () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.ECullingType),
/* harmony export */   "EParameterType": () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EParameterType),
/* harmony export */   "EShaderType": () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EShaderType),
/* harmony export */   "ETextureFilterType": () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.ETextureFilterType),
/* harmony export */   "ETextureFormat": () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.ETextureFormat),
/* harmony export */   "ETextureWrapMode": () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.ETextureWrapMode),
/* harmony export */   "GLTFBinaryExtension": () => (/* reexport safe */ _glTFBinaryExtension__WEBPACK_IMPORTED_MODULE_0__.GLTFBinaryExtension),
/* harmony export */   "GLTFLoader": () => (/* reexport safe */ _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader),
/* harmony export */   "GLTFLoaderBase": () => (/* reexport safe */ _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderBase),
/* harmony export */   "GLTFLoaderExtension": () => (/* reexport safe */ _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderExtension),
/* harmony export */   "GLTFMaterialsCommonExtension": () => (/* reexport safe */ _glTFMaterialsCommonExtension__WEBPACK_IMPORTED_MODULE_4__.GLTFMaterialsCommonExtension),
/* harmony export */   "GLTFUtils": () => (/* reexport safe */ _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_3__.GLTFUtils)
                        /* harmony export */
});
/* harmony import */ var _glTFBinaryExtension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFBinaryExtension */ "../../../lts/loaders/dist/glTF/1.0/glTFBinaryExtension.js");
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFLoader */ "../../../lts/loaders/dist/glTF/1.0/glTFLoader.js");
/* harmony import */ var _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFLoaderInterfaces */ "../../../lts/loaders/dist/glTF/1.0/glTFLoaderInterfaces.js");
/* harmony import */ var _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./glTFLoaderUtils */ "../../../lts/loaders/dist/glTF/1.0/glTFLoaderUtils.js");
/* harmony import */ var _glTFMaterialsCommonExtension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./glTFMaterialsCommonExtension */ "../../../lts/loaders/dist/glTF/1.0/glTFMaterialsCommonExtension.js");







                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_lights_image_based.js":
/*!*******************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_lights_image_based.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EXT_lights_image_based": () => (/* binding */ EXT_lights_image_based)
                        /* harmony export */
});
/* harmony import */ var core_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/rawCubeTexture */ "core/Misc/observable");
/* harmony import */ var core_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");





                    const NAME = "EXT_lights_image_based";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Vendor/EXT_lights_image_based/README.md)
                     */
                    class EXT_lights_image_based {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                            delete this._lights;
                        }
                        /** @hidden */
                        onLoading() {
                            const extensions = this._loader.gltf.extensions;
                            if (extensions && extensions[this.name]) {
                                const extension = extensions[this.name];
                                this._lights = extension.lights;
                            }
                        }
                        /**
                         * @param context
                         * @param scene
                         * @hidden
                         */
                        loadSceneAsync(context, scene) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, scene, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                promises.push(this._loader.loadSceneAsync(context, scene));
                                this._loader.logOpen(`${extensionContext}`);
                                const light = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(`${extensionContext}/light`, this._lights, extension.light);
                                promises.push(this._loadLightAsync(`/extensions/${this.name}/lights/${extension.light}`, light).then((texture) => {
                                    this._loader.babylonScene.environmentTexture = texture;
                                }));
                                this._loader.logClose();
                                return Promise.all(promises).then(() => { });
                            });
                        }
                        _loadLightAsync(context, light) {
                            if (!light._loaded) {
                                const promises = new Array();
                                this._loader.logOpen(`${context}`);
                                const imageData = new Array(light.specularImages.length);
                                for (let mipmap = 0; mipmap < light.specularImages.length; mipmap++) {
                                    const faces = light.specularImages[mipmap];
                                    imageData[mipmap] = new Array(faces.length);
                                    for (let face = 0; face < faces.length; face++) {
                                        const specularImageContext = `${context}/specularImages/${mipmap}/${face}`;
                                        this._loader.logOpen(`${specularImageContext}`);
                                        const index = faces[face];
                                        const image = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(specularImageContext, this._loader.gltf.images, index);
                                        promises.push(this._loader.loadImageAsync(`/images/${index}`, image).then((data) => {
                                            imageData[mipmap][face] = data;
                                        }));
                                        this._loader.logClose();
                                    }
                                }
                                this._loader.logClose();
                                light._loaded = Promise.all(promises).then(() => {
                                    const babylonTexture = new core_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.RawCubeTexture(this._loader.babylonScene, null, light.specularImageSize);
                                    babylonTexture.name = light.name || "environment";
                                    light._babylonTexture = babylonTexture;
                                    if (light.intensity != undefined) {
                                        babylonTexture.level = light.intensity;
                                    }
                                    if (light.rotation) {
                                        let rotation = core_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArray(light.rotation);
                                        // Invert the rotation so that positive rotation is counter-clockwise.
                                        if (!this._loader.babylonScene.useRightHandedSystem) {
                                            rotation = core_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Inverse(rotation);
                                        }
                                        core_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.Matrix.FromQuaternionToRef(rotation, babylonTexture.getReflectionTextureMatrix());
                                    }
                                    if (!light.irradianceCoefficients) {
                                        throw new Error(`${context}: Irradiance coefficients are missing`);
                                    }
                                    const sphericalHarmonics = core_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.SphericalHarmonics.FromArray(light.irradianceCoefficients);
                                    sphericalHarmonics.scaleInPlace(light.intensity);
                                    sphericalHarmonics.convertIrradianceToLambertianRadiance();
                                    const sphericalPolynomial = core_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.SphericalPolynomial.FromHarmonics(sphericalHarmonics);
                                    // Compute the lod generation scale to fit exactly to the number of levels available.
                                    const lodGenerationScale = (imageData.length - 1) / core_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.Scalar.Log2(light.specularImageSize);
                                    return babylonTexture.updateRGBDAsync(imageData, sphericalPolynomial, lodGenerationScale);
                                });
                            }
                            return light._loaded.then(() => {
                                return light._babylonTexture;
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new EXT_lights_image_based(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.js":
/*!********************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EXT_mesh_gpu_instancing": () => (/* binding */ EXT_mesh_gpu_instancing)
                        /* harmony export */
});
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Meshes/thinInstanceMesh */ "core/Misc/observable");
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");



                    const NAME = "EXT_mesh_gpu_instancing";
                    /**
                     * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1691)
                     * [Playground Sample](https://playground.babylonjs.com/#QFIGLW#9)
                     * !!! Experimental Extension Subject to Changes !!!
                     */
                    class EXT_mesh_gpu_instancing {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param node
                         * @param assign
                         * @hidden
                         */
                        loadNodeAsync(context, node, assign) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, node, this.name, (extensionContext, extension) => {
                                this._loader._disableInstancedMesh++;
                                const promise = this._loader.loadNodeAsync(`/nodes/${node.index}`, node, assign);
                                this._loader._disableInstancedMesh--;
                                if (!node._primitiveBabylonMeshes) {
                                    return promise;
                                }
                                const promises = new Array();
                                let instanceCount = 0;
                                const loadAttribute = (attribute) => {
                                    if (extension.attributes[attribute] == undefined) {
                                        promises.push(Promise.resolve(null));
                                        return;
                                    }
                                    const accessor = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(`${extensionContext}/attributes/${attribute}`, this._loader.gltf.accessors, extension.attributes[attribute]);
                                    promises.push(this._loader._loadFloatAccessorAsync(`/accessors/${accessor.bufferView}`, accessor));
                                    if (instanceCount === 0) {
                                        instanceCount = accessor.count;
                                    }
                                    else if (instanceCount !== accessor.count) {
                                        throw new Error(`${extensionContext}/attributes: Instance buffer accessors do not have the same count.`);
                                    }
                                };
                                loadAttribute("TRANSLATION");
                                loadAttribute("ROTATION");
                                loadAttribute("SCALE");
                                return promise.then((babylonTransformNode) => {
                                    return Promise.all(promises).then(([translationBuffer, rotationBuffer, scaleBuffer]) => {
                                        const matrices = new Float32Array(instanceCount * 16);
                                        core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0].copyFromFloats(0, 0, 0); // translation
                                        core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[0].copyFromFloats(0, 0, 0, 1); // rotation
                                        core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1].copyFromFloats(1, 1, 1); // scale
                                        for (let i = 0; i < instanceCount; ++i) {
                                            translationBuffer && core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(translationBuffer, i * 3, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0]);
                                            rotationBuffer && core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArrayToRef(rotationBuffer, i * 4, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[0]);
                                            scaleBuffer && core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(scaleBuffer, i * 3, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1]);
                                            core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix.ComposeToRef(core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1], core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[0], core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0], core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0]);
                                            core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0].copyToArray(matrices, i * 16);
                                        }
                                        for (const babylonMesh of node._primitiveBabylonMeshes) {
                                            babylonMesh.thinInstanceSetBuffer("matrix", matrices, 16, true);
                                        }
                                        return babylonTransformNode;
                                    });
                                });
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new EXT_mesh_gpu_instancing(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_meshopt_compression.js":
/*!********************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_meshopt_compression.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EXT_meshopt_compression": () => (/* binding */ EXT_meshopt_compression)
                        /* harmony export */
});
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");
/* harmony import */ var core_Meshes_Compression_meshoptCompression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/Meshes/Compression/meshoptCompression */ "core/Misc/observable");
/* harmony import */ var core_Meshes_Compression_meshoptCompression__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_Meshes_Compression_meshoptCompression__WEBPACK_IMPORTED_MODULE_1__);


                    const NAME = "EXT_meshopt_compression";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_meshopt_compression)
                     *
                     * This extension uses a WebAssembly decoder module from https://github.com/zeux/meshoptimizer/tree/master/js
                     * @since 5.0.0
                     */
                    class EXT_meshopt_compression {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            this.enabled = loader.isExtensionUsed(NAME);
                            this._loader = loader;
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param bufferView
                         * @hidden
                         */
                        loadBufferViewAsync(context, bufferView) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.LoadExtensionAsync(context, bufferView, this.name, (extensionContext, extension) => {
                                const bufferViewMeshopt = bufferView;
                                if (bufferViewMeshopt._meshOptData) {
                                    return bufferViewMeshopt._meshOptData;
                                }
                                const buffer = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get(`${context}/buffer`, this._loader.gltf.buffers, extension.buffer);
                                bufferViewMeshopt._meshOptData = this._loader.loadBufferAsync(`/buffers/${buffer.index}`, buffer, extension.byteOffset || 0, extension.byteLength).then((buffer) => {
                                    return core_Meshes_Compression_meshoptCompression__WEBPACK_IMPORTED_MODULE_1__.MeshoptCompression.Default.decodeGltfBufferAsync(buffer, extension.count, extension.byteStride, extension.mode, extension.filter);
                                });
                                return bufferViewMeshopt._meshOptData;
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, (loader) => new EXT_meshopt_compression(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_texture_webp.js":
/*!*************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_texture_webp.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EXT_texture_webp": () => (/* binding */ EXT_texture_webp)
                        /* harmony export */
});
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");

                    const NAME = "EXT_texture_webp";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Vendor/EXT_texture_webp/)
                     */
                    class EXT_texture_webp {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /** The name of this extension. */
                            this.name = NAME;
                            this._loader = loader;
                            this.enabled = loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param texture
                         * @param assign
                         * @hidden
                         */
                        _loadTextureAsync(context, texture, assign) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.LoadExtensionAsync(context, texture, this.name, (extensionContext, extension) => {
                                const sampler = texture.sampler == undefined ? _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.DefaultSampler : _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get(`${context}/sampler`, this._loader.gltf.samplers, texture.sampler);
                                const image = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get(`${extensionContext}/source`, this._loader.gltf.images, extension.source);
                                return this._loader._createTextureAsync(context, sampler, image, (babylonTexture) => {
                                    assign(babylonTexture);
                                }, undefined, !texture._textureInfo.nonColorData);
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, (loader) => new EXT_texture_webp(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/ExtrasAsMetadata.js":
/*!*************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/ExtrasAsMetadata.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExtrasAsMetadata": () => (/* binding */ ExtrasAsMetadata)
                        /* harmony export */
});
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");

                    const NAME = "ExtrasAsMetadata";
                    /**
                     * Store glTF extras (if present) in BJS objects' metadata
                     */
                    class ExtrasAsMetadata {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines whether this extension is enabled.
                             */
                            this.enabled = true;
                            this._loader = loader;
                        }
                        _assignExtras(babylonObject, gltfProp) {
                            if (gltfProp.extras && Object.keys(gltfProp.extras).length > 0) {
                                const metadata = (babylonObject.metadata = babylonObject.metadata || {});
                                const gltf = (metadata.gltf = metadata.gltf || {});
                                gltf.extras = gltfProp.extras;
                            }
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param node
                         * @param assign
                         * @hidden
                         */
                        loadNodeAsync(context, node, assign) {
                            return this._loader.loadNodeAsync(context, node, (babylonTransformNode) => {
                                this._assignExtras(babylonTransformNode, node);
                                assign(babylonTransformNode);
                            });
                        }
                        /**
                         * @param context
                         * @param camera
                         * @param assign
                         * @hidden
                         */
                        loadCameraAsync(context, camera, assign) {
                            return this._loader.loadCameraAsync(context, camera, (babylonCamera) => {
                                this._assignExtras(babylonCamera, camera);
                                assign(babylonCamera);
                            });
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonDrawMode
                         * @hidden
                         */
                        createMaterial(context, material, babylonDrawMode) {
                            const babylonMaterial = this._loader.createMaterial(context, material, babylonDrawMode);
                            this._assignExtras(babylonMaterial, material);
                            return babylonMaterial;
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, (loader) => new ExtrasAsMetadata(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_draco_mesh_compression.js":
/*!***********************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_draco_mesh_compression.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_draco_mesh_compression": () => (/* binding */ KHR_draco_mesh_compression)
                        /* harmony export */
});
/* harmony import */ var core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Meshes/geometry */ "core/Misc/observable");
/* harmony import */ var core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");




                    const NAME = "KHR_draco_mesh_compression";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression)
                     */
                    class KHR_draco_mesh_compression {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            this._loader = loader;
                            this.enabled = core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.DracoCompression.DecoderAvailable && this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            delete this.dracoCompression;
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param primitive
                         * @param babylonMesh
                         * @hidden
                         */
                        _loadVertexDataAsync(context, primitive, babylonMesh) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, primitive, this.name, (extensionContext, extension) => {
                                if (primitive.mode != undefined) {
                                    if (primitive.mode !== 5 /* TRIANGLE_STRIP */ && primitive.mode !== 4 /* TRIANGLES */) {
                                        throw new Error(`${context}: Unsupported mode ${primitive.mode}`);
                                    }
                                    // TODO: handle triangle strips
                                    if (primitive.mode === 5 /* TRIANGLE_STRIP */) {
                                        throw new Error(`${context}: Mode ${primitive.mode} is not currently supported`);
                                    }
                                }
                                const attributes = {};
                                const dividers = {};
                                const loadAttribute = (name, kind) => {
                                    const uniqueId = extension.attributes[name];
                                    if (uniqueId === undefined || primitive.attributes[name] === undefined) {
                                        return;
                                    }
                                    attributes[kind] = uniqueId;
                                    const accessor = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(`${context}/attributes/${name}`, this._loader.gltf.accessors, primitive.attributes[name]);
                                    if (accessor.normalized && accessor.componentType !== 5126 /* FLOAT */) {
                                        let divider = 1;
                                        switch (accessor.componentType) {
                                            case 5120 /* BYTE */:
                                                divider = 127.0;
                                                break;
                                            case 5121 /* UNSIGNED_BYTE */:
                                                divider = 255.0;
                                                break;
                                            case 5122 /* SHORT */:
                                                divider = 32767.0;
                                                break;
                                            case 5123 /* UNSIGNED_SHORT */:
                                                divider = 65535.0;
                                                break;
                                        }
                                        dividers[kind] = divider;
                                    }
                                    babylonMesh._delayInfo = babylonMesh._delayInfo || [];
                                    if (babylonMesh._delayInfo.indexOf(kind) === -1) {
                                        babylonMesh._delayInfo.push(kind);
                                    }
                                };
                                loadAttribute("POSITION", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
                                loadAttribute("NORMAL", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
                                loadAttribute("TANGENT", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind);
                                loadAttribute("TEXCOORD_0", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind);
                                loadAttribute("TEXCOORD_1", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind);
                                loadAttribute("TEXCOORD_2", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV3Kind);
                                loadAttribute("TEXCOORD_3", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV4Kind);
                                loadAttribute("TEXCOORD_4", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV5Kind);
                                loadAttribute("TEXCOORD_5", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV6Kind);
                                loadAttribute("JOINTS_0", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesKind);
                                loadAttribute("WEIGHTS_0", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsKind);
                                loadAttribute("COLOR_0", core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind);
                                const bufferView = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(extensionContext, this._loader.gltf.bufferViews, extension.bufferView);
                                if (!bufferView._dracoBabylonGeometry) {
                                    bufferView._dracoBabylonGeometry = this._loader.loadBufferViewAsync(`/bufferViews/${bufferView.index}`, bufferView).then((data) => {
                                        const dracoCompression = this.dracoCompression || core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.DracoCompression.Default;
                                        return dracoCompression
                                            .decodeMeshAsync(data, attributes, dividers)
                                            .then((babylonVertexData) => {
                                                const babylonGeometry = new core_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.Geometry(babylonMesh.name, this._loader.babylonScene);
                                                babylonVertexData.applyToGeometry(babylonGeometry);
                                                return babylonGeometry;
                                            })
                                            .catch((error) => {
                                                throw new Error(`${context}: ${error.message}`);
                                            });
                                    });
                                }
                                return bufferView._dracoBabylonGeometry;
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_draco_mesh_compression(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_lights_punctual.js":
/*!****************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_lights_punctual.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_lights": () => (/* binding */ KHR_lights)
                        /* harmony export */
});
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Lights/light */ "core/Misc/observable");
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");







                    const NAME = "KHR_lights_punctual";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual)
                     */
                    class KHR_lights {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                            delete this._lights;
                        }
                        /** @hidden */
                        onLoading() {
                            const extensions = this._loader.gltf.extensions;
                            if (extensions && extensions[this.name]) {
                                const extension = extensions[this.name];
                                this._lights = extension.lights;
                            }
                        }
                        /**
                         * @param context
                         * @param node
                         * @param assign
                         * @hidden
                         */
                        loadNodeAsync(context, node, assign) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, node, this.name, (extensionContext, extension) => {
                                return this._loader.loadNodeAsync(context, node, (babylonMesh) => {
                                    let babylonLight;
                                    const light = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(extensionContext, this._lights, extension.light);
                                    const name = light.name || babylonMesh.name;
                                    this._loader.babylonScene._blockEntityCollection = !!this._loader._assetContainer;
                                    switch (light.type) {
                                        case "directional" /* DIRECTIONAL */: {
                                            babylonLight = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(name, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Backward(), this._loader.babylonScene);
                                            break;
                                        }
                                        case "point" /* POINT */: {
                                            babylonLight = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.PointLight(name, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero(), this._loader.babylonScene);
                                            break;
                                        }
                                        case "spot" /* SPOT */: {
                                            const babylonSpotLight = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.SpotLight(name, core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero(), core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Backward(), 0, 1, this._loader.babylonScene);
                                            babylonSpotLight.angle = ((light.spot && light.spot.outerConeAngle) || Math.PI / 4) * 2;
                                            babylonSpotLight.innerAngle = ((light.spot && light.spot.innerConeAngle) || 0) * 2;
                                            babylonLight = babylonSpotLight;
                                            break;
                                        }
                                        default: {
                                            this._loader.babylonScene._blockEntityCollection = false;
                                            throw new Error(`${extensionContext}: Invalid light type (${light.type})`);
                                        }
                                    }
                                    babylonLight._parentContainer = this._loader._assetContainer;
                                    this._loader.babylonScene._blockEntityCollection = false;
                                    babylonLight.falloffType = core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light.FALLOFF_GLTF;
                                    babylonLight.diffuse = light.color ? core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(light.color) : core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
                                    babylonLight.intensity = light.intensity == undefined ? 1 : light.intensity;
                                    babylonLight.range = light.range == undefined ? Number.MAX_VALUE : light.range;
                                    babylonLight.parent = babylonMesh;
                                    this._loader._babylonLights.push(babylonLight);
                                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.AddPointerMetadata(babylonLight, extensionContext);
                                    assign(babylonMesh);
                                });
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_lights(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_clearcoat.js":
/*!********************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_clearcoat.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_materials_clearcoat": () => (/* binding */ KHR_materials_clearcoat)
                        /* harmony export */
});
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/PBR/pbrMaterial */ "core/Misc/observable");
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");


                    const NAME = "KHR_materials_clearcoat";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_materials_clearcoat/README.md)
                     * [Playground Sample](https://www.babylonjs-playground.com/frame.html#7F7PN6#8)
                     */
                    class KHR_materials_clearcoat {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 190;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMaterial
                         * @hidden
                         */
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                promises.push(this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
                                promises.push(this._loadClearCoatPropertiesAsync(extensionContext, extension, babylonMaterial));
                                return Promise.all(promises).then(() => { });
                            });
                        }
                        _loadClearCoatPropertiesAsync(context, properties, babylonMaterial) {
                            if (!(babylonMaterial instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            const promises = new Array();
                            babylonMaterial.clearCoat.isEnabled = true;
                            babylonMaterial.clearCoat.useRoughnessFromMainTexture = false;
                            babylonMaterial.clearCoat.remapF0OnInterfaceChange = false;
                            if (properties.clearcoatFactor != undefined) {
                                babylonMaterial.clearCoat.intensity = properties.clearcoatFactor;
                            }
                            else {
                                babylonMaterial.clearCoat.intensity = 0;
                            }
                            if (properties.clearcoatTexture) {
                                promises.push(this._loader.loadTextureInfoAsync(`${context}/clearcoatTexture`, properties.clearcoatTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (ClearCoat Intensity)`;
                                    babylonMaterial.clearCoat.texture = texture;
                                }));
                            }
                            if (properties.clearcoatRoughnessFactor != undefined) {
                                babylonMaterial.clearCoat.roughness = properties.clearcoatRoughnessFactor;
                            }
                            else {
                                babylonMaterial.clearCoat.roughness = 0;
                            }
                            if (properties.clearcoatRoughnessTexture) {
                                properties.clearcoatRoughnessTexture.nonColorData = true;
                                promises.push(this._loader.loadTextureInfoAsync(`${context}/clearcoatRoughnessTexture`, properties.clearcoatRoughnessTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (ClearCoat Roughness)`;
                                    babylonMaterial.clearCoat.textureRoughness = texture;
                                }));
                            }
                            if (properties.clearcoatNormalTexture) {
                                properties.clearcoatNormalTexture.nonColorData = true;
                                promises.push(this._loader.loadTextureInfoAsync(`${context}/clearcoatNormalTexture`, properties.clearcoatNormalTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (ClearCoat Normal)`;
                                    babylonMaterial.clearCoat.bumpTexture = texture;
                                }));
                                babylonMaterial.invertNormalMapX = !babylonMaterial.getScene().useRightHandedSystem;
                                babylonMaterial.invertNormalMapY = babylonMaterial.getScene().useRightHandedSystem;
                                if (properties.clearcoatNormalTexture.scale != undefined) {
                                    babylonMaterial.clearCoat.bumpTexture.level = properties.clearcoatNormalTexture.scale;
                                }
                            }
                            return Promise.all(promises).then(() => { });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_clearcoat(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_emissive_strength.js":
/*!****************************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_emissive_strength.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_materials_emissive_strength": () => (/* binding */ KHR_materials_emissive_strength)
                        /* harmony export */
});
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/PBR/pbrMaterial */ "core/Misc/observable");
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");


                    const NAME = "KHR_materials_emissive_strength";
                    /**
                     * [Experimental Spec](https://github.com/KhronosGroup/glTF/pull/1994)
                     */
                    class KHR_materials_emissive_strength {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 170;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMaterial
                         * @hidden
                         */
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, (extensionContext, extension) => {
                                return this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial).then(() => {
                                    this._loadEmissiveProperties(extensionContext, extension, babylonMaterial);
                                });
                            });
                        }
                        _loadEmissiveProperties(context, properties, babylonMaterial) {
                            if (!(babylonMaterial instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            if (properties.emissiveStrength !== undefined) {
                                babylonMaterial.emissiveColor.scaleToRef(properties.emissiveStrength, babylonMaterial.emissiveColor);
                            }
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_emissive_strength(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_ior.js":
/*!**************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_ior.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_materials_ior": () => (/* binding */ KHR_materials_ior)
                        /* harmony export */
});
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/PBR/pbrMaterial */ "core/Misc/observable");
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");


                    const NAME = "KHR_materials_ior";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_ior)
                     */
                    class KHR_materials_ior {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 180;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMaterial
                         * @hidden
                         */
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                promises.push(this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
                                promises.push(this._loadIorPropertiesAsync(extensionContext, extension, babylonMaterial));
                                return Promise.all(promises).then(() => { });
                            });
                        }
                        _loadIorPropertiesAsync(context, properties, babylonMaterial) {
                            if (!(babylonMaterial instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            if (properties.ior !== undefined) {
                                babylonMaterial.indexOfRefraction = properties.ior;
                            }
                            else {
                                babylonMaterial.indexOfRefraction = KHR_materials_ior._DEFAULT_IOR;
                            }
                            return Promise.resolve();
                        }
                    }
                    /**
                     * Default ior Value from the spec.
                     */
                    KHR_materials_ior._DEFAULT_IOR = 1.5;
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_ior(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_pbrSpecularGlossiness.js":
/*!********************************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_pbrSpecularGlossiness.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_materials_pbrSpecularGlossiness": () => (/* binding */ KHR_materials_pbrSpecularGlossiness)
                        /* harmony export */
});
/* harmony import */ var core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/PBR/pbrMaterial */ "core/Misc/observable");
/* harmony import */ var core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");



                    const NAME = "KHR_materials_pbrSpecularGlossiness";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness)
                     */
                    class KHR_materials_pbrSpecularGlossiness {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 200;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMaterial
                         * @hidden
                         */
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                promises.push(this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
                                promises.push(this._loadSpecularGlossinessPropertiesAsync(extensionContext, material, extension, babylonMaterial));
                                this._loader.loadMaterialAlphaProperties(context, material, babylonMaterial);
                                return Promise.all(promises).then(() => { });
                            });
                        }
                        _loadSpecularGlossinessPropertiesAsync(context, material, properties, babylonMaterial) {
                            if (!(babylonMaterial instanceof core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            const promises = new Array();
                            babylonMaterial.metallic = null;
                            babylonMaterial.roughness = null;
                            if (properties.diffuseFactor) {
                                babylonMaterial.albedoColor = core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.diffuseFactor);
                                babylonMaterial.alpha = properties.diffuseFactor[3];
                            }
                            else {
                                babylonMaterial.albedoColor = core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
                            }
                            babylonMaterial.reflectivityColor = properties.specularFactor ? core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.specularFactor) : core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
                            babylonMaterial.microSurface = properties.glossinessFactor == undefined ? 1 : properties.glossinessFactor;
                            if (properties.diffuseTexture) {
                                promises.push(this._loader.loadTextureInfoAsync(`${context}/diffuseTexture`, properties.diffuseTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (Diffuse)`;
                                    babylonMaterial.albedoTexture = texture;
                                }));
                            }
                            if (properties.specularGlossinessTexture) {
                                promises.push(this._loader.loadTextureInfoAsync(`${context}/specularGlossinessTexture`, properties.specularGlossinessTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (Specular Glossiness)`;
                                    babylonMaterial.reflectivityTexture = texture;
                                }));
                                babylonMaterial.reflectivityTexture.hasAlpha = true;
                                babylonMaterial.useMicroSurfaceFromReflectivityMapAlpha = true;
                            }
                            return Promise.all(promises).then(() => { });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_pbrSpecularGlossiness(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_sheen.js":
/*!****************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_sheen.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_materials_sheen": () => (/* binding */ KHR_materials_sheen)
                        /* harmony export */
});
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Maths/math.color */ "core/Misc/observable");
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");



                    const NAME = "KHR_materials_sheen";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_materials_sheen/README.md)
                     * [Playground Sample](https://www.babylonjs-playground.com/frame.html#BNIZX6#4)
                     */
                    class KHR_materials_sheen {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 190;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMaterial
                         * @hidden
                         */
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                promises.push(this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
                                promises.push(this._loadSheenPropertiesAsync(extensionContext, extension, babylonMaterial));
                                return Promise.all(promises).then(() => { });
                            });
                        }
                        _loadSheenPropertiesAsync(context, properties, babylonMaterial) {
                            if (!(babylonMaterial instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            const promises = new Array();
                            babylonMaterial.sheen.isEnabled = true;
                            babylonMaterial.sheen.intensity = 1;
                            if (properties.sheenColorFactor != undefined) {
                                babylonMaterial.sheen.color = core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.sheenColorFactor);
                            }
                            else {
                                babylonMaterial.sheen.color = core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Color3.Black();
                            }
                            if (properties.sheenColorTexture) {
                                promises.push(this._loader.loadTextureInfoAsync(`${context}/sheenColorTexture`, properties.sheenColorTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (Sheen Color)`;
                                    babylonMaterial.sheen.texture = texture;
                                }));
                            }
                            if (properties.sheenRoughnessFactor !== undefined) {
                                babylonMaterial.sheen.roughness = properties.sheenRoughnessFactor;
                            }
                            else {
                                babylonMaterial.sheen.roughness = 0;
                            }
                            if (properties.sheenRoughnessTexture) {
                                properties.sheenRoughnessTexture.nonColorData = true;
                                promises.push(this._loader.loadTextureInfoAsync(`${context}/sheenRoughnessTexture`, properties.sheenRoughnessTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (Sheen Roughness)`;
                                    babylonMaterial.sheen.textureRoughness = texture;
                                }));
                            }
                            babylonMaterial.sheen.albedoScaling = true;
                            babylonMaterial.sheen.useRoughnessFromMainTexture = false;
                            return Promise.all(promises).then(() => { });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_sheen(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_specular.js":
/*!*******************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_specular.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_materials_specular": () => (/* binding */ KHR_materials_specular)
                        /* harmony export */
});
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Maths/math.color */ "core/Misc/observable");
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");



                    const NAME = "KHR_materials_specular";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_specular)
                     */
                    class KHR_materials_specular {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 190;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMaterial
                         * @hidden
                         */
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                promises.push(this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
                                promises.push(this._loadSpecularPropertiesAsync(extensionContext, extension, babylonMaterial));
                                return Promise.all(promises).then(() => { });
                            });
                        }
                        _loadSpecularPropertiesAsync(context, properties, babylonMaterial) {
                            if (!(babylonMaterial instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            const promises = new Array();
                            if (properties.specularFactor !== undefined) {
                                babylonMaterial.metallicF0Factor = properties.specularFactor;
                            }
                            if (properties.specularColorFactor !== undefined) {
                                babylonMaterial.metallicReflectanceColor = core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.specularColorFactor);
                            }
                            if (properties.specularTexture) {
                                properties.specularTexture.nonColorData = true;
                                promises.push(this._loader.loadTextureInfoAsync(`${context}/specularTexture`, properties.specularTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (Specular F0 Strength)`;
                                    babylonMaterial.metallicReflectanceTexture = texture;
                                    babylonMaterial.useOnlyMetallicFromMetallicReflectanceTexture = true;
                                }));
                            }
                            if (properties.specularColorTexture) {
                                promises.push(this._loader.loadTextureInfoAsync(`${context}/specularColorTexture`, properties.specularColorTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (Specular F0 Color)`;
                                    babylonMaterial.reflectanceTexture = texture;
                                }));
                            }
                            return Promise.all(promises).then(() => { });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_specular(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_translucency.js":
/*!***********************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_translucency.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_materials_translucency": () => (/* binding */ KHR_materials_translucency)
                        /* harmony export */
});
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/PBR/pbrMaterial */ "core/Misc/observable");
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");


                    const NAME = "KHR_materials_translucency";
                    /**
                     * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1825)
                     * !!! Experimental Extension Subject to Changes !!!
                     */
                    class KHR_materials_translucency {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 174;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                            if (this.enabled) {
                                loader.parent.transparencyAsCoverage = true;
                            }
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMaterial
                         * @hidden
                         */
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                promises.push(this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
                                promises.push(this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
                                promises.push(this._loadTranslucentPropertiesAsync(extensionContext, material, babylonMaterial, extension));
                                return Promise.all(promises).then(() => { });
                            });
                        }
                        _loadTranslucentPropertiesAsync(context, material, babylonMaterial, extension) {
                            if (!(babylonMaterial instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            const pbrMaterial = babylonMaterial;
                            // Enables "translucency" texture which represents diffusely-transmitted light.
                            pbrMaterial.subSurface.isTranslucencyEnabled = true;
                            // Since this extension models thin-surface transmission only, we must make the
                            // internal IOR == 1.0 and set the thickness to 0.
                            pbrMaterial.subSurface.volumeIndexOfRefraction = 1.0;
                            pbrMaterial.subSurface.minimumThickness = 0.0;
                            pbrMaterial.subSurface.maximumThickness = 0.0;
                            // Albedo colour will tint transmission.
                            pbrMaterial.subSurface.useAlbedoToTintTranslucency = true;
                            if (extension.translucencyFactor !== undefined) {
                                pbrMaterial.subSurface.translucencyIntensity = extension.translucencyFactor;
                            }
                            else {
                                pbrMaterial.subSurface.translucencyIntensity = 0.0;
                                pbrMaterial.subSurface.isTranslucencyEnabled = false;
                                return Promise.resolve();
                            }
                            if (extension.translucencyTexture) {
                                extension.translucencyTexture.nonColorData = true;
                                return this._loader.loadTextureInfoAsync(`${context}/translucencyTexture`, extension.translucencyTexture).then((texture) => {
                                    pbrMaterial.subSurface.translucencyIntensityTexture = texture;
                                });
                            }
                            else {
                                return Promise.resolve();
                            }
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_translucency(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_transmission.js":
/*!***********************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_transmission.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_materials_transmission": () => (/* binding */ KHR_materials_transmission)
                        /* harmony export */
});
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Misc/tools */ "core/Misc/observable");
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");






                    /**
                     * A class to handle setting up the rendering of opaque objects to be shown through transmissive objects.
                     */
                    class TransmissionHelper {
                        /**
                         * constructor
                         * @param options Defines the options we want to customize the helper
                         * @param scene The scene to add the material to
                         */
                        constructor(options, scene) {
                            this._opaqueRenderTarget = null;
                            this._opaqueMeshesCache = [];
                            this._transparentMeshesCache = [];
                            this._materialObservers = {};
                            this._options = Object.assign(Object.assign({}, TransmissionHelper._getDefaultOptions()), options);
                            this._scene = scene;
                            this._scene._transmissionHelper = this;
                            this.onErrorObservable = new core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            this._scene.onDisposeObservable.addOnce((scene) => {
                                this.dispose();
                            });
                            this._parseScene();
                            this._setupRenderTargets();
                        }
                        /**
                         * Creates the default options for the helper.
                         */
                        static _getDefaultOptions() {
                            return {
                                renderSize: 1024,
                                samples: 4,
                                lodGenerationScale: 1,
                                lodGenerationOffset: -4,
                                renderTargetTextureType: core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURETYPE_HALF_FLOAT,
                                generateMipmaps: true,
                            };
                        }
                        /**
                         * Updates the background according to the new options
                         * @param options
                         */
                        updateOptions(options) {
                            // First check if any options are actually being changed. If not, exit.
                            const newValues = Object.keys(options).filter((key) => this._options[key] !== options[key]);
                            if (!newValues.length) {
                                return;
                            }
                            const newOptions = Object.assign(Object.assign({}, this._options), options);
                            const oldOptions = this._options;
                            this._options = newOptions;
                            // If size changes, recreate everything
                            if (newOptions.renderSize !== oldOptions.renderSize ||
                                newOptions.renderTargetTextureType !== oldOptions.renderTargetTextureType ||
                                newOptions.generateMipmaps !== oldOptions.generateMipmaps ||
                                !this._opaqueRenderTarget) {
                                this._setupRenderTargets();
                            }
                            else {
                                this._opaqueRenderTarget.samples = newOptions.samples;
                                this._opaqueRenderTarget.lodGenerationScale = newOptions.lodGenerationScale;
                                this._opaqueRenderTarget.lodGenerationOffset = newOptions.lodGenerationOffset;
                            }
                        }
                        getOpaqueTarget() {
                            return this._opaqueRenderTarget;
                        }
                        shouldRenderAsTransmission(material) {
                            if (!material) {
                                return false;
                            }
                            if (material instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial && material.subSurface.isRefractionEnabled) {
                                return true;
                            }
                            return false;
                        }
                        _addMesh(mesh) {
                            this._materialObservers[mesh.uniqueId] = mesh.onMaterialChangedObservable.add(this._onMeshMaterialChanged.bind(this));
                            // we need to defer the processing because _addMesh may be called as part as an instance mesh creation, in which case some
                            // internal properties are not setup yet, like _sourceMesh (needed when doing mesh.material below)
                            core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Tools.SetImmediate(() => {
                                if (this.shouldRenderAsTransmission(mesh.material)) {
                                    mesh.material.refractionTexture = this._opaqueRenderTarget;
                                    this._transparentMeshesCache.push(mesh);
                                }
                                else {
                                    this._opaqueMeshesCache.push(mesh);
                                }
                            });
                        }
                        _removeMesh(mesh) {
                            mesh.onMaterialChangedObservable.remove(this._materialObservers[mesh.uniqueId]);
                            delete this._materialObservers[mesh.uniqueId];
                            let idx = this._transparentMeshesCache.indexOf(mesh);
                            if (idx !== -1) {
                                this._transparentMeshesCache.splice(idx, 1);
                            }
                            idx = this._opaqueMeshesCache.indexOf(mesh);
                            if (idx !== -1) {
                                this._opaqueMeshesCache.splice(idx, 1);
                            }
                        }
                        _parseScene() {
                            this._scene.meshes.forEach(this._addMesh.bind(this));
                            // Listen for when a mesh is added to the scene and add it to our cache lists.
                            this._scene.onNewMeshAddedObservable.add(this._addMesh.bind(this));
                            // Listen for when a mesh is removed from to the scene and remove it from our cache lists.
                            this._scene.onMeshRemovedObservable.add(this._removeMesh.bind(this));
                        }
                        // When one of the meshes in the scene has its material changed, make sure that it's in the correct cache list.
                        _onMeshMaterialChanged(mesh) {
                            const transparentIdx = this._transparentMeshesCache.indexOf(mesh);
                            const opaqueIdx = this._opaqueMeshesCache.indexOf(mesh);
                            // If the material is transparent, make sure that it's added to the transparent list and removed from the opaque list
                            const useTransmission = this.shouldRenderAsTransmission(mesh.material);
                            if (useTransmission) {
                                if (mesh.material instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial) {
                                    mesh.material.subSurface.refractionTexture = this._opaqueRenderTarget;
                                }
                                if (opaqueIdx !== -1) {
                                    this._opaqueMeshesCache.splice(opaqueIdx, 1);
                                    this._transparentMeshesCache.push(mesh);
                                }
                                else if (transparentIdx === -1) {
                                    this._transparentMeshesCache.push(mesh);
                                }
                                // If the material is opaque, make sure that it's added to the opaque list and removed from the transparent list
                            }
                            else {
                                if (transparentIdx !== -1) {
                                    this._transparentMeshesCache.splice(transparentIdx, 1);
                                    this._opaqueMeshesCache.push(mesh);
                                }
                                else if (opaqueIdx === -1) {
                                    this._opaqueMeshesCache.push(mesh);
                                }
                            }
                        }
                        /**
                         * Setup the render targets according to the specified options.
                         */
                        _setupRenderTargets() {
                            var _a, _b;
                            if (this._opaqueRenderTarget) {
                                this._opaqueRenderTarget.dispose();
                            }
                            this._opaqueRenderTarget = new core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.RenderTargetTexture("opaqueSceneTexture", this._options.renderSize, this._scene, this._options.generateMipmaps, undefined, this._options.renderTargetTextureType);
                            this._opaqueRenderTarget.ignoreCameraViewport = true;
                            this._opaqueRenderTarget.renderList = this._opaqueMeshesCache;
                            this._opaqueRenderTarget.clearColor = (_b = (_a = this._options.clearColor) === null || _a === void 0 ? void 0 : _a.clone()) !== null && _b !== void 0 ? _b : this._scene.clearColor.clone();
                            this._opaqueRenderTarget.gammaSpace = false;
                            this._opaqueRenderTarget.lodGenerationScale = this._options.lodGenerationScale;
                            this._opaqueRenderTarget.lodGenerationOffset = this._options.lodGenerationOffset;
                            this._opaqueRenderTarget.samples = this._options.samples;
                            let sceneImageProcessingapplyByPostProcess;
                            let saveSceneEnvIntensity;
                            this._opaqueRenderTarget.onBeforeBindObservable.add((opaqueRenderTarget) => {
                                saveSceneEnvIntensity = this._scene.environmentIntensity;
                                this._scene.environmentIntensity = 1.0;
                                sceneImageProcessingapplyByPostProcess = this._scene.imageProcessingConfiguration.applyByPostProcess;
                                if (!this._options.clearColor) {
                                    this._scene.clearColor.toLinearSpaceToRef(opaqueRenderTarget.clearColor);
                                }
                                else {
                                    opaqueRenderTarget.clearColor.copyFrom(this._options.clearColor);
                                }
                                // we do not use the applyByPostProcess setter to avoid flagging all the materials as "image processing dirty"!
                                this._scene.imageProcessingConfiguration._applyByPostProcess = true;
                            });
                            this._opaqueRenderTarget.onAfterUnbindObservable.add(() => {
                                this._scene.environmentIntensity = saveSceneEnvIntensity;
                                this._scene.imageProcessingConfiguration._applyByPostProcess = sceneImageProcessingapplyByPostProcess;
                            });
                            this._transparentMeshesCache.forEach((mesh) => {
                                if (this.shouldRenderAsTransmission(mesh.material)) {
                                    mesh.material.refractionTexture = this._opaqueRenderTarget;
                                }
                            });
                        }
                        /**
                         * Dispose all the elements created by the Helper.
                         */
                        dispose() {
                            this._scene._transmissionHelper = undefined;
                            if (this._opaqueRenderTarget) {
                                this._opaqueRenderTarget.dispose();
                                this._opaqueRenderTarget = null;
                            }
                            this._transparentMeshesCache = [];
                            this._opaqueMeshesCache = [];
                        }
                    }
                    const NAME = "KHR_materials_transmission";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_materials_transmission/README.md)
                     */
                    class KHR_materials_transmission {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 175;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                            if (this.enabled) {
                                loader.parent.transparencyAsCoverage = true;
                            }
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMaterial
                         * @hidden
                         */
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                promises.push(this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
                                promises.push(this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
                                promises.push(this._loadTransparentPropertiesAsync(extensionContext, material, babylonMaterial, extension));
                                return Promise.all(promises).then(() => { });
                            });
                        }
                        _loadTransparentPropertiesAsync(context, material, babylonMaterial, extension) {
                            if (!(babylonMaterial instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            const pbrMaterial = babylonMaterial;
                            // Enables "refraction" texture which represents transmitted light.
                            pbrMaterial.subSurface.isRefractionEnabled = true;
                            // Since this extension models thin-surface transmission only, we must make IOR = 1.0
                            pbrMaterial.subSurface.volumeIndexOfRefraction = 1.0;
                            // Albedo colour will tint transmission.
                            pbrMaterial.subSurface.useAlbedoToTintRefraction = true;
                            if (extension.transmissionFactor !== undefined) {
                                pbrMaterial.subSurface.refractionIntensity = extension.transmissionFactor;
                                const scene = pbrMaterial.getScene();
                                if (pbrMaterial.subSurface.refractionIntensity && !scene._transmissionHelper) {
                                    new TransmissionHelper({}, pbrMaterial.getScene());
                                }
                            }
                            else {
                                pbrMaterial.subSurface.refractionIntensity = 0.0;
                                pbrMaterial.subSurface.isRefractionEnabled = false;
                                return Promise.resolve();
                            }
                            pbrMaterial.subSurface.minimumThickness = 0.0;
                            pbrMaterial.subSurface.maximumThickness = 0.0;
                            if (extension.transmissionTexture) {
                                extension.transmissionTexture.nonColorData = true;
                                return this._loader.loadTextureInfoAsync(`${context}/transmissionTexture`, extension.transmissionTexture, undefined).then((texture) => {
                                    pbrMaterial.subSurface.refractionIntensityTexture = texture;
                                    pbrMaterial.subSurface.useGltfStyleTextures = true;
                                });
                            }
                            else {
                                return Promise.resolve();
                            }
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_transmission(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_unlit.js":
/*!****************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_unlit.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_materials_unlit": () => (/* binding */ KHR_materials_unlit)
                        /* harmony export */
});
/* harmony import */ var core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/PBR/pbrMaterial */ "core/Misc/observable");
/* harmony import */ var core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");



                    const NAME = "KHR_materials_unlit";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit)
                     */
                    class KHR_materials_unlit {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 210;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMaterial
                         * @hidden
                         */
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, () => {
                                return this._loadUnlitPropertiesAsync(context, material, babylonMaterial);
                            });
                        }
                        _loadUnlitPropertiesAsync(context, material, babylonMaterial) {
                            if (!(babylonMaterial instanceof core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            const promises = new Array();
                            babylonMaterial.unlit = true;
                            const properties = material.pbrMetallicRoughness;
                            if (properties) {
                                if (properties.baseColorFactor) {
                                    babylonMaterial.albedoColor = core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.baseColorFactor);
                                    babylonMaterial.alpha = properties.baseColorFactor[3];
                                }
                                else {
                                    babylonMaterial.albedoColor = core_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
                                }
                                if (properties.baseColorTexture) {
                                    promises.push(this._loader.loadTextureInfoAsync(`${context}/baseColorTexture`, properties.baseColorTexture, (texture) => {
                                        texture.name = `${babylonMaterial.name} (Base Color)`;
                                        babylonMaterial.albedoTexture = texture;
                                    }));
                                }
                            }
                            if (material.doubleSided) {
                                babylonMaterial.backFaceCulling = false;
                                babylonMaterial.twoSidedLighting = true;
                            }
                            this._loader.loadMaterialAlphaProperties(context, material, babylonMaterial);
                            return Promise.all(promises).then(() => { });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_unlit(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_variants.js":
/*!*******************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_variants.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_materials_variants": () => (/* binding */ KHR_materials_variants)
                        /* harmony export */
});
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");
/* harmony import */ var core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/Meshes/mesh */ "core/Misc/observable");
/* harmony import */ var core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__);


                    const NAME = "KHR_materials_variants";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_materials_variants/README.md)
                     */
                    class KHR_materials_variants {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * Gets the list of available variant names for this asset.
                         * @param rootMesh The glTF root mesh
                         * @returns the list of all the variant names for this model
                         */
                        static GetAvailableVariants(rootMesh) {
                            const extensionMetadata = this._GetExtensionMetadata(rootMesh);
                            if (!extensionMetadata) {
                                return [];
                            }
                            return Object.keys(extensionMetadata.variants);
                        }
                        /**
                         * Gets the list of available variant names for this asset.
                         * @param rootMesh The glTF root mesh
                         * @returns the list of all the variant names for this model
                         */
                        getAvailableVariants(rootMesh) {
                            return KHR_materials_variants.GetAvailableVariants(rootMesh);
                        }
                        /**
                         * Select a variant given a variant name or a list of variant names.
                         * @param rootMesh The glTF root mesh
                         * @param variantName The variant name(s) to select.
                         */
                        static SelectVariant(rootMesh, variantName) {
                            const extensionMetadata = this._GetExtensionMetadata(rootMesh);
                            if (!extensionMetadata) {
                                throw new Error(`Cannot select variant on a glTF mesh that does not have the ${NAME} extension`);
                            }
                            const select = (variantName) => {
                                const entries = extensionMetadata.variants[variantName];
                                if (entries) {
                                    for (const entry of entries) {
                                        entry.mesh.material = entry.material;
                                    }
                                }
                            };
                            if (variantName instanceof Array) {
                                for (const name of variantName) {
                                    select(name);
                                }
                            }
                            else {
                                select(variantName);
                            }
                            extensionMetadata.lastSelected = variantName;
                        }
                        /**
                         * Select a variant given a variant name or a list of variant names.
                         * @param rootMesh The glTF root mesh
                         * @param variantName The variant name(s) to select.
                         */
                        selectVariant(rootMesh, variantName) {
                            return KHR_materials_variants.SelectVariant(rootMesh, variantName);
                        }
                        /**
                         * Reset back to the original before selecting a variant.
                         * @param rootMesh The glTF root mesh
                         */
                        static Reset(rootMesh) {
                            const extensionMetadata = this._GetExtensionMetadata(rootMesh);
                            if (!extensionMetadata) {
                                throw new Error(`Cannot reset on a glTF mesh that does not have the ${NAME} extension`);
                            }
                            for (const entry of extensionMetadata.original) {
                                entry.mesh.material = entry.material;
                            }
                            extensionMetadata.lastSelected = null;
                        }
                        /**
                         * Reset back to the original before selecting a variant.
                         * @param rootMesh The glTF root mesh
                         */
                        reset(rootMesh) {
                            return KHR_materials_variants.Reset(rootMesh);
                        }
                        /**
                         * Gets the last selected variant name(s) or null if original.
                         * @param rootMesh The glTF root mesh
                         * @returns The selected variant name(s).
                         */
                        static GetLastSelectedVariant(rootMesh) {
                            const extensionMetadata = this._GetExtensionMetadata(rootMesh);
                            if (!extensionMetadata) {
                                throw new Error(`Cannot get the last selected variant on a glTF mesh that does not have the ${NAME} extension`);
                            }
                            return extensionMetadata.lastSelected;
                        }
                        /**
                         * Gets the last selected variant name(s) or null if original.
                         * @param rootMesh The glTF root mesh
                         * @returns The selected variant name(s).
                         */
                        getLastSelectedVariant(rootMesh) {
                            return KHR_materials_variants.GetLastSelectedVariant(rootMesh);
                        }
                        static _GetExtensionMetadata(rootMesh) {
                            var _a, _b;
                            return ((_b = (_a = rootMesh === null || rootMesh === void 0 ? void 0 : rootMesh.metadata) === null || _a === void 0 ? void 0 : _a.gltf) === null || _b === void 0 ? void 0 : _b[NAME]) || null;
                        }
                        /** @hidden */
                        onLoading() {
                            const extensions = this._loader.gltf.extensions;
                            if (extensions && extensions[this.name]) {
                                const extension = extensions[this.name];
                                this._variants = extension.variants;
                            }
                        }
                        /**
                         * @param context
                         * @param name
                         * @param node
                         * @param mesh
                         * @param primitive
                         * @param assign
                         * @hidden
                         */
                        _loadMeshPrimitiveAsync(context, name, node, mesh, primitive, assign) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.LoadExtensionAsync(context, primitive, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                promises.push(this._loader._loadMeshPrimitiveAsync(context, name, node, mesh, primitive, (babylonMesh) => {
                                    assign(babylonMesh);
                                    if (babylonMesh instanceof core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.Mesh) {
                                        const babylonDrawMode = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader._GetDrawMode(context, primitive.mode);
                                        const root = this._loader.rootBabylonMesh;
                                        const metadata = root ? (root.metadata = root.metadata || {}) : {};
                                        const gltf = (metadata.gltf = metadata.gltf || {});
                                        const extensionMetadata = (gltf[NAME] = gltf[NAME] || { lastSelected: null, original: [], variants: {} });
                                        // Store the original material.
                                        extensionMetadata.original.push({ mesh: babylonMesh, material: babylonMesh.material });
                                        // For each mapping, look at the variants and make a new entry for them.
                                        for (let mappingIndex = 0; mappingIndex < extension.mappings.length; ++mappingIndex) {
                                            const mapping = extension.mappings[mappingIndex];
                                            const material = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get(`${extensionContext}/mappings/${mappingIndex}/material`, this._loader.gltf.materials, mapping.material);
                                            promises.push(this._loader._loadMaterialAsync(`#/materials/${mapping.material}`, material, babylonMesh, babylonDrawMode, (babylonMaterial) => {
                                                for (let mappingVariantIndex = 0; mappingVariantIndex < mapping.variants.length; ++mappingVariantIndex) {
                                                    const variantIndex = mapping.variants[mappingVariantIndex];
                                                    const variant = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get(`/extensions/${NAME}/variants/${variantIndex}`, this._variants, variantIndex);
                                                    extensionMetadata.variants[variant.name] = extensionMetadata.variants[variant.name] || [];
                                                    extensionMetadata.variants[variant.name].push({
                                                        mesh: babylonMesh,
                                                        material: babylonMaterial,
                                                    });
                                                    // Replace the target when original mesh is cloned
                                                    babylonMesh.onClonedObservable.add((newOne) => {
                                                        const newMesh = newOne;
                                                        let metadata = null;
                                                        let newRoot = newMesh;
                                                        // Find root to get medata
                                                        do {
                                                            newRoot = newRoot.parent;
                                                            if (!newRoot) {
                                                                return;
                                                            }
                                                            metadata = KHR_materials_variants._GetExtensionMetadata(newRoot);
                                                        } while (metadata === null);
                                                        // Need to clone the metadata on the root (first time only)
                                                        if (root && metadata === KHR_materials_variants._GetExtensionMetadata(root)) {
                                                            // Copy main metadata
                                                            newRoot.metadata = {};
                                                            for (var key in root.metadata) {
                                                                newRoot.metadata[key] = root.metadata[key];
                                                            }
                                                            // Copy the gltf metadata
                                                            newRoot.metadata.gltf = [];
                                                            for (var key in root.metadata.gltf) {
                                                                newRoot.metadata.gltf[key] = root.metadata.gltf[key];
                                                            }
                                                            // Duplicate the extension specific metadata
                                                            newRoot.metadata.gltf[NAME] = { lastSelected: null, original: [], variants: {} };
                                                            for (const original of metadata.original) {
                                                                newRoot.metadata.gltf[NAME].original.push({
                                                                    mesh: original.mesh,
                                                                    material: original.material,
                                                                });
                                                            }
                                                            for (var key in metadata.variants) {
                                                                if (metadata.variants.hasOwnProperty(key)) {
                                                                    newRoot.metadata.gltf[NAME].variants[key] = [];
                                                                    for (const variantEntry of metadata.variants[key]) {
                                                                        newRoot.metadata.gltf[NAME].variants[key].push({
                                                                            mesh: variantEntry.mesh,
                                                                            material: variantEntry.material,
                                                                        });
                                                                    }
                                                                }
                                                            }
                                                            metadata = newRoot.metadata.gltf[NAME];
                                                        }
                                                        // Relocate
                                                        for (var target of metadata.original) {
                                                            if (target.mesh === babylonMesh) {
                                                                target.mesh = newMesh;
                                                            }
                                                        }
                                                        for (var target of metadata.variants[variant.name]) {
                                                            if (target.mesh === babylonMesh) {
                                                                target.mesh = newMesh;
                                                            }
                                                        }
                                                    });
                                                }
                                            }));
                                        }
                                    }
                                }));
                                return Promise.all(promises).then(([babylonMesh]) => {
                                    return babylonMesh;
                                });
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_variants(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_volume.js":
/*!*****************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_volume.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_materials_volume": () => (/* binding */ KHR_materials_volume)
                        /* harmony export */
});
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/PBR/pbrMaterial */ "core/Misc/observable");
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");


                    const NAME = "KHR_materials_volume";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_volume)
                     * @since 5.0.0
                     */
                    class KHR_materials_volume {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 173;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                            if (this.enabled) {
                                // We need to disable instance usage because the attenuation factor depends on the node scale of each individual mesh
                                this._loader._disableInstancedMesh++;
                            }
                        }
                        /** @hidden */
                        dispose() {
                            if (this.enabled) {
                                this._loader._disableInstancedMesh--;
                            }
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMaterial
                         * @hidden
                         */
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                promises.push(this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
                                promises.push(this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
                                promises.push(this._loadVolumePropertiesAsync(extensionContext, material, babylonMaterial, extension));
                                return Promise.all(promises).then(() => { });
                            });
                        }
                        _loadVolumePropertiesAsync(context, material, babylonMaterial, extension) {
                            if (!(babylonMaterial instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            // If transparency isn't enabled already, this extension shouldn't do anything.
                            // i.e. it requires either the KHR_materials_transmission or KHR_materials_translucency extensions.
                            if ((!babylonMaterial.subSurface.isRefractionEnabled && !babylonMaterial.subSurface.isTranslucencyEnabled) || !extension.thicknessFactor) {
                                return Promise.resolve();
                            }
                            // IOR in this extension only affects interior.
                            babylonMaterial.subSurface.volumeIndexOfRefraction = babylonMaterial.indexOfRefraction;
                            const attenuationDistance = extension.attenuationDistance !== undefined ? extension.attenuationDistance : Number.MAX_VALUE;
                            babylonMaterial.subSurface.tintColorAtDistance = attenuationDistance;
                            if (extension.attenuationColor !== undefined && extension.attenuationColor.length == 3) {
                                babylonMaterial.subSurface.tintColor.copyFromFloats(extension.attenuationColor[0], extension.attenuationColor[1], extension.attenuationColor[2]);
                            }
                            babylonMaterial.subSurface.minimumThickness = 0.0;
                            babylonMaterial.subSurface.maximumThickness = extension.thicknessFactor;
                            babylonMaterial.subSurface.useThicknessAsDepth = true;
                            if (extension.thicknessTexture) {
                                extension.thicknessTexture.nonColorData = true;
                                return this._loader.loadTextureInfoAsync(`${context}/thicknessTexture`, extension.thicknessTexture).then((texture) => {
                                    babylonMaterial.subSurface.thicknessTexture = texture;
                                    babylonMaterial.subSurface.useGltfStyleTextures = true;
                                });
                            }
                            else {
                                return Promise.resolve();
                            }
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_materials_volume(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_mesh_quantization.js":
/*!******************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_mesh_quantization.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_mesh_quantization": () => (/* binding */ KHR_mesh_quantization)
                        /* harmony export */
});
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");

                    const NAME = "KHR_mesh_quantization";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization)
                     */
                    class KHR_mesh_quantization {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            this.enabled = loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() { }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_mesh_quantization(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_texture_basisu.js":
/*!***************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_texture_basisu.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_texture_basisu": () => (/* binding */ KHR_texture_basisu)
                        /* harmony export */
});
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");

                    const NAME = "KHR_texture_basisu";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_basisu)
                     */
                    class KHR_texture_basisu {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /** The name of this extension. */
                            this.name = NAME;
                            this._loader = loader;
                            this.enabled = loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param texture
                         * @param assign
                         * @hidden
                         */
                        _loadTextureAsync(context, texture, assign) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.LoadExtensionAsync(context, texture, this.name, (extensionContext, extension) => {
                                const sampler = texture.sampler == undefined ? _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.DefaultSampler : _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get(`${context}/sampler`, this._loader.gltf.samplers, texture.sampler);
                                const image = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get(`${extensionContext}/source`, this._loader.gltf.images, extension.source);
                                return this._loader._createTextureAsync(context, sampler, image, (babylonTexture) => {
                                    assign(babylonTexture);
                                }, texture._textureInfo.nonColorData ? { useRGBAIfASTCBC7NotAvailableWhenUASTC: true } : undefined, !texture._textureInfo.nonColorData);
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_texture_basisu(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_texture_transform.js":
/*!******************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_texture_transform.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_texture_transform": () => (/* binding */ KHR_texture_transform)
                        /* harmony export */
});
/* harmony import */ var core_Materials_Textures_texture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/texture */ "core/Misc/observable");
/* harmony import */ var core_Materials_Textures_texture__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Materials_Textures_texture__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");


                    const NAME = "KHR_texture_transform";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_texture_transform)
                     */
                    class KHR_texture_transform {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * @param context
                         * @param textureInfo
                         * @param assign
                         * @hidden
                         */
                        loadTextureInfoAsync(context, textureInfo, assign) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, textureInfo, this.name, (extensionContext, extension) => {
                                return this._loader.loadTextureInfoAsync(context, textureInfo, (babylonTexture) => {
                                    if (!(babylonTexture instanceof core_Materials_Textures_texture__WEBPACK_IMPORTED_MODULE_0__.Texture)) {
                                        throw new Error(`${extensionContext}: Texture type not supported`);
                                    }
                                    if (extension.offset) {
                                        babylonTexture.uOffset = extension.offset[0];
                                        babylonTexture.vOffset = extension.offset[1];
                                    }
                                    // Always rotate around the origin.
                                    babylonTexture.uRotationCenter = 0;
                                    babylonTexture.vRotationCenter = 0;
                                    if (extension.rotation) {
                                        babylonTexture.wAng = -extension.rotation;
                                    }
                                    if (extension.scale) {
                                        babylonTexture.uScale = extension.scale[0];
                                        babylonTexture.vScale = extension.scale[1];
                                    }
                                    if (extension.texCoord != undefined) {
                                        babylonTexture.coordinatesIndex = extension.texCoord;
                                    }
                                    assign(babylonTexture);
                                });
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_texture_transform(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_xmp_json_ld.js":
/*!************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_xmp_json_ld.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KHR_xmp_json_ld": () => (/* binding */ KHR_xmp_json_ld)
                        /* harmony export */
});
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");

                    const NAME = "KHR_xmp_json_ld";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_xmp_json_ld)
                     * @since 5.0.0
                     */
                    class KHR_xmp_json_ld {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 100;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                        }
                        /**
                         * Called after the loader state changes to LOADING.
                         */
                        onLoading() {
                            var _a, _b, _c;
                            if (this._loader.rootBabylonMesh === null) {
                                return;
                            }
                            const xmp_gltf = (_a = this._loader.gltf.extensions) === null || _a === void 0 ? void 0 : _a.KHR_xmp_json_ld;
                            const xmp_node = (_c = (_b = this._loader.gltf.asset) === null || _b === void 0 ? void 0 : _b.extensions) === null || _c === void 0 ? void 0 : _c.KHR_xmp_json_ld;
                            if (xmp_gltf && xmp_node) {
                                const packet = +xmp_node.packet;
                                if (xmp_gltf.packets && packet < xmp_gltf.packets.length) {
                                    this._loader.rootBabylonMesh.metadata = this._loader.rootBabylonMesh.metadata || {};
                                    this._loader.rootBabylonMesh.metadata.xmp = xmp_gltf.packets[packet];
                                }
                            }
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, (loader) => new KHR_xmp_json_ld(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_audio_emitter.js":
/*!***************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_audio_emitter.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MSFT_audio_emitter": () => (/* binding */ MSFT_audio_emitter)
                        /* harmony export */
});
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Audio/weightedsound */ "core/Misc/observable");
/* harmony import */ var core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");






                    const NAME = "MSFT_audio_emitter";
                    /**
                     * [Specification](https://github.com/najadojo/glTF/tree/MSFT_audio_emitter/extensions/2.0/Vendor/MSFT_audio_emitter)
                     */
                    class MSFT_audio_emitter {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                            this._clips = null;
                            this._emitters = null;
                        }
                        /** @hidden */
                        onLoading() {
                            const extensions = this._loader.gltf.extensions;
                            if (extensions && extensions[this.name]) {
                                const extension = extensions[this.name];
                                this._clips = extension.clips;
                                this._emitters = extension.emitters;
                                _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Assign(this._clips);
                                _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Assign(this._emitters);
                            }
                        }
                        /**
                         * @param context
                         * @param scene
                         * @hidden
                         */
                        loadSceneAsync(context, scene) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, scene, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                promises.push(this._loader.loadSceneAsync(context, scene));
                                for (const emitterIndex of extension.emitters) {
                                    const emitter = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(`${extensionContext}/emitters`, this._emitters, emitterIndex);
                                    if (emitter.refDistance != undefined ||
                                        emitter.maxDistance != undefined ||
                                        emitter.rolloffFactor != undefined ||
                                        emitter.distanceModel != undefined ||
                                        emitter.innerAngle != undefined ||
                                        emitter.outerAngle != undefined) {
                                        throw new Error(`${extensionContext}: Direction or Distance properties are not allowed on emitters attached to a scene`);
                                    }
                                    promises.push(this._loadEmitterAsync(`${extensionContext}/emitters/${emitter.index}`, emitter));
                                }
                                return Promise.all(promises).then(() => { });
                            });
                        }
                        /**
                         * @param context
                         * @param node
                         * @param assign
                         * @hidden
                         */
                        loadNodeAsync(context, node, assign) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, node, this.name, (extensionContext, extension) => {
                                const promises = new Array();
                                return this._loader
                                    .loadNodeAsync(extensionContext, node, (babylonMesh) => {
                                        for (const emitterIndex of extension.emitters) {
                                            const emitter = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(`${extensionContext}/emitters`, this._emitters, emitterIndex);
                                            promises.push(this._loadEmitterAsync(`${extensionContext}/emitters/${emitter.index}`, emitter).then(() => {
                                                for (const sound of emitter._babylonSounds) {
                                                    sound.attachToMesh(babylonMesh);
                                                    if (emitter.innerAngle != undefined || emitter.outerAngle != undefined) {
                                                        sound.setLocalDirectionToMesh(core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Forward());
                                                        sound.setDirectionalCone(2 * core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.ToDegrees(emitter.innerAngle == undefined ? Math.PI : emitter.innerAngle), 2 * core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.ToDegrees(emitter.outerAngle == undefined ? Math.PI : emitter.outerAngle), 0);
                                                    }
                                                }
                                            }));
                                        }
                                        assign(babylonMesh);
                                    })
                                    .then((babylonMesh) => {
                                        return Promise.all(promises).then(() => {
                                            return babylonMesh;
                                        });
                                    });
                            });
                        }
                        /**
                         * @param context
                         * @param animation
                         * @hidden
                         */
                        loadAnimationAsync(context, animation) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, animation, this.name, (extensionContext, extension) => {
                                return this._loader.loadAnimationAsync(context, animation).then((babylonAnimationGroup) => {
                                    const promises = new Array();
                                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Assign(extension.events);
                                    for (const event of extension.events) {
                                        promises.push(this._loadAnimationEventAsync(`${extensionContext}/events/${event.index}`, context, animation, event, babylonAnimationGroup));
                                    }
                                    return Promise.all(promises).then(() => {
                                        return babylonAnimationGroup;
                                    });
                                });
                            });
                        }
                        _loadClipAsync(context, clip) {
                            if (clip._objectURL) {
                                return clip._objectURL;
                            }
                            let promise;
                            if (clip.uri) {
                                promise = this._loader.loadUriAsync(context, clip, clip.uri);
                            }
                            else {
                                const bufferView = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(`${context}/bufferView`, this._loader.gltf.bufferViews, clip.bufferView);
                                promise = this._loader.loadBufferViewAsync(`/bufferViews/${bufferView.index}`, bufferView);
                            }
                            clip._objectURL = promise.then((data) => {
                                return URL.createObjectURL(new Blob([data], { type: clip.mimeType }));
                            });
                            return clip._objectURL;
                        }
                        _loadEmitterAsync(context, emitter) {
                            emitter._babylonSounds = emitter._babylonSounds || [];
                            if (!emitter._babylonData) {
                                const clipPromises = new Array();
                                const name = emitter.name || `emitter${emitter.index}`;
                                const options = {
                                    loop: false,
                                    autoplay: false,
                                    volume: emitter.volume == undefined ? 1 : emitter.volume,
                                };
                                for (let i = 0; i < emitter.clips.length; i++) {
                                    const clipContext = `/extensions/${this.name}/clips`;
                                    const clip = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(clipContext, this._clips, emitter.clips[i].clip);
                                    clipPromises.push(this._loadClipAsync(`${clipContext}/${emitter.clips[i].clip}`, clip).then((objectURL) => {
                                        const sound = (emitter._babylonSounds[i] = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Sound(name, objectURL, this._loader.babylonScene, null, options));
                                        sound.refDistance = emitter.refDistance || 1;
                                        sound.maxDistance = emitter.maxDistance || 256;
                                        sound.rolloffFactor = emitter.rolloffFactor || 1;
                                        sound.distanceModel = emitter.distanceModel || "exponential";
                                    }));
                                }
                                const promise = Promise.all(clipPromises).then(() => {
                                    const weights = emitter.clips.map((clip) => {
                                        return clip.weight || 1;
                                    });
                                    const weightedSound = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.WeightedSound(emitter.loop || false, emitter._babylonSounds, weights);
                                    if (emitter.innerAngle) {
                                        weightedSound.directionalConeInnerAngle = 2 * core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.ToDegrees(emitter.innerAngle);
                                    }
                                    if (emitter.outerAngle) {
                                        weightedSound.directionalConeOuterAngle = 2 * core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.ToDegrees(emitter.outerAngle);
                                    }
                                    if (emitter.volume) {
                                        weightedSound.volume = emitter.volume;
                                    }
                                    emitter._babylonData.sound = weightedSound;
                                });
                                emitter._babylonData = {
                                    loaded: promise,
                                };
                            }
                            return emitter._babylonData.loaded;
                        }
                        _getEventAction(context, sound, action, time, startOffset) {
                            switch (action) {
                                case "play" /* play */: {
                                    return (currentFrame) => {
                                        const frameOffset = (startOffset || 0) + (currentFrame - time);
                                        sound.play(frameOffset);
                                    };
                                }
                                case "stop" /* stop */: {
                                    return (currentFrame) => {
                                        sound.stop();
                                    };
                                }
                                case "pause" /* pause */: {
                                    return (currentFrame) => {
                                        sound.pause();
                                    };
                                }
                                default: {
                                    throw new Error(`${context}: Unsupported action ${action}`);
                                }
                            }
                        }
                        _loadAnimationEventAsync(context, animationContext, animation, event, babylonAnimationGroup) {
                            if (babylonAnimationGroup.targetedAnimations.length == 0) {
                                return Promise.resolve();
                            }
                            const babylonAnimation = babylonAnimationGroup.targetedAnimations[0];
                            const emitterIndex = event.emitter;
                            const emitter = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(`/extensions/${this.name}/emitters`, this._emitters, emitterIndex);
                            return this._loadEmitterAsync(context, emitter).then(() => {
                                const sound = emitter._babylonData.sound;
                                if (sound) {
                                    const babylonAnimationEvent = new core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.AnimationEvent(event.time, this._getEventAction(context, sound, event.action, event.time, event.startOffset));
                                    babylonAnimation.animation.addEvent(babylonAnimationEvent);
                                    // Make sure all started audio stops when this animation is terminated.
                                    babylonAnimationGroup.onAnimationGroupEndObservable.add(() => {
                                        sound.stop();
                                    });
                                    babylonAnimationGroup.onAnimationGroupPauseObservable.add(() => {
                                        sound.pause();
                                    });
                                }
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new MSFT_audio_emitter(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_lod.js":
/*!*****************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_lod.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MSFT_lod": () => (/* binding */ MSFT_lod)
                        /* harmony export */
});
/* harmony import */ var core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Misc/deferred */ "core/Misc/observable");
/* harmony import */ var core_Misc_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");



                    const NAME = "MSFT_lod";
                    /**
                     * [Specification](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_lod)
                     */
                    class MSFT_lod {
                        /**
                         * @param loader
                         * @hidden
                         */
                        constructor(loader) {
                            /**
                             * The name of this extension.
                             */
                            this.name = NAME;
                            /**
                             * Defines a number that determines the order the extensions are applied.
                             */
                            this.order = 100;
                            /**
                             * Maximum number of LODs to load, starting from the lowest LOD.
                             */
                            this.maxLODsToLoad = 10;
                            /**
                             * Observable raised when all node LODs of one level are loaded.
                             * The event data is the index of the loaded LOD starting from zero.
                             * Dispose the loader to cancel the loading of the next level of LODs.
                             */
                            this.onNodeLODsLoadedObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            /**
                             * Observable raised when all material LODs of one level are loaded.
                             * The event data is the index of the loaded LOD starting from zero.
                             * Dispose the loader to cancel the loading of the next level of LODs.
                             */
                            this.onMaterialLODsLoadedObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            this._bufferLODs = new Array();
                            this._nodeIndexLOD = null;
                            this._nodeSignalLODs = new Array();
                            this._nodePromiseLODs = new Array();
                            this._nodeBufferLODs = new Array();
                            this._materialIndexLOD = null;
                            this._materialSignalLODs = new Array();
                            this._materialPromiseLODs = new Array();
                            this._materialBufferLODs = new Array();
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        /** @hidden */
                        dispose() {
                            this._loader = null;
                            this._nodeIndexLOD = null;
                            this._nodeSignalLODs.length = 0;
                            this._nodePromiseLODs.length = 0;
                            this._nodeBufferLODs.length = 0;
                            this._materialIndexLOD = null;
                            this._materialSignalLODs.length = 0;
                            this._materialPromiseLODs.length = 0;
                            this._materialBufferLODs.length = 0;
                            this.onMaterialLODsLoadedObservable.clear();
                            this.onNodeLODsLoadedObservable.clear();
                        }
                        /** @hidden */
                        onReady() {
                            for (let indexLOD = 0; indexLOD < this._nodePromiseLODs.length; indexLOD++) {
                                const promise = Promise.all(this._nodePromiseLODs[indexLOD]).then(() => {
                                    if (indexLOD !== 0) {
                                        this._loader.endPerformanceCounter(`Node LOD ${indexLOD}`);
                                        this._loader.log(`Loaded node LOD ${indexLOD}`);
                                    }
                                    this.onNodeLODsLoadedObservable.notifyObservers(indexLOD);
                                    if (indexLOD !== this._nodePromiseLODs.length - 1) {
                                        this._loader.startPerformanceCounter(`Node LOD ${indexLOD + 1}`);
                                        this._loadBufferLOD(this._nodeBufferLODs, indexLOD + 1);
                                        if (this._nodeSignalLODs[indexLOD]) {
                                            this._nodeSignalLODs[indexLOD].resolve();
                                        }
                                    }
                                });
                                this._loader._completePromises.push(promise);
                            }
                            for (let indexLOD = 0; indexLOD < this._materialPromiseLODs.length; indexLOD++) {
                                const promise = Promise.all(this._materialPromiseLODs[indexLOD]).then(() => {
                                    if (indexLOD !== 0) {
                                        this._loader.endPerformanceCounter(`Material LOD ${indexLOD}`);
                                        this._loader.log(`Loaded material LOD ${indexLOD}`);
                                    }
                                    this.onMaterialLODsLoadedObservable.notifyObservers(indexLOD);
                                    if (indexLOD !== this._materialPromiseLODs.length - 1) {
                                        this._loader.startPerformanceCounter(`Material LOD ${indexLOD + 1}`);
                                        this._loadBufferLOD(this._materialBufferLODs, indexLOD + 1);
                                        if (this._materialSignalLODs[indexLOD]) {
                                            this._materialSignalLODs[indexLOD].resolve();
                                        }
                                    }
                                });
                                this._loader._completePromises.push(promise);
                            }
                        }
                        /**
                         * @param context
                         * @param scene
                         * @hidden
                         */
                        loadSceneAsync(context, scene) {
                            const promise = this._loader.loadSceneAsync(context, scene);
                            this._loadBufferLOD(this._bufferLODs, 0);
                            return promise;
                        }
                        /**
                         * @param context
                         * @param node
                         * @param assign
                         * @hidden
                         */
                        loadNodeAsync(context, node, assign) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, node, this.name, (extensionContext, extension) => {
                                let firstPromise;
                                const nodeLODs = this._getLODs(extensionContext, node, this._loader.gltf.nodes, extension.ids);
                                this._loader.logOpen(`${extensionContext}`);
                                for (let indexLOD = 0; indexLOD < nodeLODs.length; indexLOD++) {
                                    const nodeLOD = nodeLODs[indexLOD];
                                    if (indexLOD !== 0) {
                                        this._nodeIndexLOD = indexLOD;
                                        this._nodeSignalLODs[indexLOD] = this._nodeSignalLODs[indexLOD] || new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Deferred();
                                    }
                                    const assignWrap = (babylonTransformNode) => {
                                        assign(babylonTransformNode);
                                        babylonTransformNode.setEnabled(false);
                                    };
                                    const promise = this._loader.loadNodeAsync(`/nodes/${nodeLOD.index}`, nodeLOD, assignWrap).then((babylonMesh) => {
                                        if (indexLOD !== 0) {
                                            // TODO: should not rely on _babylonTransformNode
                                            const previousNodeLOD = nodeLODs[indexLOD - 1];
                                            if (previousNodeLOD._babylonTransformNode) {
                                                this._disposeTransformNode(previousNodeLOD._babylonTransformNode);
                                                delete previousNodeLOD._babylonTransformNode;
                                            }
                                        }
                                        babylonMesh.setEnabled(true);
                                        return babylonMesh;
                                    });
                                    this._nodePromiseLODs[indexLOD] = this._nodePromiseLODs[indexLOD] || [];
                                    if (indexLOD === 0) {
                                        firstPromise = promise;
                                    }
                                    else {
                                        this._nodeIndexLOD = null;
                                        this._nodePromiseLODs[indexLOD].push(promise);
                                    }
                                }
                                this._loader.logClose();
                                return firstPromise;
                            });
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMesh
                         * @param babylonDrawMode
                         * @param assign
                         * @hidden
                         */
                        _loadMaterialAsync(context, material, babylonMesh, babylonDrawMode, assign) {
                            // Don't load material LODs if already loading a node LOD.
                            if (this._nodeIndexLOD) {
                                return null;
                            }
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, (extensionContext, extension) => {
                                let firstPromise;
                                const materialLODs = this._getLODs(extensionContext, material, this._loader.gltf.materials, extension.ids);
                                this._loader.logOpen(`${extensionContext}`);
                                for (let indexLOD = 0; indexLOD < materialLODs.length; indexLOD++) {
                                    const materialLOD = materialLODs[indexLOD];
                                    if (indexLOD !== 0) {
                                        this._materialIndexLOD = indexLOD;
                                    }
                                    const promise = this._loader
                                        ._loadMaterialAsync(`/materials/${materialLOD.index}`, materialLOD, babylonMesh, babylonDrawMode, (babylonMaterial) => {
                                            if (indexLOD === 0) {
                                                assign(babylonMaterial);
                                            }
                                        })
                                        .then((babylonMaterial) => {
                                            if (indexLOD !== 0) {
                                                assign(babylonMaterial);
                                                // TODO: should not rely on _data
                                                const previousDataLOD = materialLODs[indexLOD - 1]._data;
                                                if (previousDataLOD[babylonDrawMode]) {
                                                    this._disposeMaterials([previousDataLOD[babylonDrawMode].babylonMaterial]);
                                                    delete previousDataLOD[babylonDrawMode];
                                                }
                                            }
                                            return babylonMaterial;
                                        });
                                    this._materialPromiseLODs[indexLOD] = this._materialPromiseLODs[indexLOD] || [];
                                    if (indexLOD === 0) {
                                        firstPromise = promise;
                                    }
                                    else {
                                        this._materialIndexLOD = null;
                                        this._materialPromiseLODs[indexLOD].push(promise);
                                    }
                                }
                                this._loader.logClose();
                                return firstPromise;
                            });
                        }
                        /**
                         * @param context
                         * @param property
                         * @param uri
                         * @hidden
                         */
                        _loadUriAsync(context, property, uri) {
                            // Defer the loading of uris if loading a node or material LOD.
                            if (this._nodeIndexLOD !== null) {
                                this._loader.log(`deferred`);
                                const previousIndexLOD = this._nodeIndexLOD - 1;
                                this._nodeSignalLODs[previousIndexLOD] = this._nodeSignalLODs[previousIndexLOD] || new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Deferred();
                                return this._nodeSignalLODs[this._nodeIndexLOD - 1].promise.then(() => {
                                    return this._loader.loadUriAsync(context, property, uri);
                                });
                            }
                            else if (this._materialIndexLOD !== null) {
                                this._loader.log(`deferred`);
                                const previousIndexLOD = this._materialIndexLOD - 1;
                                this._materialSignalLODs[previousIndexLOD] = this._materialSignalLODs[previousIndexLOD] || new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Deferred();
                                return this._materialSignalLODs[previousIndexLOD].promise.then(() => {
                                    return this._loader.loadUriAsync(context, property, uri);
                                });
                            }
                            return null;
                        }
                        /**
                         * @param context
                         * @param buffer
                         * @param byteOffset
                         * @param byteLength
                         * @hidden
                         */
                        loadBufferAsync(context, buffer, byteOffset, byteLength) {
                            if (this._loader.parent.useRangeRequests && !buffer.uri) {
                                if (!this._loader.bin) {
                                    throw new Error(`${context}: Uri is missing or the binary glTF is missing its binary chunk`);
                                }
                                const loadAsync = (bufferLODs, indexLOD) => {
                                    const start = byteOffset;
                                    const end = start + byteLength - 1;
                                    let bufferLOD = bufferLODs[indexLOD];
                                    if (bufferLOD) {
                                        bufferLOD.start = Math.min(bufferLOD.start, start);
                                        bufferLOD.end = Math.max(bufferLOD.end, end);
                                    }
                                    else {
                                        bufferLOD = { start: start, end: end, loaded: new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Deferred() };
                                        bufferLODs[indexLOD] = bufferLOD;
                                    }
                                    return bufferLOD.loaded.promise.then((data) => {
                                        return new Uint8Array(data.buffer, data.byteOffset + byteOffset - bufferLOD.start, byteLength);
                                    });
                                };
                                this._loader.log(`deferred`);
                                if (this._nodeIndexLOD !== null) {
                                    return loadAsync(this._nodeBufferLODs, this._nodeIndexLOD);
                                }
                                else if (this._materialIndexLOD !== null) {
                                    return loadAsync(this._materialBufferLODs, this._materialIndexLOD);
                                }
                                else {
                                    return loadAsync(this._bufferLODs, 0);
                                }
                            }
                            return null;
                        }
                        _loadBufferLOD(bufferLODs, indexLOD) {
                            const bufferLOD = bufferLODs[indexLOD];
                            if (bufferLOD) {
                                this._loader.log(`Loading buffer range [${bufferLOD.start}-${bufferLOD.end}]`);
                                this._loader.bin.readAsync(bufferLOD.start, bufferLOD.end - bufferLOD.start + 1).then((data) => {
                                    bufferLOD.loaded.resolve(data);
                                }, (error) => {
                                    bufferLOD.loaded.reject(error);
                                });
                            }
                        }
                        /**
                         * Gets an array of LOD properties from lowest to highest.
                         * @param context
                         * @param property
                         * @param array
                         * @param ids
                         */
                        _getLODs(context, property, array, ids) {
                            if (this.maxLODsToLoad <= 0) {
                                throw new Error("maxLODsToLoad must be greater than zero");
                            }
                            const properties = new Array();
                            for (let i = ids.length - 1; i >= 0; i--) {
                                properties.push(_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(`${context}/ids/${ids[i]}`, array, ids[i]));
                                if (properties.length === this.maxLODsToLoad) {
                                    return properties;
                                }
                            }
                            properties.push(property);
                            return properties;
                        }
                        _disposeTransformNode(babylonTransformNode) {
                            const babylonMaterials = new Array();
                            const babylonMaterial = babylonTransformNode.material;
                            if (babylonMaterial) {
                                babylonMaterials.push(babylonMaterial);
                            }
                            for (const babylonMesh of babylonTransformNode.getChildMeshes()) {
                                if (babylonMesh.material) {
                                    babylonMaterials.push(babylonMesh.material);
                                }
                            }
                            babylonTransformNode.dispose();
                            const babylonMaterialsToDispose = babylonMaterials.filter((babylonMaterial) => this._loader.babylonScene.meshes.every((mesh) => mesh.material != babylonMaterial));
                            this._disposeMaterials(babylonMaterialsToDispose);
                        }
                        _disposeMaterials(babylonMaterials) {
                            const babylonTextures = {};
                            for (const babylonMaterial of babylonMaterials) {
                                for (const babylonTexture of babylonMaterial.getActiveTextures()) {
                                    babylonTextures[babylonTexture.uniqueId] = babylonTexture;
                                }
                                babylonMaterial.dispose();
                            }
                            for (const uniqueId in babylonTextures) {
                                for (const babylonMaterial of this._loader.babylonScene.materials) {
                                    if (babylonMaterial.hasTexture(babylonTextures[uniqueId])) {
                                        delete babylonTextures[uniqueId];
                                    }
                                }
                            }
                            for (const uniqueId in babylonTextures) {
                                babylonTextures[uniqueId].dispose();
                            }
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new MSFT_lod(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_minecraftMesh.js":
/*!***************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_minecraftMesh.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MSFT_minecraftMesh": () => (/* binding */ MSFT_minecraftMesh)
                        /* harmony export */
});
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/PBR/pbrMaterial */ "core/Misc/observable");
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");


                    const NAME = "MSFT_minecraftMesh";
                    /** @hidden */
                    class MSFT_minecraftMesh {
                        constructor(loader) {
                            this.name = NAME;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        dispose() {
                            this._loader = null;
                        }
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtraAsync(context, material, this.name, (extraContext, extra) => {
                                if (extra) {
                                    if (!(babylonMaterial instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                        throw new Error(`${extraContext}: Material type not supported`);
                                    }
                                    const promise = this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial);
                                    if (babylonMaterial.needAlphaBlending()) {
                                        babylonMaterial.forceDepthWrite = true;
                                        babylonMaterial.separateCullingPass = true;
                                    }
                                    babylonMaterial.backFaceCulling = babylonMaterial.forceDepthWrite;
                                    babylonMaterial.twoSidedLighting = true;
                                    return promise;
                                }
                                return null;
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new MSFT_minecraftMesh(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_sRGBFactors.js":
/*!*************************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_sRGBFactors.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MSFT_sRGBFactors": () => (/* binding */ MSFT_sRGBFactors)
                        /* harmony export */
});
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/PBR/pbrMaterial */ "core/Misc/observable");
/* harmony import */ var core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");


                    const NAME = "MSFT_sRGBFactors";
                    /** @hidden */
                    class MSFT_sRGBFactors {
                        constructor(loader) {
                            this.name = NAME;
                            this._loader = loader;
                            this.enabled = this._loader.isExtensionUsed(NAME);
                        }
                        dispose() {
                            this._loader = null;
                        }
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtraAsync(context, material, this.name, (extraContext, extra) => {
                                if (extra) {
                                    if (!(babylonMaterial instanceof core_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                        throw new Error(`${extraContext}: Material type not supported`);
                                    }
                                    const promise = this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial);
                                    if (!babylonMaterial.albedoTexture) {
                                        babylonMaterial.albedoColor.toLinearSpaceToRef(babylonMaterial.albedoColor);
                                    }
                                    if (!babylonMaterial.reflectivityTexture) {
                                        babylonMaterial.reflectivityColor.toLinearSpaceToRef(babylonMaterial.reflectivityColor);
                                    }
                                    return promise;
                                }
                                return null;
                            });
                        }
                    }
                    _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, (loader) => new MSFT_sRGBFactors(loader));


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/Extensions/index.js":
/*!**************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/Extensions/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EXT_lights_image_based": () => (/* reexport safe */ _EXT_lights_image_based__WEBPACK_IMPORTED_MODULE_0__.EXT_lights_image_based),
/* harmony export */   "EXT_mesh_gpu_instancing": () => (/* reexport safe */ _EXT_mesh_gpu_instancing__WEBPACK_IMPORTED_MODULE_1__.EXT_mesh_gpu_instancing),
/* harmony export */   "EXT_meshopt_compression": () => (/* reexport safe */ _EXT_meshopt_compression__WEBPACK_IMPORTED_MODULE_2__.EXT_meshopt_compression),
/* harmony export */   "EXT_texture_webp": () => (/* reexport safe */ _EXT_texture_webp__WEBPACK_IMPORTED_MODULE_3__.EXT_texture_webp),
/* harmony export */   "ExtrasAsMetadata": () => (/* reexport safe */ _ExtrasAsMetadata__WEBPACK_IMPORTED_MODULE_25__.ExtrasAsMetadata),
/* harmony export */   "KHR_draco_mesh_compression": () => (/* reexport safe */ _KHR_draco_mesh_compression__WEBPACK_IMPORTED_MODULE_4__.KHR_draco_mesh_compression),
/* harmony export */   "KHR_lights": () => (/* reexport safe */ _KHR_lights_punctual__WEBPACK_IMPORTED_MODULE_5__.KHR_lights),
/* harmony export */   "KHR_materials_clearcoat": () => (/* reexport safe */ _KHR_materials_clearcoat__WEBPACK_IMPORTED_MODULE_8__.KHR_materials_clearcoat),
/* harmony export */   "KHR_materials_emissive_strength": () => (/* reexport safe */ _KHR_materials_emissive_strength__WEBPACK_IMPORTED_MODULE_9__.KHR_materials_emissive_strength),
/* harmony export */   "KHR_materials_ior": () => (/* reexport safe */ _KHR_materials_ior__WEBPACK_IMPORTED_MODULE_12__.KHR_materials_ior),
/* harmony export */   "KHR_materials_pbrSpecularGlossiness": () => (/* reexport safe */ _KHR_materials_pbrSpecularGlossiness__WEBPACK_IMPORTED_MODULE_6__.KHR_materials_pbrSpecularGlossiness),
/* harmony export */   "KHR_materials_sheen": () => (/* reexport safe */ _KHR_materials_sheen__WEBPACK_IMPORTED_MODULE_10__.KHR_materials_sheen),
/* harmony export */   "KHR_materials_specular": () => (/* reexport safe */ _KHR_materials_specular__WEBPACK_IMPORTED_MODULE_11__.KHR_materials_specular),
/* harmony export */   "KHR_materials_translucency": () => (/* reexport safe */ _KHR_materials_translucency__WEBPACK_IMPORTED_MODULE_15__.KHR_materials_translucency),
/* harmony export */   "KHR_materials_transmission": () => (/* reexport safe */ _KHR_materials_transmission__WEBPACK_IMPORTED_MODULE_14__.KHR_materials_transmission),
/* harmony export */   "KHR_materials_unlit": () => (/* reexport safe */ _KHR_materials_unlit__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_unlit),
/* harmony export */   "KHR_materials_variants": () => (/* reexport safe */ _KHR_materials_variants__WEBPACK_IMPORTED_MODULE_13__.KHR_materials_variants),
/* harmony export */   "KHR_materials_volume": () => (/* reexport safe */ _KHR_materials_volume__WEBPACK_IMPORTED_MODULE_16__.KHR_materials_volume),
/* harmony export */   "KHR_mesh_quantization": () => (/* reexport safe */ _KHR_mesh_quantization__WEBPACK_IMPORTED_MODULE_17__.KHR_mesh_quantization),
/* harmony export */   "KHR_texture_basisu": () => (/* reexport safe */ _KHR_texture_basisu__WEBPACK_IMPORTED_MODULE_18__.KHR_texture_basisu),
/* harmony export */   "KHR_texture_transform": () => (/* reexport safe */ _KHR_texture_transform__WEBPACK_IMPORTED_MODULE_19__.KHR_texture_transform),
/* harmony export */   "KHR_xmp_json_ld": () => (/* reexport safe */ _KHR_xmp_json_ld__WEBPACK_IMPORTED_MODULE_20__.KHR_xmp_json_ld),
/* harmony export */   "MSFT_audio_emitter": () => (/* reexport safe */ _MSFT_audio_emitter__WEBPACK_IMPORTED_MODULE_21__.MSFT_audio_emitter),
/* harmony export */   "MSFT_lod": () => (/* reexport safe */ _MSFT_lod__WEBPACK_IMPORTED_MODULE_22__.MSFT_lod),
/* harmony export */   "MSFT_minecraftMesh": () => (/* reexport safe */ _MSFT_minecraftMesh__WEBPACK_IMPORTED_MODULE_23__.MSFT_minecraftMesh),
/* harmony export */   "MSFT_sRGBFactors": () => (/* reexport safe */ _MSFT_sRGBFactors__WEBPACK_IMPORTED_MODULE_24__.MSFT_sRGBFactors)
                        /* harmony export */
});
/* harmony import */ var _EXT_lights_image_based__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EXT_lights_image_based */ "../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_lights_image_based.js");
/* harmony import */ var _EXT_mesh_gpu_instancing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EXT_mesh_gpu_instancing */ "../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.js");
/* harmony import */ var _EXT_meshopt_compression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EXT_meshopt_compression */ "../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_meshopt_compression.js");
/* harmony import */ var _EXT_texture_webp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EXT_texture_webp */ "../../../lts/loaders/dist/glTF/2.0/Extensions/EXT_texture_webp.js");
/* harmony import */ var _KHR_draco_mesh_compression__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./KHR_draco_mesh_compression */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_draco_mesh_compression.js");
/* harmony import */ var _KHR_lights_punctual__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./KHR_lights_punctual */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_lights_punctual.js");
/* harmony import */ var _KHR_materials_pbrSpecularGlossiness__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./KHR_materials_pbrSpecularGlossiness */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_pbrSpecularGlossiness.js");
/* harmony import */ var _KHR_materials_unlit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./KHR_materials_unlit */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_unlit.js");
/* harmony import */ var _KHR_materials_clearcoat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./KHR_materials_clearcoat */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_clearcoat.js");
/* harmony import */ var _KHR_materials_emissive_strength__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./KHR_materials_emissive_strength */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_emissive_strength.js");
/* harmony import */ var _KHR_materials_sheen__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./KHR_materials_sheen */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_sheen.js");
/* harmony import */ var _KHR_materials_specular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./KHR_materials_specular */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_specular.js");
/* harmony import */ var _KHR_materials_ior__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./KHR_materials_ior */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_ior.js");
/* harmony import */ var _KHR_materials_variants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./KHR_materials_variants */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_variants.js");
/* harmony import */ var _KHR_materials_transmission__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./KHR_materials_transmission */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_transmission.js");
/* harmony import */ var _KHR_materials_translucency__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./KHR_materials_translucency */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_translucency.js");
/* harmony import */ var _KHR_materials_volume__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./KHR_materials_volume */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_materials_volume.js");
/* harmony import */ var _KHR_mesh_quantization__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./KHR_mesh_quantization */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_mesh_quantization.js");
/* harmony import */ var _KHR_texture_basisu__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./KHR_texture_basisu */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_texture_basisu.js");
/* harmony import */ var _KHR_texture_transform__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./KHR_texture_transform */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_texture_transform.js");
/* harmony import */ var _KHR_xmp_json_ld__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./KHR_xmp_json_ld */ "../../../lts/loaders/dist/glTF/2.0/Extensions/KHR_xmp_json_ld.js");
/* harmony import */ var _MSFT_audio_emitter__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./MSFT_audio_emitter */ "../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_audio_emitter.js");
/* harmony import */ var _MSFT_lod__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./MSFT_lod */ "../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_lod.js");
/* harmony import */ var _MSFT_minecraftMesh__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./MSFT_minecraftMesh */ "../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_minecraftMesh.js");
/* harmony import */ var _MSFT_sRGBFactors__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./MSFT_sRGBFactors */ "../../../lts/loaders/dist/glTF/2.0/Extensions/MSFT_sRGBFactors.js");
/* harmony import */ var _ExtrasAsMetadata__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./ExtrasAsMetadata */ "../../../lts/loaders/dist/glTF/2.0/Extensions/ExtrasAsMetadata.js");




























                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js":
/*!********************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/glTFLoader.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrayItem": () => (/* binding */ ArrayItem),
/* harmony export */   "GLTFLoader": () => (/* binding */ GLTFLoader)
                        /* harmony export */
});
/* harmony import */ var core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Misc/stringTools */ "core/Misc/observable");
/* harmony import */ var core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFFileLoader */ "../../../lts/loaders/dist/glTF/glTFFileLoader.js");

























                    /**
                     * Helper class for working with arrays when loading the glTF asset
                     */
                    class ArrayItem {
                        /**
                         * Gets an item from the given array.
                         * @param context The context when loading the asset
                         * @param array The array to get the item from
                         * @param index The index to the array
                         * @returns The array item
                         */
                        static Get(context, array, index) {
                            if (!array || index == undefined || !array[index]) {
                                throw new Error(`${context}: Failed to find index (${index})`);
                            }
                            return array[index];
                        }
                        /**
                         * Assign an `index` field to each item of the given array.
                         * @param array The array of items
                         */
                        static Assign(array) {
                            if (array) {
                                for (let index = 0; index < array.length; index++) {
                                    array[index].index = index;
                                }
                            }
                        }
                    }
                    /**
                     * The glTF 2.0 loader
                     */
                    class GLTFLoader {
                        /**
                         * @param parent
                         * @hidden
                         */
                        constructor(parent) {
                            /** @hidden */
                            this._completePromises = new Array();
                            /** @hidden */
                            this._assetContainer = null;
                            /** Storage */
                            this._babylonLights = [];
                            /** @hidden */
                            this._disableInstancedMesh = 0;
                            this._extensions = new Array();
                            this._disposed = false;
                            this._rootUrl = null;
                            this._fileName = null;
                            this._uniqueRootUrl = null;
                            this._bin = null;
                            this._rootBabylonMesh = null;
                            this._defaultBabylonMaterialData = {};
                            this._postSceneLoadActions = new Array();
                            this._parent = parent;
                        }
                        /**
                         * Registers a loader extension.
                         * @param name The name of the loader extension.
                         * @param factory The factory function that creates the loader extension.
                         */
                        static RegisterExtension(name, factory) {
                            if (GLTFLoader.UnregisterExtension(name)) {
                                core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(`Extension with the name '${name}' already exists`);
                            }
                            GLTFLoader._RegisteredExtensions[name] = {
                                factory: factory,
                            };
                        }
                        /**
                         * Unregisters a loader extension.
                         * @param name The name of the loader extension.
                         * @returns A boolean indicating whether the extension has been unregistered
                         */
                        static UnregisterExtension(name) {
                            if (!GLTFLoader._RegisteredExtensions[name]) {
                                return false;
                            }
                            delete GLTFLoader._RegisteredExtensions[name];
                            return true;
                        }
                        /**
                         * The object that represents the glTF JSON.
                         */
                        get gltf() {
                            if (!this._gltf) {
                                throw new Error("glTF JSON is not available");
                            }
                            return this._gltf;
                        }
                        /**
                         * The BIN chunk of a binary glTF.
                         */
                        get bin() {
                            return this._bin;
                        }
                        /**
                         * The parent file loader.
                         */
                        get parent() {
                            return this._parent;
                        }
                        /**
                         * The Babylon scene when loading the asset.
                         */
                        get babylonScene() {
                            if (!this._babylonScene) {
                                throw new Error("Scene is not available");
                            }
                            return this._babylonScene;
                        }
                        /**
                         * The root Babylon mesh when loading the asset.
                         */
                        get rootBabylonMesh() {
                            return this._rootBabylonMesh;
                        }
                        /** @hidden */
                        dispose() {
                            if (this._disposed) {
                                return;
                            }
                            this._disposed = true;
                            this._completePromises.length = 0;
                            this._extensions.forEach((extension) => extension.dispose && extension.dispose());
                            this._extensions.length = 0;
                            this._gltf = null; // TODO
                            this._bin = null;
                            this._babylonScene = null; // TODO
                            this._rootBabylonMesh = null;
                            this._defaultBabylonMaterialData = {};
                            this._postSceneLoadActions.length = 0;
                            this._parent.dispose();
                        }
                        /**
                         * @param meshesNames
                         * @param scene
                         * @param container
                         * @param data
                         * @param rootUrl
                         * @param onProgress
                         * @param fileName
                         * @hidden
                         */
                        importMeshAsync(meshesNames, scene, container, data, rootUrl, onProgress, fileName = "") {
                            return Promise.resolve().then(() => {
                                this._babylonScene = scene;
                                this._assetContainer = container;
                                this._loadData(data);
                                let nodes = null;
                                if (meshesNames) {
                                    const nodeMap = {};
                                    if (this._gltf.nodes) {
                                        for (const node of this._gltf.nodes) {
                                            if (node.name) {
                                                nodeMap[node.name] = node.index;
                                            }
                                        }
                                    }
                                    const names = meshesNames instanceof Array ? meshesNames : [meshesNames];
                                    nodes = names.map((name) => {
                                        const node = nodeMap[name];
                                        if (node === undefined) {
                                            throw new Error(`Failed to find node '${name}'`);
                                        }
                                        return node;
                                    });
                                }
                                return this._loadAsync(rootUrl, fileName, nodes, () => {
                                    return {
                                        meshes: this._getMeshes(),
                                        particleSystems: [],
                                        skeletons: this._getSkeletons(),
                                        animationGroups: this._getAnimationGroups(),
                                        lights: this._babylonLights,
                                        transformNodes: this._getTransformNodes(),
                                        geometries: this._getGeometries(),
                                    };
                                });
                            });
                        }
                        /**
                         * @param scene
                         * @param data
                         * @param rootUrl
                         * @param onProgress
                         * @param fileName
                         * @hidden
                         */
                        loadAsync(scene, data, rootUrl, onProgress, fileName = "") {
                            return Promise.resolve().then(() => {
                                this._babylonScene = scene;
                                this._loadData(data);
                                return this._loadAsync(rootUrl, fileName, null, () => undefined);
                            });
                        }
                        _loadAsync(rootUrl, fileName, nodes, resultFunc) {
                            return Promise.resolve()
                                .then(() => {
                                    this._rootUrl = rootUrl;
                                    this._uniqueRootUrl = !core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.StringTools.StartsWith(rootUrl, "file:") && fileName ? rootUrl : `${rootUrl}${Date.now()}/`;
                                    this._fileName = fileName;
                                    this._loadExtensions();
                                    this._checkExtensions();
                                    const loadingToReadyCounterName = `${_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState[_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.LOADING]} => ${_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState[_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.READY]}`;
                                    const loadingToCompleteCounterName = `${_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState[_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.LOADING]} => ${_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState[_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.COMPLETE]}`;
                                    this._parent._startPerformanceCounter(loadingToReadyCounterName);
                                    this._parent._startPerformanceCounter(loadingToCompleteCounterName);
                                    this._parent._setState(_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.LOADING);
                                    this._extensionsOnLoading();
                                    const promises = new Array();
                                    // Block the marking of materials dirty until the scene is loaded.
                                    const oldBlockMaterialDirtyMechanism = this._babylonScene.blockMaterialDirtyMechanism;
                                    this._babylonScene.blockMaterialDirtyMechanism = true;
                                    if (!this.parent.loadOnlyMaterials) {
                                        if (nodes) {
                                            promises.push(this.loadSceneAsync("/nodes", { nodes: nodes, index: -1 }));
                                        }
                                        else if (this._gltf.scene != undefined || (this._gltf.scenes && this._gltf.scenes[0])) {
                                            const scene = ArrayItem.Get(`/scene`, this._gltf.scenes, this._gltf.scene || 0);
                                            promises.push(this.loadSceneAsync(`/scenes/${scene.index}`, scene));
                                        }
                                    }
                                    if (!this.parent.skipMaterials && this.parent.loadAllMaterials && this._gltf.materials) {
                                        for (let m = 0; m < this._gltf.materials.length; ++m) {
                                            const material = this._gltf.materials[m];
                                            const context = "/materials/" + m;
                                            const babylonDrawMode = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode;
                                            promises.push(this._loadMaterialAsync(context, material, null, babylonDrawMode, (material) => { }));
                                        }
                                    }
                                    // Restore the blocking of material dirty.
                                    this._babylonScene.blockMaterialDirtyMechanism = oldBlockMaterialDirtyMechanism;
                                    if (this._parent.compileMaterials) {
                                        promises.push(this._compileMaterialsAsync());
                                    }
                                    if (this._parent.compileShadowGenerators) {
                                        promises.push(this._compileShadowGeneratorsAsync());
                                    }
                                    const resultPromise = Promise.all(promises).then(() => {
                                        if (this._rootBabylonMesh) {
                                            this._rootBabylonMesh.setEnabled(true);
                                        }
                                        this._extensionsOnReady();
                                        this._parent._setState(_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.READY);
                                        this._startAnimations();
                                        return resultFunc();
                                    });
                                    return resultPromise.then((result) => {
                                        this._parent._endPerformanceCounter(loadingToReadyCounterName);
                                        core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Tools.SetImmediate(() => {
                                            if (!this._disposed) {
                                                Promise.all(this._completePromises).then(() => {
                                                    this._parent._endPerformanceCounter(loadingToCompleteCounterName);
                                                    this._parent._setState(_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.COMPLETE);
                                                    this._parent.onCompleteObservable.notifyObservers(undefined);
                                                    this._parent.onCompleteObservable.clear();
                                                    this.dispose();
                                                }, (error) => {
                                                    this._parent.onErrorObservable.notifyObservers(error);
                                                    this._parent.onErrorObservable.clear();
                                                    this.dispose();
                                                });
                                            }
                                        });
                                        return result;
                                    });
                                })
                                .catch((error) => {
                                    if (!this._disposed) {
                                        this._parent.onErrorObservable.notifyObservers(error);
                                        this._parent.onErrorObservable.clear();
                                        this.dispose();
                                    }
                                    throw error;
                                });
                        }
                        _loadData(data) {
                            this._gltf = data.json;
                            this._setupData();
                            if (data.bin) {
                                const buffers = this._gltf.buffers;
                                if (buffers && buffers[0] && !buffers[0].uri) {
                                    const binaryBuffer = buffers[0];
                                    if (binaryBuffer.byteLength < data.bin.byteLength - 3 || binaryBuffer.byteLength > data.bin.byteLength) {
                                        core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(`Binary buffer length (${binaryBuffer.byteLength}) from JSON does not match chunk length (${data.bin.byteLength})`);
                                    }
                                    this._bin = data.bin;
                                }
                                else {
                                    core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("Unexpected BIN chunk");
                                }
                            }
                        }
                        _setupData() {
                            ArrayItem.Assign(this._gltf.accessors);
                            ArrayItem.Assign(this._gltf.animations);
                            ArrayItem.Assign(this._gltf.buffers);
                            ArrayItem.Assign(this._gltf.bufferViews);
                            ArrayItem.Assign(this._gltf.cameras);
                            ArrayItem.Assign(this._gltf.images);
                            ArrayItem.Assign(this._gltf.materials);
                            ArrayItem.Assign(this._gltf.meshes);
                            ArrayItem.Assign(this._gltf.nodes);
                            ArrayItem.Assign(this._gltf.samplers);
                            ArrayItem.Assign(this._gltf.scenes);
                            ArrayItem.Assign(this._gltf.skins);
                            ArrayItem.Assign(this._gltf.textures);
                            if (this._gltf.nodes) {
                                const nodeParents = {};
                                for (const node of this._gltf.nodes) {
                                    if (node.children) {
                                        for (const index of node.children) {
                                            nodeParents[index] = node.index;
                                        }
                                    }
                                }
                                const rootNode = this._createRootNode();
                                for (const node of this._gltf.nodes) {
                                    const parentIndex = nodeParents[node.index];
                                    node.parent = parentIndex === undefined ? rootNode : this._gltf.nodes[parentIndex];
                                }
                            }
                        }
                        _loadExtensions() {
                            for (const name in GLTFLoader._RegisteredExtensions) {
                                const extension = GLTFLoader._RegisteredExtensions[name].factory(this);
                                if (extension.name !== name) {
                                    core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(`The name of the glTF loader extension instance does not match the registered name: ${extension.name} !== ${name}`);
                                }
                                this._extensions.push(extension);
                                this._parent.onExtensionLoadedObservable.notifyObservers(extension);
                            }
                            this._extensions.sort((a, b) => (a.order || Number.MAX_VALUE) - (b.order || Number.MAX_VALUE));
                            this._parent.onExtensionLoadedObservable.clear();
                        }
                        _checkExtensions() {
                            if (this._gltf.extensionsRequired) {
                                for (const name of this._gltf.extensionsRequired) {
                                    const available = this._extensions.some((extension) => extension.name === name && extension.enabled);
                                    if (!available) {
                                        throw new Error(`Require extension ${name} is not available`);
                                    }
                                }
                            }
                        }
                        _createRootNode() {
                            this._babylonScene._blockEntityCollection = !!this._assetContainer;
                            this._rootBabylonMesh = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Mesh("__root__", this._babylonScene);
                            this._rootBabylonMesh._parentContainer = this._assetContainer;
                            this._babylonScene._blockEntityCollection = false;
                            this._rootBabylonMesh.setEnabled(false);
                            const rootNode = {
                                _babylonTransformNode: this._rootBabylonMesh,
                                index: -1,
                            };
                            switch (this._parent.coordinateSystemMode) {
                                case _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderCoordinateSystemMode.AUTO: {
                                    if (!this._babylonScene.useRightHandedSystem) {
                                        rootNode.rotation = [0, 1, 0, 0];
                                        rootNode.scale = [1, 1, -1];
                                        GLTFLoader._LoadTransform(rootNode, this._rootBabylonMesh);
                                    }
                                    break;
                                }
                                case _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderCoordinateSystemMode.FORCE_RIGHT_HANDED: {
                                    this._babylonScene.useRightHandedSystem = true;
                                    break;
                                }
                                default: {
                                    throw new Error(`Invalid coordinate system mode (${this._parent.coordinateSystemMode})`);
                                }
                            }
                            this._parent.onMeshLoadedObservable.notifyObservers(this._rootBabylonMesh);
                            return rootNode;
                        }
                        /**
                         * Loads a glTF scene.
                         * @param context The context when loading the asset
                         * @param scene The glTF scene property
                         * @returns A promise that resolves when the load is complete
                         */
                        loadSceneAsync(context, scene) {
                            const extensionPromise = this._extensionsLoadSceneAsync(context, scene);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            const promises = new Array();
                            this.logOpen(`${context} ${scene.name || ""}`);
                            if (scene.nodes) {
                                for (const index of scene.nodes) {
                                    const node = ArrayItem.Get(`${context}/nodes/${index}`, this._gltf.nodes, index);
                                    promises.push(this.loadNodeAsync(`/nodes/${node.index}`, node, (babylonMesh) => {
                                        babylonMesh.parent = this._rootBabylonMesh;
                                    }));
                                }
                            }
                            for (const action of this._postSceneLoadActions) {
                                action();
                            }
                            promises.push(this._loadAnimationsAsync());
                            this.logClose();
                            return Promise.all(promises).then(() => { });
                        }
                        _forEachPrimitive(node, callback) {
                            if (node._primitiveBabylonMeshes) {
                                for (const babylonMesh of node._primitiveBabylonMeshes) {
                                    callback(babylonMesh);
                                }
                            }
                        }
                        _getGeometries() {
                            const geometries = new Array();
                            const nodes = this._gltf.nodes;
                            if (nodes) {
                                for (const node of nodes) {
                                    this._forEachPrimitive(node, (babylonMesh) => {
                                        const geometry = babylonMesh.geometry;
                                        if (geometry && geometries.indexOf(geometry) === -1) {
                                            geometries.push(geometry);
                                        }
                                    });
                                }
                            }
                            return geometries;
                        }
                        _getMeshes() {
                            const meshes = new Array();
                            // Root mesh is always first, if available.
                            if (this._rootBabylonMesh) {
                                meshes.push(this._rootBabylonMesh);
                            }
                            const nodes = this._gltf.nodes;
                            if (nodes) {
                                for (const node of nodes) {
                                    this._forEachPrimitive(node, (babylonMesh) => {
                                        meshes.push(babylonMesh);
                                    });
                                }
                            }
                            return meshes;
                        }
                        _getTransformNodes() {
                            const transformNodes = new Array();
                            const nodes = this._gltf.nodes;
                            if (nodes) {
                                for (const node of nodes) {
                                    if (node._babylonTransformNode && node._babylonTransformNode.getClassName() === "TransformNode") {
                                        transformNodes.push(node._babylonTransformNode);
                                    }
                                    if (node._babylonTransformNodeForSkin) {
                                        transformNodes.push(node._babylonTransformNodeForSkin);
                                    }
                                }
                            }
                            return transformNodes;
                        }
                        _getSkeletons() {
                            const skeletons = new Array();
                            const skins = this._gltf.skins;
                            if (skins) {
                                for (const skin of skins) {
                                    if (skin._data) {
                                        skeletons.push(skin._data.babylonSkeleton);
                                    }
                                }
                            }
                            return skeletons;
                        }
                        _getAnimationGroups() {
                            const animationGroups = new Array();
                            const animations = this._gltf.animations;
                            if (animations) {
                                for (const animation of animations) {
                                    if (animation._babylonAnimationGroup) {
                                        animationGroups.push(animation._babylonAnimationGroup);
                                    }
                                }
                            }
                            return animationGroups;
                        }
                        _startAnimations() {
                            switch (this._parent.animationStartMode) {
                                case _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderAnimationStartMode.NONE: {
                                    // do nothing
                                    break;
                                }
                                case _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderAnimationStartMode.FIRST: {
                                    const babylonAnimationGroups = this._getAnimationGroups();
                                    if (babylonAnimationGroups.length !== 0) {
                                        babylonAnimationGroups[0].start(true);
                                    }
                                    break;
                                }
                                case _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderAnimationStartMode.ALL: {
                                    const babylonAnimationGroups = this._getAnimationGroups();
                                    for (const babylonAnimationGroup of babylonAnimationGroups) {
                                        babylonAnimationGroup.start(true);
                                    }
                                    break;
                                }
                                default: {
                                    core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Error(`Invalid animation start mode (${this._parent.animationStartMode})`);
                                    return;
                                }
                            }
                        }
                        /**
                         * Loads a glTF node.
                         * @param context The context when loading the asset
                         * @param node The glTF node property
                         * @param assign A function called synchronously after parsing the glTF properties
                         * @returns A promise that resolves with the loaded Babylon mesh when the load is complete
                         */
                        loadNodeAsync(context, node, assign = () => { }) {
                            const extensionPromise = this._extensionsLoadNodeAsync(context, node, assign);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            if (node._babylonTransformNode) {
                                throw new Error(`${context}: Invalid recursive node hierarchy`);
                            }
                            const promises = new Array();
                            this.logOpen(`${context} ${node.name || ""}`);
                            const loadNode = (babylonTransformNode) => {
                                GLTFLoader.AddPointerMetadata(babylonTransformNode, context);
                                GLTFLoader._LoadTransform(node, babylonTransformNode);
                                if (node.camera != undefined) {
                                    const camera = ArrayItem.Get(`${context}/camera`, this._gltf.cameras, node.camera);
                                    promises.push(this.loadCameraAsync(`/cameras/${camera.index}`, camera, (babylonCamera) => {
                                        babylonCamera.parent = babylonTransformNode;
                                    }));
                                }
                                if (node.children) {
                                    for (const index of node.children) {
                                        const childNode = ArrayItem.Get(`${context}/children/${index}`, this._gltf.nodes, index);
                                        promises.push(this.loadNodeAsync(`/nodes/${childNode.index}`, childNode, (childBabylonMesh) => {
                                            childBabylonMesh.parent = babylonTransformNode;
                                        }));
                                    }
                                }
                                assign(babylonTransformNode);
                            };
                            if (node.mesh == undefined || node.skin != undefined) {
                                const nodeName = node.name || `node${node.index}`;
                                this._babylonScene._blockEntityCollection = !!this._assetContainer;
                                const transformNode = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.TransformNode(nodeName, this._babylonScene);
                                transformNode._parentContainer = this._assetContainer;
                                this._babylonScene._blockEntityCollection = false;
                                if (node.mesh == undefined) {
                                    node._babylonTransformNode = transformNode;
                                }
                                else {
                                    node._babylonTransformNodeForSkin = transformNode;
                                }
                                loadNode(transformNode);
                            }
                            if (node.mesh != undefined) {
                                if (node.skin == undefined) {
                                    const mesh = ArrayItem.Get(`${context}/mesh`, this._gltf.meshes, node.mesh);
                                    promises.push(this._loadMeshAsync(`/meshes/${mesh.index}`, node, mesh, loadNode));
                                }
                                else {
                                    // See https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins (second implementation note)
                                    // This code path will place the skinned mesh as a sibling of the skeleton root node without loading the
                                    // transform, which effectively ignores the transform of the skinned mesh, as per spec.
                                    const mesh = ArrayItem.Get(`${context}/mesh`, this._gltf.meshes, node.mesh);
                                    promises.push(this._loadMeshAsync(`/meshes/${mesh.index}`, node, mesh, (babylonTransformNode) => {
                                        // Duplicate the metadata from the skin node to the skinned mesh in case any loader extension added metadata.
                                        babylonTransformNode.metadata = node._babylonTransformNodeForSkin.metadata;
                                        const skin = ArrayItem.Get(`${context}/skin`, this._gltf.skins, node.skin);
                                        promises.push(this._loadSkinAsync(`/skins/${skin.index}`, node, skin, (babylonSkeleton) => {
                                            this._forEachPrimitive(node, (babylonMesh) => {
                                                babylonMesh.skeleton = babylonSkeleton;
                                            });
                                            // Wait until the scene is loaded to ensure the skeleton root node has been loaded.
                                            this._postSceneLoadActions.push(() => {
                                                if (skin.skeleton != undefined) {
                                                    // Place the skinned mesh node as a sibling of the skeleton root node.
                                                    const skeletonRootNode = ArrayItem.Get(`/skins/${skin.index}/skeleton`, this._gltf.nodes, skin.skeleton);
                                                    babylonTransformNode.parent = skeletonRootNode.parent._babylonTransformNode;
                                                }
                                                else {
                                                    babylonTransformNode.parent = this._rootBabylonMesh;
                                                }
                                            });
                                        }));
                                    }));
                                }
                            }
                            this.logClose();
                            return Promise.all(promises).then(() => {
                                this._forEachPrimitive(node, (babylonMesh) => {
                                    if (babylonMesh.geometry && babylonMesh.geometry.useBoundingInfoFromGeometry) {
                                        // simply apply the world matrices to the bounding info - the extends are already ok
                                        babylonMesh._updateBoundingInfo();
                                    }
                                    else {
                                        babylonMesh.refreshBoundingInfo(true);
                                    }
                                });
                                return node._babylonTransformNode;
                            });
                        }
                        _loadMeshAsync(context, node, mesh, assign) {
                            const primitives = mesh.primitives;
                            if (!primitives || !primitives.length) {
                                throw new Error(`${context}: Primitives are missing`);
                            }
                            if (primitives[0].index == undefined) {
                                ArrayItem.Assign(primitives);
                            }
                            const promises = new Array();
                            this.logOpen(`${context} ${mesh.name || ""}`);
                            const name = node.name || `node${node.index}`;
                            if (primitives.length === 1) {
                                const primitive = mesh.primitives[0];
                                promises.push(this._loadMeshPrimitiveAsync(`${context}/primitives/${primitive.index}`, name, node, mesh, primitive, (babylonMesh) => {
                                    node._babylonTransformNode = babylonMesh;
                                    node._primitiveBabylonMeshes = [babylonMesh];
                                }));
                            }
                            else {
                                this._babylonScene._blockEntityCollection = !!this._assetContainer;
                                node._babylonTransformNode = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.TransformNode(name, this._babylonScene);
                                node._babylonTransformNode._parentContainer = this._assetContainer;
                                this._babylonScene._blockEntityCollection = false;
                                node._primitiveBabylonMeshes = [];
                                for (const primitive of primitives) {
                                    promises.push(this._loadMeshPrimitiveAsync(`${context}/primitives/${primitive.index}`, `${name}_primitive${primitive.index}`, node, mesh, primitive, (babylonMesh) => {
                                        babylonMesh.parent = node._babylonTransformNode;
                                        node._primitiveBabylonMeshes.push(babylonMesh);
                                    }));
                                }
                            }
                            assign(node._babylonTransformNode);
                            this.logClose();
                            return Promise.all(promises).then(() => {
                                return node._babylonTransformNode;
                            });
                        }
                        /**
                         * @hidden Define this method to modify the default behavior when loading data for mesh primitives.
                         * @param context The context when loading the asset
                         * @param name The mesh name when loading the asset
                         * @param node The glTF node when loading the asset
                         * @param mesh The glTF mesh when loading the asset
                         * @param primitive The glTF mesh primitive property
                         * @param assign A function called synchronously after parsing the glTF properties
                         * @returns A promise that resolves with the loaded mesh when the load is complete or null if not handled
                         */
                        _loadMeshPrimitiveAsync(context, name, node, mesh, primitive, assign) {
                            const extensionPromise = this._extensionsLoadMeshPrimitiveAsync(context, name, node, mesh, primitive, assign);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            this.logOpen(`${context}`);
                            const shouldInstance = this._disableInstancedMesh === 0 && this._parent.createInstances && node.skin == undefined && !mesh.primitives[0].targets;
                            let babylonAbstractMesh;
                            let promise;
                            if (shouldInstance && primitive._instanceData) {
                                this._babylonScene._blockEntityCollection = !!this._assetContainer;
                                babylonAbstractMesh = primitive._instanceData.babylonSourceMesh.createInstance(name);
                                babylonAbstractMesh._parentContainer = this._assetContainer;
                                this._babylonScene._blockEntityCollection = false;
                                promise = primitive._instanceData.promise;
                            }
                            else {
                                const promises = new Array();
                                this._babylonScene._blockEntityCollection = !!this._assetContainer;
                                const babylonMesh = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Mesh(name, this._babylonScene);
                                babylonMesh._parentContainer = this._assetContainer;
                                this._babylonScene._blockEntityCollection = false;
                                babylonMesh.overrideMaterialSideOrientation = this._babylonScene.useRightHandedSystem ? core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.CounterClockWiseSideOrientation : core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.ClockWiseSideOrientation;
                                this._createMorphTargets(context, node, mesh, primitive, babylonMesh);
                                promises.push(this._loadVertexDataAsync(context, primitive, babylonMesh).then((babylonGeometry) => {
                                    return this._loadMorphTargetsAsync(context, primitive, babylonMesh, babylonGeometry).then(() => {
                                        this._babylonScene._blockEntityCollection = !!this._assetContainer;
                                        babylonGeometry.applyToMesh(babylonMesh);
                                        babylonGeometry._parentContainer = this._assetContainer;
                                        this._babylonScene._blockEntityCollection = false;
                                    });
                                }));
                                const babylonDrawMode = GLTFLoader._GetDrawMode(context, primitive.mode);
                                if (primitive.material == undefined) {
                                    let babylonMaterial = this._defaultBabylonMaterialData[babylonDrawMode];
                                    if (!babylonMaterial) {
                                        babylonMaterial = this._createDefaultMaterial("__GLTFLoader._default", babylonDrawMode);
                                        this._parent.onMaterialLoadedObservable.notifyObservers(babylonMaterial);
                                        this._defaultBabylonMaterialData[babylonDrawMode] = babylonMaterial;
                                    }
                                    babylonMesh.material = babylonMaterial;
                                }
                                else if (!this.parent.skipMaterials) {
                                    const material = ArrayItem.Get(`${context}/material`, this._gltf.materials, primitive.material);
                                    promises.push(this._loadMaterialAsync(`/materials/${material.index}`, material, babylonMesh, babylonDrawMode, (babylonMaterial) => {
                                        babylonMesh.material = babylonMaterial;
                                    }));
                                }
                                promise = Promise.all(promises);
                                if (shouldInstance) {
                                    primitive._instanceData = {
                                        babylonSourceMesh: babylonMesh,
                                        promise: promise,
                                    };
                                }
                                babylonAbstractMesh = babylonMesh;
                            }
                            GLTFLoader.AddPointerMetadata(babylonAbstractMesh, context);
                            this._parent.onMeshLoadedObservable.notifyObservers(babylonAbstractMesh);
                            assign(babylonAbstractMesh);
                            this.logClose();
                            return promise.then(() => {
                                return babylonAbstractMesh;
                            });
                        }
                        _loadVertexDataAsync(context, primitive, babylonMesh) {
                            const extensionPromise = this._extensionsLoadVertexDataAsync(context, primitive, babylonMesh);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            const attributes = primitive.attributes;
                            if (!attributes) {
                                throw new Error(`${context}: Attributes are missing`);
                            }
                            const promises = new Array();
                            const babylonGeometry = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Geometry(babylonMesh.name, this._babylonScene);
                            if (primitive.indices == undefined) {
                                babylonMesh.isUnIndexed = true;
                            }
                            else {
                                const accessor = ArrayItem.Get(`${context}/indices`, this._gltf.accessors, primitive.indices);
                                promises.push(this._loadIndicesAccessorAsync(`/accessors/${accessor.index}`, accessor).then((data) => {
                                    babylonGeometry.setIndices(data);
                                }));
                            }
                            const loadAttribute = (attribute, kind, callback) => {
                                if (attributes[attribute] == undefined) {
                                    return;
                                }
                                babylonMesh._delayInfo = babylonMesh._delayInfo || [];
                                if (babylonMesh._delayInfo.indexOf(kind) === -1) {
                                    babylonMesh._delayInfo.push(kind);
                                }
                                const accessor = ArrayItem.Get(`${context}/attributes/${attribute}`, this._gltf.accessors, attributes[attribute]);
                                promises.push(this._loadVertexAccessorAsync(`/accessors/${accessor.index}`, accessor, kind).then((babylonVertexBuffer) => {
                                    if (babylonVertexBuffer.getKind() === core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind && !this.parent.alwaysComputeBoundingBox && !babylonMesh.skeleton) {
                                        const mmin = accessor.min, mmax = accessor.max;
                                        if (mmin !== undefined && mmax !== undefined) {
                                            if (accessor.normalized && accessor.componentType !== 5126 /* FLOAT */) {
                                                let divider = 1;
                                                switch (accessor.componentType) {
                                                    case 5120 /* BYTE */:
                                                        divider = 127.0;
                                                        break;
                                                    case 5121 /* UNSIGNED_BYTE */:
                                                        divider = 255.0;
                                                        break;
                                                    case 5122 /* SHORT */:
                                                        divider = 32767.0;
                                                        break;
                                                    case 5123 /* UNSIGNED_SHORT */:
                                                        divider = 65535.0;
                                                        break;
                                                }
                                                for (let i = 0; i < 3; ++i) {
                                                    mmin[i] = Math.max(mmin[i] / divider, -1.0);
                                                    mmax[i] = Math.max(mmax[i] / divider, -1.0);
                                                }
                                            }
                                            const min = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0], max = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1];
                                            min.copyFromFloats(...mmin);
                                            max.copyFromFloats(...mmax);
                                            babylonGeometry._boundingInfo = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.BoundingInfo(min, max);
                                            babylonGeometry.useBoundingInfoFromGeometry = true;
                                        }
                                    }
                                    babylonGeometry.setVerticesBuffer(babylonVertexBuffer, accessor.count);
                                }));
                                if (kind == core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesExtraKind) {
                                    babylonMesh.numBoneInfluencers = 8;
                                }
                                if (callback) {
                                    callback(accessor);
                                }
                            };
                            loadAttribute("POSITION", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
                            loadAttribute("NORMAL", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
                            loadAttribute("TANGENT", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind);
                            loadAttribute("TEXCOORD_0", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind);
                            loadAttribute("TEXCOORD_1", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind);
                            loadAttribute("TEXCOORD_2", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV3Kind);
                            loadAttribute("TEXCOORD_3", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV4Kind);
                            loadAttribute("TEXCOORD_4", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV5Kind);
                            loadAttribute("TEXCOORD_5", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV6Kind);
                            loadAttribute("JOINTS_0", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesKind);
                            loadAttribute("WEIGHTS_0", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsKind);
                            loadAttribute("JOINTS_1", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesExtraKind);
                            loadAttribute("WEIGHTS_1", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsExtraKind);
                            loadAttribute("COLOR_0", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind, (accessor) => {
                                if (accessor.type === "VEC4" /* VEC4 */) {
                                    babylonMesh.hasVertexAlpha = true;
                                }
                            });
                            return Promise.all(promises).then(() => {
                                return babylonGeometry;
                            });
                        }
                        _createMorphTargets(context, node, mesh, primitive, babylonMesh) {
                            if (!primitive.targets) {
                                return;
                            }
                            if (node._numMorphTargets == undefined) {
                                node._numMorphTargets = primitive.targets.length;
                            }
                            else if (primitive.targets.length !== node._numMorphTargets) {
                                throw new Error(`${context}: Primitives do not have the same number of targets`);
                            }
                            const targetNames = mesh.extras ? mesh.extras.targetNames : null;
                            babylonMesh.morphTargetManager = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.MorphTargetManager(babylonMesh.getScene());
                            babylonMesh.morphTargetManager.areUpdatesFrozen = true;
                            for (let index = 0; index < primitive.targets.length; index++) {
                                const weight = node.weights ? node.weights[index] : mesh.weights ? mesh.weights[index] : 0;
                                const name = targetNames ? targetNames[index] : `morphTarget${index}`;
                                babylonMesh.morphTargetManager.addTarget(new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.MorphTarget(name, weight, babylonMesh.getScene()));
                                // TODO: tell the target whether it has positions, normals, tangents
                            }
                        }
                        _loadMorphTargetsAsync(context, primitive, babylonMesh, babylonGeometry) {
                            if (!primitive.targets) {
                                return Promise.resolve();
                            }
                            const promises = new Array();
                            const morphTargetManager = babylonMesh.morphTargetManager;
                            for (let index = 0; index < morphTargetManager.numTargets; index++) {
                                const babylonMorphTarget = morphTargetManager.getTarget(index);
                                promises.push(this._loadMorphTargetVertexDataAsync(`${context}/targets/${index}`, babylonGeometry, primitive.targets[index], babylonMorphTarget));
                            }
                            return Promise.all(promises).then(() => {
                                morphTargetManager.areUpdatesFrozen = false;
                            });
                        }
                        _loadMorphTargetVertexDataAsync(context, babylonGeometry, attributes, babylonMorphTarget) {
                            const promises = new Array();
                            const loadAttribute = (attribute, kind, setData) => {
                                if (attributes[attribute] == undefined) {
                                    return;
                                }
                                const babylonVertexBuffer = babylonGeometry.getVertexBuffer(kind);
                                if (!babylonVertexBuffer) {
                                    return;
                                }
                                const accessor = ArrayItem.Get(`${context}/${attribute}`, this._gltf.accessors, attributes[attribute]);
                                promises.push(this._loadFloatAccessorAsync(`/accessors/${accessor.index}`, accessor).then((data) => {
                                    setData(babylonVertexBuffer, data);
                                }));
                            };
                            loadAttribute("POSITION", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, (babylonVertexBuffer, data) => {
                                const positions = new Float32Array(data.length);
                                babylonVertexBuffer.forEach(data.length, (value, index) => {
                                    positions[index] = data[index] + value;
                                });
                                babylonMorphTarget.setPositions(positions);
                            });
                            loadAttribute("NORMAL", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, (babylonVertexBuffer, data) => {
                                const normals = new Float32Array(data.length);
                                babylonVertexBuffer.forEach(normals.length, (value, index) => {
                                    normals[index] = data[index] + value;
                                });
                                babylonMorphTarget.setNormals(normals);
                            });
                            loadAttribute("TANGENT", core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind, (babylonVertexBuffer, data) => {
                                const tangents = new Float32Array((data.length / 3) * 4);
                                let dataIndex = 0;
                                babylonVertexBuffer.forEach((data.length / 3) * 4, (value, index) => {
                                    // Tangent data for morph targets is stored as xyz delta.
                                    // The vertexData.tangent is stored as xyzw.
                                    // So we need to skip every fourth vertexData.tangent.
                                    if ((index + 1) % 4 !== 0) {
                                        tangents[dataIndex] = data[dataIndex] + value;
                                        dataIndex++;
                                    }
                                });
                                babylonMorphTarget.setTangents(tangents);
                            });
                            return Promise.all(promises).then(() => { });
                        }
                        static _LoadTransform(node, babylonNode) {
                            // Ignore the TRS of skinned nodes.
                            // See https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins (second implementation note)
                            if (node.skin != undefined) {
                                return;
                            }
                            let position = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero();
                            let rotation = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Identity();
                            let scaling = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.One();
                            if (node.matrix) {
                                const matrix = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Matrix.FromArray(node.matrix);
                                matrix.decompose(scaling, rotation, position);
                            }
                            else {
                                if (node.translation) {
                                    position = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(node.translation);
                                }
                                if (node.rotation) {
                                    rotation = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArray(node.rotation);
                                }
                                if (node.scale) {
                                    scaling = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(node.scale);
                                }
                            }
                            babylonNode.position = position;
                            babylonNode.rotationQuaternion = rotation;
                            babylonNode.scaling = scaling;
                        }
                        _loadSkinAsync(context, node, skin, assign) {
                            const extensionPromise = this._extensionsLoadSkinAsync(context, node, skin);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            if (skin._data) {
                                assign(skin._data.babylonSkeleton);
                                return skin._data.promise;
                            }
                            const skeletonId = `skeleton${skin.index}`;
                            this._babylonScene._blockEntityCollection = !!this._assetContainer;
                            const babylonSkeleton = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Skeleton(skin.name || skeletonId, skeletonId, this._babylonScene);
                            babylonSkeleton._parentContainer = this._assetContainer;
                            this._babylonScene._blockEntityCollection = false;
                            this._loadBones(context, skin, babylonSkeleton);
                            const promise = this._loadSkinInverseBindMatricesDataAsync(context, skin).then((inverseBindMatricesData) => {
                                this._updateBoneMatrices(babylonSkeleton, inverseBindMatricesData);
                            });
                            skin._data = {
                                babylonSkeleton: babylonSkeleton,
                                promise: promise,
                            };
                            assign(babylonSkeleton);
                            return promise;
                        }
                        _loadBones(context, skin, babylonSkeleton) {
                            if (skin.skeleton == undefined || this._parent.alwaysComputeSkeletonRootNode) {
                                const rootNode = this._findSkeletonRootNode(`${context}/joints`, skin.joints);
                                if (rootNode) {
                                    if (skin.skeleton === undefined) {
                                        skin.skeleton = rootNode.index;
                                    }
                                    else {
                                        const isParent = (a, b) => {
                                            for (; b.parent; b = b.parent) {
                                                if (b.parent === a) {
                                                    return true;
                                                }
                                            }
                                            return false;
                                        };
                                        const skeletonNode = ArrayItem.Get(`${context}/skeleton`, this._gltf.nodes, skin.skeleton);
                                        if (skeletonNode !== rootNode && !isParent(skeletonNode, rootNode)) {
                                            core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(`${context}/skeleton: Overriding with nearest common ancestor as skeleton node is not a common root`);
                                            skin.skeleton = rootNode.index;
                                        }
                                    }
                                }
                                else {
                                    core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(`${context}: Failed to find common root`);
                                }
                            }
                            const babylonBones = {};
                            for (const index of skin.joints) {
                                const node = ArrayItem.Get(`${context}/joints/${index}`, this._gltf.nodes, index);
                                this._loadBone(node, skin, babylonSkeleton, babylonBones);
                            }
                        }
                        _findSkeletonRootNode(context, joints) {
                            if (joints.length === 0) {
                                return null;
                            }
                            const paths = {};
                            for (const index of joints) {
                                const path = new Array();
                                let node = ArrayItem.Get(`${context}/${index}`, this._gltf.nodes, index);
                                while (node.index !== -1) {
                                    path.unshift(node);
                                    node = node.parent;
                                }
                                paths[index] = path;
                            }
                            let rootNode = null;
                            for (let i = 0; ; ++i) {
                                let path = paths[joints[0]];
                                if (i >= path.length) {
                                    return rootNode;
                                }
                                const node = path[i];
                                for (let j = 1; j < joints.length; ++j) {
                                    path = paths[joints[j]];
                                    if (i >= path.length || node !== path[i]) {
                                        return rootNode;
                                    }
                                }
                                rootNode = node;
                            }
                        }
                        _loadBone(node, skin, babylonSkeleton, babylonBones) {
                            let babylonBone = babylonBones[node.index];
                            if (babylonBone) {
                                return babylonBone;
                            }
                            let parentBabylonBone = null;
                            if (node.index !== skin.skeleton) {
                                if (node.parent && node.parent.index !== -1) {
                                    parentBabylonBone = this._loadBone(node.parent, skin, babylonSkeleton, babylonBones);
                                }
                                else if (skin.skeleton !== undefined) {
                                    core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(`/skins/${skin.index}/skeleton: Skeleton node is not a common root`);
                                }
                            }
                            const boneIndex = skin.joints.indexOf(node.index);
                            babylonBone = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Bone(node.name || `joint${node.index}`, babylonSkeleton, parentBabylonBone, this._getNodeMatrix(node), null, null, boneIndex);
                            babylonBones[node.index] = babylonBone;
                            // Wait until the scene is loaded to ensure the transform nodes are loaded.
                            this._postSceneLoadActions.push(() => {
                                // Link the Babylon bone with the corresponding Babylon transform node.
                                // A glTF joint is a pointer to a glTF node in the glTF node hierarchy similar to Unity3D.
                                babylonBone.linkTransformNode(node._babylonTransformNode);
                            });
                            return babylonBone;
                        }
                        _loadSkinInverseBindMatricesDataAsync(context, skin) {
                            if (skin.inverseBindMatrices == undefined) {
                                return Promise.resolve(null);
                            }
                            const accessor = ArrayItem.Get(`${context}/inverseBindMatrices`, this._gltf.accessors, skin.inverseBindMatrices);
                            return this._loadFloatAccessorAsync(`/accessors/${accessor.index}`, accessor);
                        }
                        _updateBoneMatrices(babylonSkeleton, inverseBindMatricesData) {
                            for (const babylonBone of babylonSkeleton.bones) {
                                const baseMatrix = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Matrix.Identity();
                                const boneIndex = babylonBone._index;
                                if (inverseBindMatricesData && boneIndex !== -1) {
                                    core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Matrix.FromArrayToRef(inverseBindMatricesData, boneIndex * 16, baseMatrix);
                                    baseMatrix.invertToRef(baseMatrix);
                                }
                                const babylonParentBone = babylonBone.getParent();
                                if (babylonParentBone) {
                                    baseMatrix.multiplyToRef(babylonParentBone.getInvertedAbsoluteTransform(), baseMatrix);
                                }
                                babylonBone.updateMatrix(baseMatrix, false, false);
                                babylonBone._updateDifferenceMatrix(undefined, false);
                            }
                        }
                        _getNodeMatrix(node) {
                            return node.matrix
                                ? core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Matrix.FromArray(node.matrix)
                                : core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Matrix.Compose(node.scale ? core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(node.scale) : core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.One(), node.rotation ? core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArray(node.rotation) : core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Identity(), node.translation ? core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(node.translation) : core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero());
                        }
                        /**
                         * Loads a glTF camera.
                         * @param context The context when loading the asset
                         * @param camera The glTF camera property
                         * @param assign A function called synchronously after parsing the glTF properties
                         * @returns A promise that resolves with the loaded Babylon camera when the load is complete
                         */
                        loadCameraAsync(context, camera, assign = () => { }) {
                            const extensionPromise = this._extensionsLoadCameraAsync(context, camera, assign);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            const promises = new Array();
                            this.logOpen(`${context} ${camera.name || ""}`);
                            this._babylonScene._blockEntityCollection = !!this._assetContainer;
                            const babylonCamera = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.FreeCamera(camera.name || `camera${camera.index}`, core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero(), this._babylonScene, false);
                            babylonCamera._parentContainer = this._assetContainer;
                            this._babylonScene._blockEntityCollection = false;
                            babylonCamera.ignoreParentScaling = true;
                            babylonCamera.rotation = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, Math.PI, 0);
                            switch (camera.type) {
                                case "perspective" /* PERSPECTIVE */: {
                                    const perspective = camera.perspective;
                                    if (!perspective) {
                                        throw new Error(`${context}: Camera perspective properties are missing`);
                                    }
                                    babylonCamera.fov = perspective.yfov;
                                    babylonCamera.minZ = perspective.znear;
                                    babylonCamera.maxZ = perspective.zfar || 0;
                                    break;
                                }
                                case "orthographic" /* ORTHOGRAPHIC */: {
                                    if (!camera.orthographic) {
                                        throw new Error(`${context}: Camera orthographic properties are missing`);
                                    }
                                    babylonCamera.mode = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Camera.ORTHOGRAPHIC_CAMERA;
                                    babylonCamera.orthoLeft = -camera.orthographic.xmag;
                                    babylonCamera.orthoRight = camera.orthographic.xmag;
                                    babylonCamera.orthoBottom = -camera.orthographic.ymag;
                                    babylonCamera.orthoTop = camera.orthographic.ymag;
                                    babylonCamera.minZ = camera.orthographic.znear;
                                    babylonCamera.maxZ = camera.orthographic.zfar;
                                    break;
                                }
                                default: {
                                    throw new Error(`${context}: Invalid camera type (${camera.type})`);
                                }
                            }
                            GLTFLoader.AddPointerMetadata(babylonCamera, context);
                            this._parent.onCameraLoadedObservable.notifyObservers(babylonCamera);
                            assign(babylonCamera);
                            this.logClose();
                            return Promise.all(promises).then(() => {
                                return babylonCamera;
                            });
                        }
                        _loadAnimationsAsync() {
                            const animations = this._gltf.animations;
                            if (!animations) {
                                return Promise.resolve();
                            }
                            const promises = new Array();
                            for (let index = 0; index < animations.length; index++) {
                                const animation = animations[index];
                                promises.push(this.loadAnimationAsync(`/animations/${animation.index}`, animation).then((animationGroup) => {
                                    // Delete the animation group if it ended up not having any animations in it.
                                    if (animationGroup.targetedAnimations.length === 0) {
                                        animationGroup.dispose();
                                    }
                                }));
                            }
                            return Promise.all(promises).then(() => { });
                        }
                        /**
                         * Loads a glTF animation.
                         * @param context The context when loading the asset
                         * @param animation The glTF animation property
                         * @returns A promise that resolves with the loaded Babylon animation group when the load is complete
                         */
                        loadAnimationAsync(context, animation) {
                            const promise = this._extensionsLoadAnimationAsync(context, animation);
                            if (promise) {
                                return promise;
                            }
                            this._babylonScene._blockEntityCollection = !!this._assetContainer;
                            const babylonAnimationGroup = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.AnimationGroup(animation.name || `animation${animation.index}`, this._babylonScene);
                            babylonAnimationGroup._parentContainer = this._assetContainer;
                            this._babylonScene._blockEntityCollection = false;
                            animation._babylonAnimationGroup = babylonAnimationGroup;
                            const promises = new Array();
                            ArrayItem.Assign(animation.channels);
                            ArrayItem.Assign(animation.samplers);
                            for (const channel of animation.channels) {
                                promises.push(this._loadAnimationChannelAsync(`${context}/channels/${channel.index}`, context, animation, channel, babylonAnimationGroup));
                            }
                            return Promise.all(promises).then(() => {
                                babylonAnimationGroup.normalize(0);
                                return babylonAnimationGroup;
                            });
                        }
                        /**
                         * @hidden Loads a glTF animation channel.
                         * @param context The context when loading the asset
                         * @param animationContext The context of the animation when loading the asset
                         * @param animation The glTF animation property
                         * @param channel The glTF animation channel property
                         * @param babylonAnimationGroup The babylon animation group property
                         * @param animationTargetOverride The babylon animation channel target override property. My be null.
                         * @returns A void promise when the channel load is complete
                         */
                        _loadAnimationChannelAsync(context, animationContext, animation, channel, babylonAnimationGroup, animationTargetOverride = null) {
                            if (channel.target.node == undefined) {
                                return Promise.resolve();
                            }
                            const targetNode = ArrayItem.Get(`${context}/target/node`, this._gltf.nodes, channel.target.node);
                            // Ignore animations that have no animation targets.
                            if ((channel.target.path === "weights" /* WEIGHTS */ && !targetNode._numMorphTargets) ||
                                (channel.target.path !== "weights" /* WEIGHTS */ && !targetNode._babylonTransformNode)) {
                                return Promise.resolve();
                            }
                            const sampler = ArrayItem.Get(`${context}/sampler`, animation.samplers, channel.sampler);
                            return this._loadAnimationSamplerAsync(`${animationContext}/samplers/${channel.sampler}`, sampler).then((data) => {
                                let targetPath;
                                let animationType;
                                switch (channel.target.path) {
                                    case "translation" /* TRANSLATION */: {
                                        targetPath = "position";
                                        animationType = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_VECTOR3;
                                        break;
                                    }
                                    case "rotation" /* ROTATION */: {
                                        targetPath = "rotationQuaternion";
                                        animationType = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_QUATERNION;
                                        break;
                                    }
                                    case "scale" /* SCALE */: {
                                        targetPath = "scaling";
                                        animationType = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_VECTOR3;
                                        break;
                                    }
                                    case "weights" /* WEIGHTS */: {
                                        targetPath = "influence";
                                        animationType = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT;
                                        break;
                                    }
                                    default: {
                                        throw new Error(`${context}/target/path: Invalid value (${channel.target.path})`);
                                    }
                                }
                                let outputBufferOffset = 0;
                                let getNextOutputValue;
                                switch (targetPath) {
                                    case "position": {
                                        getNextOutputValue = (scale) => {
                                            const value = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(data.output, outputBufferOffset).scaleInPlace(scale);
                                            outputBufferOffset += 3;
                                            return value;
                                        };
                                        break;
                                    }
                                    case "rotationQuaternion": {
                                        getNextOutputValue = (scale) => {
                                            const value = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArray(data.output, outputBufferOffset).scaleInPlace(scale);
                                            outputBufferOffset += 4;
                                            return value;
                                        };
                                        break;
                                    }
                                    case "scaling": {
                                        getNextOutputValue = (scale) => {
                                            const value = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(data.output, outputBufferOffset).scaleInPlace(scale);
                                            outputBufferOffset += 3;
                                            return value;
                                        };
                                        break;
                                    }
                                    case "influence": {
                                        getNextOutputValue = (scale) => {
                                            const value = new Array(targetNode._numMorphTargets);
                                            for (let i = 0; i < targetNode._numMorphTargets; i++) {
                                                value[i] = data.output[outputBufferOffset++] * scale;
                                            }
                                            return value;
                                        };
                                        break;
                                    }
                                }
                                let getNextKey;
                                switch (data.interpolation) {
                                    case "STEP" /* STEP */: {
                                        getNextKey = (frameIndex) => ({
                                            frame: data.input[frameIndex] * this.parent.targetFps,
                                            value: getNextOutputValue(1),
                                            interpolation: core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.AnimationKeyInterpolation.STEP,
                                        });
                                        break;
                                    }
                                    case "LINEAR" /* LINEAR */: {
                                        getNextKey = (frameIndex) => ({
                                            frame: data.input[frameIndex] * this.parent.targetFps,
                                            value: getNextOutputValue(1),
                                        });
                                        break;
                                    }
                                    case "CUBICSPLINE" /* CUBICSPLINE */: {
                                        const invTargetFps = 1 / this.parent.targetFps;
                                        getNextKey = (frameIndex) => ({
                                            frame: data.input[frameIndex] * this.parent.targetFps,
                                            inTangent: getNextOutputValue(invTargetFps),
                                            value: getNextOutputValue(1),
                                            outTangent: getNextOutputValue(invTargetFps),
                                        });
                                        break;
                                    }
                                }
                                const keys = new Array(data.input.length);
                                for (let frameIndex = 0; frameIndex < data.input.length; frameIndex++) {
                                    keys[frameIndex] = getNextKey(frameIndex);
                                }
                                if (targetPath === "influence") {
                                    for (let targetIndex = 0; targetIndex < targetNode._numMorphTargets; targetIndex++) {
                                        const animationName = `${babylonAnimationGroup.name}_channel${babylonAnimationGroup.targetedAnimations.length}`;
                                        const babylonAnimation = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Animation(animationName, targetPath, this.parent.targetFps, animationType);
                                        babylonAnimation.setKeys(keys.map((key) => ({
                                            frame: key.frame,
                                            inTangent: key.inTangent ? key.inTangent[targetIndex] : undefined,
                                            value: key.value[targetIndex],
                                            outTangent: key.outTangent ? key.outTangent[targetIndex] : undefined,
                                        })));
                                        this._forEachPrimitive(targetNode, (babylonAbstractMesh) => {
                                            const babylonMesh = babylonAbstractMesh;
                                            const morphTarget = babylonMesh.morphTargetManager.getTarget(targetIndex);
                                            const babylonAnimationClone = babylonAnimation.clone();
                                            morphTarget.animations.push(babylonAnimationClone);
                                            babylonAnimationGroup.addTargetedAnimation(babylonAnimationClone, morphTarget);
                                        });
                                    }
                                }
                                else {
                                    const animationName = `${babylonAnimationGroup.name}_channel${babylonAnimationGroup.targetedAnimations.length}`;
                                    const babylonAnimation = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Animation(animationName, targetPath, this.parent.targetFps, animationType);
                                    babylonAnimation.setKeys(keys);
                                    if (animationTargetOverride != null && animationTargetOverride.animations != null) {
                                        animationTargetOverride.animations.push(babylonAnimation);
                                        babylonAnimationGroup.addTargetedAnimation(babylonAnimation, animationTargetOverride);
                                    }
                                    else {
                                        targetNode._babylonTransformNode.animations.push(babylonAnimation);
                                        babylonAnimationGroup.addTargetedAnimation(babylonAnimation, targetNode._babylonTransformNode);
                                    }
                                }
                            });
                        }
                        _loadAnimationSamplerAsync(context, sampler) {
                            if (sampler._data) {
                                return sampler._data;
                            }
                            const interpolation = sampler.interpolation || "LINEAR" /* LINEAR */;
                            switch (interpolation) {
                                case "STEP" /* STEP */:
                                case "LINEAR" /* LINEAR */:
                                case "CUBICSPLINE" /* CUBICSPLINE */: {
                                    break;
                                }
                                default: {
                                    throw new Error(`${context}/interpolation: Invalid value (${sampler.interpolation})`);
                                }
                            }
                            const inputAccessor = ArrayItem.Get(`${context}/input`, this._gltf.accessors, sampler.input);
                            const outputAccessor = ArrayItem.Get(`${context}/output`, this._gltf.accessors, sampler.output);
                            sampler._data = Promise.all([
                                this._loadFloatAccessorAsync(`/accessors/${inputAccessor.index}`, inputAccessor),
                                this._loadFloatAccessorAsync(`/accessors/${outputAccessor.index}`, outputAccessor),
                            ]).then(([inputData, outputData]) => {
                                return {
                                    input: inputData,
                                    interpolation: interpolation,
                                    output: outputData,
                                };
                            });
                            return sampler._data;
                        }
                        /**
                         * Loads a glTF buffer.
                         * @param context The context when loading the asset
                         * @param buffer The glTF buffer property
                         * @param byteOffset The byte offset to use
                         * @param byteLength The byte length to use
                         * @returns A promise that resolves with the loaded data when the load is complete
                         */
                        loadBufferAsync(context, buffer, byteOffset, byteLength) {
                            const extensionPromise = this._extensionsLoadBufferAsync(context, buffer, byteOffset, byteLength);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            if (!buffer._data) {
                                if (buffer.uri) {
                                    buffer._data = this.loadUriAsync(`${context}/uri`, buffer, buffer.uri);
                                }
                                else {
                                    if (!this._bin) {
                                        throw new Error(`${context}: Uri is missing or the binary glTF is missing its binary chunk`);
                                    }
                                    buffer._data = this._bin.readAsync(0, buffer.byteLength);
                                }
                            }
                            return buffer._data.then((data) => {
                                try {
                                    return new Uint8Array(data.buffer, data.byteOffset + byteOffset, byteLength);
                                }
                                catch (e) {
                                    throw new Error(`${context}: ${e.message}`);
                                }
                            });
                        }
                        /**
                         * Loads a glTF buffer view.
                         * @param context The context when loading the asset
                         * @param bufferView The glTF buffer view property
                         * @returns A promise that resolves with the loaded data when the load is complete
                         */
                        loadBufferViewAsync(context, bufferView) {
                            const extensionPromise = this._extensionsLoadBufferViewAsync(context, bufferView);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            if (bufferView._data) {
                                return bufferView._data;
                            }
                            const buffer = ArrayItem.Get(`${context}/buffer`, this._gltf.buffers, bufferView.buffer);
                            bufferView._data = this.loadBufferAsync(`/buffers/${buffer.index}`, buffer, bufferView.byteOffset || 0, bufferView.byteLength);
                            return bufferView._data;
                        }
                        _loadAccessorAsync(context, accessor, constructor) {
                            if (accessor._data) {
                                return accessor._data;
                            }
                            const numComponents = GLTFLoader._GetNumComponents(context, accessor.type);
                            const byteStride = numComponents * core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(accessor.componentType);
                            const length = numComponents * accessor.count;
                            if (accessor.bufferView == undefined) {
                                accessor._data = Promise.resolve(new constructor(length));
                            }
                            else {
                                const bufferView = ArrayItem.Get(`${context}/bufferView`, this._gltf.bufferViews, accessor.bufferView);
                                accessor._data = this.loadBufferViewAsync(`/bufferViews/${bufferView.index}`, bufferView).then((data) => {
                                    if (accessor.componentType === 5126 /* FLOAT */ && !accessor.normalized && (!bufferView.byteStride || bufferView.byteStride === byteStride)) {
                                        return GLTFLoader._GetTypedArray(context, accessor.componentType, data, accessor.byteOffset, length);
                                    }
                                    else {
                                        const typedArray = new constructor(length);
                                        core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ForEach(data, accessor.byteOffset || 0, bufferView.byteStride || byteStride, numComponents, accessor.componentType, typedArray.length, accessor.normalized || false, (value, index) => {
                                            typedArray[index] = value;
                                        });
                                        return typedArray;
                                    }
                                });
                            }
                            if (accessor.sparse) {
                                const sparse = accessor.sparse;
                                accessor._data = accessor._data.then((data) => {
                                    const typedArray = data;
                                    const indicesBufferView = ArrayItem.Get(`${context}/sparse/indices/bufferView`, this._gltf.bufferViews, sparse.indices.bufferView);
                                    const valuesBufferView = ArrayItem.Get(`${context}/sparse/values/bufferView`, this._gltf.bufferViews, sparse.values.bufferView);
                                    return Promise.all([
                                        this.loadBufferViewAsync(`/bufferViews/${indicesBufferView.index}`, indicesBufferView),
                                        this.loadBufferViewAsync(`/bufferViews/${valuesBufferView.index}`, valuesBufferView),
                                    ]).then(([indicesData, valuesData]) => {
                                        const indices = GLTFLoader._GetTypedArray(`${context}/sparse/indices`, sparse.indices.componentType, indicesData, sparse.indices.byteOffset, sparse.count);
                                        const sparseLength = numComponents * sparse.count;
                                        let values;
                                        if (accessor.componentType === 5126 /* FLOAT */ && !accessor.normalized) {
                                            values = GLTFLoader._GetTypedArray(`${context}/sparse/values`, accessor.componentType, valuesData, sparse.values.byteOffset, sparseLength);
                                        }
                                        else {
                                            const sparseData = GLTFLoader._GetTypedArray(`${context}/sparse/values`, accessor.componentType, valuesData, sparse.values.byteOffset, sparseLength);
                                            values = new constructor(sparseLength);
                                            core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ForEach(sparseData, 0, byteStride, numComponents, accessor.componentType, values.length, accessor.normalized || false, (value, index) => {
                                                values[index] = value;
                                            });
                                        }
                                        let valuesIndex = 0;
                                        for (let indicesIndex = 0; indicesIndex < indices.length; indicesIndex++) {
                                            let dataIndex = indices[indicesIndex] * numComponents;
                                            for (let componentIndex = 0; componentIndex < numComponents; componentIndex++) {
                                                typedArray[dataIndex++] = values[valuesIndex++];
                                            }
                                        }
                                        return typedArray;
                                    });
                                });
                            }
                            return accessor._data;
                        }
                        /**
                         * @param context
                         * @param accessor
                         * @hidden
                         */
                        _loadFloatAccessorAsync(context, accessor) {
                            return this._loadAccessorAsync(context, accessor, Float32Array);
                        }
                        _loadIndicesAccessorAsync(context, accessor) {
                            if (accessor.type !== "SCALAR" /* SCALAR */) {
                                throw new Error(`${context}/type: Invalid value ${accessor.type}`);
                            }
                            if (accessor.componentType !== 5121 /* UNSIGNED_BYTE */ &&
                                accessor.componentType !== 5123 /* UNSIGNED_SHORT */ &&
                                accessor.componentType !== 5125 /* UNSIGNED_INT */) {
                                throw new Error(`${context}/componentType: Invalid value ${accessor.componentType}`);
                            }
                            if (accessor._data) {
                                return accessor._data;
                            }
                            if (accessor.sparse) {
                                const constructor = GLTFLoader._GetTypedArrayConstructor(`${context}/componentType`, accessor.componentType);
                                accessor._data = this._loadAccessorAsync(context, accessor, constructor);
                            }
                            else {
                                const bufferView = ArrayItem.Get(`${context}/bufferView`, this._gltf.bufferViews, accessor.bufferView);
                                accessor._data = this.loadBufferViewAsync(`/bufferViews/${bufferView.index}`, bufferView).then((data) => {
                                    return GLTFLoader._GetTypedArray(context, accessor.componentType, data, accessor.byteOffset, accessor.count);
                                });
                            }
                            return accessor._data;
                        }
                        _loadVertexBufferViewAsync(bufferView, kind) {
                            if (bufferView._babylonBuffer) {
                                return bufferView._babylonBuffer;
                            }
                            bufferView._babylonBuffer = this.loadBufferViewAsync(`/bufferViews/${bufferView.index}`, bufferView).then((data) => {
                                return new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Buffer(this._babylonScene.getEngine(), data, false);
                            });
                            return bufferView._babylonBuffer;
                        }
                        _loadVertexAccessorAsync(context, accessor, kind) {
                            var _a;
                            if ((_a = accessor._babylonVertexBuffer) === null || _a === void 0 ? void 0 : _a[kind]) {
                                return accessor._babylonVertexBuffer[kind];
                            }
                            if (!accessor._babylonVertexBuffer) {
                                accessor._babylonVertexBuffer = {};
                            }
                            if (accessor.sparse) {
                                accessor._babylonVertexBuffer[kind] = this._loadFloatAccessorAsync(context, accessor).then((data) => {
                                    return new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer(this._babylonScene.getEngine(), data, kind, false);
                                });
                            }
                            // Load joint indices as a float array since the shaders expect float data but glTF uses unsigned byte/short.
                            // This prevents certain platforms (e.g. D3D) from having to convert the data to float on the fly.
                            else if (kind === core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesKind || kind === core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesExtraKind) {
                                accessor._babylonVertexBuffer[kind] = this._loadFloatAccessorAsync(context, accessor).then((data) => {
                                    return new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer(this._babylonScene.getEngine(), data, kind, false);
                                });
                            }
                            else {
                                const bufferView = ArrayItem.Get(`${context}/bufferView`, this._gltf.bufferViews, accessor.bufferView);
                                accessor._babylonVertexBuffer[kind] = this._loadVertexBufferViewAsync(bufferView, kind).then((babylonBuffer) => {
                                    const size = GLTFLoader._GetNumComponents(context, accessor.type);
                                    return new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer(this._babylonScene.getEngine(), babylonBuffer, kind, false, false, bufferView.byteStride, false, accessor.byteOffset, size, accessor.componentType, accessor.normalized, true, 1, true);
                                });
                            }
                            return accessor._babylonVertexBuffer[kind];
                        }
                        _loadMaterialMetallicRoughnessPropertiesAsync(context, properties, babylonMaterial) {
                            if (!(babylonMaterial instanceof core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            const promises = new Array();
                            if (properties) {
                                if (properties.baseColorFactor) {
                                    babylonMaterial.albedoColor = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.baseColorFactor);
                                    babylonMaterial.alpha = properties.baseColorFactor[3];
                                }
                                else {
                                    babylonMaterial.albedoColor = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
                                }
                                babylonMaterial.metallic = properties.metallicFactor == undefined ? 1 : properties.metallicFactor;
                                babylonMaterial.roughness = properties.roughnessFactor == undefined ? 1 : properties.roughnessFactor;
                                if (properties.baseColorTexture) {
                                    promises.push(this.loadTextureInfoAsync(`${context}/baseColorTexture`, properties.baseColorTexture, (texture) => {
                                        texture.name = `${babylonMaterial.name} (Base Color)`;
                                        babylonMaterial.albedoTexture = texture;
                                    }));
                                }
                                if (properties.metallicRoughnessTexture) {
                                    properties.metallicRoughnessTexture.nonColorData = true;
                                    promises.push(this.loadTextureInfoAsync(`${context}/metallicRoughnessTexture`, properties.metallicRoughnessTexture, (texture) => {
                                        texture.name = `${babylonMaterial.name} (Metallic Roughness)`;
                                        babylonMaterial.metallicTexture = texture;
                                    }));
                                    babylonMaterial.useMetallnessFromMetallicTextureBlue = true;
                                    babylonMaterial.useRoughnessFromMetallicTextureGreen = true;
                                    babylonMaterial.useRoughnessFromMetallicTextureAlpha = false;
                                }
                            }
                            return Promise.all(promises).then(() => { });
                        }
                        /**
                         * @param context
                         * @param material
                         * @param babylonMesh
                         * @param babylonDrawMode
                         * @param assign
                         * @hidden
                         */
                        _loadMaterialAsync(context, material, babylonMesh, babylonDrawMode, assign = () => { }) {
                            const extensionPromise = this._extensionsLoadMaterialAsync(context, material, babylonMesh, babylonDrawMode, assign);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            material._data = material._data || {};
                            let babylonData = material._data[babylonDrawMode];
                            if (!babylonData) {
                                this.logOpen(`${context} ${material.name || ""}`);
                                const babylonMaterial = this.createMaterial(context, material, babylonDrawMode);
                                babylonData = {
                                    babylonMaterial: babylonMaterial,
                                    babylonMeshes: [],
                                    promise: this.loadMaterialPropertiesAsync(context, material, babylonMaterial),
                                };
                                material._data[babylonDrawMode] = babylonData;
                                GLTFLoader.AddPointerMetadata(babylonMaterial, context);
                                this._parent.onMaterialLoadedObservable.notifyObservers(babylonMaterial);
                                this.logClose();
                            }
                            if (babylonMesh) {
                                babylonData.babylonMeshes.push(babylonMesh);
                                babylonMesh.onDisposeObservable.addOnce(() => {
                                    const index = babylonData.babylonMeshes.indexOf(babylonMesh);
                                    if (index !== -1) {
                                        babylonData.babylonMeshes.splice(index, 1);
                                    }
                                });
                            }
                            assign(babylonData.babylonMaterial);
                            return babylonData.promise.then(() => {
                                return babylonData.babylonMaterial;
                            });
                        }
                        _createDefaultMaterial(name, babylonDrawMode) {
                            this._babylonScene._blockEntityCollection = !!this._assetContainer;
                            const babylonMaterial = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial(name, this._babylonScene);
                            babylonMaterial._parentContainer = this._assetContainer;
                            this._babylonScene._blockEntityCollection = false;
                            // Moved to mesh so user can change materials on gltf meshes: babylonMaterial.sideOrientation = this._babylonScene.useRightHandedSystem ? Material.CounterClockWiseSideOrientation : Material.ClockWiseSideOrientation;
                            babylonMaterial.fillMode = babylonDrawMode;
                            babylonMaterial.enableSpecularAntiAliasing = true;
                            babylonMaterial.useRadianceOverAlpha = !this._parent.transparencyAsCoverage;
                            babylonMaterial.useSpecularOverAlpha = !this._parent.transparencyAsCoverage;
                            babylonMaterial.transparencyMode = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial.PBRMATERIAL_OPAQUE;
                            babylonMaterial.metallic = 1;
                            babylonMaterial.roughness = 1;
                            return babylonMaterial;
                        }
                        /**
                         * Creates a Babylon material from a glTF material.
                         * @param context The context when loading the asset
                         * @param material The glTF material property
                         * @param babylonDrawMode The draw mode for the Babylon material
                         * @returns The Babylon material
                         */
                        createMaterial(context, material, babylonDrawMode) {
                            const extensionPromise = this._extensionsCreateMaterial(context, material, babylonDrawMode);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            const name = material.name || `material${material.index}`;
                            const babylonMaterial = this._createDefaultMaterial(name, babylonDrawMode);
                            return babylonMaterial;
                        }
                        /**
                         * Loads properties from a glTF material into a Babylon material.
                         * @param context The context when loading the asset
                         * @param material The glTF material property
                         * @param babylonMaterial The Babylon material
                         * @returns A promise that resolves when the load is complete
                         */
                        loadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            const extensionPromise = this._extensionsLoadMaterialPropertiesAsync(context, material, babylonMaterial);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            const promises = new Array();
                            promises.push(this.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
                            if (material.pbrMetallicRoughness) {
                                promises.push(this._loadMaterialMetallicRoughnessPropertiesAsync(`${context}/pbrMetallicRoughness`, material.pbrMetallicRoughness, babylonMaterial));
                            }
                            this.loadMaterialAlphaProperties(context, material, babylonMaterial);
                            return Promise.all(promises).then(() => { });
                        }
                        /**
                         * Loads the normal, occlusion, and emissive properties from a glTF material into a Babylon material.
                         * @param context The context when loading the asset
                         * @param material The glTF material property
                         * @param babylonMaterial The Babylon material
                         * @returns A promise that resolves when the load is complete
                         */
                        loadMaterialBasePropertiesAsync(context, material, babylonMaterial) {
                            if (!(babylonMaterial instanceof core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            const promises = new Array();
                            babylonMaterial.emissiveColor = material.emissiveFactor ? core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(material.emissiveFactor) : new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Color3(0, 0, 0);
                            if (material.doubleSided) {
                                babylonMaterial.backFaceCulling = false;
                                babylonMaterial.twoSidedLighting = true;
                            }
                            if (material.normalTexture) {
                                material.normalTexture.nonColorData = true;
                                promises.push(this.loadTextureInfoAsync(`${context}/normalTexture`, material.normalTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (Normal)`;
                                    babylonMaterial.bumpTexture = texture;
                                }));
                                babylonMaterial.invertNormalMapX = !this._babylonScene.useRightHandedSystem;
                                babylonMaterial.invertNormalMapY = this._babylonScene.useRightHandedSystem;
                                if (material.normalTexture.scale != undefined) {
                                    babylonMaterial.bumpTexture.level = material.normalTexture.scale;
                                }
                                babylonMaterial.forceIrradianceInFragment = true;
                            }
                            if (material.occlusionTexture) {
                                material.occlusionTexture.nonColorData = true;
                                promises.push(this.loadTextureInfoAsync(`${context}/occlusionTexture`, material.occlusionTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (Occlusion)`;
                                    babylonMaterial.ambientTexture = texture;
                                }));
                                babylonMaterial.useAmbientInGrayScale = true;
                                if (material.occlusionTexture.strength != undefined) {
                                    babylonMaterial.ambientTextureStrength = material.occlusionTexture.strength;
                                }
                            }
                            if (material.emissiveTexture) {
                                promises.push(this.loadTextureInfoAsync(`${context}/emissiveTexture`, material.emissiveTexture, (texture) => {
                                    texture.name = `${babylonMaterial.name} (Emissive)`;
                                    babylonMaterial.emissiveTexture = texture;
                                }));
                            }
                            return Promise.all(promises).then(() => { });
                        }
                        /**
                         * Loads the alpha properties from a glTF material into a Babylon material.
                         * Must be called after the setting the albedo texture of the Babylon material when the material has an albedo texture.
                         * @param context The context when loading the asset
                         * @param material The glTF material property
                         * @param babylonMaterial The Babylon material
                         */
                        loadMaterialAlphaProperties(context, material, babylonMaterial) {
                            if (!(babylonMaterial instanceof core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                                throw new Error(`${context}: Material type not supported`);
                            }
                            const alphaMode = material.alphaMode || "OPAQUE" /* OPAQUE */;
                            switch (alphaMode) {
                                case "OPAQUE" /* OPAQUE */: {
                                    babylonMaterial.transparencyMode = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial.PBRMATERIAL_OPAQUE;
                                    break;
                                }
                                case "MASK" /* MASK */: {
                                    babylonMaterial.transparencyMode = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial.PBRMATERIAL_ALPHATEST;
                                    babylonMaterial.alphaCutOff = material.alphaCutoff == undefined ? 0.5 : material.alphaCutoff;
                                    if (babylonMaterial.albedoTexture) {
                                        babylonMaterial.albedoTexture.hasAlpha = true;
                                    }
                                    break;
                                }
                                case "BLEND" /* BLEND */: {
                                    babylonMaterial.transparencyMode = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial.PBRMATERIAL_ALPHABLEND;
                                    if (babylonMaterial.albedoTexture) {
                                        babylonMaterial.albedoTexture.hasAlpha = true;
                                        babylonMaterial.useAlphaFromAlbedoTexture = true;
                                    }
                                    break;
                                }
                                default: {
                                    throw new Error(`${context}/alphaMode: Invalid value (${material.alphaMode})`);
                                }
                            }
                        }
                        /**
                         * Loads a glTF texture info.
                         * @param context The context when loading the asset
                         * @param textureInfo The glTF texture info property
                         * @param assign A function called synchronously after parsing the glTF properties
                         * @returns A promise that resolves with the loaded Babylon texture when the load is complete
                         */
                        loadTextureInfoAsync(context, textureInfo, assign = () => { }) {
                            const extensionPromise = this._extensionsLoadTextureInfoAsync(context, textureInfo, assign);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            this.logOpen(`${context}`);
                            if (textureInfo.texCoord >= 6) {
                                throw new Error(`${context}/texCoord: Invalid value (${textureInfo.texCoord})`);
                            }
                            const texture = ArrayItem.Get(`${context}/index`, this._gltf.textures, textureInfo.index);
                            texture._textureInfo = textureInfo;
                            const promise = this._loadTextureAsync(`/textures/${textureInfo.index}`, texture, (babylonTexture) => {
                                babylonTexture.coordinatesIndex = textureInfo.texCoord || 0;
                                GLTFLoader.AddPointerMetadata(babylonTexture, context);
                                this._parent.onTextureLoadedObservable.notifyObservers(babylonTexture);
                                assign(babylonTexture);
                            });
                            this.logClose();
                            return promise;
                        }
                        /**
                         * @param context
                         * @param texture
                         * @param assign
                         * @hidden
                         */
                        _loadTextureAsync(context, texture, assign = () => { }) {
                            const extensionPromise = this._extensionsLoadTextureAsync(context, texture, assign);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            this.logOpen(`${context} ${texture.name || ""}`);
                            const sampler = texture.sampler == undefined ? GLTFLoader.DefaultSampler : ArrayItem.Get(`${context}/sampler`, this._gltf.samplers, texture.sampler);
                            const image = ArrayItem.Get(`${context}/source`, this._gltf.images, texture.source);
                            const promise = this._createTextureAsync(context, sampler, image, assign, undefined, !texture._textureInfo.nonColorData);
                            this.logClose();
                            return promise;
                        }
                        /**
                         * @param context
                         * @param sampler
                         * @param image
                         * @param assign
                         * @param textureLoaderOptions
                         * @param useSRGBBuffer
                         * @hidden
                         */
                        _createTextureAsync(context, sampler, image, assign = () => { }, textureLoaderOptions, useSRGBBuffer) {
                            const samplerData = this._loadSampler(`/samplers/${sampler.index}`, sampler);
                            const promises = new Array();
                            const deferred = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Deferred();
                            this._babylonScene._blockEntityCollection = !!this._assetContainer;
                            const textureCreationOptions = {
                                noMipmap: samplerData.noMipMaps,
                                invertY: false,
                                samplingMode: samplerData.samplingMode,
                                onLoad: () => {
                                    if (!this._disposed) {
                                        deferred.resolve();
                                    }
                                },
                                onError: (message, exception) => {
                                    if (!this._disposed) {
                                        deferred.reject(new Error(`${context}: ${exception && exception.message ? exception.message : message || "Failed to load texture"}`));
                                    }
                                },
                                mimeType: image.mimeType,
                                loaderOptions: textureLoaderOptions,
                                useSRGBBuffer: !!useSRGBBuffer && this._parent.useSRGBBuffers,
                            };
                            const babylonTexture = new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture(null, this._babylonScene, textureCreationOptions);
                            babylonTexture._parentContainer = this._assetContainer;
                            this._babylonScene._blockEntityCollection = false;
                            promises.push(deferred.promise);
                            promises.push(this.loadImageAsync(`/images/${image.index}`, image).then((data) => {
                                const name = image.uri || `${this._fileName}#image${image.index}`;
                                const dataUrl = `data:${this._uniqueRootUrl}${name}`;
                                babylonTexture.updateURL(dataUrl, data);
                            }));
                            babylonTexture.wrapU = samplerData.wrapU;
                            babylonTexture.wrapV = samplerData.wrapV;
                            assign(babylonTexture);
                            return Promise.all(promises).then(() => {
                                return babylonTexture;
                            });
                        }
                        _loadSampler(context, sampler) {
                            if (!sampler._data) {
                                sampler._data = {
                                    noMipMaps: sampler.minFilter === 9728 /* NEAREST */ || sampler.minFilter === 9729 /* LINEAR */,
                                    samplingMode: GLTFLoader._GetTextureSamplingMode(context, sampler),
                                    wrapU: GLTFLoader._GetTextureWrapMode(`${context}/wrapS`, sampler.wrapS),
                                    wrapV: GLTFLoader._GetTextureWrapMode(`${context}/wrapT`, sampler.wrapT),
                                };
                            }
                            return sampler._data;
                        }
                        /**
                         * Loads a glTF image.
                         * @param context The context when loading the asset
                         * @param image The glTF image property
                         * @returns A promise that resolves with the loaded data when the load is complete
                         */
                        loadImageAsync(context, image) {
                            if (!image._data) {
                                this.logOpen(`${context} ${image.name || ""}`);
                                if (image.uri) {
                                    image._data = this.loadUriAsync(`${context}/uri`, image, image.uri);
                                }
                                else {
                                    const bufferView = ArrayItem.Get(`${context}/bufferView`, this._gltf.bufferViews, image.bufferView);
                                    image._data = this.loadBufferViewAsync(`/bufferViews/${bufferView.index}`, bufferView);
                                }
                                this.logClose();
                            }
                            return image._data;
                        }
                        /**
                         * Loads a glTF uri.
                         * @param context The context when loading the asset
                         * @param property The glTF property associated with the uri
                         * @param uri The base64 or relative uri
                         * @returns A promise that resolves with the loaded data when the load is complete
                         */
                        loadUriAsync(context, property, uri) {
                            const extensionPromise = this._extensionsLoadUriAsync(context, property, uri);
                            if (extensionPromise) {
                                return extensionPromise;
                            }
                            if (!GLTFLoader._ValidateUri(uri)) {
                                throw new Error(`${context}: '${uri}' is invalid`);
                            }
                            if ((0, core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.IsBase64DataUrl)(uri)) {
                                const data = new Uint8Array((0, core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.DecodeBase64UrlToBinary)(uri));
                                this.log(`${context}: Decoded ${uri.substr(0, 64)}... (${data.length} bytes)`);
                                return Promise.resolve(data);
                            }
                            this.log(`${context}: Loading ${uri}`);
                            return this._parent.preprocessUrlAsync(this._rootUrl + uri).then((url) => {
                                return new Promise((resolve, reject) => {
                                    this._parent._loadFile(this._babylonScene, url, (data) => {
                                        if (!this._disposed) {
                                            this.log(`${context}: Loaded ${uri} (${data.byteLength} bytes)`);
                                            resolve(new Uint8Array(data));
                                        }
                                    }, true, (request) => {
                                        reject(new core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.LoadFileError(`${context}: Failed to load '${uri}'${request ? ": " + request.status + " " + request.statusText : ""}`, request));
                                    });
                                });
                            });
                        }
                        /**
                         * Adds a JSON pointer to the metadata of the Babylon object at `<object>.metadata.gltf.pointers`.
                         * @param babylonObject the Babylon object with metadata
                         * @param babylonObject.metadata
                         * @param pointer the JSON pointer
                         */
                        static AddPointerMetadata(babylonObject, pointer) {
                            const metadata = (babylonObject.metadata = babylonObject.metadata || {});
                            const gltf = (metadata.gltf = metadata.gltf || {});
                            const pointers = (gltf.pointers = gltf.pointers || []);
                            pointers.push(pointer);
                        }
                        static _GetTextureWrapMode(context, mode) {
                            // Set defaults if undefined
                            mode = mode == undefined ? 10497 /* REPEAT */ : mode;
                            switch (mode) {
                                case 33071 /* CLAMP_TO_EDGE */:
                                    return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE;
                                case 33648 /* MIRRORED_REPEAT */:
                                    return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.MIRROR_ADDRESSMODE;
                                case 10497 /* REPEAT */:
                                    return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.WRAP_ADDRESSMODE;
                                default:
                                    core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(`${context}: Invalid value (${mode})`);
                                    return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.WRAP_ADDRESSMODE;
                            }
                        }
                        static _GetTextureSamplingMode(context, sampler) {
                            // Set defaults if undefined
                            const magFilter = sampler.magFilter == undefined ? 9729 /* LINEAR */ : sampler.magFilter;
                            const minFilter = sampler.minFilter == undefined ? 9987 /* LINEAR_MIPMAP_LINEAR */ : sampler.minFilter;
                            if (magFilter === 9729 /* LINEAR */) {
                                switch (minFilter) {
                                    case 9728 /* NEAREST */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST;
                                    case 9729 /* LINEAR */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR;
                                    case 9984 /* NEAREST_MIPMAP_NEAREST */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST_MIPNEAREST;
                                    case 9985 /* LINEAR_MIPMAP_NEAREST */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR_MIPNEAREST;
                                    case 9986 /* NEAREST_MIPMAP_LINEAR */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST_MIPLINEAR;
                                    case 9987 /* LINEAR_MIPMAP_LINEAR */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR_MIPLINEAR;
                                    default:
                                        core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(`${context}/minFilter: Invalid value (${minFilter})`);
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR_MIPLINEAR;
                                }
                            }
                            else {
                                if (magFilter !== 9728 /* NEAREST */) {
                                    core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(`${context}/magFilter: Invalid value (${magFilter})`);
                                }
                                switch (minFilter) {
                                    case 9728 /* NEAREST */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST;
                                    case 9729 /* LINEAR */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR;
                                    case 9984 /* NEAREST_MIPMAP_NEAREST */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST_MIPNEAREST;
                                    case 9985 /* LINEAR_MIPMAP_NEAREST */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR_MIPNEAREST;
                                    case 9986 /* NEAREST_MIPMAP_LINEAR */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST_MIPLINEAR;
                                    case 9987 /* LINEAR_MIPMAP_LINEAR */:
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR_MIPLINEAR;
                                    default:
                                        core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(`${context}/minFilter: Invalid value (${minFilter})`);
                                        return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST_MIPNEAREST;
                                }
                            }
                        }
                        static _GetTypedArrayConstructor(context, componentType) {
                            switch (componentType) {
                                case 5120 /* BYTE */:
                                    return Int8Array;
                                case 5121 /* UNSIGNED_BYTE */:
                                    return Uint8Array;
                                case 5122 /* SHORT */:
                                    return Int16Array;
                                case 5123 /* UNSIGNED_SHORT */:
                                    return Uint16Array;
                                case 5125 /* UNSIGNED_INT */:
                                    return Uint32Array;
                                case 5126 /* FLOAT */:
                                    return Float32Array;
                                default:
                                    throw new Error(`${context}: Invalid component type ${componentType}`);
                            }
                        }
                        static _GetTypedArray(context, componentType, bufferView, byteOffset, length) {
                            const buffer = bufferView.buffer;
                            byteOffset = bufferView.byteOffset + (byteOffset || 0);
                            const constructor = GLTFLoader._GetTypedArrayConstructor(`${context}/componentType`, componentType);
                            const componentTypeLength = core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(componentType);
                            if (byteOffset % componentTypeLength !== 0) {
                                // HACK: Copy the buffer if byte offset is not a multiple of component type byte length.
                                core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(`${context}: Copying buffer as byte offset (${byteOffset}) is not a multiple of component type byte length (${componentTypeLength})`);
                                return new constructor(buffer.slice(byteOffset, byteOffset + length * componentTypeLength), 0);
                            }
                            return new constructor(buffer, byteOffset, length);
                        }
                        static _GetNumComponents(context, type) {
                            switch (type) {
                                case "SCALAR":
                                    return 1;
                                case "VEC2":
                                    return 2;
                                case "VEC3":
                                    return 3;
                                case "VEC4":
                                    return 4;
                                case "MAT2":
                                    return 4;
                                case "MAT3":
                                    return 9;
                                case "MAT4":
                                    return 16;
                            }
                            throw new Error(`${context}: Invalid type (${type})`);
                        }
                        static _ValidateUri(uri) {
                            return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Tools.IsBase64(uri) || uri.indexOf("..") === -1;
                        }
                        /**
                         * @param context
                         * @param mode
                         * @hidden
                         */
                        static _GetDrawMode(context, mode) {
                            if (mode == undefined) {
                                mode = 4 /* TRIANGLES */;
                            }
                            switch (mode) {
                                case 0 /* POINTS */:
                                    return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.PointListDrawMode;
                                case 1 /* LINES */:
                                    return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.LineListDrawMode;
                                case 2 /* LINE_LOOP */:
                                    return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.LineLoopDrawMode;
                                case 3 /* LINE_STRIP */:
                                    return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.LineStripDrawMode;
                                case 4 /* TRIANGLES */:
                                    return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode;
                                case 5 /* TRIANGLE_STRIP */:
                                    return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleStripDrawMode;
                                case 6 /* TRIANGLE_FAN */:
                                    return core_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFanDrawMode;
                            }
                            throw new Error(`${context}: Invalid mesh primitive mode (${mode})`);
                        }
                        _compileMaterialsAsync() {
                            this._parent._startPerformanceCounter("Compile materials");
                            const promises = new Array();
                            if (this._gltf.materials) {
                                for (const material of this._gltf.materials) {
                                    if (material._data) {
                                        for (const babylonDrawMode in material._data) {
                                            const babylonData = material._data[babylonDrawMode];
                                            for (const babylonMesh of babylonData.babylonMeshes) {
                                                // Ensure nonUniformScaling is set if necessary.
                                                babylonMesh.computeWorldMatrix(true);
                                                const babylonMaterial = babylonData.babylonMaterial;
                                                promises.push(babylonMaterial.forceCompilationAsync(babylonMesh));
                                                promises.push(babylonMaterial.forceCompilationAsync(babylonMesh, { useInstances: true }));
                                                if (this._parent.useClipPlane) {
                                                    promises.push(babylonMaterial.forceCompilationAsync(babylonMesh, { clipPlane: true }));
                                                    promises.push(babylonMaterial.forceCompilationAsync(babylonMesh, { clipPlane: true, useInstances: true }));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return Promise.all(promises).then(() => {
                                this._parent._endPerformanceCounter("Compile materials");
                            });
                        }
                        _compileShadowGeneratorsAsync() {
                            this._parent._startPerformanceCounter("Compile shadow generators");
                            const promises = new Array();
                            const lights = this._babylonScene.lights;
                            for (const light of lights) {
                                const generator = light.getShadowGenerator();
                                if (generator) {
                                    promises.push(generator.forceCompilationAsync());
                                }
                            }
                            return Promise.all(promises).then(() => {
                                this._parent._endPerformanceCounter("Compile shadow generators");
                            });
                        }
                        _forEachExtensions(action) {
                            for (const extension of this._extensions) {
                                if (extension.enabled) {
                                    action(extension);
                                }
                            }
                        }
                        _applyExtensions(property, functionName, actionAsync) {
                            for (const extension of this._extensions) {
                                if (extension.enabled) {
                                    const id = `${extension.name}.${functionName}`;
                                    const loaderProperty = property;
                                    loaderProperty._activeLoaderExtensionFunctions = loaderProperty._activeLoaderExtensionFunctions || {};
                                    const activeLoaderExtensionFunctions = loaderProperty._activeLoaderExtensionFunctions;
                                    if (!activeLoaderExtensionFunctions[id]) {
                                        activeLoaderExtensionFunctions[id] = true;
                                        try {
                                            const result = actionAsync(extension);
                                            if (result) {
                                                return result;
                                            }
                                        }
                                        finally {
                                            delete activeLoaderExtensionFunctions[id];
                                        }
                                    }
                                }
                            }
                            return null;
                        }
                        _extensionsOnLoading() {
                            this._forEachExtensions((extension) => extension.onLoading && extension.onLoading());
                        }
                        _extensionsOnReady() {
                            this._forEachExtensions((extension) => extension.onReady && extension.onReady());
                        }
                        _extensionsLoadSceneAsync(context, scene) {
                            return this._applyExtensions(scene, "loadScene", (extension) => extension.loadSceneAsync && extension.loadSceneAsync(context, scene));
                        }
                        _extensionsLoadNodeAsync(context, node, assign) {
                            return this._applyExtensions(node, "loadNode", (extension) => extension.loadNodeAsync && extension.loadNodeAsync(context, node, assign));
                        }
                        _extensionsLoadCameraAsync(context, camera, assign) {
                            return this._applyExtensions(camera, "loadCamera", (extension) => extension.loadCameraAsync && extension.loadCameraAsync(context, camera, assign));
                        }
                        _extensionsLoadVertexDataAsync(context, primitive, babylonMesh) {
                            return this._applyExtensions(primitive, "loadVertexData", (extension) => extension._loadVertexDataAsync && extension._loadVertexDataAsync(context, primitive, babylonMesh));
                        }
                        _extensionsLoadMeshPrimitiveAsync(context, name, node, mesh, primitive, assign) {
                            return this._applyExtensions(primitive, "loadMeshPrimitive", (extension) => extension._loadMeshPrimitiveAsync && extension._loadMeshPrimitiveAsync(context, name, node, mesh, primitive, assign));
                        }
                        _extensionsLoadMaterialAsync(context, material, babylonMesh, babylonDrawMode, assign) {
                            return this._applyExtensions(material, "loadMaterial", (extension) => extension._loadMaterialAsync && extension._loadMaterialAsync(context, material, babylonMesh, babylonDrawMode, assign));
                        }
                        _extensionsCreateMaterial(context, material, babylonDrawMode) {
                            return this._applyExtensions(material, "createMaterial", (extension) => extension.createMaterial && extension.createMaterial(context, material, babylonDrawMode));
                        }
                        _extensionsLoadMaterialPropertiesAsync(context, material, babylonMaterial) {
                            return this._applyExtensions(material, "loadMaterialProperties", (extension) => extension.loadMaterialPropertiesAsync && extension.loadMaterialPropertiesAsync(context, material, babylonMaterial));
                        }
                        _extensionsLoadTextureInfoAsync(context, textureInfo, assign) {
                            return this._applyExtensions(textureInfo, "loadTextureInfo", (extension) => extension.loadTextureInfoAsync && extension.loadTextureInfoAsync(context, textureInfo, assign));
                        }
                        _extensionsLoadTextureAsync(context, texture, assign) {
                            return this._applyExtensions(texture, "loadTexture", (extension) => extension._loadTextureAsync && extension._loadTextureAsync(context, texture, assign));
                        }
                        _extensionsLoadAnimationAsync(context, animation) {
                            return this._applyExtensions(animation, "loadAnimation", (extension) => extension.loadAnimationAsync && extension.loadAnimationAsync(context, animation));
                        }
                        _extensionsLoadSkinAsync(context, node, skin) {
                            return this._applyExtensions(skin, "loadSkin", (extension) => extension._loadSkinAsync && extension._loadSkinAsync(context, node, skin));
                        }
                        _extensionsLoadUriAsync(context, property, uri) {
                            return this._applyExtensions(property, "loadUri", (extension) => extension._loadUriAsync && extension._loadUriAsync(context, property, uri));
                        }
                        _extensionsLoadBufferViewAsync(context, bufferView) {
                            return this._applyExtensions(bufferView, "loadBufferView", (extension) => extension.loadBufferViewAsync && extension.loadBufferViewAsync(context, bufferView));
                        }
                        _extensionsLoadBufferAsync(context, buffer, byteOffset, byteLength) {
                            return this._applyExtensions(buffer, "loadBuffer", (extension) => extension.loadBufferAsync && extension.loadBufferAsync(context, buffer, byteOffset, byteLength));
                        }
                        /**
                         * Helper method called by a loader extension to load an glTF extension.
                         * @param context The context when loading the asset
                         * @param property The glTF property to load the extension from
                         * @param extensionName The name of the extension to load
                         * @param actionAsync The action to run
                         * @returns The promise returned by actionAsync or null if the extension does not exist
                         */
                        static LoadExtensionAsync(context, property, extensionName, actionAsync) {
                            if (!property.extensions) {
                                return null;
                            }
                            const extensions = property.extensions;
                            const extension = extensions[extensionName];
                            if (!extension) {
                                return null;
                            }
                            return actionAsync(`${context}/extensions/${extensionName}`, extension);
                        }
                        /**
                         * Helper method called by a loader extension to load a glTF extra.
                         * @param context The context when loading the asset
                         * @param property The glTF property to load the extra from
                         * @param extensionName The name of the extension to load
                         * @param actionAsync The action to run
                         * @returns The promise returned by actionAsync or null if the extra does not exist
                         */
                        static LoadExtraAsync(context, property, extensionName, actionAsync) {
                            if (!property.extras) {
                                return null;
                            }
                            const extras = property.extras;
                            const extra = extras[extensionName];
                            if (!extra) {
                                return null;
                            }
                            return actionAsync(`${context}/extras/${extensionName}`, extra);
                        }
                        /**
                         * Checks for presence of an extension.
                         * @param name The name of the extension to check
                         * @returns A boolean indicating the presence of the given extension name in `extensionsUsed`
                         */
                        isExtensionUsed(name) {
                            return !!this._gltf.extensionsUsed && this._gltf.extensionsUsed.indexOf(name) !== -1;
                        }
                        /**
                         * Increments the indentation level and logs a message.
                         * @param message The message to log
                         */
                        logOpen(message) {
                            this._parent._logOpen(message);
                        }
                        /**
                         * Decrements the indentation level.
                         */
                        logClose() {
                            this._parent._logClose();
                        }
                        /**
                         * Logs a message
                         * @param message The message to log
                         */
                        log(message) {
                            this._parent._log(message);
                        }
                        /**
                         * Starts a performance counter.
                         * @param counterName The name of the performance counter
                         */
                        startPerformanceCounter(counterName) {
                            this._parent._startPerformanceCounter(counterName);
                        }
                        /**
                         * Ends a performance counter.
                         * @param counterName The name of the performance counter
                         */
                        endPerformanceCounter(counterName) {
                            this._parent._endPerformanceCounter(counterName);
                        }
                    }
                    GLTFLoader._RegisteredExtensions = {};
                    /**
                     * The default glTF sampler.
                     */
                    GLTFLoader.DefaultSampler = { index: -1 };
                    _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFFileLoader._CreateGLTF2Loader = (parent) => new GLTFLoader(parent);


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/glTFLoaderExtension.js":
/*!*****************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/glTFLoaderExtension.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);



                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/glTFLoaderInterfaces.js":
/*!******************************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/glTFLoaderInterfaces.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);



                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/2.0/index.js":
/*!***************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/2.0/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrayItem": () => (/* reexport safe */ _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem),
/* harmony export */   "EXT_lights_image_based": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.EXT_lights_image_based),
/* harmony export */   "EXT_mesh_gpu_instancing": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.EXT_mesh_gpu_instancing),
/* harmony export */   "EXT_meshopt_compression": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.EXT_meshopt_compression),
/* harmony export */   "EXT_texture_webp": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.EXT_texture_webp),
/* harmony export */   "ExtrasAsMetadata": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.ExtrasAsMetadata),
/* harmony export */   "GLTFLoader": () => (/* reexport safe */ _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader),
/* harmony export */   "KHR_draco_mesh_compression": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_draco_mesh_compression),
/* harmony export */   "KHR_lights": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_lights),
/* harmony export */   "KHR_materials_clearcoat": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_clearcoat),
/* harmony export */   "KHR_materials_emissive_strength": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_emissive_strength),
/* harmony export */   "KHR_materials_ior": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_ior),
/* harmony export */   "KHR_materials_pbrSpecularGlossiness": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_pbrSpecularGlossiness),
/* harmony export */   "KHR_materials_sheen": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_sheen),
/* harmony export */   "KHR_materials_specular": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_specular),
/* harmony export */   "KHR_materials_translucency": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_translucency),
/* harmony export */   "KHR_materials_transmission": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_transmission),
/* harmony export */   "KHR_materials_unlit": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_unlit),
/* harmony export */   "KHR_materials_variants": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_variants),
/* harmony export */   "KHR_materials_volume": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_volume),
/* harmony export */   "KHR_mesh_quantization": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_mesh_quantization),
/* harmony export */   "KHR_texture_basisu": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_texture_basisu),
/* harmony export */   "KHR_texture_transform": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_texture_transform),
/* harmony export */   "KHR_xmp_json_ld": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_xmp_json_ld),
/* harmony export */   "MSFT_audio_emitter": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.MSFT_audio_emitter),
/* harmony export */   "MSFT_lod": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.MSFT_lod),
/* harmony export */   "MSFT_minecraftMesh": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.MSFT_minecraftMesh),
/* harmony export */   "MSFT_sRGBFactors": () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.MSFT_sRGBFactors)
                        /* harmony export */
});
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFLoader */ "../../../lts/loaders/dist/glTF/2.0/glTFLoader.js");
/* harmony import */ var _glTFLoaderExtension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFLoaderExtension */ "../../../lts/loaders/dist/glTF/2.0/glTFLoaderExtension.js");
/* harmony import */ var _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFLoaderInterfaces */ "../../../lts/loaders/dist/glTF/2.0/glTFLoaderInterfaces.js");
/* harmony import */ var _Extensions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Extensions/index */ "../../../lts/loaders/dist/glTF/2.0/Extensions/index.js");






                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/glTFFileLoader.js":
/*!********************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/glTFFileLoader.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTFFileLoader": () => (/* binding */ GLTFFileLoader),
/* harmony export */   "GLTFLoaderAnimationStartMode": () => (/* binding */ GLTFLoaderAnimationStartMode),
/* harmony export */   "GLTFLoaderCoordinateSystemMode": () => (/* binding */ GLTFLoaderCoordinateSystemMode),
/* harmony export */   "GLTFLoaderState": () => (/* binding */ GLTFLoaderState)
                        /* harmony export */
});
/* harmony import */ var core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Misc/error */ "core/Misc/observable");
/* harmony import */ var core_Misc_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFValidation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFValidation */ "../../../lts/loaders/dist/glTF/glTFValidation.js");










                    function readAsync(arrayBuffer, byteOffset, byteLength) {
                        try {
                            return Promise.resolve(new Uint8Array(arrayBuffer, byteOffset, byteLength));
                        }
                        catch (e) {
                            return Promise.reject(e);
                        }
                    }
                    /**
                     * Mode that determines the coordinate system to use.
                     */
                    var GLTFLoaderCoordinateSystemMode;
                    (function (GLTFLoaderCoordinateSystemMode) {
                        /**
                         * Automatically convert the glTF right-handed data to the appropriate system based on the current coordinate system mode of the scene.
                         */
                        GLTFLoaderCoordinateSystemMode[GLTFLoaderCoordinateSystemMode["AUTO"] = 0] = "AUTO";
                        /**
                         * Sets the useRightHandedSystem flag on the scene.
                         */
                        GLTFLoaderCoordinateSystemMode[GLTFLoaderCoordinateSystemMode["FORCE_RIGHT_HANDED"] = 1] = "FORCE_RIGHT_HANDED";
                    })(GLTFLoaderCoordinateSystemMode || (GLTFLoaderCoordinateSystemMode = {}));
                    /**
                     * Mode that determines what animations will start.
                     */
                    var GLTFLoaderAnimationStartMode;
                    (function (GLTFLoaderAnimationStartMode) {
                        /**
                         * No animation will start.
                         */
                        GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["NONE"] = 0] = "NONE";
                        /**
                         * The first animation will start.
                         */
                        GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["FIRST"] = 1] = "FIRST";
                        /**
                         * All animations will start.
                         */
                        GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["ALL"] = 2] = "ALL";
                    })(GLTFLoaderAnimationStartMode || (GLTFLoaderAnimationStartMode = {}));
                    /**
                     * Loader state.
                     */
                    var GLTFLoaderState;
                    (function (GLTFLoaderState) {
                        /**
                         * The asset is loading.
                         */
                        GLTFLoaderState[GLTFLoaderState["LOADING"] = 0] = "LOADING";
                        /**
                         * The asset is ready for rendering.
                         */
                        GLTFLoaderState[GLTFLoaderState["READY"] = 1] = "READY";
                        /**
                         * The asset is completely loaded.
                         */
                        GLTFLoaderState[GLTFLoaderState["COMPLETE"] = 2] = "COMPLETE";
                    })(GLTFLoaderState || (GLTFLoaderState = {}));
                    /**
                     * File loader for loading glTF files into a scene.
                     */
                    class GLTFFileLoader {
                        constructor() {
                            // --------------
                            // Common options
                            // --------------
                            /**
                             * Raised when the asset has been parsed
                             */
                            this.onParsedObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            // ----------
                            // V2 options
                            // ----------
                            /**
                             * The coordinate system mode. Defaults to AUTO.
                             */
                            this.coordinateSystemMode = GLTFLoaderCoordinateSystemMode.AUTO;
                            /**
                             * The animation start mode. Defaults to FIRST.
                             */
                            this.animationStartMode = GLTFLoaderAnimationStartMode.FIRST;
                            /**
                             * Defines if the loader should compile materials before raising the success callback. Defaults to false.
                             */
                            this.compileMaterials = false;
                            /**
                             * Defines if the loader should also compile materials with clip planes. Defaults to false.
                             */
                            this.useClipPlane = false;
                            /**
                             * Defines if the loader should compile shadow generators before raising the success callback. Defaults to false.
                             */
                            this.compileShadowGenerators = false;
                            /**
                             * Defines if the Alpha blended materials are only applied as coverage.
                             * If false, (default) The luminance of each pixel will reduce its opacity to simulate the behaviour of most physical materials.
                             * If true, no extra effects are applied to transparent pixels.
                             */
                            this.transparencyAsCoverage = false;
                            /**
                             * Defines if the loader should use range requests when load binary glTF files from HTTP.
                             * Enabling will disable offline support and glTF validator.
                             * Defaults to false.
                             */
                            this.useRangeRequests = false;
                            /**
                             * Defines if the loader should create instances when multiple glTF nodes point to the same glTF mesh. Defaults to true.
                             */
                            this.createInstances = true;
                            /**
                             * Defines if the loader should always compute the bounding boxes of meshes and not use the min/max values from the position accessor. Defaults to false.
                             */
                            this.alwaysComputeBoundingBox = false;
                            /**
                             * If true, load all materials defined in the file, even if not used by any mesh. Defaults to false.
                             */
                            this.loadAllMaterials = false;
                            /**
                             * If true, load only the materials defined in the file. Defaults to false.
                             */
                            this.loadOnlyMaterials = false;
                            /**
                             * If true, do not load any materials defined in the file. Defaults to false.
                             */
                            this.skipMaterials = false;
                            /**
                             * If true, load the color (gamma encoded) textures into sRGB buffers (if supported by the GPU), which will yield more accurate results when sampling the texture. Defaults to true.
                             */
                            this.useSRGBBuffers = true;
                            /**
                             * When loading glTF animations, which are defined in seconds, target them to this FPS. Defaults to 60.
                             */
                            this.targetFps = 60;
                            /**
                             * Defines if the loader should always compute the nearest common ancestor of the skeleton joints instead of using `skin.skeleton`. Defaults to false.
                             * Set this to true if loading assets with invalid `skin.skeleton` values.
                             */
                            this.alwaysComputeSkeletonRootNode = false;
                            /**
                             * Function called before loading a url referenced by the asset.
                             * @param url
                             */
                            this.preprocessUrlAsync = (url) => Promise.resolve(url);
                            /**
                             * Observable raised when the loader creates a mesh after parsing the glTF properties of the mesh.
                             * Note that the observable is raised as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
                             */
                            this.onMeshLoadedObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            /**
                             * Observable raised when the loader creates a texture after parsing the glTF properties of the texture.
                             */
                            this.onTextureLoadedObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            /**
                             * Observable raised when the loader creates a material after parsing the glTF properties of the material.
                             */
                            this.onMaterialLoadedObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            /**
                             * Observable raised when the loader creates a camera after parsing the glTF properties of the camera.
                             */
                            this.onCameraLoadedObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            /**
                             * Observable raised when the asset is completely loaded, immediately before the loader is disposed.
                             * For assets with LODs, raised when all of the LODs are complete.
                             * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
                             */
                            this.onCompleteObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            /**
                             * Observable raised when an error occurs.
                             */
                            this.onErrorObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            /**
                             * Observable raised after the loader is disposed.
                             */
                            this.onDisposeObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            /**
                             * Observable raised after a loader extension is created.
                             * Set additional options for a loader extension in this event.
                             */
                            this.onExtensionLoadedObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            /**
                             * Defines if the loader should validate the asset.
                             */
                            this.validate = false;
                            /**
                             * Observable raised after validation when validate is set to true. The event data is the result of the validation.
                             */
                            this.onValidatedObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            this._loader = null;
                            this._state = null;
                            this._requests = new Array();
                            /**
                             * Name of the loader ("gltf")
                             */
                            this.name = "gltf";
                            /** @hidden */
                            this.extensions = {
                                ".gltf": { isBinary: false },
                                ".glb": { isBinary: true },
                            };
                            /**
                             * Observable raised when the loader state changes.
                             */
                            this.onLoaderStateChangedObservable = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
                            this._logIndentLevel = 0;
                            this._loggingEnabled = false;
                            /** @hidden */
                            this._log = this._logDisabled;
                            this._capturePerformanceCounters = false;
                            /** @hidden */
                            this._startPerformanceCounter = this._startPerformanceCounterDisabled;
                            /** @hidden */
                            this._endPerformanceCounter = this._endPerformanceCounterDisabled;
                        }
                        /**
                         * Raised when the asset has been parsed
                         */
                        set onParsed(callback) {
                            if (this._onParsedObserver) {
                                this.onParsedObservable.remove(this._onParsedObserver);
                            }
                            this._onParsedObserver = this.onParsedObservable.add(callback);
                        }
                        /**
                         * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
                         * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
                         */
                        set onMeshLoaded(callback) {
                            if (this._onMeshLoadedObserver) {
                                this.onMeshLoadedObservable.remove(this._onMeshLoadedObserver);
                            }
                            this._onMeshLoadedObserver = this.onMeshLoadedObservable.add(callback);
                        }
                        /**
                         * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
                         */
                        set onTextureLoaded(callback) {
                            if (this._onTextureLoadedObserver) {
                                this.onTextureLoadedObservable.remove(this._onTextureLoadedObserver);
                            }
                            this._onTextureLoadedObserver = this.onTextureLoadedObservable.add(callback);
                        }
                        /**
                         * Callback raised when the loader creates a material after parsing the glTF properties of the material.
                         */
                        set onMaterialLoaded(callback) {
                            if (this._onMaterialLoadedObserver) {
                                this.onMaterialLoadedObservable.remove(this._onMaterialLoadedObserver);
                            }
                            this._onMaterialLoadedObserver = this.onMaterialLoadedObservable.add(callback);
                        }
                        /**
                         * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
                         */
                        set onCameraLoaded(callback) {
                            if (this._onCameraLoadedObserver) {
                                this.onCameraLoadedObservable.remove(this._onCameraLoadedObserver);
                            }
                            this._onCameraLoadedObserver = this.onCameraLoadedObservable.add(callback);
                        }
                        /**
                         * Callback raised when the asset is completely loaded, immediately before the loader is disposed.
                         * For assets with LODs, raised when all of the LODs are complete.
                         * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
                         */
                        set onComplete(callback) {
                            if (this._onCompleteObserver) {
                                this.onCompleteObservable.remove(this._onCompleteObserver);
                            }
                            this._onCompleteObserver = this.onCompleteObservable.add(callback);
                        }
                        /**
                         * Callback raised when an error occurs.
                         */
                        set onError(callback) {
                            if (this._onErrorObserver) {
                                this.onErrorObservable.remove(this._onErrorObserver);
                            }
                            this._onErrorObserver = this.onErrorObservable.add(callback);
                        }
                        /**
                         * Callback raised after the loader is disposed.
                         */
                        set onDispose(callback) {
                            if (this._onDisposeObserver) {
                                this.onDisposeObservable.remove(this._onDisposeObserver);
                            }
                            this._onDisposeObserver = this.onDisposeObservable.add(callback);
                        }
                        /**
                         * Callback raised after a loader extension is created.
                         */
                        set onExtensionLoaded(callback) {
                            if (this._onExtensionLoadedObserver) {
                                this.onExtensionLoadedObservable.remove(this._onExtensionLoadedObserver);
                            }
                            this._onExtensionLoadedObserver = this.onExtensionLoadedObservable.add(callback);
                        }
                        /**
                         * Defines if the loader logging is enabled.
                         */
                        get loggingEnabled() {
                            return this._loggingEnabled;
                        }
                        set loggingEnabled(value) {
                            if (this._loggingEnabled === value) {
                                return;
                            }
                            this._loggingEnabled = value;
                            if (this._loggingEnabled) {
                                this._log = this._logEnabled;
                            }
                            else {
                                this._log = this._logDisabled;
                            }
                        }
                        /**
                         * Defines if the loader should capture performance counters.
                         */
                        get capturePerformanceCounters() {
                            return this._capturePerformanceCounters;
                        }
                        set capturePerformanceCounters(value) {
                            if (this._capturePerformanceCounters === value) {
                                return;
                            }
                            this._capturePerformanceCounters = value;
                            if (this._capturePerformanceCounters) {
                                this._startPerformanceCounter = this._startPerformanceCounterEnabled;
                                this._endPerformanceCounter = this._endPerformanceCounterEnabled;
                            }
                            else {
                                this._startPerformanceCounter = this._startPerformanceCounterDisabled;
                                this._endPerformanceCounter = this._endPerformanceCounterDisabled;
                            }
                        }
                        /**
                         * Callback raised after a loader extension is created.
                         */
                        set onValidated(callback) {
                            if (this._onValidatedObserver) {
                                this.onValidatedObservable.remove(this._onValidatedObserver);
                            }
                            this._onValidatedObserver = this.onValidatedObservable.add(callback);
                        }
                        /**
                         * Disposes the loader, releases resources during load, and cancels any outstanding requests.
                         */
                        dispose() {
                            if (this._loader) {
                                this._loader.dispose();
                                this._loader = null;
                            }
                            for (const request of this._requests) {
                                request.abort();
                            }
                            this._requests.length = 0;
                            delete this._progressCallback;
                            this.preprocessUrlAsync = (url) => Promise.resolve(url);
                            this.onMeshLoadedObservable.clear();
                            this.onTextureLoadedObservable.clear();
                            this.onMaterialLoadedObservable.clear();
                            this.onCameraLoadedObservable.clear();
                            this.onCompleteObservable.clear();
                            this.onExtensionLoadedObservable.clear();
                            this.onDisposeObservable.notifyObservers(undefined);
                            this.onDisposeObservable.clear();
                        }
                        /**
                         * @param scene
                         * @param fileOrUrl
                         * @param onSuccess
                         * @param onProgress
                         * @param useArrayBuffer
                         * @param onError
                         * @hidden
                         */
                        loadFile(scene, fileOrUrl, onSuccess, onProgress, useArrayBuffer, onError) {
                            this._progressCallback = onProgress;
                            const rootUrl = fileOrUrl.name ? "file:" : core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.GetFolderPath(fileOrUrl);
                            const fileName = fileOrUrl.name || core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.GetFilename(fileOrUrl);
                            if (useArrayBuffer) {
                                if (this.useRangeRequests) {
                                    if (this.validate) {
                                        core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("glTF validation is not supported when range requests are enabled");
                                    }
                                    const fileRequest = {
                                        abort: () => { },
                                        onCompleteObservable: new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable(),
                                    };
                                    const dataBuffer = {
                                        readAsync: (byteOffset, byteLength) => {
                                            return new Promise((resolve, reject) => {
                                                this._loadFile(scene, fileOrUrl, (data) => {
                                                    resolve(new Uint8Array(data));
                                                }, true, (error) => {
                                                    reject(error);
                                                }, (webRequest) => {
                                                    webRequest.setRequestHeader("Range", `bytes=${byteOffset}-${byteOffset + byteLength - 1}`);
                                                });
                                            });
                                        },
                                        byteLength: 0,
                                    };
                                    this._unpackBinaryAsync(new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DataReader(dataBuffer)).then((loaderData) => {
                                        fileRequest.onCompleteObservable.notifyObservers(fileRequest);
                                        onSuccess(loaderData);
                                    }, onError ? (error) => onError(undefined, error) : undefined);
                                    return fileRequest;
                                }
                                return this._loadFile(scene, fileOrUrl, (data) => {
                                    this._validate(scene, data, rootUrl, fileName);
                                    this._unpackBinaryAsync(new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DataReader({
                                        readAsync: (byteOffset, byteLength) => readAsync(data, byteOffset, byteLength),
                                        byteLength: data.byteLength,
                                    })).then((loaderData) => {
                                        onSuccess(loaderData);
                                    }, onError ? (error) => onError(undefined, error) : undefined);
                                }, true, onError);
                            }
                            return this._loadFile(scene, fileOrUrl, (data) => {
                                this._validate(scene, data, rootUrl, fileName);
                                onSuccess({ json: this._parseJson(data) });
                            }, useArrayBuffer, onError);
                        }
                        /**
                         * @param meshesNames
                         * @param scene
                         * @param data
                         * @param rootUrl
                         * @param onProgress
                         * @param fileName
                         * @hidden
                         */
                        importMeshAsync(meshesNames, scene, data, rootUrl, onProgress, fileName) {
                            return Promise.resolve().then(() => {
                                this.onParsedObservable.notifyObservers(data);
                                this.onParsedObservable.clear();
                                this._log(`Loading ${fileName || ""}`);
                                this._loader = this._getLoader(data);
                                return this._loader.importMeshAsync(meshesNames, scene, null, data, rootUrl, onProgress, fileName);
                            });
                        }
                        /**
                         * @param scene
                         * @param data
                         * @param rootUrl
                         * @param onProgress
                         * @param fileName
                         * @hidden
                         */
                        loadAsync(scene, data, rootUrl, onProgress, fileName) {
                            return Promise.resolve().then(() => {
                                this.onParsedObservable.notifyObservers(data);
                                this.onParsedObservable.clear();
                                this._log(`Loading ${fileName || ""}`);
                                this._loader = this._getLoader(data);
                                return this._loader.loadAsync(scene, data, rootUrl, onProgress, fileName);
                            });
                        }
                        /**
                         * @param scene
                         * @param data
                         * @param rootUrl
                         * @param onProgress
                         * @param fileName
                         * @hidden
                         */
                        loadAssetContainerAsync(scene, data, rootUrl, onProgress, fileName) {
                            return Promise.resolve().then(() => {
                                this.onParsedObservable.notifyObservers(data);
                                this.onParsedObservable.clear();
                                this._log(`Loading ${fileName || ""}`);
                                this._loader = this._getLoader(data);
                                // Prepare the asset container.
                                const container = new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
                                // Get materials/textures when loading to add to container
                                const materials = [];
                                this.onMaterialLoadedObservable.add((material) => {
                                    materials.push(material);
                                });
                                const textures = [];
                                this.onTextureLoadedObservable.add((texture) => {
                                    textures.push(texture);
                                });
                                const cameras = [];
                                this.onCameraLoadedObservable.add((camera) => {
                                    cameras.push(camera);
                                });
                                return this._loader.importMeshAsync(null, scene, container, data, rootUrl, onProgress, fileName).then((result) => {
                                    Array.prototype.push.apply(container.geometries, result.geometries);
                                    Array.prototype.push.apply(container.meshes, result.meshes);
                                    Array.prototype.push.apply(container.particleSystems, result.particleSystems);
                                    Array.prototype.push.apply(container.skeletons, result.skeletons);
                                    Array.prototype.push.apply(container.animationGroups, result.animationGroups);
                                    Array.prototype.push.apply(container.materials, materials);
                                    Array.prototype.push.apply(container.textures, textures);
                                    Array.prototype.push.apply(container.lights, result.lights);
                                    Array.prototype.push.apply(container.transformNodes, result.transformNodes);
                                    Array.prototype.push.apply(container.cameras, cameras);
                                    return container;
                                });
                            });
                        }
                        /**
                         * @param data
                         * @hidden
                         */
                        canDirectLoad(data) {
                            return ((data.indexOf("asset") !== -1 && data.indexOf("version") !== -1) ||
                                core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.StringTools.StartsWith(data, "data:base64," + GLTFFileLoader.magicBase64Encoded) || // this is technically incorrect, but will continue to support for backcompat.
                                core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.StringTools.StartsWith(data, "data:;base64," + GLTFFileLoader.magicBase64Encoded) ||
                                core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.StringTools.StartsWith(data, "data:application/octet-stream;base64," + GLTFFileLoader.magicBase64Encoded) ||
                                core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.StringTools.StartsWith(data, "data:model/gltf-binary;base64," + GLTFFileLoader.magicBase64Encoded));
                        }
                        /**
                         * @param scene
                         * @param data
                         * @hidden
                         */
                        directLoad(scene, data) {
                            if (core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.StringTools.StartsWith(data, "base64," + GLTFFileLoader.magicBase64Encoded) || // this is technically incorrect, but will continue to support for backcompat.
                                core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.StringTools.StartsWith(data, ";base64," + GLTFFileLoader.magicBase64Encoded) ||
                                core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.StringTools.StartsWith(data, "application/octet-stream;base64," + GLTFFileLoader.magicBase64Encoded) ||
                                core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.StringTools.StartsWith(data, "model/gltf-binary;base64," + GLTFFileLoader.magicBase64Encoded)) {
                                const arrayBuffer = (0, core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DecodeBase64UrlToBinary)(data);
                                this._validate(scene, arrayBuffer);
                                return this._unpackBinaryAsync(new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DataReader({
                                    readAsync: (byteOffset, byteLength) => readAsync(arrayBuffer, byteOffset, byteLength),
                                    byteLength: arrayBuffer.byteLength,
                                }));
                            }
                            this._validate(scene, data);
                            return Promise.resolve({ json: this._parseJson(data) });
                        }
                        /** @hidden */
                        createPlugin() {
                            return new GLTFFileLoader();
                        }
                        /**
                         * The loader state or null if the loader is not active.
                         */
                        get loaderState() {
                            return this._state;
                        }
                        /**
                         * Returns a promise that resolves when the asset is completely loaded.
                         * @returns a promise that resolves when the asset is completely loaded.
                         */
                        whenCompleteAsync() {
                            return new Promise((resolve, reject) => {
                                this.onCompleteObservable.addOnce(() => {
                                    resolve();
                                });
                                this.onErrorObservable.addOnce((reason) => {
                                    reject(reason);
                                });
                            });
                        }
                        /**
                         * @param state
                         * @hidden
                         */
                        _setState(state) {
                            if (this._state === state) {
                                return;
                            }
                            this._state = state;
                            this.onLoaderStateChangedObservable.notifyObservers(this._state);
                            this._log(GLTFLoaderState[this._state]);
                        }
                        /**
                         * @param scene
                         * @param fileOrUrl
                         * @param onSuccess
                         * @param useArrayBuffer
                         * @param onError
                         * @param onOpened
                         * @hidden
                         */
                        _loadFile(scene, fileOrUrl, onSuccess, useArrayBuffer, onError, onOpened) {
                            const request = scene._loadFile(fileOrUrl, onSuccess, (event) => {
                                this._onProgress(event, request);
                            }, true, useArrayBuffer, onError, onOpened);
                            request.onCompleteObservable.add((request) => {
                                this._requests.splice(this._requests.indexOf(request), 1);
                            });
                            this._requests.push(request);
                            return request;
                        }
                        _onProgress(event, request) {
                            if (!this._progressCallback) {
                                return;
                            }
                            request._lengthComputable = event.lengthComputable;
                            request._loaded = event.loaded;
                            request._total = event.total;
                            let lengthComputable = true;
                            let loaded = 0;
                            let total = 0;
                            for (const request of this._requests) {
                                if (request._lengthComputable === undefined || request._loaded === undefined || request._total === undefined) {
                                    return;
                                }
                                lengthComputable = lengthComputable && request._lengthComputable;
                                loaded += request._loaded;
                                total += request._total;
                            }
                            this._progressCallback({
                                lengthComputable: lengthComputable,
                                loaded: loaded,
                                total: lengthComputable ? total : 0,
                            });
                        }
                        _validate(scene, data, rootUrl = "", fileName = "") {
                            if (!this.validate) {
                                return;
                            }
                            this._startPerformanceCounter("Validate JSON");
                            _glTFValidation__WEBPACK_IMPORTED_MODULE_1__.GLTFValidation.ValidateAsync(data, rootUrl, fileName, (uri) => {
                                return this.preprocessUrlAsync(rootUrl + uri).then((url) => scene._loadFileAsync(url, undefined, true, true));
                            }).then((result) => {
                                this._endPerformanceCounter("Validate JSON");
                                this.onValidatedObservable.notifyObservers(result);
                                this.onValidatedObservable.clear();
                            }, (reason) => {
                                this._endPerformanceCounter("Validate JSON");
                                core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn(`Failed to validate: ${reason.message}`);
                                this.onValidatedObservable.clear();
                            });
                        }
                        _getLoader(loaderData) {
                            const asset = loaderData.json.asset || {};
                            this._log(`Asset version: ${asset.version}`);
                            asset.minVersion && this._log(`Asset minimum version: ${asset.minVersion}`);
                            asset.generator && this._log(`Asset generator: ${asset.generator}`);
                            const version = GLTFFileLoader._parseVersion(asset.version);
                            if (!version) {
                                throw new Error("Invalid version: " + asset.version);
                            }
                            if (asset.minVersion !== undefined) {
                                const minVersion = GLTFFileLoader._parseVersion(asset.minVersion);
                                if (!minVersion) {
                                    throw new Error("Invalid minimum version: " + asset.minVersion);
                                }
                                if (GLTFFileLoader._compareVersion(minVersion, { major: 2, minor: 0 }) > 0) {
                                    throw new Error("Incompatible minimum version: " + asset.minVersion);
                                }
                            }
                            const createLoaders = {
                                1: GLTFFileLoader._CreateGLTF1Loader,
                                2: GLTFFileLoader._CreateGLTF2Loader,
                            };
                            const createLoader = createLoaders[version.major];
                            if (!createLoader) {
                                throw new Error("Unsupported version: " + asset.version);
                            }
                            return createLoader(this);
                        }
                        _parseJson(json) {
                            this._startPerformanceCounter("Parse JSON");
                            this._log(`JSON length: ${json.length}`);
                            const parsed = JSON.parse(json);
                            this._endPerformanceCounter("Parse JSON");
                            return parsed;
                        }
                        _unpackBinaryAsync(dataReader) {
                            this._startPerformanceCounter("Unpack Binary");
                            // Read magic + version + length + json length + json format
                            return dataReader.loadAsync(20).then(() => {
                                const Binary = {
                                    Magic: 0x46546c67,
                                };
                                const magic = dataReader.readUint32();
                                if (magic !== Binary.Magic) {
                                    throw new core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.RuntimeError("Unexpected magic: " + magic, core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.ErrorCodes.GLTFLoaderUnexpectedMagicError);
                                }
                                const version = dataReader.readUint32();
                                if (this.loggingEnabled) {
                                    this._log(`Binary version: ${version}`);
                                }
                                const length = dataReader.readUint32();
                                if (dataReader.buffer.byteLength !== 0 && length !== dataReader.buffer.byteLength) {
                                    throw new Error(`Length in header does not match actual data length: ${length} != ${dataReader.buffer.byteLength}`);
                                }
                                let unpacked;
                                switch (version) {
                                    case 1: {
                                        unpacked = this._unpackBinaryV1Async(dataReader, length);
                                        break;
                                    }
                                    case 2: {
                                        unpacked = this._unpackBinaryV2Async(dataReader, length);
                                        break;
                                    }
                                    default: {
                                        throw new Error("Unsupported version: " + version);
                                    }
                                }
                                this._endPerformanceCounter("Unpack Binary");
                                return unpacked;
                            });
                        }
                        _unpackBinaryV1Async(dataReader, length) {
                            const ContentFormat = {
                                JSON: 0,
                            };
                            const contentLength = dataReader.readUint32();
                            const contentFormat = dataReader.readUint32();
                            if (contentFormat !== ContentFormat.JSON) {
                                throw new Error(`Unexpected content format: ${contentFormat}`);
                            }
                            const bodyLength = length - dataReader.byteOffset;
                            const data = { json: this._parseJson(dataReader.readString(contentLength)), bin: null };
                            if (bodyLength !== 0) {
                                const startByteOffset = dataReader.byteOffset;
                                data.bin = {
                                    readAsync: (byteOffset, byteLength) => dataReader.buffer.readAsync(startByteOffset + byteOffset, byteLength),
                                    byteLength: bodyLength,
                                };
                            }
                            return Promise.resolve(data);
                        }
                        _unpackBinaryV2Async(dataReader, length) {
                            const ChunkFormat = {
                                JSON: 0x4e4f534a,
                                BIN: 0x004e4942,
                            };
                            // Read the JSON chunk header.
                            const chunkLength = dataReader.readUint32();
                            const chunkFormat = dataReader.readUint32();
                            if (chunkFormat !== ChunkFormat.JSON) {
                                throw new Error("First chunk format is not JSON");
                            }
                            // Bail if there are no other chunks.
                            if (dataReader.byteOffset + chunkLength === length) {
                                return dataReader.loadAsync(chunkLength).then(() => {
                                    return { json: this._parseJson(dataReader.readString(chunkLength)), bin: null };
                                });
                            }
                            // Read the JSON chunk and the length and type of the next chunk.
                            return dataReader.loadAsync(chunkLength + 8).then(() => {
                                const data = { json: this._parseJson(dataReader.readString(chunkLength)), bin: null };
                                const readAsync = () => {
                                    const chunkLength = dataReader.readUint32();
                                    const chunkFormat = dataReader.readUint32();
                                    switch (chunkFormat) {
                                        case ChunkFormat.JSON: {
                                            throw new Error("Unexpected JSON chunk");
                                        }
                                        case ChunkFormat.BIN: {
                                            const startByteOffset = dataReader.byteOffset;
                                            data.bin = {
                                                readAsync: (byteOffset, byteLength) => dataReader.buffer.readAsync(startByteOffset + byteOffset, byteLength),
                                                byteLength: chunkLength,
                                            };
                                            dataReader.skipBytes(chunkLength);
                                            break;
                                        }
                                        default: {
                                            // ignore unrecognized chunkFormat
                                            dataReader.skipBytes(chunkLength);
                                            break;
                                        }
                                    }
                                    if (dataReader.byteOffset !== length) {
                                        return dataReader.loadAsync(8).then(readAsync);
                                    }
                                    return Promise.resolve(data);
                                };
                                return readAsync();
                            });
                        }
                        static _parseVersion(version) {
                            if (version === "1.0" || version === "1.0.1") {
                                return {
                                    major: 1,
                                    minor: 0,
                                };
                            }
                            const match = (version + "").match(/^(\d+)\.(\d+)/);
                            if (!match) {
                                return null;
                            }
                            return {
                                major: parseInt(match[1]),
                                minor: parseInt(match[2]),
                            };
                        }
                        static _compareVersion(a, b) {
                            if (a.major > b.major) {
                                return 1;
                            }
                            if (a.major < b.major) {
                                return -1;
                            }
                            if (a.minor > b.minor) {
                                return 1;
                            }
                            if (a.minor < b.minor) {
                                return -1;
                            }
                            return 0;
                        }
                        /**
                         * @param message
                         * @hidden
                         */
                        _logOpen(message) {
                            this._log(message);
                            this._logIndentLevel++;
                        }
                        /** @hidden */
                        _logClose() {
                            --this._logIndentLevel;
                        }
                        _logEnabled(message) {
                            const spaces = GLTFFileLoader._logSpaces.substr(0, this._logIndentLevel * 2);
                            core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Logger.Log(`${spaces}${message}`);
                        }
                        _logDisabled(message) { }
                        _startPerformanceCounterEnabled(counterName) {
                            core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.StartPerformanceCounter(counterName);
                        }
                        _startPerformanceCounterDisabled(counterName) { }
                        _endPerformanceCounterEnabled(counterName) {
                            core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.EndPerformanceCounter(counterName);
                        }
                        _endPerformanceCounterDisabled(counterName) { }
                    }
                    // ----------
                    // V1 options
                    // ----------
                    /**
                     * Set this property to false to disable incremental loading which delays the loader from calling the success callback until after loading the meshes and shaders.
                     * Textures always loads asynchronously. For example, the success callback can compute the bounding information of the loaded meshes when incremental loading is disabled.
                     * Defaults to true.
                     * @hidden
                     */
                    GLTFFileLoader.IncrementalLoading = true;
                    /**
                     * Set this property to true in order to work with homogeneous coordinates, available with some converters and exporters.
                     * Defaults to false. See https://en.wikipedia.org/wiki/Homogeneous_coordinates.
                     * @hidden
                     */
                    GLTFFileLoader.HomogeneousCoordinates = false;
                    GLTFFileLoader.magicBase64Encoded = "Z2xURg"; // "glTF" base64 encoded (without the quotes!)
                    GLTFFileLoader._logSpaces = "                                ";
                    if (core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.SceneLoader) {
                        core_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.RegisterPlugin(new GLTFFileLoader());
                    }


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/glTFValidation.js":
/*!********************************************************!*\
  !*** ../../../lts/loaders/dist/glTF/glTFValidation.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTFValidation": () => (/* binding */ GLTFValidation)
                        /* harmony export */
});
/* harmony import */ var core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Misc/tools */ "core/Misc/observable");
/* harmony import */ var core_Misc_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__);

                    function validateAsync(data, rootUrl, fileName, getExternalResource) {
                        const options = {
                            externalResourceFunction: (uri) => getExternalResource(uri).then((value) => new Uint8Array(value)),
                        };
                        if (fileName) {
                            options.uri = rootUrl === "file:" ? fileName : rootUrl + fileName;
                        }
                        return data instanceof ArrayBuffer ? GLTFValidator.validateBytes(new Uint8Array(data), options) : GLTFValidator.validateString(data, options);
                    }
                    /**
                     * The worker function that gets converted to a blob url to pass into a worker.
                     */
                    function workerFunc() {
                        const pendingExternalResources = [];
                        onmessage = (message) => {
                            const data = message.data;
                            switch (data.id) {
                                case "init": {
                                    importScripts(data.url);
                                    break;
                                }
                                case "validate": {
                                    validateAsync(data.data, data.rootUrl, data.fileName, (uri) => new Promise((resolve, reject) => {
                                        const index = pendingExternalResources.length;
                                        pendingExternalResources.push({ resolve, reject });
                                        postMessage({ id: "getExternalResource", index: index, uri: uri });
                                    })).then((value) => {
                                        postMessage({ id: "validate.resolve", value: value });
                                    }, (reason) => {
                                        postMessage({ id: "validate.reject", reason: reason });
                                    });
                                    break;
                                }
                                case "getExternalResource.resolve": {
                                    pendingExternalResources[data.index].resolve(data.value);
                                    break;
                                }
                                case "getExternalResource.reject": {
                                    pendingExternalResources[data.index].reject(data.reason);
                                    break;
                                }
                            }
                        };
                    }
                    /**
                     * glTF validation
                     */
                    class GLTFValidation {
                        /**
                         * Validate a glTF asset using the glTF-Validator.
                         * @param data The JSON of a glTF or the array buffer of a binary glTF
                         * @param rootUrl The root url for the glTF
                         * @param fileName The file name for the glTF
                         * @param getExternalResource The callback to get external resources for the glTF validator
                         * @returns A promise that resolves with the glTF validation results once complete
                         */
                        static ValidateAsync(data, rootUrl, fileName, getExternalResource) {
                            if (typeof Worker === "function") {
                                return new Promise((resolve, reject) => {
                                    const workerContent = `${validateAsync}(${workerFunc})()`;
                                    const workerBlobUrl = URL.createObjectURL(new Blob([workerContent], { type: "application/javascript" }));
                                    const worker = new Worker(workerBlobUrl);
                                    const onError = (error) => {
                                        worker.removeEventListener("error", onError);
                                        worker.removeEventListener("message", onMessage);
                                        reject(error);
                                    };
                                    const onMessage = (message) => {
                                        const data = message.data;
                                        switch (data.id) {
                                            case "getExternalResource": {
                                                getExternalResource(data.uri).then((value) => {
                                                    worker.postMessage({ id: "getExternalResource.resolve", index: data.index, value: value }, [value]);
                                                }, (reason) => {
                                                    worker.postMessage({ id: "getExternalResource.reject", index: data.index, reason: reason });
                                                });
                                                break;
                                            }
                                            case "validate.resolve": {
                                                worker.removeEventListener("error", onError);
                                                worker.removeEventListener("message", onMessage);
                                                resolve(data.value);
                                                worker.terminate();
                                                break;
                                            }
                                            case "validate.reject": {
                                                worker.removeEventListener("error", onError);
                                                worker.removeEventListener("message", onMessage);
                                                reject(data.reason);
                                                worker.terminate();
                                            }
                                        }
                                    };
                                    worker.addEventListener("error", onError);
                                    worker.addEventListener("message", onMessage);
                                    worker.postMessage({ id: "init", url: this.Configuration.url });
                                    worker.postMessage({ id: "validate", data: data, rootUrl: rootUrl, fileName: fileName });
                                });
                            }
                            else {
                                if (!this._LoadScriptPromise) {
                                    this._LoadScriptPromise = core_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.LoadScriptAsync(this.Configuration.url);
                                }
                                return this._LoadScriptPromise.then(() => {
                                    return validateAsync(data, rootUrl, fileName, getExternalResource);
                                });
                            }
                        }
                    }
                    /**
                     * The configuration. Defaults to `{ url: "https://preview.babylonjs.com/gltf_validator.js" }`.
                     */
                    GLTFValidation.Configuration = {
                        url: "https://preview.babylonjs.com/gltf_validator.js",
                    };


                    /***/
}),

/***/ "../../../lts/loaders/dist/glTF/index.js":
/*!***********************************************!*\
  !*** ../../../lts/loaders/dist/glTF/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTF1": () => (/* reexport module object */ _1_0_index__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "GLTF2": () => (/* reexport module object */ _2_0_index__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   "GLTFFileLoader": () => (/* reexport safe */ _glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFFileLoader),
/* harmony export */   "GLTFLoaderAnimationStartMode": () => (/* reexport safe */ _glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderAnimationStartMode),
/* harmony export */   "GLTFLoaderCoordinateSystemMode": () => (/* reexport safe */ _glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderCoordinateSystemMode),
/* harmony export */   "GLTFLoaderState": () => (/* reexport safe */ _glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderState),
/* harmony export */   "GLTFValidation": () => (/* reexport safe */ _glTFValidation__WEBPACK_IMPORTED_MODULE_1__.GLTFValidation)
                        /* harmony export */
});
/* harmony import */ var _glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFFileLoader */ "../../../lts/loaders/dist/glTF/glTFFileLoader.js");
/* harmony import */ var _glTFValidation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFValidation */ "../../../lts/loaders/dist/glTF/glTFValidation.js");
/* harmony import */ var _1_0_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./1.0/index */ "../../../lts/loaders/dist/glTF/1.0/index.js");
/* harmony import */ var _2_0_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./2.0/index */ "../../../lts/loaders/dist/glTF/2.0/index.js");







                    /***/
}),

/***/ "../../../lts/loaders/dist/index.js":
/*!******************************************!*\
  !*** ../../../lts/loaders/dist/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTF1": () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_0__.GLTF1),
/* harmony export */   "GLTF2": () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_0__.GLTF2),
/* harmony export */   "GLTFFileLoader": () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_0__.GLTFFileLoader),
/* harmony export */   "GLTFLoaderAnimationStartMode": () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderAnimationStartMode),
/* harmony export */   "GLTFLoaderCoordinateSystemMode": () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderCoordinateSystemMode),
/* harmony export */   "GLTFLoaderState": () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderState),
/* harmony export */   "GLTFValidation": () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_0__.GLTFValidation),
/* harmony export */   "MTLFileLoader": () => (/* reexport safe */ _OBJ_index__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader),
/* harmony export */   "OBJFileLoader": () => (/* reexport safe */ _OBJ_index__WEBPACK_IMPORTED_MODULE_1__.OBJFileLoader),
/* harmony export */   "STLFileLoader": () => (/* reexport safe */ _STL_index__WEBPACK_IMPORTED_MODULE_2__.STLFileLoader),
/* harmony export */   "SolidParser": () => (/* reexport safe */ _OBJ_index__WEBPACK_IMPORTED_MODULE_1__.SolidParser)
                        /* harmony export */
});
/* harmony import */ var _glTF_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTF/index */ "../../../lts/loaders/dist/glTF/index.js");
/* harmony import */ var _OBJ_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OBJ/index */ "../../../lts/loaders/dist/OBJ/index.js");
/* harmony import */ var _STL_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./STL/index */ "../../../lts/loaders/dist/STL/index.js");





                    /***/
}),

/***/ "../../../lts/loaders/dist/legacy/legacy-glTF.js":
/*!*******************************************************!*\
  !*** ../../../lts/loaders/dist/legacy/legacy-glTF.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTFFileLoader": () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFFileLoader),
/* harmony export */   "GLTFLoaderAnimationStartMode": () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderAnimationStartMode),
/* harmony export */   "GLTFLoaderCoordinateSystemMode": () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderCoordinateSystemMode),
/* harmony export */   "GLTFLoaderState": () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderState),
/* harmony export */   "GLTFValidation": () => (/* reexport safe */ loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__.GLTFValidation)
                        /* harmony export */
});
/* harmony import */ var loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/glTF/glTFFileLoader */ "../../../lts/loaders/dist/glTF/glTFFileLoader.js");
/* harmony import */ var loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! loaders/glTF/glTFValidation */ "../../../lts/loaders/dist/glTF/glTFValidation.js");


                    /**
                     * This is the entry point for the UMD module.
                     * The entry point for a future ESM package should be index.ts
                     */
                    const globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
                    if (typeof globalObject !== "undefined") {
                        globalObject.BABYLON = globalObject.BABYLON || {};
                        for (var key in loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__) {
                            globalObject.BABYLON[key] = loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__[key];
                        }
                        for (var key in loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__) {
                            globalObject.BABYLON[key] = loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__[key];
                        }
                    }




                    /***/
}),

/***/ "../../../lts/loaders/dist/legacy/legacy-glTF1.js":
/*!********************************************************!*\
  !*** ../../../lts/loaders/dist/legacy/legacy-glTF1.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTF1": () => (/* reexport module object */ loaders_glTF_1_0_index__WEBPACK_IMPORTED_MODULE_0__)
                        /* harmony export */
});
/* harmony import */ var loaders_glTF_1_0_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/glTF/1.0/index */ "../../../lts/loaders/dist/glTF/1.0/index.js");

                    /**
                     * This is the entry point for the UMD module.
                     * The entry point for a future ESM package should be index.ts
                     */
                    const globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
                    if (typeof globalObject !== "undefined") {
                        globalObject.BABYLON = globalObject.BABYLON || {};
                        globalObject.BABYLON.GLTF1 = globalObject.BABYLON.GLTF1 || {};
                        for (const key in loaders_glTF_1_0_index__WEBPACK_IMPORTED_MODULE_0__) {
                            globalObject.BABYLON.GLTF1[key] = loaders_glTF_1_0_index__WEBPACK_IMPORTED_MODULE_0__[key];
                        }
                    }



                    /***/
}),

/***/ "../../../lts/loaders/dist/legacy/legacy-glTF2.js":
/*!********************************************************!*\
  !*** ../../../lts/loaders/dist/legacy/legacy-glTF2.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTF2": () => (/* reexport module object */ loaders_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_2__)
                        /* harmony export */
});
/* harmony import */ var loaders_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/glTF/2.0/Extensions/index */ "../../../lts/loaders/dist/glTF/2.0/Extensions/index.js");
/* harmony import */ var loaders_glTF_2_0_glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! loaders/glTF/2.0/glTFLoaderInterfaces */ "../../../lts/loaders/dist/glTF/2.0/glTFLoaderInterfaces.js");
/* harmony import */ var loaders_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! loaders/glTF/2.0/index */ "../../../lts/loaders/dist/glTF/2.0/index.js");



                    /**
                     * This is the entry point for the UMD module.
                     * The entry point for a future ESM package should be index.ts
                     */
                    const globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
                    if (typeof globalObject !== "undefined") {
                        globalObject.BABYLON = globalObject.BABYLON || {};
                        const BABYLON = globalObject.BABYLON;
                        BABYLON.GLTF2 = BABYLON.GLTF2 || {};
                        BABYLON.GLTF2.Loader = BABYLON.GLTF2.Loader || {};
                        BABYLON.GLTF2.Loader.Extensions = BABYLON.GLTF2.Loader.Extensions || {};
                        const keys = [];
                        for (var key in loaders_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_0__) {
                            BABYLON.GLTF2.Loader.Extensions[key] = loaders_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_0__[key];
                            keys.push(key);
                        }
                        for (var key in loaders_glTF_2_0_glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_1__) {
                            BABYLON.GLTF2.Loader[key] = loaders_glTF_2_0_glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_1__[key];
                            keys.push(key);
                        }
                        for (var key in loaders_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_2__) {
                            // Prevent Reassignment.
                            if (keys.indexOf(key) > -1) {
                                continue;
                            }
                            BABYLON.GLTF2[key] = loaders_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_2__[key];
                        }
                    }



                    /***/
}),

/***/ "../../../lts/loaders/dist/legacy/legacy-objFileLoader.js":
/*!****************************************************************!*\
  !*** ../../../lts/loaders/dist/legacy/legacy-objFileLoader.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MTLFileLoader": () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.MTLFileLoader),
/* harmony export */   "OBJFileLoader": () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.OBJFileLoader),
/* harmony export */   "SolidParser": () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.SolidParser)
                        /* harmony export */
});
/* harmony import */ var loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/OBJ/index */ "../../../lts/loaders/dist/OBJ/index.js");

                    /**
                     * This is the entry point for the UMD module.
                     * The entry point for a future ESM package should be index.ts
                     */
                    const globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
                    if (typeof globalObject !== "undefined") {
                        for (const key in loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__) {
                            globalObject.BABYLON[key] = loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__[key];
                        }
                    }



                    /***/
}),

/***/ "../../../lts/loaders/dist/legacy/legacy-stlFileLoader.js":
/*!****************************************************************!*\
  !*** ../../../lts/loaders/dist/legacy/legacy-stlFileLoader.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STLFileLoader": () => (/* reexport safe */ loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__.STLFileLoader)
                        /* harmony export */
});
/* harmony import */ var loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/STL/index */ "../../../lts/loaders/dist/STL/index.js");

                    /**
                     * This is the entry point for the UMD module.
                     * The entry point for a future ESM package should be index.ts
                     */
                    const globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
                    if (typeof globalObject !== "undefined") {
                        for (const key in loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__) {
                            globalObject.BABYLON[key] = loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__[key];
                        }
                    }



                    /***/
}),

/***/ "../../../lts/loaders/dist/legacy/legacy.js":
/*!**************************************************!*\
  !*** ../../../lts/loaders/dist/legacy/legacy.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLTF1": () => (/* reexport safe */ loaders_index__WEBPACK_IMPORTED_MODULE_0__.GLTF1),
/* harmony export */   "GLTF2": () => (/* reexport safe */ loaders_index__WEBPACK_IMPORTED_MODULE_0__.GLTF2),
/* harmony export */   "GLTFFileLoader": () => (/* reexport safe */ loaders_index__WEBPACK_IMPORTED_MODULE_0__.GLTFFileLoader),
/* harmony export */   "GLTFLoaderAnimationStartMode": () => (/* reexport safe */ loaders_index__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderAnimationStartMode),
/* harmony export */   "GLTFLoaderCoordinateSystemMode": () => (/* reexport safe */ loaders_index__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderCoordinateSystemMode),
/* harmony export */   "GLTFLoaderState": () => (/* reexport safe */ loaders_index__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderState),
/* harmony export */   "GLTFValidation": () => (/* reexport safe */ loaders_index__WEBPACK_IMPORTED_MODULE_0__.GLTFValidation),
/* harmony export */   "MTLFileLoader": () => (/* reexport safe */ loaders_index__WEBPACK_IMPORTED_MODULE_0__.MTLFileLoader),
/* harmony export */   "OBJFileLoader": () => (/* reexport safe */ loaders_index__WEBPACK_IMPORTED_MODULE_0__.OBJFileLoader),
/* harmony export */   "STLFileLoader": () => (/* reexport safe */ loaders_index__WEBPACK_IMPORTED_MODULE_0__.STLFileLoader),
/* harmony export */   "SolidParser": () => (/* reexport safe */ loaders_index__WEBPACK_IMPORTED_MODULE_0__.SolidParser)
                        /* harmony export */
});
/* harmony import */ var loaders_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/index */ "../../../lts/loaders/dist/index.js");
/* harmony import */ var _legacy_glTF__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./legacy-glTF */ "../../../lts/loaders/dist/legacy/legacy-glTF.js");
/* harmony import */ var _legacy_glTF1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./legacy-glTF1 */ "../../../lts/loaders/dist/legacy/legacy-glTF1.js");
/* harmony import */ var _legacy_glTF2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./legacy-glTF2 */ "../../../lts/loaders/dist/legacy/legacy-glTF2.js");
/* harmony import */ var _legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./legacy-objFileLoader */ "../../../lts/loaders/dist/legacy/legacy-objFileLoader.js");
/* harmony import */ var _legacy_stlFileLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./legacy-stlFileLoader */ "../../../lts/loaders/dist/legacy/legacy-stlFileLoader.js");








                    /***/
}),

/***/ "core/Misc/observable":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

                    module.exports = __WEBPACK_EXTERNAL_MODULE_core_Misc_observable__;

                    /***/
})

            /******/
});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
                /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
                /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
            /******/
}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
                /******/
};
            /******/
})();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for (var key in definition) {
/******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                        /******/
}
                    /******/
}
                /******/
};
            /******/
})();
/******/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function () {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
                    /******/
} catch (e) {
/******/ 				if (typeof window === 'object') return window;
                    /******/
}
                /******/
})();
            /******/
})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
            /******/
})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                    /******/
}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
                /******/
};
            /******/
})();
        /******/
        /************************************************************************/
        var __webpack_exports__ = {};
        // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
        (() => {
            /*!**********************!*\
              !*** ./src/index.ts ***!
              \**********************/
            __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "loaders": () => (/* reexport module object */ loaders_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__)
                /* harmony export */
});
/* harmony import */ var loaders_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/legacy/legacy */ "../../../lts/loaders/dist/legacy/legacy.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loaders_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__);

        })();

        __webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
        /******/
})()
        ;
});
//# sourceMappingURL=babylonjs.loaders.js.map