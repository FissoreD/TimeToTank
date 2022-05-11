const BONUS_TYPE = {
  PERMANENT: 1,
  ACTIVATION: 2,
  ONE_USE: 3
};

const SPECIAL_BONUS_ID = {
  CROSS_HAIR: {
    name: "Sniper laser",
    description: "Highlight enemies once target + Bullet are very fast every 3 seconds",
    image: "images/gunaims.png",
    keyListener: '1',
    bonusLevelUp: function () { char1.specialBonuses.forEach(b => { if (b.name == "Sniper laser") b.delay /= 2 }) },
  },
  MACHINE_GUN: {
    name: 'Machine gun',
    description: "The delay between bullets is really short and bullets are faster",
    image: "images/multiple_bullet.png",
    keyListener: '2',
    bonusLevelUp: function () { char1.specialBonuses.forEach(b => { if (b.name == "Machine gun") b.delay /= 2 }) },
  },
  DOME: {
    name: "Shield",
    description: "Be protected by a 4-lifes dome",
    image: "images/shield.png",
    keyListener: '3',
    bonusLevelUp: function () { char1.specialBonuses.forEach(b => { if (b.name == "Shield") b.delay /= 2 }) },
  },
  SPEED_TURBO: {
    name: "Speed Turbo",
    description: "Go faster for 3 seconds",
    image: "images/turbo.png",
    keyListener: '4',
    bonusLevelUp: function () { char1.specialBonuses.forEach(b => { if (b.name == "Speed Turbo") b.delay /= 2 }) },
  },
  MIND_CONTROL: {
    name: "Mind Control",
    description: "Nearby tanks attack their allies for 10 seconds",
    image: "images/brain.png",
    keyListener: '5',
    bonusLevelUp: function () { char1.specialBonuses.forEach(b => { if (b.name == "Mind Control") b.delay /= 2 }) },
  },
  TELEPORT: {
    name: "Teleport",
    description: "Teleport 5 meters in the direction your are looking",
    image: "images/teleportation.png",
    keyListener: '6',
    bonusLevelUp: function () { char1.specialBonuses.forEach(b => { if (b.name == "Teleport") b.delay /= 2 }) },
  },
  BULL_CHARGE: {
    name: "Bull Charge",
    description: "Charge forward and destroy ennemies and bullets on your way",
    image: "images/bull_charge.png",
    keyListener: '7',
    bonusLevelUp: function () { char1.specialBonuses.forEach(b => { if (b.name == "Bull Charge") b.delay /= 2 }) },
  },
  GRENADE: {
    name: "Grenade",
    description: "Throw a grenade which explose on collision",
    image: "images/grenade.png",
    keyListener: '8',
    bonusLevelUp: function () { char1.specialBonuses.forEach(b => { if (b.name == "Grenade") b.delay /= 2 }) },
  },
  ALLIES: {
    name: "Allies Intervention",
    description: "2 allies come down from the sky to help you",
    image: "images/parachute.png",
    keyListener: '9',
    bonusLevelUp: function () { char1.specialBonuses.forEach(b => { if (b.name == "Allies Intervention") b.delay /= 2 }) },
  },
}

let listenerList = ['KeyE', 'KeyR', 'KeyF'];

class SpecialBonus {
  /** @type{Char} */
  tank;

  /** @type{boolean} */
  isActive;

  /** @type{HTMLDivElement} */
  loader;

  /**
   * @param {Char} tank 
   */
  constructor(tank, bonusType, delay, bonusStartedDelay = 0, isPermanent = false) {
    this.tank = tank;
    this.bonusType = bonusType;
    this.isActive = false;

    this.name = bonusType.name;
    this.description = bonusType.description;
    this.bonusLevelUp = bonusType.bonusLevelUp;

    this.image = document.createElement("img");
    this.image.src = bonusType.image
    this.image.classList.add("logo")
    this.image.classList.add("whiteBackground")

    this.delay = delay;
    this.timeCooled = 0;
    this.startDate = Date.now()


    this.bonusStartedDelay = bonusStartedDelay;
    this.timeStartedCooled = bonusStartedDelay;
    this.bonusStartedDate = Date.now()
    this.isActive = false;
    this.isPermanent = isPermanent;
  }

