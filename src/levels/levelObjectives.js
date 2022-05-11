let levelObjectives = {
  killAllTank: {
    description:
      "Complete the next stage by destroying every enemy tank",
    goToNextLevel: (e) => {
      return charsAI.length == 0
    },
    tip: [
      ["Tank killed", () => charsDestroyed.length, () => charsDestroyed.length + charsAI.length]
    ],
    msg: [
    ]
  },
  chronoMission: {
    description:
      `The ennemies have planted a bomb, and are plannign to activate it! 
      Detroy all of them before the countdown goes to 0`,
    goToNextLevel: (e) => {
      return charsAI.length == 0
    },
    tip: [
      ["Tank killed", () => charsDestroyed.length, () => charsDestroyed.length + charsAI.length]
    ],
    msg: [
      "This is a temporized level : <br> kill enemies before everything explose !"
    ]
  },
  getAllBonuses: {
    description:
      `Complete the next stage by picking up all bonus supplied`,
    goToNextLevel: (e) => {
      return bonuses.length == 0
    },
    tip: [["Bonus collected", () => current_level_dico.getBonusObtained(),
      () => bonuses.length + current_level_dico.getBonusObtained()]],
    msg: [
      "You must collect bonuses to<br> go to next level !"
    ]
  },
  getBonusesAndKillTanks: {
    description:
      `Complete the next stage by collecting all of the bonus supplied 
      and destroying every enemy tank`,
    goToNextLevel: (e) => {
      return (bonuses.length == 0 && charsAI.length == 0)
    },
    tip: [
      ["Bonus collected", () => current_level_dico.getBonusObtained(),
        () => bonuses.length + current_level_dico.getBonusObtained()],
      ["Tank killed", () => charsDestroyed.length,
        () => charsDestroyed.length + charsAI.length]
    ],
    msg: [
    ]
  },
  burnAllBarrels: {
    description:
      `Destroy all the essence barrels to cut down ennemies' supplies`,
    goToNextLevel: (e) => {
      return barrels.every(barrel => (
        barrel.isBurning
      ));
    },
    tip: [
      ["Barrels burned", () => `${barrels.filter(b => b.isBurning).length}`, () => barrels.length]
    ],
    msg: [
      "Destroy barrels, to pass the level !"
    ]
  },
  batteryKillTanks: {
    description:
      `Complete the next stage by destroying all of the batteries which energy the ennemies shield
      and destroying every enemy tanks`,
    goToNextLevel: (e) => {
      return (batteries.every(b => b.isDestroyed) && (charsAI.length == 0));
    },
    tip: [
      ["Battery disabled", () => current_level_dico.getBatteryDestroyed(),
        () => batteries.length + current_level_dico.getBatteryDestroyed()],
      ["Tank killed", () => charsDestroyed.length,
        () => charsDestroyed.length + charsAI.length]
    ],
    msg: [
      "Push batteries into water to disable tanks shield !",
      "Remember : batteries are not baloons<br>But sometimes..."
    ]
  },getAllRelicsAndTanks: {
    description:
      `Complete the next stage by collecting all of the Egyptian relics
      and destroying every enemy tank`,
    goToNextLevel: (e) => {
      return (relics.length == 0 && charsAI.length == 0)
    },
    tip: [
      ["Relic collected", () => current_level_dico.getRelicObtained(),
        () => relics.length + current_level_dico.getRelicObtained()],
      ["Tank killed", () => charsDestroyed.length,
        () => charsDestroyed.length + charsAI.length]
    ],
    msg: [
      "Collect all Egyptian relics before the enemy takes them.",
      "Enemy troops will still appear until you secure these relics!"
    ]
  },
}