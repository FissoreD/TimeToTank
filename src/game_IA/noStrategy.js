class noStrategy {

  /** @type {Char} */
  tank;

  angleChange;

  constructor(tank) {
    this.tank = tank;
  }

  applyStrategy() {
    MoveAI.rotateTurret(this.tank)
  }
}