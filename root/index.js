const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

console.log(surfaceCollisions)

canvas.width=1024
canvas.height=540

const collisionMap = []

for(let i = 0; i < surfaceCollisions.length; i += 64) {
    collisionMap.push(surfaceCollisions.slice(i, 64 + i))
    
}

class Boundary {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.width = 64
        this.height = 64
    }

    draw() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 2434)
        boundaries.push(new Boundary(j * 64 - 2300, i * 64 -2400))
    })
})

const test = new Boundary(400, 200)

keyPressed = {
    w : false,
    s : false,
    a : false,
    d : false
}

const backgroundImage = new Image()
backgroundImage.src = 'SurfaceMap.png'

const playerImage = new Image()
playerImage.src = 'playerStatus/playerWalkDown.png'

console.log(backgroundImage)
console.log(playerImage)

class Sprite {
    constructor(x, y, image) {
        this.position = {
            x: x,
            y: y
        }
        
        this.image = image
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite(-2300, -2400, backgroundImage)

// Player 
class Player extends Sprite{
    
    
    constructor(x, y, image, frames = {max:1}) {
        super(x, y, image);
        this.frames = {...frames, val:0, elapsed:0}

        this.image.onload = () => {
            this.width = image.width * 1.5 / 4
            this.height = image.height * 0.5
        }
        

    }

    draw() {
        ctx.fillStyle = "black"
        ctx.fillRect(this.position.x + 32, this.position.y + 60, this.width, this.height)
        ctx.drawImage(this.image, this.frames.val * this.image.width / 4 , 0, this.image.width / 4, this.image.height, this.position.x, this.position.y, this.image.width * 3.5 / 4 , this.image.height * 3.5)
        
        if(this.frames.max>1){
            this.frames.elapsed ++
        }
          if(this.frames.elapsed % 10 === 0){
            if(this.frames.val<this.frames.max-1)this.frames.val ++
            else this.frames.val=0
          }  
        }              


    update() {
        
    }
    
}

const player = new Player(400, 150, playerImage)

//Player Movement
window.addEventListener('keydown', (event) =>{
    switch (event.key){
        case "w":
            keyPressed.w = true
            //playerImage.src = 'playerStatus/playerWalkUp.png'
            break
        case "s":
            keyPressed.s = true
            //playerImage.src = 'playerStatus/playerWalkDown.png'
            break
        case "a":
            keyPressed.a = true
           // playerImage.src = 'playerStatus/playerWalkLeft.png'
            break
        case "d":
            keyPressed.d = true
           // playerImage.src = 'playerStatus/playerWalkRight.png'
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

const movables = [background, ...boundaries]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.position.x + 32 + rectangle1.width >= rectangle2.position.x &&
      rectangle1.position.x + 32 <= rectangle2.position.x + rectangle2.width &&
      rectangle1.position.y + 60 <= rectangle2.position.y + rectangle2.height &&
      rectangle1.position.y + 60 + rectangle1.height >= rectangle2.position.y
    )
  }
 


//Função que vai criar animação e desenhar todos os objetos
function animate() {
    requestAnimationFrame(animate)

    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()

        if(rectangularCollision({rectangle1: player, rectangle2: boundary })) {
            console.log("colision")
            //console.log(boundary.width, boundary.height)
            //console.log("position",boundary.position.x, boundary.position.y)
            //console.log(player.width, player.height)
        }
    })

    player.draw()

    let moving = true
    if(keyPressed.w) {

        for(let i=0 ; i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1:player,
                rectangle2:{
                  ... boundary,
                  position:{
                    x:boundary.position.x,
                    y:boundary.position.y + 1.3
                  }
                }
          })) {
            moving=false
            break
          }    
        }
             
        if(moving)
        movables.forEach(movable => {
            movable.position.y = movable.position.y + 1.3
        })
    }
    if(keyPressed.s) {
        for(let i=0 ; i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1:player,
                rectangle2:{
                  ... boundary,
                  position:{
                    x:boundary.position.x,
                    y:boundary.position.y - 1.3
                  }
                }
          })) {
            moving=false
            break
          }    
        }
             
        if(moving)
        movables.forEach(movable => {
            movable.position.y = movable.position.y - 1.3
        })
    }
    if(keyPressed.a) {
        for(let i=0 ; i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1:player,
                rectangle2:{
                  ... boundary,
                  position:{
                    x:boundary.position.x + 1.3,
                    y:boundary.position.y
                  }
                }
          })) {
            moving=false
            break
          }    
        }
             
        if(moving)
        movables.forEach(movable => {
            movable.position.x = movable.position.x + 1.3
        })
    }
    if(keyPressed.d) {
        for(let i=0 ; i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1:player,
                rectangle2:{
                  ... boundary,
                  position:{
                    x:boundary.position.x - 1.3,
                    y:boundary.position.y
                  }
                }
          })) {
            moving=false
            break
          }    
        }
             
        if(moving)
        movables.forEach(movable => {
            movable.position.x = movable.position.x - 1.3
        })
    }
    
}
animate()


