/*class AnimatedSprite extends Sprite {

    static numberFrames;
    static numberFramesPerRow;
    static slice;

    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.currentFrame = 1;

        this.sx = 0;
        this.sy = 0;
    }

    draw(index) {
        ctx.drawImage(this.images[index-1], this.sx, this.sy, this.slice.width, this.slice.height,
            this.x, this.y, this.width, this.height);
    }

    update() {

        this.currentFrame++;

        if (this.currentFrame > this.numberFrames)
            this.currentFrame = 1;

        let deltaX = (this.currentFrame - 1) % this.numberFramesPerRow;
        let deltaY = Math.floor((this.currentFrame - 1) / this.numberFramesPerRow);

        this.sx = deltaX * this.slice.width;
        this.sy = deltaY * this.slice.height;
    }

    load(numberFrames, numberFramesPerRow,...urlImages) {

        let i=0;

        for(let url of urlImages){
            this.images.push(new Image());
            this.images[i].src=url;
            i++;
        }

        this.images.forEach(image =>{
            image.addEventListener("load", e=>{
                //------------------------------------------//
            this.numberFrames = numberFrames;
            this.numberFramesPerRow = numberFramesPerRow;

            this.slice = {};
            this.slice.width = image.width / numberFramesPerRow;
            let numberRows = Math.ceil(numberFrames / numberFramesPerRow);
            this.slice.height = image.height / numberRows;
                //-------------------------------------------//
            window.dispatchEvent( new CustomEvent('assetLoad', { detail: this }))
            })
        })        

    }
}*/



class GameObject extends EventTarget {

    constructor(x, y, width, height) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() {
        // a redefinir nas classes derivadas 
    }

    draw() {
        // a redefinir nas classes derivadas 

    }
}

// Um Sprite é um GameObject que tem associado uma imagem 
class Sprite extends GameObject {

    static imagem;

    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    update() {
        // a redefinir nas classes derivadas 
    }

    draw() {

        // BUG Resolvido 
        // Substituir Sprite por this.constructor
        /*
        ctx.drawImage(Sprite.imagem, this.x, this.y, this.width, this.height);
        */

        ctx.drawImage(this.constructor.imagem, this.x, this.y, this.width, this.height);
    }

    static load(urlImagem) {

        /*
        Sprite.imagem = new Image();

        Sprite.imagem.addEventListener( "load", ()=> {
            window.dispatchEvent( new CustomEvent('assetLoad', { detail: this }))
        });

        Sprite.imagem.src = urlImagem;
        */

        // BUG RESOLVIDO
        // Substituir Sprite por this

        this.imagem = new Image();

        this.imagem.addEventListener("load", () => {
            window.dispatchEvent(new CustomEvent('assetLoad', { detail: this }))
        });

        this.imagem.src = urlImagem;
    }
}


// Um AnimatedSprite é um Sprite com a capacidade de Animação 
class AnimatedSprite extends Sprite {

    static numberFrames;
    static numberFramesPerRow;
    static slice;

    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.currentFrame = 1;

        this.sx = 0;
        this.sy = 0;
    }

    update() {

        // BUG Resolvido 
        // Substituir AnimatedSprite por this.constructor
        /*
        this.currentFrame++;

        if (this.currentFrame > AnimatedSprite.numberFrames)
            this.currentFrame = 1;

        let deltaX = (this.currentFrame - 1) % AnimatedSprite.numberFramesPerRow;
        let deltaY = Math.floor((this.currentFrame - 1) / AnimatedSprite.numberFramesPerRow);

        this.sx = deltaX * AnimatedSprite.slice.width;
        this.sy = deltaY * AnimatedSprite.slice.height;
        */

        this.currentFrame++;

        if (this.currentFrame > this.constructor.numberFrames)
            this.currentFrame = 1;

        let deltaX = (this.currentFrame - 1) % this.constructor.numberFramesPerRow;
        let deltaY = Math.floor((this.currentFrame - 1) / this.constructor.numberFramesPerRow);

        this.sx = deltaX * this.constructor.slice.width;
        this.sy = deltaY * this.constructor.slice.height;
    }


    draw() {

        // BUG Resolvido 
        // Substituir AnimatedSprite por this.constructor
        /*
        ctx.drawImage(AnimatedSprite.imagem, this.sx, this.sy, AnimatedSprite.slice.width, AnimatedSprite.slice.height,
            this.x, this.y, this.width, this.height);
        */

        ctx.drawImage(this.constructor.imagem, this.sx, this.sy, this.constructor.slice.width, this.constructor.slice.height,
            this.x, this.y, this.width, this.height);
    }

    static load(urlImagem, numberFrames, numberFramesPerRow) {

        this.imagem = new Image();

        this.imagem.src = urlImagem;

        this.imagem.addEventListener('load', () => {

            this.numberFrames = numberFrames;
            this.numberFramesPerRow = numberFramesPerRow;

            this.slice = {};
            this.slice.width = this.imagem.width / numberFramesPerRow;

            let numberRows = Math.ceil(numberFrames / numberFramesPerRow);
            this.slice.height = this.imagem.height / numberRows;

            window.dispatchEvent(new CustomEvent('assetLoad', { detail: this }));

        });

    }

}
