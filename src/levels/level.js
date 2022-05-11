const lvlStatus = {
  DIE: 0,
  WIN: 1,
  NXT_LVL: 2
};

class Level {
  stats = {
    "Char Killed": 0,
    "Bonus Obtained": 0,
    "Bullet Fired": 0,
    "Total Distance": 0,
    "Wall destroyed": 0,
    "Battery destroyed": 0,
    "Relic Obtained": 0
  }

  static normalMessage = [
    "Be careful, water is poisoned, <br> do not fall inside too much longer",
    "Kill tanks to go into next level",
    "The minimap on tho-right of the screen <br> can be really useful !"
  ]

  constructor(levelInfo) {
    this.level = levelInfo.level;

    // console.log(level);
    this.minHeightMap = levelInfo.minHeightMap;
    this.lvlObjective = levelInfo.lvlObjective;
    this.biome = levelInfo.biome;
    this.dateLastMessageTip = Date.now();
    this.counter = 0;
    this.msg = levelInfo.lvlObjective.msg.concat(Level.normalMessage);
    if (barrels && barrels.length > 0) {
      this.msg.push("Barrels can explode and cause lots of damage,<br>Don't be too close to it !")
    }
  }

  updateTipMessage() {
    if (Date.now() - this.dateLastMessageTip > 5000) {
      this.dateLastMessageTip = Date.now()
      let tips = document.getElementById('tips')
      tips.style.opacity = "0"
      if (this.counter >= this.msg.length) this.counter = 0
      setTimeout(() => {
        tips.innerHTML = this.msg[this.counter++]
        tips.style.opacity = "1";
      }, 500);
    }
  }

  createMessage() {
    let parentDiv = document
      .getElementsByClassName('currentMission')[0];

    parentDiv.innerHTML = "";
    let createLine = ([a, b, c]) => {
      let d = document.createElement('div');
      let s1 = document.createElement('span');
      let s2 = document.createElement('span');
      d.appendChild(s1);
      d.appendChild(s2);
      s1.innerHTML = a;
      s2.innerHTML = b() + '/' + c();
      return d;
    }

    this.lvlObjective.tip.forEach(
      e => parentDiv.appendChild(createLine(e)));
  }

  canGoNextLevel() {
    this.createMessage();
    return this.lvlObjective.goToNextLevel()
  }

  goNextLevel(status = lvlStatus.NXT_LVL) {
    if (!scene.menu.inOtherMenu()) {
      scene.menu.inNextLevel = true;
      Array.from(document.getElementsByClassName("gameBarsClass")).forEach(e => e.classList.add('hide'))
      exitPointerLoc()
      this.writeStat(status)
    }
  }

  addDistance(distance) {
    this.stats["Total Distance"] += distance;
  }

  addKilledChar() {
    this.stats["Char Killed"]++;
  }

  addBulletFired() {
    this.stats["Bullet Fired"]++;
  }

  addBonusObtained() {
    this.stats["Bonus Obtained"]++;
  }

  addRelicObtained() {
    this.stats["Relic Obtained"]++;
  }

  addWallDestroyed() {
    this.stats["Wall destroyed"]++;
  }

  addBatteryDestroyed() {
    this.stats["Battery destroyed"]++;
  }

  getDistance() {
    return this.stats["Total Distance"];
  }

  getKilledChar() {
    return this.stats["Char Killed"];
  }

  getBulletFired() {
    return this.stats["Bullet Fired"];
  }

  getBonusObtained() {
    return this.stats["Bonus Obtained"];
  }

  getRelicObtained() {
    return this.stats["Relic Obtained"];
  }

  getWallDestroyed() {
    return this.stats["Wall destroyed"];
  }

  getBatteryDestroyed() {
    return this.stats["Battery destroyed"];
  }

