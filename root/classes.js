//Collisions class
class Boundary {
    constructor(x, y, symbol) {
        this.position = {
            x: x,
            y: y
        }
        this.width = 64
        this.height = 64
        this.symbol = symbol
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//Sprite class
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

//Player class
class Player extends Sprite{
    
    constructor(x, y, image, frames = {max:4}, up, left , right, down) {
        super(x, y, image);
        this.frames = {...frames, val:0, elapsed:0}

        this.image.onload = () => {
            this.width = image.width * 1.5 / 4
            this.height = image.height * 0.5
        }

        this.sprites = {
            up: up,
            left: left,
            right: right,
            down: down
        }


        this.moving = false

    }

    draw() {
        // ctx.fillStyle = "black"
        // ctx.fillRect(this.position.x + 32, this.position.y + 60, this.width, this.height)
        ctx.drawImage(this.image, this.frames.val * this.image.width / 4 , 0, this.image.width / 4, this.image.height, this.position.x, this.position.y, this.image.width * 3.5 / 4 , this.image.height * 3.5)
        
        if(this.moving) {
            
            if(this.frames.max>1){
                this.frames.elapsed++
            }
            if(this.frames.elapsed % 10 === 0){
                if(this.frames.val<this.frames.max-1)this.frames.val++
                else this.frames.val=0
            }
        }
        
    }              


    update() {
        
    }
    
}