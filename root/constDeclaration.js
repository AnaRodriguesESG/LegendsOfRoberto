const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const messageDisplay = document.querySelector('#npcMessages')
const texto = document.querySelector('h2')
const pressF = document.querySelector('h1')

const projectiles = []
const enemyProjectiles = []

const enemies = []

const NPCs = []

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

// const enemyImageDown = new Image()
// enemyImageDown.src = 'enemyStatus/enemyWalkDown.png'

// const enemyImageUp = new Image()
// enemyImageUp.src = 'enemyStatus/enemyWalkUp.png'

// const enemyImageLeft = new Image()
// enemyImageLeft.src = 'enemyStatus/enemyWalkLeft.png'

// const enemyImageRight = new Image()
// enemyImageRight.src = 'enemyStatus/enemyWalkRight.png'

// const enemyImageAttackDown = new Image()
// enemyImageAttackDown.src = 'enemyStatus/enemyAttackDown.png'

// const enemyImageAttackUp = new Image()
// enemyImageAttackUp.src = 'enemyStatus/enemyAttackUp.png'

// const enemyImageAttackLeft = new Image()
// enemyImageAttackLeft.src = 'enemyStatus/enemyAttackLeft.png'

// const enemyImageAttackRight = new Image()
// enemyImageAttackRight.src = 'enemyStatus/enemyAttackRight.png'

const femaleNPC = new Image()
femaleNPC.src = 'NPCSprites/NPCFemale.png'

const maleNPC = new Image()
maleNPC.src = 'NPCSprites/NPCMale.png'

const oldMaleNPC = new Image()
oldMaleNPC.src = 'NPCSprites/NPCOldMale.png'

const background = new Sprite(-2000, -2100, backgroundImage)

const foreground = new Sprite(-2000, -2100, foregroundImage)

const player = new Player(900, 450, playerImage, 4, playerImageUp, playerImageLeft, playerImageRight, playerImage, playerImageAttackDown, playerImageAttackLeft, playerImageAttackRight, playerImageAttackUp)

const enemy1 = createEnemie(-300, 100)
const enemy2 = createEnemie(-900,-200)
const enemy3 = createEnemie(100,-600)
const enemy4 = createEnemie(1800,600, false)
const enemy5 = createEnemie(2000,1500, false)
const enemy6 = createEnemie(1300,2400, false)

enemies.push(enemy1)
enemies.push(enemy2)
enemies.push(enemy3)

const arrayNPCMessages = [["Hello! You must be Roberto!", "The city is under atack by Kingdom Evil", "Please help us!"],
["Thank you so much for your help Roberto!", "We knew you would come to help us!"],
["Ahead is their lair", "Fight them all and the city will be free!"]]

const npc1 = new NPC(560, 410, femaleNPC, arrayNPCMessages[0])
NPCs.push(npc1)

const npc2 = new NPC(-1160, 350, maleNPC, arrayNPCMessages[1])
NPCs.push(npc2)

const npc3 = new NPC(260, -800, oldMaleNPC, arrayNPCMessages[2])
NPCs.push(npc3)

function createEnemie(x, y, visible = true) {

    const enemyImageDown = new Image()
    enemyImageDown.src = 'enemyStatus/enemyWalkDown.png'

    const enemyImageUp = new Image()
    enemyImageUp.src = 'enemyStatus/enemyWalkUp.png'

    const enemyImageLeft = new Image()
    enemyImageLeft.src = 'enemyStatus/enemyWalkLeft.png'

    const enemyImageRight = new Image()
    enemyImageRight.src = 'enemyStatus/enemyWalkRight.png'

    const enemyImageAttackDown = new Image()
    enemyImageAttackDown.src = 'enemyStatus/enemyAttackDown.png'

    const enemyImageAttackUp = new Image()
    enemyImageAttackUp.src = 'enemyStatus/enemyAttackUp.png'

    const enemyImageAttackLeft = new Image()
    enemyImageAttackLeft.src = 'enemyStatus/enemyAttackLeft.png'

    const enemyImageAttackRight = new Image()
    enemyImageAttackRight.src = 'enemyStatus/enemyAttackRight.png'

    return new Enemy(x, y, enemyImageDown, 4, enemyImageUp, enemyImageLeft, enemyImageRight, enemyImageDown, enemyImageAttackDown, enemyImageAttackLeft, enemyImageAttackRight, enemyImageAttackUp, visible)
}



