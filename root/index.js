const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width=1920
canvas.height=937

console.log(window.innerWidth, window.innerHeight)

keyPressed = {
    w : false,
    s : false,
    a : false,
    d : false
}

let collisionMap = []

for(let i = 0; i < surfaceCollisions[0].length; i += 64) {
    collisionMap.push(surfaceCollisions[0].slice(i, 64 + i))
}

let boundaries = []

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 2434 || symbol === 1942)
        boundaries.push(new Boundary(j * 64 - 2000, i * 64 -2100, symbol))
    })
})

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



const background = new Sprite(-2000, -2100, backgroundImage)

//const background = new Sprite(0, -600, dungeonImage)

const foreground = new Sprite(-2000, -2100, foregroundImage)

const player = new Player(900, 450, playerImage, frames = {max:4}, playerImageUp, playerImageLeft, playerImageRight, playerImage)

//Player Movement
window.addEventListener('keydown', (event) =>{
    switch (event.key){
        case "w":
            keyPressed.w = true
            break
        case "s":
            keyPressed.s = true
            break
        case "a":
            keyPressed.a = true
            break
        case "d":
            keyPressed.d = true
            break
        case " ":

            break
    }
})

window.addEventListener('keyup', (event) =>{
    switch (event.key){
        case "w":
            keyPressed.w = false
            break
        case "s":
            keyPressed.s = false
            break
        case "a":
            keyPressed.a = false
            break
        case "d":
            keyPressed.d = false
            break
        case " ":

            break
    }
})

let movables = [background, ...boundaries, foreground]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.position.x + 32 + rectangle1.width >= rectangle2.position.x &&
      rectangle1.position.x + 32 <= rectangle2.position.x + rectangle2.width &&
      rectangle1.position.y + 70 <= rectangle2.position.y + rectangle2.height &&
      rectangle1.position.y + 70 + rectangle1.height >= rectangle2.position.y
    )
}

function changeMap() {
    backgroundImage.src = 'DungeonMap.png'
    background.position.x = 0
    background.position.y = -600

    collisionMap = []

    for(let i = 0; i < surfaceCollisions[1].length; i += 64) {
        collisionMap.push(surfaceCollisions[1].slice(i, 64 + i))
    }

    boundaries = []

    collisionMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if(symbol === 1647)
            boundaries.push(new Boundary(j * 64 , i * 64 - 600, symbol))
        })
    })

    movables = [background, ...boundaries, foreground]
}
 


//Função que vai criar animação e desenhar todos os objetos
function animate() {
    requestAnimationFrame(animate)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })

    player.draw()

    if(backgroundImage.src !== 'https://anarodriguesesg.github.io/LegendsOfRoberto/root/DungeonMap.png') {
        foreground.draw()
    }
    

    let moving = true
    player.moving = false
    if(keyPressed.w) {

        player.moving = true
        player.image = player.sprites.up
        for(let i=0 ; i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1:player,
                rectangle2:{
                  ... boundary,
                  position:{
                    x:boundary.position.x,
                    y:boundary.position.y + 3
                  }
                }
          }) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
            moving=false
            break
          }
          else if(rectangularCollision({
            rectangle1:player,
            rectangle2:{
              ... boundary,
              position:{
                x:boundary.position.x,
                y:boundary.position.y + 3
              }
            }
      }) && boundary.symbol === 1942){
           changeMap()
           console.log(movables)
           break
          }
        }
             
        if(moving)
        movables.forEach(movable => {
            movable.position.y = movable.position.y + 3
        })
    }
    if(keyPressed.s) {

        player.moving = true
        player.image = player.sprites.down
        for(let i=0 ; i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1:player,
                rectangle2:{
                  ... boundary,
                  position:{
                    x:boundary.position.x,
                    y:boundary.position.y - 3
                  }
                }
          }) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
            moving=false
            break
          }
          else if(rectangularCollision({
            rectangle1:player,
            rectangle2:{
              ... boundary,
              position:{
                x:boundary.position.x,
                y:boundary.position.y - 3
              }
            }
      }) && boundary.symbol === 1942){
           changeMap() 
           break
          } 
        }
             
        if(moving)
        movables.forEach(movable => {
            movable.position.y = movable.position.y - 3
        })
    }
    if(keyPressed.a) {

        player.moving = true
        player.image = player.sprites.left
        for(let i=0 ; i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1:player,
                rectangle2:{
                  ... boundary,
                  position:{
                    x:boundary.position.x + 3,
                    y:boundary.position.y
                  }
                }
          }) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
            moving=false
            break
          }
          else if(rectangularCollision({
            rectangle1:player,
            rectangle2:{
              ... boundary,
              position:{
                x:boundary.position.x + 3,
                y:boundary.position.y
              }
            }
      }) && boundary.symbol === 1942){
           changeMap()
           break
          }   
        }
             
        if(moving)
        movables.forEach(movable => {
            movable.position.x = movable.position.x + 3
        })
    }
    if(keyPressed.d) {

        player.moving = true
        player.image = player.sprites.right
        for(let i=0 ; i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1:player,
                rectangle2:{
                  ... boundary,
                  position:{
                    x:boundary.position.x - 3,
                    y:boundary.position.y
                  }
                }
          }) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
            moving=false
            break
          }
          else if(rectangularCollision({
            rectangle1:player,
            rectangle2:{
              ... boundary,
              position:{
                x:boundary.position.x - 3,
                y:boundary.position.y
              }
            }
      }) && boundary.symbol === 1942){
           changeMap()
           break
          }   
        }
             
        if(moving)
        movables.forEach(movable => {
            movable.position.x = movable.position.x - 3
        })
    }
    
}
animate()


