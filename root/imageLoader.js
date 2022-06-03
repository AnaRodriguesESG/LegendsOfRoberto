class Levels {
    levelsArray = [];
	//array que vai conter os objetos imagem
	
    construtor() {

    }

	draw(level){ //level é um argumento inteiro para escolher o indice do array que tem a imagem que queres
		ctx.drawImage(this.levelsArray[level-1], 0, 0, this.levelsArray[level-1].width,
            this.levelsArray[level-1].height, this.x, this.y, this.width, this.height);
    }

    load(...urlImages){ //método mitico de load a várias imagens
        let i=0;

        for(let url of urlImages){
            this.levelsArray.push(new Image());
            this.levelsArray[i].src=url;
            i++;
        }

        this.levelsArray.forEach(level =>{
            level.addEventListener("load", e=>{ 
                window.dispatchEvent( new CustomEvent('assetLoad', { detail: this }))
            })
        })
    }
}


		
	//Isto funciona 100%, quando tiver os sprites aplico aos sprites o conceito é o mesmo
	
	//Exemplo de funcionamento:
	
	const map = new Level(0,0,canvas.width,canvas.height);
	map.load("Assets/room1.png","Assets/room2.png","Assets/room3.png","Assets/room4.png","Assets/room5.png","Assets/room6.png");
	
	//Repara que podes atirar o numero de argumentos que quiseres para dentro do load