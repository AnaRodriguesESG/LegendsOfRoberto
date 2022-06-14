canvas.width = 1920
canvas.height = 937

let keyPressed = {
  w: false,
  s: false,
  a: false,
  d: false
}

let enemiesKilled = 0

let lastTimeStamp = 0;

let sIndex = 0

let npcCollision = {
  collision: false,
  index: 0
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
      if (npcCollision.collision === true) {
        pressF.classList.add("hide")
        messageDisplay.classList.remove("hide")
        if (sIndex < 3 && npcCollision.index == 0 || sIndex < 2) {
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

  switch (playerDirection) {
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
    switch (playerDirection) {
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

  console.log(projectiles)

})

function enemyAttack(enemy, timeStamp) {
  lastTimeStamp = 0

  let enemyDirection;

  if (relativePath(enemy.image.src) === 'enemyWalkUp.png' || relativePath(enemy.image.src) === 'enemyAttackUp.png') {
    enemyDirection = "Up"
    enemy.image = enemy.sprites.attackUp
  }
  else if (relativePath(enemy.image.src) === 'enemyWalkDown.png' || relativePath(enemy.image.src) === 'enemyAttackDown.png') {
    enemyDirection = "Down"
    enemy.image = enemy.sprites.attackDown
  }
  else if (relativePath(enemy.image.src) === 'enemyWalkLeft.png' || relativePath(enemy.image.src) === 'enemyAttackLeft.png') {
    enemyDirection = "Left"
    enemy.image = enemy.sprites.attackLeft
  }
  else if (relativePath(enemy.image.src) === 'enemyWalkRight.png' || relativePath(enemy.image.src) === 'enemyAttackRight.png') {
    enemyDirection = "Right"
    enemy.image = enemy.sprites.attackRight
  }

  //console.log((timeStamp - lastTimeStamp) % 5000)

  const angle = Math.atan2(player.position.y - (enemy.position.y + enemy.height / 2), player.position.x - (enemy.position.x + enemy.width / 2))

  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle)
  }
  if ((timeStamp - lastTimeStamp) % 5000 > 3000 && (timeStamp - lastTimeStamp) % 5000 < 3010) {

    let animateAttack = setInterval(() => {
      enemy.moving = true
      enemy.draw()
      contador = contador + 6;
      if (contador == 120) {
        clearInterval(animateAttack)
      }
    }, 1000)

    switch (enemyDirection) {
      case "Up":
        enemyProjectiles.push(new Projectile(enemy.position.x + enemy.width, enemy.position.y + enemy.height, velocity.x, velocity.y, 8, spellImageUp))
        break
      case "Right":
        enemyProjectiles.push(new Projectile(enemy.position.x + enemy.width, enemy.position.y + enemy.height, velocity.x, velocity.y, 8, spellImageRight))
        break;
      case "Down":
        enemyProjectiles.push(new Projectile(enemy.position.x + enemy.width, enemy.position.y + enemy.height, velocity.x, velocity.y, 8, spellImageDown))
        break
      case "Left":
        enemyProjectiles.push(new Projectile(enemy.position.x + enemy.width, enemy.position.y + enemy.height, velocity.x, velocity.y, 8, spellImageLeft))
        break
    }

    setTimeout(() => {
      switch (enemyDirection) {
        case "Up":
          enemy.image = enemy.sprites.up
          break
        case "Right":
          enemy.image = enemy.sprites.right
          break;
        case "Down":
          enemy.image = enemy.sprites.down
          break
        case "Left":
          enemy.image = enemy.sprites.left
          break
      }
      enemy.moving = false
    }, 500)

  }
  lastTimeStamp = timeStamp
  let contador = 0;
}


let movables = [background, ...boundaries, foreground, ...enemies, ...NPCs]

function rectangularCollision({ rectangle1, rectangle2 }, offSetX, offSetY) {
  return (
    rectangle1.position.x + offSetX + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x + offSetX <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + offSetY <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + offSetY + rectangle1.height >= rectangle2.position.y
  )
}

function rectangularCollision2({ rectangle1, rectangle2 }, offSetX, offSetY) {
  // console.log(rectangle1.position.x + offSetX + rectangle1.width >= rectangle2.position.x,
  //   rectangle1.position.x + offSetX <= rectangle2.position.x + rectangle2.width,
  //   rectangle1.position.y + offSetY <= rectangle2.position.y + rectangle2.height,
  //   rectangle1.position.y + offSetY + rectangle1.height >= rectangle2.position.y)
  return (
    rectangle1.position.x + offSetX + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x + offSetX <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + offSetY <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + offSetY + rectangle1.height >= rectangle2.position.y
  )
}

function fightCollision({ rectangle1, rectangle2 }, offSetX, offSetY, offSetWidth, offSetHeight) {
  return (
    rectangle1.position.x + offSetX + rectangle1.width * offSetWidth >= rectangle2.position.x &&
    rectangle1.position.x + offSetX <= rectangle2.position.x + rectangle2.width * offSetWidth &&
    rectangle1.position.y + offSetY <= rectangle2.position.y + rectangle2.height * offSetHeight &&
    rectangle1.position.y + offSetY + rectangle1.height * offSetHeight >= rectangle2.position.y
  )
}

function calcDirection(enemy) {

  let angle = Math.atan2(player.position.y - enemy.position.y, player.position.x - enemy.position.x)

  let velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle)
  }

  if ((velocity.x >= 0 && velocity.y < -0.45) || (velocity.x <= 0 && velocity.y < -0.45)) {
    enemy.image = enemy.sprites.up
  }
  else if ((velocity.x >= 0 && velocity.y > 0.45) || (velocity.x <= 0 && velocity.y > 0.45)) {
    enemy.image = enemy.sprites.down
  }
  else if (velocity.x < 0 && velocity.y >= 0) {
    enemy.image = enemy.sprites.left
  }
  else if (velocity.x > 0 && velocity.y <= 0.45 && velocity.y >= -0.45) {
    enemy.image = enemy.sprites.right
  }

  return velocity

}

