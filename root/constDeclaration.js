const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const projectiles = []

const backgroundImage = new Image()
backgroundImage.src = 'SurfaceMap.png'

const dungeonImage = new Image()
dungeonImage.src = 'DungeonMap.png'

const foregroundImage = new Image()
foregroundImage.src = 'SurfaceMapForeground.png'

const playerImage = new Image()
playerImage.src = 'playerStatus/playerWalkDown.png'

const playerImageUp = new Image()
playerImageUp.src = 'playerStatus/playerWalkUp.png'

const playerImageLeft = new Image()
playerImageLeft.src = 'playerStatus/playerWalkLeft.png'

const playerImageRight = new Image()
playerImageRight.src = 'playerStatus/playerWalkRight.png'

const playerImageAttackDown = new Image()
playerImageAttackDown.src = 'playerStatus/playerAttackDown.png'

const playerImageAttackLeft = new Image()
playerImageAttackLeft.src = 'playerStatus/playerAttackLeft.png'

const playerImageAttackRight = new Image()
playerImageAttackRight.src = 'playerStatus/playerAttackRight.png'

const playerImageAttackUp = new Image()
playerImageAttackUp.src = 'playerStatus/playerAttackUp.png'

const spellImageUp = new Image()
spellImageUp.src = 'spellStatus/spellUp.png'

const spellImageDown = new Image()
spellImageDown.src = 'spellStatus/spellDown.png'

const spellImageLeft = new Image()
spellImageLeft.src = 'spellStatus/spellLeft.png'

const spellImageRight = new Image()
spellImageRight.src = 'spellStatus/spellRight.png'

const background = new Sprite(-2000, -2100, backgroundImage)

const foreground = new Sprite(-2000, -2100, foregroundImage)

const player = new Player(900, 450, playerImage, 4, playerImageUp, playerImageLeft, playerImageRight, playerImage, playerImageAttackDown, playerImageAttackLeft, playerImageAttackRight, playerImageAttackUp)
