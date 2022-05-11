class BonusEnum {

    static bonusEnumList = [
        new BonusEnum(
            "Speed",
            function () { char1.speedNorme += 1.5 },
            "Your char will go faster",
            "images/speed_tank.png",
            "speedT"
        ),
        new BonusEnum(
            "Reload bullet",
            function () { if (char1.delayMinBetweenBullets >= 100) char1.delayMinBetweenBullets -= 100 },
            "The delay between shoots is faster",
            "images/reload_bullet.png",
            "reloadB"
        ),
        new BonusEnum(
            "Bullets speed",
            function () { char1.bulletSpeed += 20 },
            "Now your bullets will go two time faster !",
            "images/speed_bullet.png",
            "speedB"
        ),
        new BonusEnum(
            "Bonus bullet damage",
            function () { char1.bulletDamage += 3 },
            "With this bonus your bullets will deal 5 more damage",
            "images/bullet_damage.png"
        ),
        new BonusEnum(
            "Bonus char health",
            function () {
                char1.maxHealth += 5
                char1.health += 5
                char1.healtBar.updatePartition()
            },
            "With this bonus your char gains 5 maximum health",
            "images/health.png"
        ),
    ]

    constructor(name, load, description, image, htmlCounter) {
        this.name = name
        this.load = load
        this.description = description;
        this.image = document.createElement("img");
        this.image.src = image
        this.image.classList.add("logo")
        this.image.classList.add("whiteBackground")

        this.htmlCounter = htmlCounter

        this.div = document.createElement('div')
        this.div.classList.add('bg')
        this.div.style.setProperty("--img", `url(../` + image + `)`);
        this.shortcut = document.createElement('div');
        this.shortcut.classList.add('shortcut');
        this.shortcut.innerHTML = 0;
        this.div.appendChild(this.shortcut);

        this.added = false
        // < div class="bg" style = "--img: url('../images/speed_bullet.png')" >
        //     <div id="speedB" class="shortcut">0</div>
        // </div >
    }

    addToChar() {
        if (!this.added && BonusEnum.bonusEnumList.includes(this)) {
            this.added = true
            document.getElementById("normalBonus").appendChild(this.div);
        }
        console.log('HERE');
        let htmlParent = document.getElementsByClassName('normalBonus')[0];
        let bonusText = htmlParent.previousElementSibling;
        bonusText.classList.remove('hide');
        this.div.classList.remove('hide');
        this.shortcut.innerHTML = parseInt(this.shortcut.innerHTML) + 1
        selected_bonuses.push(this.name);
        this.load()
    }

    resetCounter() {
        let htmlParent = document.getElementsByClassName('normalBonus')[0];
        let bonusText = htmlParent.previousElementSibling;
        bonusText.classList.add('hide');
        BonusEnum.bonusEnumList.forEach(e => e.div.classList.add('hide'));
        this.shortcut.innerHTML = 0;
    }
}