function moveTowardsPlayer(enemy) {

  enemy.velocity.x = calcDirection(enemy).x
  enemy.velocity.y = calcDirection(enemy).y
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
  enemies.splice(0, enemies.length)

  enemies.push(enemy4)
  enemies.push(enemy5)
  enemies.push(enemy6)

  projectiles.splice(0, projectiles.length)
  enemyProjectiles.splice(0, enemyProjectiles.length)

  
  NPCs.splice(0, NPCs.length)

  movables = [background, ...boundaries, foreground, ...enemies, ...NPCs]
}



//Função que vai recortar o PATH absoluto vindo do browser para comparar com o PATH relativo da imagem
function relativePath(path) {

  return path.slice(path.lastIndexOf("/") + 1, path.length);
}

//Função que vai criar animação e desenhar todos os objetos
function animate(timeStamp) {
  let id = requestAnimationFrame(animate)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  background.draw()
  boundaries.forEach((boundary) => {
    boundary.draw()
  })

  //console.log(enemies)
  enemies.forEach(enemy => {
    enemy.update()
    enemy.moving = false
    enemy.velocity.x = 0
    enemy.velocity.y = 0
  })

  NPCs.forEach(npc => {
    npc.draw()
  })
  player.draw()

  if (relativePath(backgroundImage.src) !== 'DungeonMap.png') {
    foreground.draw()
  }

  if(enemiesKilled === 6) {
    alert("GAME OVER!")
    cancelAnimationFrame(id)
  }

  projectiles.forEach((projectile, index) => {
    projectile.update()

    if (projectile.position.x < 0 || projectile.position.x > canvas.width
      || projectile.position.y < 0 || projectile.position.y > canvas.height) {
      projectiles.splice(index, 1)
    }

    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i]

      if (rectangularCollision({
        rectangle1: projectile,
        rectangle2: {
          ...enemy,
          position: {
            x: enemy.position.x,
            y: enemy.position.y + 3
          }
        }
      }, -100, -60)) {
        projectiles.splice(index, 1)
        if (enemy.life > 0) {
          enemy.life--
        }
        else {
          enemies.splice(i, 1)
          enemiesKilled++
        }
        break
      }

      if (rectangularCollision({
        rectangle1: projectile,
        rectangle2: {
          ...enemy,
          position: {
            x: enemy.position.x,
            y: enemy.position.y - 3
          }
        }
      }, -100, -60)) {
        projectiles.splice(index, 1)
        if (enemy.life > 0) {
          enemy.life--
        }
        else {
          enemies.splice(i, 1)
          enemiesKilled++
        }
        break
      }

      if (rectangularCollision({
        rectangle1: projectile,
        rectangle2: {
          ...enemy,
          position: {
            x: enemy.position.x + 3,
            y: enemy.position.y
          }
        }
      }, -100, -60)) {
        projectiles.splice(index, 1)
        if (enemy.life > 0) {
          enemy.life--
        }
        else {
          enemies.splice(i, 1)
          enemiesKilled++
        }
        break
      }

      if (rectangularCollision({
        rectangle1: projectile,
        rectangle2: {
          ...enemy,
          position: {
            x: enemy.position.x - 3,
            y: enemy.position.y
          }
        }
      }, -100, -60)) {
        projectiles.splice(index, 1)
        if (enemy.life > 0) {
          enemy.life--
        }
        else {
          enemies.splice(i, 1)
          enemiesKilled++
        }
        break
      }
    }
  })

  enemyProjectiles.forEach((projectile, index) => {
    projectile.update()
    console.log(projectile)

    if (projectile.position.x < 0 || projectile.position.x > canvas.width
      || projectile.position.y < 0 || projectile.position.y > canvas.height) {
      enemyProjectiles.splice(index, 1)
    }

    if (rectangularCollision({
      rectangle1: player,
      rectangle2: {
        projectile,
        position: {
          x: projectile.position.x,
          y: projectile.position.y + 3
        }
      }
    }, -80, 10)) {
      enemyProjectiles.splice(index, 1)
      if (player.life > 0) {
        player.life--
      }
      else {
        alert("MORREU!")
      }
    }

    if (rectangularCollision({
      rectangle1: player,
      rectangle2: {
        projectile,
        position: {
          x: projectile.position.x,
          y: projectile.position.y - 3
        }
      }
    }, -80, 10)) {
      enemyProjectiles.splice(index, 1)
      if (player.life > 0) {
        player.life--
      }
      else {
        alert("MORREU!")
      }
    }

    if (rectangularCollision({
      rectangle1: player,
      rectangle2: {
        projectile,
        position: {
          x: projectile.position.x + 3,
          y: projectile.position.y
        }
      }
    }, -80, 10)) {
      enemyProjectiles.splice(index, 1)
      if (player.life > 0) {
        player.life--
      }
      else {
        alert("MORREU!")
      }
    }

    if (rectangularCollision({
      rectangle1: player,
      rectangle2: {
        projectile,
        position: {
          x: projectile.position.x - 3,
          y: projectile.position.y
        }
      }
    }, -80, 10)) {
      enemyProjectiles.splice(index, 1)
      if (player.life > 0) {
        player.life--
      }
      else {
        alert("MORREU!")
      }
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
        console.log(i)
        moving = false
        enemy.velocity.x = 0
        enemy.velocity.y = 0
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
      enemyProjectiles.forEach(projectile => {
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
      enemyProjectiles.forEach(projectile => {
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
      enemyProjectiles.forEach(projectile => {
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
      enemyProjectiles.forEach(projectile => {
        projectile.position.x = projectile.position.x - 2.3
      })
    }
  }

  loop1:
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i]
    //W
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y + 3
          }
        }
      }, 32, 70) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
        enemy.velocity.x = 0
        enemy.velocity.y = 0
        enemy.position.y += -3
        break loop1
      }
    }
    if (fightCollision({
      rectangle1: player,
      rectangle2: {
        ...enemy,
        position: {
          x: enemy.position.x,
          y: enemy.position.y + 3
        }
      }
    }, 0, 3, 4, 9)) {
      enemy.velocity.x = 0
      enemy.velocity.y = 0
      lastTimeStamp = 0
      if (timeStamp - lastTimeStamp >= 500) {
        calcDirection(enemy)
        lastTimeStamp = timeStamp
      }
      enemyAttack(enemy, timeStamp)
      break
    }
    if (fightCollision({
      rectangle1: player,
      rectangle2: {
        ...enemy,
        position: {
          x: enemy.position.x,
          y: enemy.position.y + 3
        }
      }
    }, 0, 0, 8, 18)) {
      moveTowardsPlayer(enemy)
      break
    }
    //S
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x,
            y: boundary.position.y - 3
          }
        }

      }, 32, 70) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
        enemy.velocity.x = 0
        enemy.velocity.y = 0
        enemy.position.y += 3
        break loop1
      }
    }
    if (fightCollision({
      rectangle1: player,
      rectangle2: {
        ...enemy,
        position: {
          x: enemy.position.x,
          y: enemy.position.y - 3
        }
      }
    }, 0, 3, 4, 9)) {
      enemy.velocity.x = 0
      enemy.velocity.y = 0
      lastTimeStamp = 0
      if (timeStamp - lastTimeStamp >= 500) {
        calcDirection(enemy)
        lastTimeStamp = timeStamp
      }
      enemyAttack(enemy, timeStamp)
      break
    }
    if (fightCollision({
      rectangle1: player,
      rectangle2: {
        ...enemy,
        position: {
          x: enemy.position.x,
          y: enemy.position.y - 3
        }
      }
    }, 0, 0, 8, 18)) {
      moveTowardsPlayer(enemy)
      break
    }
    //A
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x + 3,
            y: boundary.position.y
          }
        }
      }, 32, 70) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
        enemy.velocity.x = 0
        enemy.velocity.y = 0
        enemy.position.x += 3
        break loop1
      }
    }
    if (fightCollision({
      rectangle1: player,
      rectangle2: {
        ...enemy,
        position: {
          x: enemy.position.x + 3,
          y: enemy.position.y
        }
      }
    }, 0, 3, 4, 9)) {
      enemy.velocity.x = 0
      enemy.velocity.y = 0
      lastTimeStamp = 0
      if (timeStamp - lastTimeStamp >= 500) {
        calcDirection(enemy)
        lastTimeStamp = timeStamp
      }
      enemyAttack(enemy, timeStamp)
      break
    }
    if (fightCollision({
      rectangle1: player,
      rectangle2: {
        ...enemy,
        position: {
          x: enemy.position.x + 3,
          y: enemy.position.y
        }
      }
    }, 0, 0, 8, 18)) {
      moveTowardsPlayer(enemy)
      break
    }
    //D
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x - 3,
            y: boundary.position.y
          }
        }
      }, 32, 70) && (boundary.symbol === 2434 || boundary.symbol === 1647)) {
        enemy.velocity.x = 0
        enemy.velocity.y = 0
        enemy.position.x += -3
        break loop1
      }
    }
    if (fightCollision({
      rectangle1: player,
      rectangle2: {
        ...enemy,
        position: {
          x: enemy.position.x - 3,
          y: enemy.position.y
        }
      }
    }, 0, 3, 4, 9)) {
      enemy.velocity.x = 0
      enemy.velocity.y = 0
      lastTimeStamp = 0
      if (timeStamp - lastTimeStamp >= 500) {
        calcDirection(enemy)
        lastTimeStamp = timeStamp
      }
      enemyAttack(enemy, timeStamp)
      break
    }
    if (fightCollision({
      rectangle1: player,
      rectangle2: {
        ...enemy,
        position: {
          x: enemy.position.x - 3,
          y: enemy.position.y
        }
      }
    }, 0, 0, 8, 18)) {
      moveTowardsPlayer(enemy)
      break
    }

  }

}
animate()
