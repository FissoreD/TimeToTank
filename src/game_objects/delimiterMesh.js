class DelimiterMesh {
    constructor(x, y, width, depth) {
        this.width = width * cell_size;
        this.depth = depth * cell_size;
        this.shape = BABYLON.MeshBuilder.CreateBox("delimiter", { height: Wall.height * 10, width: this.width, depth: this.depth }, scene);
        this.shape.position = new BABYLON.Vector3(x * cell_size, Wall.height / 2 - 1, y * cell_size)
        this.shape.isVisible = false
    }

    dispose() {
        let position = delimiters.indexOf(this);
        this.shape.dispose();
        delimiters.splice(position, 1);
    }
}
