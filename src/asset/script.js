 const canvas = document.querySelector('#canvas')
 const c = canvas.getContext('2d'); 

 canvas.width = 1024
 canvas.height = 576

 c.fillRect(0,0,canvas.width,canvas.height)

 const gravity = 0.2
 class Sprite {
     constructor({position, velocity}) {
         this.position = position
         this.velocity = velocity
         this.height = 150
         this.lastKey 
     }
     draw() {
         c.fillStyle = 'red'
         c.fillRect(this.position.x, this.position.y, 50, this.height)
     }
     update() {
         this.draw()
         this.position.y += this.velocity.y
         this.position.x += this.velocity.x

         if (this.position.y + this.height + this.velocity.y >= canvas.height){
             this.velocity.y = 0
         }else {
            this.velocity.y += gravity
         }

     }
 }

 const player = new Sprite({
    position:{
        y: 0,
        x: 0,
    },
    velocity:{
        x:0,
        y:10
    }
})

 const enemy = new Sprite({
    position:{
        y: 100,
        x: 400,
    },
    velocity:{
        x:0,
        y:0
    }
})



 console.log(player)

const key = {
    a:{
        pressed: false
    },
    w:{
        pressed: false
    },
    d:{
        pressed: false
    }
}
// track the last key that was pressed 
let lastKey

 function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0,0,canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
// Player movement
    if(key.a.pressed && lastKey === 'a'){
        player.velocity.x = -1
    }else if (key.d.pressed && lastKey === 'd'){
        player.velocity.x = 1
    }
}

animate()

// to make character move to the right 
window.addEventListener("keydown", (event) =>{
    switch(event.key) {
        case 'd':
            key.d.pressed = true 
            // track the last key that was pressed 
            lastKey = 'd'
            break
        case 'w':
            player.velocity.y = -10
            break
        case 'a':
           key.a.pressed = true
           // track the last key that was pressed 
           lastKey = 'a' 
           break
    }
    console.log(event.key)
})
// make character stop moving when you not holding key
window.addEventListener("keyup", (event) =>{
    switch(event.key) {
        case 'd':
            key.d.pressed = false
            break
        case 'a':
            key.a.pressed = false
            break
        case 'w':
            key.w.pressed = false
            break
    }

})