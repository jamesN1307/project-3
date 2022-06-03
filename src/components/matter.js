import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import aang from "../images/aang.png"
import grass from "../images/grass.png"
import soldier from "../images/soldier.png"
import wind from "../images/hurricane_PNG56.png"

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  } s


  componentDidMount() {
    Matter.use(
      'matter-attractors'
    )
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "white"
      },
    });

    const mainEngine = engine.world;

    // ----OBJECTS TO BE RENDERED WITHIN MATTER----//


    //PLAYER CHARACTER
    const player = {
      score: 0,
      //track whether the box has jumped
      hasJumped: false,
      fallen: false,
      body: Bodies.rectangle(400, 200, 80, 80, {
        inertia: Infinity,
        friction: 0.1,
        render: {
          sprite: {
            texture: aang,
            xScale: 0.3,
            yScale: 0.3
          }
        },
        plugin: {
          attractors: [
            function(bodyA, bodyB) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                y: (bodyA.position.y - bodyB.position.y) * 1e-6,
              };
            }
          ]
        },
        label: 'player',
      }),

      lastShot: Date.now(),
      cooldown: 300,
      fireForce: 2,
      fire() {
        if (Date.now() - this.lastShot < this.cooldown) {
          return;
        }

        // move the bullet away from the player a bit
        const { x: bx, y: by } = this.body.position;
        const x = bx + (Math.cos(this.body.angle) * 10);
        const y = by + (Math.sin(this.body.angle) * 10);

        const bullet = Matter.Bodies.circle(
          x, y, 4, {
          frictionAir: 0.006,
          label: "bullet",
          density: 0.1,
          render:{
            sprite:{
              texture: wind,
              xScale: 0.3,
              yScale: 0.3
            }
          }
        },
        );
        bullets.add(bullet);
        World.add(engine.world, bullet);
        Matter.Body.applyForce(
          bullet, this.body.position, {
          x: Math.cos(this.body.angle) * this.fireForce,
          y: Math.sin(this.body.angle) * this.fireForce,
        },
        );
        this.lastShot = Date.now();
      },
    } //END PLAYER OBJECT

    // const bodyB = 
    //COIN/SCORING OBJECTS
    const pickupSides = 30;
    const arrayPickups = [
      {
        body: Matter.Bodies.rectangle(600, 350, pickupSides, pickupSides, {
          isStatic: true, render: { fillStyle: "yellow" }, label: "coin"
        })
      },
      {
        body: Matter.Bodies.rectangle(500, 550, 80, 50, {
          isStatic: true, 
          id: "enemy",
          plugin: {
            attractors: [
              function (bodyA, bodyB) {
                return {
                  x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                  y: (bodyA.position.y - bodyB.position.y) * 1e-6,
                };
              }
            ]
          }, 
          render: { sprite: { texture: soldier } }, 
          label: 'enemy'
        }),
      },
      {
        body: Matter.Bodies.rectangle(300, 350, 80, 50, {
          isStatic: true, 
          plugin: {
            attractors: [
              function (player, bodyB) {
                var force = {
                  x: (player.position.x - bodyB.position.x) * 1e-6,
                  y: (player.position.y - bodyB.position.y) * 1e-6,
                }
                Matter.Body.applyForce(player, player.position, Matter.Vector.neg(force));
                Matter.Body.applyForce(bodyB, bodyB.position, force);
              }
            ]
          }, render: { sprite: { texture: soldier } }, label: 'enemy'
        }),
      },
    ];

    //FUNCTIONS BELOW - HANDLE COLLISIONS WITH PICKUPS
    function onCollision(pair) {
      var condition1 = pair.bodyA.label === 'player' && pair.bodyB.label === 'coin';
      var condition2 = pair.bodyA.label === 'coin' && pair.bodyB.label === 'player'; 
      var condition3 = pair.bodyA.label === 'bullet' && pair.bodyB.label === 'enemy';
      var condition4 = pair.bodyA.label === 'enemy' && pair.bodyB.label === 'bullet';


      //returns true condition
      return condition1 || condition2 || condition3 || condition4;
    };

    function deleteCoin(pair) {
      console.log(pair);
      if (pair.bodyA.label === 'coin') {
        Matter.World.remove(mainEngine, pair.bodyA)
      };

      if (pair.bodyB.label === 'coin') {
        Matter.World.remove(mainEngine, pair.bodyB)
      };

      if (pair.bodyA.label === 'enemy') {
        Matter.World.remove(mainEngine, pair.bodyA)
      };

      if (pair.bodyB.label === 'enemy') {
        Matter.World.remove(mainEngine, pair.bodyB)
      };
    };

    function detectCollision() {
      Matter.Events.on(engine, 'collisionStart', (event) => {
        //console.log(event.pairs);
        event.pairs.filter((pair) => {
          return onCollision(pair);
        })
          .forEach((pair) => {
            deleteCoin(pair);
            //Add to variable/ score
          })
      });

    };

    //BULLET OBJECTS
    const bullets = new Set();

    //ADD PLATFORMS TO WORLD
    World.add(mainEngine, [
      //(location on x axis, location on y axis, width of box, height of box)
      Bodies.rectangle(300, 260, 500, 80, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass
          }
        },
        label: 'platform',
      }),
      Bodies.rectangle(435, 630, 1600, 60, { isStatic: true }),
      Bodies.rectangle(0, 200, 60, 800, { isStatic: true }),
      Bodies.rectangle(2000, 400, 60, 1000, { isStatic: true }),
    ]);

    //Add coins/score pickups to the world
    arrayPickups.forEach(element => {
      World.add(mainEngine, [element.body])
    });


    //Add Player to the World
    World.add(mainEngine, [player.body]);

    //Player Controls
    const keyHandlers = {
      KeyD: () => {
        Matter.Body.setVelocity(player.body, { x: 10, y: (player.body.velocity.y) })
      },
      KeyW: () => {
        if (!player.hasJumped) {
          Matter.Body.applyForce(player.body, {
            x: player.body.position.x,
            y: player.body.position.y
          }, { x: 0.0, y: -0.4 })
          player.hasJumped = true;
        }
      },
      KeyA: () => {
        Matter.Body.setVelocity(player.body, { x: -10, y: (player.body.velocity.y) })
      },
      KeyS: () => player.fire()
    };


    //If the player character has jumped and is falling
    function playerFallen() {
      if (player.hasJumped && (player.body.velocity.y > 0)) {
        player.fallen = true;
      }
    };

    //if the player character has jumped, fallen, and hit stopped when hitting the ground
    function resetJumps() {
      if (player.hasJumped && player.fallen && (0.00000001 < player.body.velocity.y < 0.00000001)) {
        player.hasJumped = false;
        player.fallen = false;
      }
    };

    const keysDown = new Set();
    document.addEventListener("keydown", event => {
      keysDown.add(event.code);
    });
    document.addEventListener("keyup", event => {
      keysDown.delete(event.code);
    });

    //Engine which updates the environment frame-to-frame
    Matter.Events.on(engine, "beforeUpdate", event => {
      [...keysDown].forEach(k => {
        keyHandlers[k]?.();
      });

      playerFallen();
      resetJumps();

      //DETECT COLLISION BETWEEN PLAYER AND COINS
      detectCollision();


    });

    Matter.Events.on(engine, 'afterUpdate', function () {
      if (!player.position.x) {
        return;
      }

      // smoothly move the attractor body towards the mouse
      Matter.Body.translate(arrayPickups, {
        x: (arrayPickups.position.x - player.position.x) * 0.25,
      });
    });

    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
  }

  render() {
    return <div ref="scene">score: 0</div>
  }
}
export default Scene;