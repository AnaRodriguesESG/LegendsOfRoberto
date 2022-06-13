canvas.width = 1920
canvas.height = 937

console.log(window.innerWidth, window.inne)

let keyPressed = {
  w: false,
  s: false,
  a: false,
  d: false
}

let sIndex = 0

let npcCollision = {
  collision : false,
  index : 0
}

let collisionMap = []

for (let i = 0; i < surfaceCollisions[0].length; i += 64) {
  collisionMap.push(surfaceCollisions[0].slice(i, 64 + i))
}

let boundaries = []

collisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2434 || symbol === 1942)
      boundaries.push(new Boundary(j * 64 - 2000, i * 64 - 2100, symbol))
  })
})

//Player Movement
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case "w":
      keyPressed.w = true
      player.frames.max = 4
      break
    case "s":
      keyPressed.s = true
      player.frames.max = 4
      break
    case "a":
      keyPressed.a = true
      player.frames.max = 4
      break
    case "d":
      keyPressed.d = true
      player.frames.max = 4
      break
    case "f":
      if(npcCollision.collision === true){
        pressF.classList.add("hide")
        messageDisplay.classList.remove("hide")
        if(sIndex<3 && npcCollision.index==0 || sIndex<2){
        texto.innerHTML = (arrayNPCMessages[npcCollision.index])[sIndex]
        sIndex += 1
        }
        else {
           messageDisplay.classList.add("hide")
           sIndex = 0
        }
      }
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case "w":
      keyPressed.w = false
      player.frames.val = 0
      break
    case "s":
      keyPressed.s = false
      player.frames.val = 0
      break
    case "a":
      keyPressed.a = false
      player.frames.val = 0
      break
    case "d":
      keyPressed.d = false
      player.frames.val = 0
      break
  }
})

window.addEventListener('click', (event) => {

  let playerDirection;

  if (event.clientY < player.position.y + player.height / 2 && event.clientX > player.position.x - 200 && event.clientX < player.position.x + player.width + 200) {
    playerDirection = "Up"
    player.image = player.sprites.attackUp
  }
  else if (event.clientX > player.position.x + player.width / 2 + 200) {
    playerDirection = "Right"
    player.image = player.sprites.attackRight
  }
  else if (event.clientY > player.position.y + player.height / 2 && event.clientX > player.position.x - 200 && event.clientX < player.position.x + player.width + 200) {
    playerDirection = "Down"
    player.image = player.sprites.attackDown
  }
  else if (event.clientX < player.position.x + player.width / 2 - 160) {
    playerDirection = "Left"
    player.image = player.sprites.attackLeft
  }

  let contador = 0;

  let animateAttack = setInterval(() => {
    player.moving = true
    player.draw()
    contador = contador + 6;
    if (contador == 120) {
      clearInterval(animateAttack)
    }
  }, 6)

  const angle = Math.atan2(event.clientY - (player.position.y + player.height / 2), event.clientX - (player.position.x + player.width / 2))

  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle)
  }

  switch(playerDirection) {
    case "Up":
      projectiles.push(new Projectile(player.position.x + player.width, player.position.y + player.height, velocity.x, velocity.y, 8, spellImageUp))
      break
    case "Right":
      projectiles.push(new Projectile(player.position.x + player.width, player.position.y + player.height, velocity.x, velocity.y, 8, spellImageRight))
      break;
    case "Down":
      projectiles.push(new Projectile(player.position.x + player.width, player.position.y + player.height, velocity.x, velocity.y, 8, spellImageDown))
      break
    case "Left":
      projectiles.push(new Projectile(player.position.x + player.width, player.position.y + player.height, velocity.x, velocity.y, 8, spellImageLeft))
      break
  }

  setTimeout(() => {
    switch(playerDirection) {
      case "Up":
        player.image = player.sprites.up
        break
      case "Right":
        player.image = player.sprites.right
        break;
      case "Down":
        player.image = player.sprites.down
        break
      case "Left":
        player.image = player.sprites.left
        break
    }
    player.moving = false
  }, 500)

})


let movables = [background, ...boundaries, foreground, ...enemies, ...NPCs]

function rectangularCollision({ rectangle1, rectangle2 }, offSetX, offSetY) {
  return (
    rectangle1.position.x + offSetX + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x + offSetX <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + offSetY <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + offSetY + rectangle1.height >= rectangle2.position.y
  )
}

function changeMap() {
  
  backgroundImage.src = 'DungeonMap.png'
  background.position.x = 0
  background.position.y = -600

  collisionMap = []

  for (let i = 0; i < surfaceCollisions[1].length; i += 64) {
    collisionMap.push(surfaceCollisions[1].slice(i, 64 + i))
  }

  boundaries = []

  collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1647)
        boundaries.push(new Boundary(j * 64, i * 64 - 600, symbol))
    })
  })

  movables = [background, ...boundaries, foreground, ...enemies, ...NPCs]
  projectiles.splice(0, projectiles.length)
}



//Função que vai recortar o PATH absoluto vindo do browser para comparar com o PATH relativo da imagem
function relativePath(path) {

  return path.slice(path.lastIndexOf("/") + 1, path.length);
}

