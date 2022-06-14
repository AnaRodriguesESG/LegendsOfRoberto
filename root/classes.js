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
class Player extends Sprite {

    constructor(x, y, image, max, up, left, right, down, attackDown, attackLeft, attackRight, attackUp) {
        super(x, y, image);
        this.frames = { ...frames, val: 0, elapsed: 0, max }

        this.image.onload = () => {
            this.width = image.width * 1.5 / 4
            this.height = image.height * 0.5
        }

        this.sprites = {
            up: up,
            left: left,
            right: right,
            down: down,
            attackDown: attackDown,
            attackLeft: attackLeft,
            attackRight: attackRight,
            attackUp: attackUp,
        }

        this.life = 6


        this.moving = false

    }

    draw() {
        // ctx.fillStyle = "black"
        // ctx.fillRect(this.position.x + 32, this.position.y + 70, this.width, this.height)
        ctx.drawImage(this.image, this.frames.val * this.image.width / 4, 0, this.image.width / 4, this.image.height, this.position.x, this.position.y, this.image.width * 3.5 / 4, this.image.height * 3.5)

        if (this.moving) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }
            if (this.frames.elapsed % 10 === 0) {
                if (this.frames.val < this.frames.max - 1) {
                    this.frames.val++
                } else this.frames.val = 0
            }
        }
        else {
            this.frames.val = 0
        }

    }

}

class Projectile extends Sprite {
    constructor(x, y, velocityX, velocityY, max, image) {
        super(x, y, image)

        this.frames = { ...frames, val: 0, elapsed: 0, max }
        console.log(image.width, image.height)

        this.width = 64
        this.height = 32

        this.position = {
            x: x,
            y: y
        }

        this.velocity = {
            x: velocityX,
            y: velocityY
        }

        this.moving = false

    }

    draw() {

        ctx.drawImage(this.image, this.frames.val * this.image.width / 8, 0, this.image.width / 8, this.image.height, this.position.x - 80, this.position.y - 50, this.image.width * 2 / 8, this.image.height * 2)
        // ctx.fillStyle = "black"
        // ctx.fillRect(this.position.x - 80, this.position.y + 10, this.width, this.height)
        // console.log(this.width, this.height)

        if (this.moving) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }
            if (this.frames.elapsed % 10 === 0) {
                if (this.frames.val < this.frames.max - 1) {
                    this.frames.val++
                } else this.frames.val = 0
            }
        }

    }

    update() {
        this.moving = true
        this.draw()

        this.position.x += this.velocity.x * 3
        this.position.y += this.velocity.y * 3


    }
}

class Enemy extends Player {

    constructor(x, y, image, max, up, left, right, down, attackDown, attackLeft, attackRight, attackUp, visible) {
        super(x, y, image, max, up, left, right, down, attackDown, attackLeft, attackRight, attackUp)

        this.velocity = {
            x: 0,
            y: 0
        }

        this.life = 3;
    }

    update() {
        if (this.velocity.x === 0 && this.velocity.y === 0) {
            this.moving = false
        }
        else {
            this.moving = true
        }
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class NPC extends Sprite {

    constructor(x, y, image, messages) {
        super(x, y, image)

        this.image.onload = () => {
            this.width = image.width * 1.5
            this.height = image.height * 0.5
        }

        this.position = {
            x: x,
            y: y
        }

        this.image = image

        this.messages = messages
    }

    draw() {
        // ctx.fillStyle = "black"
        // ctx.fillRect(this.position.x + 20, this.position.y + 20 , this.width, this.height)
        ctx.drawImage(this.image, this.position.x, this.position.y, this.image.width * 2, this.image.height * 2)

    }
}