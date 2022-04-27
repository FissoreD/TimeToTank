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

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  resize() {
    let width = window.innerWidth / 6;
    let height = window.innerHeight / 6;
    this.canvas.width = Math.min(width, height)
    this.canvas.height = Math.min(width, height)
  }

  redraw() {
    this.clear()
    let resize = (x, y) => ({
      x: (1 - (x + height / 2) / height) * this.canvas.width * 0.6 + this.canvas.width * 0.4 / 2,
      y: (1 - (y + width / 2) / width) * this.canvas.height * 0.6 + this.canvas.height * 0.4 / 2
    })
    chars.forEach(c => {
      let point = resize(c.shape.position.z, c.shape.position.x);
      this.drawPoint(point.x, point.y, c == char1 ? 'rgb(0,255,0)' : 'rgb(255, 0, 0)', 3)
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
  }
}
