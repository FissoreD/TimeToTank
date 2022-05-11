var button;
var button_list;

class Menu {
    constructor() {
        this.canBeSwitched = true;
        this.toDisplayScenario = false;
        this.isFirst = true;
        this.isShown = true;
        this.inBonus = false;
        this.inNextLevel = false;

        this.bonusPanel = document.getElementById("bonusPanel")
        this.nextLevelPanel = document.getElementById("endLevelStat")

        // this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        // this.buttons = []
        // // this.createButton("Play")
        // this.buttons[0].onPointerUpObservable.add(() => {
        //     this.show(false)
        // });

        // // this.createButton("Restart")
        // this.buttons[1].onPointerUpObservable.add(() => {
        //     this.show(false)
        //     level = 0;
        //     remove_all_objects()
        //     startgame(level);
        // });

        this.show(true)
    }

    createButton(name) {
        // let button = BABYLON.GUI.Button.CreateSimpleButton("button" + name, name);

        // button.width = "150px"
        // button.height = "40px";
        // button.color = "white";
        // button.cornerRadius = 20;
        // button.background = "green";
        // button.top = `${(42 * this.buttons.length)}px`

        // this.advancedTexture.addControl(button);
        // this.buttons.push(button)
    }

    show(toShow) {
        if (toShow) {
            exitPointerLoc()
            if (char1) char1.stabilizeTank()
            document.getElementById("main").classList.remove('hide')
        }
        else {
            this.hideMenu()
            if (this.toDisplayScenario) {
                let text = [
                    `The firm "<they>X</they>" has discovered how to time travel and wants to
                        use it to <they> modify</they > past events to gain money. <br>
                <we>You</we> have succeeded in stealing one of their
                        gear and <we> You</we> are the only one able to avoid terrible things to happen.`,
                    `You have passed the first stage of <we>your</we> journey and now <we>you</we> enter the Egyptian world, <br> where <we>you</we> have to collect the Egyptian tablets away from <they>enemies</they>.<br> <we>Good Luck!</we>`,
                    `This is the last stage of you mission, there are still some <they>bad tank</they> went in Antarctica wanting to melt the ice and build chemical weapon with old virus blocked in the Ice. <br>
                    <we>Win</we> this last mission and the world will be a <we>better place</we>.`
                ]
                document.getElementById('text-mission').innerHTML = text[["Earth", "Sand", "Snow"].indexOf(current_level_dico.biome)];
                if (char1) char1.stabilizeTank()
                this.isShown = true;
                this.displayScenario(true)
                this.toDisplayScenario = false;
                return
            }
        }
        if (this.inBonus)
            if (toShow) this.bonusPanel.classList.add('hide')
            else this.bonusPanel.classList.remove('hide')
        this.toggleNotMenuElement(!toShow)
        if (!this.isFirst) {
            document.getElementById("restart").classList.remove('hide')
            document.getElementById("continue").classList.remove('hide')
            Array.from(document.getElementsByClassName('main')).forEach(e => e.classList.add('hide'))
            if (toShow) {
                chars.forEach(c => c.moveSound.pause())
                engine.stopRenderLoop()
                this.setBackground()
            } else {
                if (!this.inBonus) {
                    musicBackground.play()
                    chars.forEach(c => c.moveSound.play())
                    chars.forEach(e => e.specialBonuses.forEach(b => b.correctTime()))
                    if (chronoLvl) chronoLvl.correctTime()
                    runRenderLoop()
                }
            }
            this.isShown = toShow
        } else {
            this.prettyBG()
            this.isFirst = false;
        }
    }

    prettyBG() {
        // let src = document.getElementById("src")
        // src.style.backgroundImage = `url('images/tank_bg.jpg')`;
        canvas.classList.add('hide');
        // src.classList.remove('hide')
        // src.style.filter = "blur(0)"
        document.getElementById("main").classList.remove('hide')
    }

    setBackground() {
        if (char1.life <= 0) {
            this.prettyBG()
        } else {

        }
    };

    hideMenu() {
        canvas.classList.remove('hide');
        document.getElementById("src").classList.add('hide')
        document.getElementById("main").classList.add('hide')
    }

