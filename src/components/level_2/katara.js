import React, { useState, useEffect, useContext, createContext } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import katara from "../../images/Katara.png"
import grass from "../../images/grass.png"
import soldier from "../../images/soldier.png"
import wave from "../../images/wave.png"
import coin from "../../images/coin.png"
import waterFlag from "../../images/waterFlag.png"
import fireBall from "../../images/fireball.png"
import rockFormation from "../../images/rockFormation.jpg"
import API from "../../utils/API.js"
import AppContext from "../../AppContext"
class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreLevel: 0,
    };
  }

  componentDidMount() {
    Matter.use(
      'matter-attractors'
    )
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Composite = Matter.Composite,
      Events = Matter.Events,
      Vector = Matter.Vector,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Bounds = Matter.Bounds;

    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "white",
        hasBounds: true
      },
    });
    const mainEngine = engine.world;
    
    // ----OBJECTS TO BE RENDERED WITHIN MATTER----//
    //PLAYER CHARACTER
    const player = {
      //track whether the box has jumped
      hasJumped: false,
      fallen: false,
      body: Bodies.rectangle(400, 200, 80, 80, {
        inertia: Infinity,
        friction: 0.1,
        render: {
          sprite: {
            texture: katara,
            xScale: 0.3,
            yScale: 0.3
          }
        },
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
        label: 'player',
      }),

      lastShot: Date.now(),
      cooldown: 300,
      fireForce: 0.5,
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
          render: {
            sprite: {
              texture: wave,
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

    Matter.Render.lookAt = function (render, player, padding, center) {
      center = typeof center !== 'undefined' ? center : true;
    }

    //COIN/SCORING OBJECTS-----------------------------------------------------------------------------------------
    const pickupSides = 30;
    const arrayPickups = [
      {
        body: Matter.Bodies.rectangle(600, 350, pickupSides, pickupSides, {
          isStatic: true,
          render: { fillStyle: "yellow", sprite: {
            texture: coin,
            xScale: 0.15,
            yScale: 0.15
          } },
          label: "coin",
          coinUsed: false,
        })
      },
      //(location on x axis, location on y axis, width of box, height of box)
      {
        body: Matter.Bodies.rectangle(1850, 100, pickupSides, pickupSides, {
          isStatic: true,
          render: { 
            fillStyle: "yellow",
          sprite: {
            texture: coin,
            xScale: 0.15,
            yScale: 0.15
          } 
        },
          label: "coin",
          coinUsed: false,
        })
      },
      {
        body: Matter.Bodies.rectangle(1550, 250, pickupSides, pickupSides, {
          isStatic: true,
          render: { fillStyle: "yellow", sprite: {
            texture: coin,
            xScale: 0.15,
            yScale: 0.15
          }  },
          label: "coin",
          coinUsed: false,
        })
      },
      //(location on x axis, location on y axis, width of box, height of box)
      {
        body: Matter.Bodies.rectangle(2050, 500, pickupSides, pickupSides, {
          isStatic: true,
          render: { fillStyle: "yellow", sprite: {
            texture: coin,
            xScale: 0.15,
            yScale: 0.15
          }  },
          label: "coin",
          coinUsed: false,
        })
      },
      //(location on x axis, location on y axis, width of box, height of box)
      {
        body: Matter.Bodies.rectangle(2050, 500, pickupSides, pickupSides, {
          isStatic: true,
          render: { fillStyle: "yellow", sprite: {
            texture: coin,
            xScale: 0.15,
            yScale: 0.15
          }  },
          label: "coin",
          coinUsed: false,
        })
      },
      //(location on x axis, location on y axis, width of box, height of box)
      {
        body: Matter.Bodies.rectangle(1450, 1000, pickupSides, pickupSides, {
          isStatic: true,
          render: { fillStyle: "yellow", sprite: {
            texture: coin,
            xScale: 0.15,
            yScale: 0.15
          }  },
          label: "coin",
          coinUsed: false,
        })
      },
      //(location on x axis, location on y axis, width of box, height of box)
      {
        body: Matter.Bodies.rectangle(150, 1000, pickupSides, pickupSides, {
          isStatic: true,
          render: { fillStyle: "yellow", sprite: {
            texture: coin,
            xScale: 0.15,
            yScale: 0.15
          }  },
          label: "coin",
          coinUsed: false,
        })
      },
      //(location on x axis, location on y axis, width of box, height of box)
      {
        body: Matter.Bodies.rectangle(1050, 900, pickupSides, pickupSides, {
          isStatic: true,
          render: { fillStyle: "yellow", sprite: {
            texture: coin,
            xScale: 0.15,
            yScale: 0.15
          }  },
          label: "coin",
          coinUsed: false,
        })
      },
    ];

    //Array of enemy character objects----------------------------------------------------------------------------------
    const arrayEnemies = [
      {
        spawnX: 1000,
        endX: 1200,
        goingRight: true,
        body: Matter.Bodies.rectangle(1000, 460, 80, 50, {
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
        //(location on x axis, location on y axis, width of box, height of box)
        spawnX: 300,
        endX: 500,
        goingRight: true,
        body: Matter.Bodies.rectangle(300, 160, 80, 50, {
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
      {
        //(location on x axis, location on y axis, width of box, height of box)
        spawnX: 700,
        endX: 1800,
        goingRight: true,
        body: Matter.Bodies.rectangle(700, 1200, 80, 50, {
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
      {
        //(location on x axis, location on y axis, width of box, height of box)
        spawnX: 420,
        endX: 550,
        goingRight: true,
        body: Matter.Bodies.rectangle(420, 500, 80, 50, {
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
      {
        //(location on x axis, location on y axis, width of box, height of box)
        spawnX: 1650,
        endX: 1900,
        goingRight: true,
        body: Matter.Bodies.rectangle(1650, 500, 80, 50, {
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
      {
        //(location on x axis, location on y axis, width of box, height of box)
        spawnX: 1750,
        endX: 1780,
        goingRight: true,
        body: Matter.Bodies.rectangle(1750, 100, 80, 50, {
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
      {
        //(location on x axis, location on y axis, width of box, height of box)
        spawnX: 940,
        endX: 960,
        goingRight: false,
        body: Matter.Bodies.rectangle(950, 800, 80, 50, {
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
      {
        //(location on x axis, location on y axis, width of box, height of box)
        spawnX: 2550,
        endX: 2860,
        goingRight: false,
        body: Matter.Bodies.rectangle(2550, 800, 80, 50, {
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

    //FUNCTIONS BELOW - HANDLE COLLISIONS WITH PICKUPS-----------------------------------------------------------------------------------
    const scoreUpdate = () => {
      this.setState({
        scoreLevel: this.state.scoreLevel += 10,
      })
    };

    const scoreDelete = () => {
      this.setState({
        scoreLevel: this.state.scoreLevel -= 10,
      })
    };

    function onCollision(pair) {
      var condition1 = pair.bodyA.label === 'player' && pair.bodyB.label === 'coin';
      var condition2 = pair.bodyA.label === 'coin' && pair.bodyB.label === 'player';
      var condition3 = pair.bodyA.label === 'bullet' && pair.bodyB.label === 'enemy';
      var condition4 = pair.bodyA.label === 'enemy' && pair.bodyB.label === 'bullet';
      var condition5 = pair.bodyA.label === 'border' && pair.bodyB.label === 'bullet';
      var condition6 = pair.bodyA.label === 'bullet' && pair.bodyB.label === 'border';
      var condition7 = pair.bodyA.label === 'player' && pair.bodyB.label === 'enemy';
      var condition8 = pair.bodyA.label === 'enemy' && pair.bodyB.label === 'player';
      var condition9 = pair.bodyA.label === 'player' && pair.bodyB.label === 'door';
      var condition10 = pair.bodyA.label === 'door' && pair.bodyB.label === 'player';
      var condition11 = pair.bodyA.label === 'platform' && pair.bodyB.label === 'bullet';
      var condition12 = pair.bodyA.label === 'bullet' && pair.bodyB.label === 'platform';


      //returns true condition
      return condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7 || condition8 | condition9 || condition10 || condition11 || condition12;
    };

    function deleteCoin(pair) {
      if (pair.bodyA.label === 'coin') {
        if (!pair.bodyA.isUsed) {
          scoreUpdate();
          pair.bodyA.isUsed = true;
        }
        Matter.World.remove(mainEngine, pair.bodyA)
      };

      if (pair.bodyB.label === 'coin') {
        if (!pair.bodyB.isUsed) {
          scoreUpdate();
          pair.bodyB.isUsed = true;
        }
        Matter.World.remove(mainEngine, pair.bodyB)
      };
    };

    //deletes bullet on impact with border
    function deleteBullet(pair) {
      if ((pair.bodyA.label === 'bullet') && (pair.bodyB.label === 'enemy')) {
        if (!pair.bodyA.isUsed) {
          scoreUpdate();
          pair.bodyA.isUsed = true;
        }
        Matter.World.remove(mainEngine, pair.bodyB)
      };

      if ((pair.bodyA.label === 'enemy') && (pair.bodyB.label === 'bullet')) {
        if (!pair.bodyB.isUsed) {
          scoreUpdate();
          pair.bodyB.isUsed = true;
        }
        Matter.World.remove(mainEngine, pair.bodyA)
      };
    };

    //deletes bullet on impact with border
    function deleteEnemy(pair) {
      if ((pair.bodyA.label === 'enemy') && (pair.bodyB.label === 'player')) {
        if (!pair.bodyA.isUsed) {
          scoreDelete();
          pair.bodyA.isUsed = true;
        }
        Matter.World.remove(mainEngine, pair.bodyA)
      };

      if ((pair.bodyA.label === 'player') && (pair.bodyB.label === 'enemy')) {
        if (!pair.bodyB.isUsed) {
          scoreDelete();
          pair.bodyB.isUsed = true;
        }
        Matter.World.remove(mainEngine, pair.bodyB)
      };
    };

    function deleteBull(pair) {
      if (pair.bodyA.label === 'bullet') {
        Matter.World.remove(mainEngine, pair.bodyA)
      };

      if (pair.bodyB.label === 'bullet') {
        Matter.World.remove(mainEngine, pair.bodyB)
      };
    };
    const getScore = ()=>{
      const hello = this.state.scoreLevel
      console.log(this.state.scoreLevel)
      const token = localStorage.getItem("token")
      console.log(token)
      API.collectScore(token,this.state.scoreLevel,1)
    }

    console.log(this.state.scoreLevel)

    function nextLevel(pair) {
      if ((pair.bodyA.label === 'door') && (pair.bodyB.label === 'player')) {
        getScore()
        window.location.href = "/katara3"
      };

      if ((pair.bodyA.label === 'player') && (pair.bodyB.label === 'door')) {
        getScore()

        window.location.href = "/katara3"
      };
    };

    function detectCollision() {
      Matter.Events.on(engine, 'collisionStart', (event) => {
        event.pairs.filter((pair) => {
          return onCollision(pair);
        })
          .forEach((pair) => {
            deleteCoin(pair);
            deleteBullet(pair)
            deleteEnemy(pair)
            deleteBull(pair)
            nextLevel(pair)
            //Add to variable/ score
          })
      });
    };

    //Custom function - update enemy velocity
    //ASSUMPTION - starting point is always spawning point, endpoint is always to the right
    //Add code - if starting point equals endpoint, do nothing (if block wrapping all)
    function moveEnemy(enemyObject) {

      // if object has overshot the endPoint or startPoint
      if (enemyObject.body.position.x > enemyObject.endX) {
        enemyObject.goingRight = false;
      } else if (enemyObject.body.position.x < enemyObject.spawnX) {
        enemyObject.goingRight = true;
      }

      //if 'goingRight' is true or false - if true, go right, otherwise go left
      if (enemyObject.goingRight) {
        Matter.Body.setVelocity(enemyObject.body, { x: 1, y: (enemyObject.body.velocity.y) });
      } else {
        Matter.Body.setVelocity(enemyObject.body, { x: -1, y: (enemyObject.body.velocity.y) });
      }
    };


    //BULLET OBJECTS
    const bullets = new Set();

    //ADD PLATFORMS TO WORLD--------------------------------------------------------------------------------------------------------
    World.add(mainEngine, [
      //(location on x axis, location on y axis, width of box, height of box)
      Bodies.rectangle(400, 260, 200, 80, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.6,
            yScale: 0.3
          }
        },
        zoom: 0.4,
        label: 'platform',
      }),
      Bodies.rectangle(1100, 560, 400, 80, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.8,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      //(location on x axis, location on y axis, width of box, height of box)
      Bodies.rectangle(1800, 160, 400, 80, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.6,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),

      //(location on x axis, location on y axis, width of box, height of box)
      Bodies.rectangle(500, 760, 200, 80, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.6,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      //(location on x axis, location on y axis, width of box, height of box)
      Bodies.rectangle(1400, 360, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.4,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      //(location on x axis, location on y axis, width of box, height of box)
      Bodies.rectangle(1800, 660, 450, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.8,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      //(location on x axis, location on y axis, width of box, height of box)
      Bodies.rectangle(1900, 1100, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.4,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      //(location on x axis, location on y axis, width of box, height of box)
      Bodies.rectangle(250, 1100, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.6,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      //(location on x axis, location on y axis, width of box, height of box)
      Bodies.rectangle(1050, 1000, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.6,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      Bodies.rectangle(3250, 800, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.6,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      Bodies.rectangle(2550, 300, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.6,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      Bodies.rectangle(3050, 1300, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.6,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      Bodies.rectangle(3450, 300, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.6,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      Bodies.rectangle(2400, 1160, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.4,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      Bodies.rectangle(2800, 860, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.4,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      Bodies.rectangle(3000, 460, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.4,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      Bodies.rectangle(3650, 1080, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.6,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      Bodies.rectangle(2350, 780, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: grass,
            xScale: 0.6,
            yScale: 0.4
          }
        },
        label: 'platform',
      }),
      Bodies.rectangle(3450, 260, 250, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: waterFlag,
            xScale: 0.6,
            yScale: 0.4
          }
        },
        label: 'door',
      }),

      //Border creation - once camera follows player, Remove height/width references-------------------------------------------------------------------------------
      //(location on x axis, location on y axis, width of box, height of box)

      //top border
      Bodies.rectangle(0, 0, 8000, 10, { isStatic: true, label: "border" }),
      //left border
      Bodies.rectangle(0, 0, 10, 3000, { isStatic: true, label: "border" }),
      //right border
      Bodies.rectangle(4000, 0, 10, 3000, { isStatic: true, label: "border" }),
      // bottom border
      Bodies.rectangle(0, 1450, 8000, 100, { isStatic: true, label: "border" }),
    ]);

    //generate elements within the engine----------------------------------------------------------------------------------------------------------

    //Add coins/score pickups to the world
    arrayPickups.forEach(element => {
      World.add(mainEngine, [element.body])
    });

    //Add array of enemies to the world
    arrayEnemies.forEach(element => {
      World.add(mainEngine, [element.body])
    });


    //Add Player to the World
    World.add(mainEngine, [player.body]);

    //Player Controls
    const keyHandlers = {
      KeyD: () => {
        //Can't adjust left/right velocity when in the air
        if (!player.hasJumped) {
          Matter.Body.setVelocity(player.body, { x: 10, y: (player.body.velocity.y) })
        }
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
        //Can't adjust left/right velocity when in the air
        if (!player.hasJumped) {
          Matter.Body.setVelocity(player.body, { x: -10, y: (player.body.velocity.y) })
        }
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


    var translate = {
      x: player.body.position.x-600,
      y: player.body.position.y-300,
    }

    //Engine which updates the environment frame-to-frame
    Matter.Events.on(engine, "beforeUpdate", event => {
      [...keysDown].forEach(k => {
        keyHandlers[k]?.();
      });

      translate = {
        x: player.body.position.x-window.innerWidth/2,
        y: player.body.position.y-window.innerHeight/2,
      }
      Bounds.shift(render.bounds, translate);

      playerFallen();
      resetJumps();

      //DETECT COLLISION BETWEEN PLAYER AND COINS
      detectCollision();

      //Move each enemy
      arrayEnemies.forEach(element => {
        moveEnemy(element);
      });
    });

    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
  }


  render() {
    return (
      <div>
        {/*Check back for when variable should be passed to other pages*/}
        <div>{`score ${this.state.scoreLevel}`}</div>
        <div ref="scene"/>
      </div>
    )
  }
}
export default Scene;