  /**
   * @param {number} status 
   */
  writeStat(status) {

    if (status === lvlStatus.WIN) {
      applauseSound.play()
      document.getElementsByClassName('level')[level_map.length - 1].classList.add('done')
    }

    document.getElementById("endLevelStat").classList.remove('hide')
    let tab = document.getElementById("tableStat")
    tab.innerHTML = "";

    let createTd = content => {
      let cell = document.createElement("td");
      let span = document.createElement("span")
      span.innerHTML = content
      cell.className = "button"
      cell.appendChild(span)
      return cell
    }

    let startLine = document.createElement("tr")
    let startCell;
    switch (status) {
      case lvlStatus.WIN:
        startCell = createTd("Congratulations!");
        startCell.classList.add("greenBg")
        break;
      case lvlStatus.DIE:
        startCell = createTd("You Died!");
        startCell.classList.add("redBg")
        break;
      case lvlStatus.NXT_LVL:
        startCell = createTd("Level Complete!");
        startCell.classList.add("nextLvlBg")
        break;
    }

    startCell.colSpan = 2;
    startLine.appendChild(startCell)
    tab.appendChild(startLine)

    // for (const iterator of Object.entries(this.stats)) {
    //   let line = document.createElement("tr")
    //   line.appendChild(createTd(iterator[0]))
    //   line.appendChild(createTd(iterator[1]))
    //   // cell1.innerHTML = iterator[0]
    //   // cell2.innerHTML = iterator[1]
    //   // tab.innerHTML += `<tr><td class="button"><span>${iterator[0]}</span></td><td class="button"><span>${iterator[1]}</span></td></tr>`
    //   tab.appendChild(line)
    // }

    let tryAgain = (isAdventure && status == lvlStatus.DIE)

    if (status == lvlStatus.NXT_LVL) {
      let nextLvlDescLine = document.createElement("tr")
      let nextLvlDesc = createTd(level_map[level + 1].lvlObjective.description)
      nextLvlDesc.classList.add('greenBg')
      nextLvlDesc.colSpan = 2
      nextLvlDescLine.appendChild(nextLvlDesc)
      tab.appendChild(nextLvlDescLine)
    }
    if (tryAgain) {
      let nextLvlDescLine = document.createElement("tr")
      let nextLvlDesc = createTd(level_map[level].lvlObjective.description)
      nextLvlDesc.colSpan = 2
      nextLvlDescLine.appendChild(nextLvlDesc)
      tab.appendChild(nextLvlDescLine)
    }
    let endLine = document.createElement("tr")
    let endCell = (status != lvlStatus.NXT_LVL) ? (tryAgain ? createTd("Try again") : createTd("Main Menu")) : createTd("Next Level")
    endCell.colSpan = 2;
    endCell.onclick = () => {
      if (tryAgain) {
        char1.health = char1.maxHealth
        char1.life += 1
        scene.menu.inNextLevel = false;
        document.getElementById('endLevelStat').classList.add('hide');
        this.loadNextLevel(false);
        pointerLock();
        Array.from(document.getElementsByClassName("gameBarsClass")).forEach(e => e.classList.remove('hide'))
        // console.log("health bar and minimap should be there");
      }
      else if (status != lvlStatus.NXT_LVL) {
        scene.menu.restart()
        document.getElementById('endLevelStat').classList.add('hide');
      }
      else {
        scene.menu.inNextLevel = false;
        document.getElementById('endLevelStat').classList.add('hide');
        this.loadNextLevel();
        pointerLock();
        Array.from(document.getElementsByClassName("gameBarsClass")).forEach(e => e.classList.remove('hide'))
      }
    }
    endLine.appendChild(endCell)
    tab.appendChild(endLine)
  }

  loadNextLevel(progress = true) {
    globalProgress = progress
    level += progress;
    let notTakenBonus = []
    if (!progress) {
      notTakenBonus = bonuses.slice()
      // console.log("notTakenBonuses = ", notTakenBonus);
    }
    remove_all_objects(false, progress)
    startgame(level, progress);
    if (!progress) {
      // console.log("setting notTakenBonuses");
      notTakenBonus.forEach(b => bonuses.push(new Bonus(b.position.x + width / 2, b.position.z + height / 2, b.isSpecial)))
      // console.log("bonuses = ", bonuses);
    }
    // engine.stopRenderLoop()
  }

  resetValues() {
    Object.keys(this.stats).forEach(e => this.stats[e] = 0)
  }
}