  addToChar() {
    this.keyListener = listenerList[this.tank.specialBonuses.length];
    this.tank.addSpecialBonus(this);
    if (this.tank == char1) {
      addedObtainableBonus.push(
        new BonusEnum(
          this.name + " level up",
          this.bonusLevelUp,
          "Level up the power of the " + this.name + " special bonus",
          "./images/health.png"
        ))
    }
    this.load()
  }

  activate() {
    this.isActive = true;
    this.bonusStartedDate = Date.now();
  }

  disable() {
    if (this.isPermanent) return false
    this.isActive = false;
    return true
  }


  /** Remove bonus from thank but not graphically */
  remove() {
    this.tank.specialBonuses.splice(this.tank.specialBonuses.indexOf(this), 1);
  }


  /** Remove bonus from thank and graphically */
  fullDispose() {
    this.hide();
    this.remove();
    if (this.tank == char1) this.bg.remove();
  }

  update() {

    let timeDisplay;

    if (this.isActive) {
      if (!this.bg.style.cssText.includes("--c"))
        this.bg.style.setProperty("--c", "#18c12ba8");
      if (Date.now() - this.bonusStartedDate > this.bonusStartedDelay) {
        this.disable();
        this.resetTime();
      }
      this.timeStartedCooled = Math.max(0, this.bonusStartedDate + this.bonusStartedDelay - Date.now());
      timeDisplay = 100 - Math.round(100 - this.timeStartedCooled / this.bonusStartedDelay * 100)
    } else {
      this.timeCooled = Math.max(0, this.startDate + this.delay - Date.now());
      timeDisplay = 100 - Math.round(100 - this.timeCooled / this.delay * 100)
      this.bg.style.removeProperty("--c")
    }
    this.loader.style.setProperty('--p', `${timeDisplay}`);
    let txt = Math.round((this.isActive ? this.timeStartedCooled : this.timeCooled) / 1000)
    this.loader.innerHTML = txt == 0 ? "" : txt
  }

  /** Remove bonus graphically but not from thank */
  // ABSTRACT
  hide() { }

  /** Load bonus once collected */
  // ABSTRACT
  load() {

    this.loader = document.createElement('div')
    this.loader.classList = "pie animate no-round"
    this.loader.style.setProperty("--p", '0')
    this.loader.innerHTML = "0%";

    this.shortcut = document.createElement('div')
    this.shortcut.innerHTML = this.keyListener[this.keyListener.length - 1];
    this.shortcut.classList = 'shortcut'

    this.bg = document.createElement('div')
    this.bg.classList = 'bg'
    this.bg.style.setProperty("--img", `url("../${this.bonusType.image}")`)

    this.bg.appendChild(this.loader);
    this.bg.appendChild(this.shortcut);

    if (this.tank == char1) {
      let sb = document.getElementsByClassName('specialBonus')[0]
      sb.appendChild(this.bg);
      sb.classList.remove('hide')
      sb.parentElement.children[0].classList.remove('hide');
    }
  }

  /** Apply the effect of the bonus if possible */
  use() {
    if (this.timeCooled > 0) return false;
    this.startDate = Date.now()
    this.timeCooled = this.delay;
    return true;
  }

  /**
   * KeyListener specific to each bonus 
   * @param {KeyboardEvent} event 
   */
  applyListener(event) {
    if (event.code == this.keyListener) this.use()
  }

  resetTime() {
    this.startDate = Date.now()
    this.timeCooled = 0;
  }

  correctTime() {
    this.startDate = Date.now() - this.delay + this.timeCooled;
    this.bonusStartedDate = Date.now() - this.bonusStartedDelay + this.timeStartedCooled;
  }

  /**
   * @param {Char} tank 
   */
  static updateAllThankBonuses(tank) {
    tank.specialBonuses.forEach(e => e.update());
  }

  /**
   * @param {Char} tank 
   * @returns 
   */
  static createSpecialBonusList(tank) {
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
    ].filter(e => !tank.specialBonuses.includes(e.name));
  }
}