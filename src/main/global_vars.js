export var cell_x_number = 40;
export var cell_y_number = 40;

export var cell_size = 1;

export var width = cell_x_number * cell_size;
export var height = cell_y_number * cell_size;

/** @type {[Char]} */
export var charsAI = [];

/** @type {[Char]} */
export var charsAllies = [];

/** @type {[Char]} */
export var charsAllAllies = [];

/** @type {[Char]} */
export var chars = [];

/** @type {[Char]} */
export var charsDestroyed = [];

/** @type {[Bonus]} */
export var bonuses = [];

/** @type {[Bonus]} */
export var selected_bonuses = [];

/** @type {[BonusEnum]} */
export var addedObtainableBonus = [];

/** @type {[Wall]} */
export var walls = [];

/** @type {[DelimiterMesh]} */
export var delimiters = [];

/** @type {[Barrel]} */
export var barrels = [];

/** @type {[Battery]} */
export var batteries = [];

/** @type {[Bullet]} */
export var bullets = []

/** @type {[Grenades]} */
export var grenades = []

/** @type {[Tree]} */
export var trees = []

/** @type {[Rock]} */
export var rocks = []

/** @type {[House]} */
export var houses = []

/** @type {[Relic]} */
export var relics = []

export var gravity = -9.81

export let globalProgress = [true]

export var mousepos = { x: 0, y: 0 };

export var inputStates = {};

export var reloadMultUti = [1];

export var impostorCharList = [];

export var wallTexture = new Image();
wallTexture.src = './images/wallTexture.jpg';

export var wallDTexture = new Image();
wallDTexture.src = './images/wallDTexture.jpg';

export var bulletImage = new Image();
bulletImage.src = './images/bullet.png';

//Sound effects
export let explosionSound = new Audio('audio/Explosion2.mp3');
explosionSound.volume = 0.2;

export let applauseSound = new Audio('audio/Human-Applause-LargeCrowd01.mp3');

export let menuHoverSound = new Audio('audio/hoverMenu.mp3');
menuHoverSound.volume = 0.2

export let bonusTookSound = new Audio('audio/hammer.mp3');
bonusTookSound.volume = 0.2

export let relicSound = new Audio('audio/egyptian-discovery.wav');
bonusTookSound.volume = 0.3

// let musicBackground = new Audio('audio/warmusic.mp3')
export let musicBackground = [new Audio('audio/warmusic-cut.mp3')]
musicBackground[0].volume = 0.1
musicBackground[0].loop = true
musicBackground[0].pause()
