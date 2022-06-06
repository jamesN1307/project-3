import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import aang from "../../images/Katara.png"
import grass from "../../images/grass.png"
import soldier from "../../images/soldier.png"
import wind from "../../images/wave.png"

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
    var world = engine.world
    var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint);


var viewportCentre = {
  x: render.options.width * 0.5,
  y: render.options.height * 0.5
};

// create limits for the viewport
var extents = {
  min: { x: -0, y: -0 },
  max: { x: window.innerWidth, y: window.innerHeight }
};

// keep track of current bounds scale (view zoom)
var boundsScaleTarget = 1,
  boundsScale = {
      x: 1,
      y: 1
  };

 // use a render event to control our view
 // use a render event to control our view
 Events.on(render, 'beforeRender', function() {
  var world = engine.world,
      mouse = mouseConstraint.mouse,
      translate;

  // mouse wheel controls zoom
  var scaleFactor = mouse.wheelDelta * -0.1;
  if (scaleFactor !== 0) {
      if ((scaleFactor < 0 && boundsScale.x >= 0.6) || (scaleFactor > 0 && boundsScale.x <= 1.4)) {
          boundsScaleTarget += scaleFactor;
      }
  }

  // if scale has changed
  if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
      // smoothly tween scale factor
      scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2;
      boundsScale.x += scaleFactor;
      boundsScale.y += scaleFactor;

      // scale the render bounds
      render.bounds.max.x = render.bounds.min.x + render.options.width * boundsScale.x;
      render.bounds.max.y = render.bounds.min.y + render.options.height * boundsScale.y;

      // translate so zoom is from centre of view
      translate = {
          x: render.options.width * scaleFactor * -0.5,
          y: render.options.height * scaleFactor * -0.5
      };

      Bounds.translate(render.bounds, translate);

      // update mouse
      Mouse.setScale(mouse, boundsScale);
      Mouse.setOffset(mouse, render.bounds.min);
  }

  // get vector from mouse relative to centre of viewport
  var deltaCentre = Vector.sub(mouse.absolute, viewportCentre),
      centreDist = Vector.magnitude(deltaCentre);

  // translate the view if mouse has moved over 50px from the centre of viewport
  if (centreDist > 50) {
      // create a vector to translate the view, allowing the user to control view speed
      var direction = Vector.normalise(deltaCentre),
          speed = Math.min(10, Math.pow(centreDist - 50, 2) * 0.0002);

      translate = Vector.mult(direction, speed);

      // prevent the view moving outside the extents
      if (render.bounds.min.x + translate.x < extents.min.x)
          translate.x = extents.min.x - render.bounds.min.x;

      if (render.bounds.max.x + translate.x > extents.max.x)
          translate.x = extents.max.x - render.bounds.max.x;

      if (render.bounds.min.y + translate.y < extents.min.y)
          translate.y = extents.min.y - render.bounds.min.y;

      if (render.bounds.max.y + translate.y > extents.max.y)
          translate.y = extents.max.y - render.bounds.max.y;

      // move the view
      Bounds.translate(render.bounds, translate);

      // we must update the mouse too
      Mouse.setOffset(mouse, render.bounds.min);
  }
});
// keep the mouse in sync with rendering
render.mouse = mouse;



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
            texture: aang,
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

    Matter.Render.lookAt = function (render, player, padding, center) {
      center = typeof center !== 'undefined' ? center : true;
    }

    //COIN/SCORING OBJECTS
    const pickupSides = 30;
    const arrayPickups = [
      {
        body: Matter.Bodies.rectangle(600, 350, pickupSides, pickupSides, {
          isStatic: true,
          render: { fillStyle: "yellow" },
          label: "coin",
          coinUsed: false,
        })
      },
    ];

    //Array of enemy character objects
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
        spawnX: 500,
        endX: 1200,
        goingRight: true,
        body: Matter.Bodies.rectangle(500, 500, 80, 50, {
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


      //returns true condition
      return condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7 || condition8;
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

    //ADD PLATFORMS TO WORLD
    World.add(mainEngine, [
      //(location on x axis, location on y axis, width of box, height of box)
      Bodies.rectangle(400, 260, 400, 80, {
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
      Bodies.rectangle(500, 760, 300, 80, {
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
      Bodies.rectangle(250, 1100, 550, 20, {
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
      Bodies.rectangle(1050, 1000, 350, 20, {
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

      //bottom border
      Bodies.rectangle(0, window.innerHeight, 8000, 100, { isStatic: true, label: "border" }),
      //left border
      Bodies.rectangle(0, 400, 10, 2000, { isStatic: true, label: "border" }),
      //left border
      Bodies.rectangle(window.innerWidth, 400, 10, 2000, { isStatic: true, label: "border" }),
      //top border
      Bodies.rectangle(0, 0, 8000, 10, { isStatic: true, label: "border" }),
    ]);

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

    //Engine which updates the environment frame-to-frame
    Matter.Events.on(engine, "beforeUpdate", event => {
      [...keysDown].forEach(k => {
        keyHandlers[k]?.();
      });

      playerFallen();
      resetJumps();

      //DETECT COLLISION BETWEEN PLAYER AND COINS
      detectCollision();

      //Move each enemy
      arrayEnemies.forEach(element => {
        moveEnemy(element);
      });
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
    return (
      <div>
        {/*Check back for when variable should be passed to other pages*/}
        <div>{`score ${this.state.scoreLevel}`}</div>
        <div ref="scene" />
      </div>
    )
  }
}
export default Scene;