class MiniMap {

  /** @type {CanvasRenderingContext2D} */
  ctx;

  /** @type {HTMLCanvasElement} */
  canvas;

  constructor() {
    this.canvas = document.getElementById('minimap');
    this.ctx = this.canvas.getContext('2d');
  }

  drawPoint(x, y, color, radius) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawSquare(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.rect(x, y, 4, 4);
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawTriangle(x, y, color, side, withBorder = false) {
    if (withBorder) this.drawTriangle(x, y, 'rgb(0,0,0)', side + 2)

    this.ctx.fillStyle = color;
    this.ctx.beginPath();

    var path = new Path2D();

    let height = side * Math.cos(Math.PI/6)

    let x1 = x
    let y1 = y  - height * 2/3
    let x2 = x1 - side/2
    let y2 = y1 + height
    let x3 = x2 + side
    let y3 = y2

    path.moveTo(x1, y1)
    path.lineTo(x2, y2)
    path.lineTo(x3, y3)
    path.lineTo(x1, y1)

    this.ctx.fill(path);
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight)
  }

  // resize() {
  //   let width = window.innerWidth / 6;
  //   let height = window.innerHeight / 6;
  //   this.canvas.offsetWidth = Math.min(width, height)
  //   this.canvas.offsetHeight = Math.min(width, height)
  // }

  redraw() {
    this.clear()
    this.canvas.height = this.canvas.offsetHeight
    this.canvas.width = this.canvas.offsetWidth
    let resize = (x, y) => ({
      x: (1 - (x + height / 2) / height) * this.canvas.offsetWidth * 0.6 + this.canvas.offsetWidth * 0.4 / 2,
      y: (1 - (y + width / 2) / width) * this.canvas.offsetHeight * 0.6 + this.canvas.offsetHeight * 0.4 / 2
    })
    chars.forEach(c => {
      let point = resize(c.shape.position.z, c.shape.position.x);
      this.drawPoint(point.x, point.y, c == char1 ? 'rgb(0, 255, 0)' : (charsAllies.includes(c) ? 'rgb(0, 128, 255)' : 'rgb(255, 0, 0)'), 3)
    })
    walls.forEach(w => {
      if (w instanceof WallPerimeter) return
      let point = resize(w.shape.position.z, w.shape.position.x);
      this.drawSquare(point.x, point.y, 'rgb(160,82,45)')
    })
    barrels.forEach(w => {
      let point = resize(w.shape.position.z, w.shape.position.x);
      this.drawPoint(point.x, point.y, 'rgb(165,42,42)', 2)
    })
    batteries.forEach(w => {
      let point = resize(w.shape.position.z, w.shape.position.x);
      this.drawPoint(point.x, point.y, 'rgb(42,42,165)', 2)
    })
    bonuses.forEach(w => {
      let point = resize(w.shape.position.z, w.shape.position.x);
      this.drawPoint(point.x, point.y, 'rgb(218,165,32)', 2.5)
    })
    bullets.forEach(b => {
      let point = resize(b.position.z, b.position.x);
      this.drawPoint(point.x, point.y, 'rgb(0,0,0)', 1)
    })
    grenades.forEach(b => {
      let point = resize(b.position.z, b.position.x);
      this.drawPoint(point.x, point.y, 'rgb(0,0,0)', 1)
    })
    relics.forEach(r => {
      let point = resize(r.position.z, r.position.x);
      this.drawTriangle(point.x, point.y, 'rgb(255,215,0)', 6, true)
    })
  }
}
