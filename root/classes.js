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


        this.moving = false

    }

    draw() {
        // ctx.fillStyle = "black"
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
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

    }

}

class Projectile extends Sprite {
    constructor(x, y, velocityX, velocityY, max, image) {
        super(x, y, image)

        this.frames = { ...frames, val: 0, elapsed: 0, max }

        image.onload = () => {
            this.width = image.width / 8
            this.height = image.height
        }

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
        // ctx.fillRect(this.position.x - 80, this.position.y + 10 , this.image.width / 8, this.image.height / 8)


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