    /**
     * @param {BonusEnum[]} bonusListe 
     */
    bonusChoice(bonusListe) {
        exitPointerLoc()
        this.inBonus = true;
        this.bonusPanel.classList.remove('hide')
        /**
         * @param {BonusEnum|SpecialBonus} bEnum 
         * @returns 
        */
        let createButton = (bEnum) => {
            let b = document.createElement("button")
            b.onmouseenter = () => scene.menu.soundHover()

            let span1 = document.createElement("span")
            span1.innerHTML = bEnum.name
            let span2 = document.createElement("span")
            span2.innerHTML = bEnum.description
            span2.classList.add("tooltiptext")

            b.appendChild(bEnum.image)
            b.appendChild(span1)
            b.appendChild(span2)

            b.className = "button tooltip"
            b.onclick = () => {
                bonusTookSound.currentTime = 0
                bonusTookSound.play()
                bEnum.addToChar()
                this.bonusPanel.classList.add('hide');
                chars.forEach(e => e.specialBonuses.forEach(b => b.correctTime()))
                if (chronoLvl) chronoLvl.correctTime()
                runRenderLoop()
                this.inBonus = false;
                document.getElementsByClassName('bonusPanel')[0].classList.remove('hide');

                // this.clearBonus()
                this.bonusPanel.innerHTML = "";
                pointerLock()
            }
            this.bonusPanel.appendChild(b);
        }
        bonusListe.forEach(b => createButton(b));
        engine.stopRenderLoop();

        // inMenu = true;
        // let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        // engine.stopRenderLoop();

        // var panel = new BABYLON.GUI.StackPanel();
        // panel.isVertical = false;
        // // panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        // advancedTexture.addControl(panel);

        // bonusListe.forEach(bonus => {
        //     var button_bonus = BABYLON.GUI.Button.CreateSimpleButton("bonus", bonus.name);
        //     button_bonus.width = "400px";
        //     button_bonus.height = "300px";
        //     button_bonus.color = "white";
        //     button_bonus.background = "black";
        //     button_bonus.paddingLeft = "20px";
        //     button_bonus.paddingRight = "20px";
        //     panel.addControl(button_bonus);
        //     button_bonus.onPointerUpObservable.add(function () {
        //         bonus.effect();
        //         selected_bonuses.push(bonus.name);
        //         panel.dispose();
        //         inMenu = false;
        //     });
        // })
    }

    restart() {
        musicBackground.pause()
        globalProgress = true
        engine.stopRenderLoop()
        document.getElementsByClassName('bonusPanel')[0].classList.add('hide');
        let sb = document.getElementsByClassName('specialBonus')[0];
        sb.parentElement.children[0].classList.add('hide');
        sb.classList.add('hide');
        document.getElementById("restart").classList.add('hide');
        document.getElementById("continue").classList.add('hide');
        Array.from(document.getElementsByClassName('main')).forEach(e => e.classList.remove('hide'))
        scene.menu = new Menu()
        level = 0;
        char1.dispose(true)
        this.clearBonus()
        remove_all_objects()
        startgame(level)
    }

    clearBonus() {
        BonusEnum.bonusEnumList.forEach(e => e.resetCounter());
    }

    soundHover() {
        menuHoverSound.currentTime = 0
        menuHoverSound.play()
    }

    inOtherMenu() {
        return scene.menu.inBonus || scene.menu.inNextLevel
    }

    toggleNotMenuElement(toShow) {
        /** @type{HTMLDivElement[]} */
        let elts = Array.from(document.getElementsByClassName("gameBarsClass"))
        let remove = () => {
            elts.forEach(e => {
                if (!(e.classList.contains('bonusPanel') && (char1.specialBonuses.length == 0 && selected_bonuses.length == 0))) {
                    e.classList.remove('hide')
                } else {
                    e.classList.add('hide')
                }
            })
        }
        if (!toShow) elts.forEach(e => e.classList.add('hide'))
        else {
            if (this.inBonusus) {
                this.bonusPanel.classList.remove('hide')
            }
            else if (this.inNextLevel) this.nextLevelPanel.classList.remove('hide')
            else remove()
        }
    }

    isInMenu() {
        return this.isShown || this.inOtherMenu()
    }


    displayScenario(display) {
        console.log("To display", display);
        let elt = document.getElementsByClassName('full-screen')[0]
        if (display) {
            this.toggleNotMenuElement(true)
            elt.classList.remove('hide')
            runRenderLoop()
        }
        else if (!elt.classList.contains('hide')) {
            pointerLock()
            this.show(false)
            elt.classList.add('hide')
            return true
        }
        return false;
    }
}
