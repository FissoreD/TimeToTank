let levelObjectives = {
  killAllTank: {
    description:
      "NEXT MISSION: Destroy all ennemy chars.",
    goToNextLevel: (e) => {
      return charsAI.length == 0
    },
    tip: [
      ["Tank killed", () => charsDestroyed.length, () => charsDestroyed.length + charsAI.length]
    ],
    msg: [
      "Kill ennemy tanks to go into next level"
    ]
  },
  chronoMission: {
    description:
      `NEXT MISSION: Destroy all ennemy chars.<br>WARNING: a bomb has been planted, you have a limited time!`,
    goToNextLevel: (e) => {
      return charsAI.length == 0
    },
    tip: [
      ["Tank killed", () => charsDestroyed.length, () => charsDestroyed.length + charsAI.length]
    ],
    msg: [
      "The bomb is counting down : kill the ennemies quickly before everything explose!"
    ]
  },
  getAllBonuses: {
    description:
      `NEXT MISSION: Retrieve all bonus supplies to prepare yourself for what's coming!`,
    goToNextLevel: (e) => {
      return bonuses.length == 0
    },
    tip: [["Bonus collected", () => current_level_dico.getBonusObtained(),
      () => bonuses.length + current_level_dico.getBonusObtained()]],
    msg: [
      "You must collect bonuses to go to complete this stage!",
      "The minimap on top-right of the screen can be really useful!"
    ]
  },
  labyrinth: {
    description:
      `NEXT MISSION: Retrieve all bonus supplies to prepare yourself for what's coming!`,
    goToNextLevel: (e) => {
      return bonuses.length == 0
    },
    tip: [["Bonus collected", () => current_level_dico.getBonusObtained(),
      () => bonuses.length + current_level_dico.getBonusObtained()]],
    msg: [
      "You must collect bonuses to complete this stage!",
      "The grey walls can be destroyed by firing on them.",
      "The minimap on top-right of the screen can be really useful!"
    ]
  },
  getBonusesAndKillTanks: {
    description:
      `NEXT MISSION: Destroy all ennemy chars and retrieve all bonus supplies`,
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
      "You must collect bonuses and kill all ennemy tanks to complete this stage!",
      "The minimap on top-right of the screen can be really useful!",
      "You can check the level's objective progression at the top-left of your screen."
    ]
  },
  burnAllBarrels: {
    description:
      `NEXT MISSION: Destroy all the essence barrels to cut down ennemies' supplies.`,
    goToNextLevel: (e) => {
      return barrels.every(barrel => (
        barrel.isBurning
      ));
    },
    tip: [
      ["Barrels burned", () => `${barrels.filter(b => b.isBurning).length}`, () => barrels.length]
    ],
    msg: [
      "Destroy barrels to pass the level!"
    ]
  },
  batteryKillTanks: {
    description:
      `NEXT MISSION: Destroy all ennemy chars.<br>WARNING: batteries are supplying their shield's energy. Push the batteries into water to take down the shields!`,
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
      "Push all the batteries into the water to disable the ennemy tanks' shield!",
      "Be careful, your tank isn't amphibious - don't go too far in the water!"
    ]
  }, getAllRelicsAndTanks: {
    description:
      `NEXT MISSION: Destroy all ennemy chars and retrieve the egyptian relics.<br>WARNING: The ennemies will keep coming as long as there are still relics!`,
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
      "Collect all Egyptian relics to take them away from the ennemies.",
      "Enemy troops will still appear until you secure all these relics!"
    ]
  },
  killBoss: {
    description:
      `NEXT MISSION: Take down the final boss!`,
    goToNextLevel: (e) => {
      return (charsAI.length == 0);
    },
    tip: [
      ["Tank killed", () => charsDestroyed.length,
        () => charsDestroyed.length + charsAI.length]
    ],
    msg: [
      "Kill the boss' sbires to take down his shield!",
      "The Boss is particularly powerful - be careful to not get hit!",
      "The Boss will make his shield reappear and call new sbires after taking too much damage!"
    ]
  },
}