import React from 'react';
import Matter from "matter-js";

import { useEffect } from 'react';
import { useRef } from 'react';
import Grass from '../images/grass.png'

const Game = () => {
    let ref = useRef();

    useEffect(() => {
        let canvas = ref.current;
        let c = canvas.getContext('2d');
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const gravity = 0.5

        // create player 
        class Player {
            constructor() {
                // property that associate with the player 
                this.position = {
                    x: 100,
                    y: 100
                }
                this.velocity = {
                    x: 0,
                    // y velocity will push player down
                    y: 0
                }
                this.width = 30;
                this.height = 30;
            }
            // method that define what the player look like
            draw() {
                c.fillStyle = "red"
                c.fillRect(this.position.x, this.position.y, this.width, this.height);
            }
            // function change player's property overtime
            update() {
                this.draw()
                // moving on x axis
                this.position.x += this.velocity.x
                // moving on y axis
                this.position.y += this.velocity.y
                // if the bottom of the player + its velocity is less than the bottom of the canvas then we will add gravity to it.But when the player pass the screen then velocity will be 0 
                if (this.position.y + this.height + this.velocity.y <= canvas.height)
                    this.velocity.y += gravity
                else this.velocity.y = 0
            }
        }
        // create a platform
        class Platform {
            constructor({ x, y, image }) {
                this.position = {
                    x: x,
                    y: y,
                }
                this.width = 450
                this.height = 50
                this.image = image
            }

            draw() {

                const image = new Image()
                image.src = Grass
                // c.fillStyle = "blue"
                // c.fillRect(this.position.x, this.position.y, this.width, this.height)
                c.drawImage(this.image, this.position.x, this.position.y)
            }
        }

        const image = new Image()
        image.src = Grass

        console.log(image)
        const player = new Player()
        const platforms = [new Platform({
            x: 0,
            y: 600,
            image
        }), new Platform({
            x: 600,
            y: 200,
            image
        }), new Platform({
            x: 1000,
            y: 100,
            image
        }), new Platform({
            x: 1400,
            y: 450,
            image
        }), new Platform({
            x: 1100,
            y: 550,
            image
        }), new Platform({
            x: 2100,
            y: 50,
            image
        })
        ]

        const keys = {
            right: {
                pressed: false
            },
            left: {
                pressed: false
            },
        }
        // track how far player move
        let scrollOffset = 0

        // animation loop 
        function animate() {
            requestAnimationFrame(animate)
            c.clearRect(0, 0, canvas.width, canvas.height)
            platforms.forEach((platform) => {
                platform.draw()
            })
            player.update()
            // we will stop the player from moving to the right at 600px and left at 100px
            if (keys.right.pressed && player.position.x < 600) {
                player.velocity.x = 5
            } else if (keys.left.pressed && player.position.x > 100) {
                player.velocity.x = -5
            } else {
                player.velocity.x = 0
                // platform move 
                // platform moving to the left while player move to the right  
                if (keys.right.pressed) {
                    scrollOffset += 5
                    platforms.forEach((platform) => {
                        platform.position.x -= 5
                    })
                    // platform moving to the left while player move to the right  
                } else if (keys.left.pressed) {
                    scrollOffset -= 5
                    platforms.forEach((platform) => {
                        platform.position.x += 5
                    })
                }
            }
            console.log(scrollOffset)
            // track the player y position vs the platform position aka platform collision detection
            platforms.forEach((platform) => {
                if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
                    player.velocity.y = 0
                }
            })
            // a win conditional? (maybe??)
            if (scrollOffset > 300) {
                // location.href="/login"
                console.log("you win")
            }
        }
        animate()

        window.addEventListener("keydown", ({ keyCode }) => {
            switch (keyCode) {
                case 65:
                    console.log('left')
                    keys.left.pressed = true
                    break
                case 83:
                    console.log('down')
                    break
                case 68:
                    console.log('right')
                    keys.right.pressed = true
                    break
                case 87:
                    console.log('up')
                    player.velocity.y -= 5
                    break
            }
            // console.log(keys.right.pressed)
        })

        window.addEventListener("keyup", ({ keyCode }) => {
            switch (keyCode) {
                case 65:
                    console.log('left')
                    keys.left.pressed = false
                    break
                case 83:
                    console.log('down')
                    break
                case 68:
                    console.log('right')
                    keys.right.pressed = false
                    break
                case 87:
                    console.log('up')
                    player.velocity.y -= 10
                    break
            }
            // console.log(keys.right.pressed)
        })
    });

    return (
        <div>
        <h2>Score:</h2>
        <canvas
            ref={ref}
        //  style={{ width: '100px', height: '100px' }}
        />
        </div>
    );
};

export default Game;