//Função que vai criar animação e desenhar todos os objetos
function animate() {
  requestAnimationFrame(animate)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  background.draw()
  boundaries.forEach((boundary) => {
    boundary.draw()
  })

  enemy1.draw()
  npc1.draw()
  npc2.draw()
  npc3.draw()
  player.draw()

  console.log(enemy1.position.x + enemy1.width, player.position.x - player.width)

  if (relativePath(backgroundImage.src) !== 'DungeonMap.png') {
    foreground.draw()
  }

  projectiles.forEach((projectile, index) => {
    projectile.update()

    if (projectile.position.x < 0 || projectile.position.x > canvas.width
      || projectile.position.y < 0 || projectile.position.y > canvas.height) {
      projectiles.splice(index, 1)
    }
  })

  let moving = true
  player.moving = false
  if (keyPressed.w) {

    player.moving = true
    player.image = player.sprites.up
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y + 3
          }
        }
      }, 32, 70) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
        moving = false
        break
      }
      else if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y + 3
          }
        }
      }, 32, 70) && boundary.symbol === 1942) {
        changeMap()
        break
      }
    }

    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...enemy,
          position: {
            x: enemy.position.x,
            y: enemy.position.y + 3
          }
        }
      }, 0, 0)) {
        moving = false
        break
      }
    }

    for (let i = 0; i < NPCs.length; i++) {
      const npc = NPCs[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...npc,
          position: {
            x: npc.position.x,
            y: npc.position.y + 3
          }
        }
      }, 20, 20)) {
        moving = false
        npcCollision.collision = true
        npcCollision.index = i
        pressF.classList.remove("hide")
        break
      }
      else {
        npcCollision.collision = false
        pressF.classList.add("hide")
      }
    }
    

    if (moving) {
      movables.forEach(movable => {
        movable.position.y = movable.position.y + 3
      })
      projectiles.forEach(projectile => {
        projectile.position.y = projectile.position.y + 2.3
      })
    }
  }
  if (keyPressed.s) {

    player.moving = true
    player.image = player.sprites.down
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y - 3
          }
        }
      }, 32, 70) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
        moving = false
        break
      }
      else if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y - 3
          }
        }
      }, 32, 70) && boundary.symbol === 1942) {
        changeMap()
        break
      }
    }

    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...enemy,
          position: {
            x: enemy.position.x,
            y: enemy.position.y - 3
          }
        }
      }, 0, 0)) {
        moving = false
        break
      }
    }

    for (let i = 0; i < NPCs.length; i++) {
      const npc = NPCs[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...npc,
          position: {
            x: npc.position.x,
            y: npc.position.y - 3
          }
        }
      }, 20, 20)) {
        moving = false
        npcCollision.collision = true
        npcCollision.index = i
        pressF.classList.remove("hide")
        break
      }
      else {
        npcCollision.collision = false
        pressF.classList.add("hide")
      }
    }

    if (moving) {
      movables.forEach(movable => {
        movable.position.y = movable.position.y - 3
      })
      projectiles.forEach(projectile => {
        projectile.position.y = projectile.position.y - 2.3
      })
    }
  }
  if (keyPressed.a) {

    player.moving = true
    player.image = player.sprites.left
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x + 3,
            y: boundary.position.y
          }
        }
      }, 32, 70) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
        moving = false
        break
      }
      else if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x + 3,
            y: boundary.position.y
          }
        }
      }, 32, 70) && boundary.symbol === 1942) {
        changeMap()
        break
      }
    }

    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...enemy,
          position: {
            x: enemy.position.x + 3,
            y: enemy.position.y
          }
        }
      }, 0, 0)) {
        moving = false
        break
      }
    }

    for (let i = 0; i < NPCs.length; i++) {
      const npc = NPCs[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...npc,
          position: {
            x: npc.position.x + 3,
            y: npc.position.y 
          }
        }
      }, 20, 20)) {
        moving = false
        npcCollision.collision = true
        npcCollision.index = i
        pressF.classList.remove("hide")
        break
      }
      else {
        npcCollision.collision = false
        pressF.classList.add("hide")
      }
    }

    if (moving) {
      movables.forEach(movable => {
        movable.position.x = movable.position.x + 3
      })
      projectiles.forEach(projectile => {
        projectile.position.x = projectile.position.x + 2.3
      })
    }
  }
  if (keyPressed.d) {

    player.moving = true
    player.image = player.sprites.right
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x - 3,
            y: boundary.position.y
          }
        }
      }, 32, 70) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
        moving = false
        break
      }
      else if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x - 3,
            y: boundary.position.y
          }
        }
      }, 32, 70) && boundary.symbol === 1942) {
        changeMap()
        break
      }
    }

    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...enemy,
          position: {
            x: enemy.position.x - 3,
            y: enemy.position.y
          }
        }
      }, 0, 0)) {
        moving = false
        break
      }
    }

    for (let i = 0; i < NPCs.length; i++) {
      const npc = NPCs[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...npc,
          position: {
            x: npc.position.x - 3,
            y: npc.position.y
          }
        }
      }, 20, 20)) {
        moving = false
        npcCollision.collision = true
        npcCollision.index = i
        pressF.classList.remove("hide")
        break
      }
      else {
        npcCollision.collision = false
        pressF.classList.add("hide")
      }
    }

    if (moving) {
      movables.forEach(movable => {
        movable.position.x = movable.position.x - 3
      })
      projectiles.forEach(projectile => {
        projectile.position.x = projectile.position.x - 2.3
      })
    }
  }

}
animate()
