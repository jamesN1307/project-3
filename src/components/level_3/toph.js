import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import toph from "../../images/toph.png"
import grass from "../../images/grass.png"
import soldier from "../../images/soldier.png"
import rock from "../../images/rock.jpg"
import coin from "../../images/coin.png"
import waterFlag from "../../images/waterFlag.png"
import fireBall from "../../images/fireball.png"


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
            texture: toph,
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
              texture: rock,
              xScale: 0.05,
              yScale: 0.05
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

    //array to hold presets
    //custom function to call to make body, return it
    //for each loop then returns each one and adds to engine directly

    const arrayCoinPresets = [
      { placeX: 600, placeY: 350 },
      { placeX: 1850, placeY: 100 },
      { placeX: 1550, placeY: 250 },
      { placeX: 2050, placeY: 500 },
      { placeX: 1450, placeY: 1000 },
      { placeX: 150, placeY: 1000 },
      { placeX: 1050, placeY: 900 },
      { placeX: 4500, placeY: 350 },
      { placeX: 3850, placeY: 100 },
      { placeX: 2350, placeY: 250 },
      { placeX: 1650, placeY: 500 },
      { placeX: 4950, placeY: 1000 },
      { placeX: 5150, placeY: 1000 },
      { placeX: 6050, placeY: 900 },
      { placeX: 5250, placeY: 250 },
      { placeX: 3250, placeY: 500 },
      { placeX: 4750, placeY: 1000 },
      { placeX: 3950, placeY: 1000 },
      { placeX: 3450, placeY: 900 },
    ];

    function makeCoinObject(coinX, coinY) {
      const newCoin = {
        body: Matter.Bodies.rectangle(coinX, coinY, 30, 30, {
          isStatic: true,
          render: {
            sprite: {
              texture: coin,
              xScale: 0.15,
              yScale: 0.15
            }
          },
          label: "coin",
          coinUsed: false,
        })
      }
      return newCoin;
    }


    //Array of enemy character objects----------------------------------------------------------------------------------
    //array to hold presets
    //custom function to call to make body, return it
    //for each loop then returns each one and adds to engine directly
    const arrayPresetEnemies = [
      { placeX: 1000, placeY: 500, stopX: 1200, movingRight: true, image: soldier, willFire: true },
      { placeX: 300, placeY: 160, stopX: 500, movingRight: true, image: soldier, willFire: true },
      { placeX: 700, placeY: 1200, stopX: 1800, movingRight: true, image: soldier, willFire: true },
      { placeX: 1650, placeY: 500, stopX: 1900, movingRight: true, image: soldier, willFire: true },
      { placeX: 1750, placeY: 100, stopX: 1780, movingRight: true, image: soldier, willFire: true },
      { placeX: 950, placeY: 800, stopX: 1000, movingRight: true, image: soldier, willFire: true },
      { placeX: 2550, placeY: 800, stopX: 2860, movingRight: true, image: soldier, willFire: true },
      { placeX: 3250, placeY: 560, stopX: 3330, movingRight: true, image: soldier, willFire: true },
      { placeX: 4200, placeY: 500, stopX: 4400, movingRight: true, image: soldier, willFire: true },
      { placeX: 2880, placeY: 100, stopX: 3050, movingRight: true, image: soldier, willFire: true },
      { placeX: 3750, placeY: 800, stopX: 3950, movingRight: true, image: soldier, willFire: true },
      { placeX: 3360, placeY: 800, stopX: 3550, movingRight: true, image: soldier, willFire: true },
      { placeX: 4800, placeY: 960, stopX: 4900, movingRight: true, image: soldier, willFire: true },
      { placeX: 5300, placeY: 500, stopX: 5500, movingRight: true, image: soldier, willFire: true },
      { placeX: 4600, placeY: 300, stopX: 4950, movingRight: true, image: soldier, willFire: true },
      { placeX: 5800, placeY: 800, stopX: 5900, movingRight: true, image: soldier, willFire: true },
      { placeX: 6050, placeY: 1000, stopX: 6150, movingRight: true, image: soldier, willFire: true },
      { placeX: 6650, placeY: 500, stopX: 6800, movingRight: true, image: soldier, willFire: true },
      { placeX: 5600, placeY: 100, stopX: 5850, movingRight: true, image: soldier, willFire: true },
      { placeX: 5000, placeY: 800, stopX: 5100, movingRight: true, image: soldier, willFire: true },
      //=====================================================
    ];

    function makeEnemyObject(spawnX, spawnY, endX, goingRight, image, willShoot) {
      const newEnemy = {
        willFire: willShoot,
        spawnX: spawnX,
        endX: endX,
        goingRight: goingRight,
        body: Matter.Bodies.rectangle(spawnX, spawnY, 60, 80, {
          isUsed: false,
          inertia: Infinity,
          id: "enemy",
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
          }, render: { sprite: { texture: image } }, label: 'enemy'
        }),
      }
      return newEnemy;
    }

    //Function to make enemy bullets
    //
    function makeEnemyBullet(enemyX, enemyY, direction) {
      const bullet = Matter.Bodies.circle(
        enemyX + 40 * direction, enemyY, 8, {
        isUsed: false,
        frictionAir: 0,
        label: "enemyBullet",
        density: 0.1,
        render: { fillStyle: 'red', }
      });

      bullets.add(bullet);
      World.add(engine.world, bullet);
      //applyforce requires body, location to apply force FROM, then a force vector
      Matter.Body.applyForce(
        bullet, { x: enemyX, y: enemyY }, {
        x: 1.7 * direction,
        y: -0.3,
      },
      );
    }

    //BULLET OBJECTS
    const bullets = new Set();


    //FUNCTIONS BELOW - HANDLE COLLISIONS -----------------------------------------------------------------------------------
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
      //first pair - collisions between players and coins
      var condition1 = pair.bodyA.label === 'player' && pair.bodyB.label === 'coin';
      var condition2 = pair.bodyA.label === 'coin' && pair.bodyB.label === 'player';
      //second pair - collisions between bullets and enemies
      var condition3 = pair.bodyA.label === 'bullet' && pair.bodyB.label === 'enemy';
      var condition4 = pair.bodyA.label === 'enemy' && pair.bodyB.label === 'bullet';
      //third pair - collisions between bullets and borders
      var condition5 = pair.bodyA.label === 'border' && pair.bodyB.label === 'bullet';
      var condition6 = pair.bodyA.label === 'bullet' && pair.bodyB.label === 'border';
      //fourth pair - collisions between player and enemies
      var condition7 = pair.bodyA.label === 'player' && pair.bodyB.label === 'enemy';
      var condition8 = pair.bodyA.label === 'enemy' && pair.bodyB.label === 'player';
      //fifth pair - collisions between player and the 'door'
      var condition9 = pair.bodyA.label === 'player' && pair.bodyB.label === 'door';
      var condition10 = pair.bodyA.label === 'door' && pair.bodyB.label === 'player';
      //collisions between enemy bullets and anything else
      var condition11 = pair.bodyA.label === 'enemyBullet' || pair.bodyB.label === 'enemyBullet';
      //collisions between player and enemy bullets
      var condition12 = pair.bodyA.label === 'player' && pair.bodyB.label === 'enemyBullet';
      var condition13 = pair.bodyA.label === 'enemyBullet' && pair.bodyB.label === 'player';
      //bullet1 and water
      var condition14 = pair.bodyA.label === 'bullet1' && pair.bodyB.label === 'water';
      var condition15 = pair.bodyA.label === 'water' && pair.bodyB.label === 'bullet1';
      //bullet1 and water
      var condition16 = pair.bodyA.label === 'bullet1' && pair.bodyB.label === 'platform';
      var condition17 = pair.bodyA.label === 'platform' && pair.bodyB.label === 'bullet1';
      //bullet1 and water
      var condition18 = pair.bodyA.label === 'bullet' && pair.bodyB.label === 'water';
      var condition19 = pair.bodyA.label === 'water' && pair.bodyB.label === 'bullet';


      //returns true condition
      return (condition1 || condition2 || condition3 || condition4 || condition5
        || condition6 || condition7 || condition8 || condition9 || condition10
        || condition11 || condition12 || condition13 || condition14 || condition15 || condition16 || condition17 || condition18 || condition19);
    };

    function deleteCoin(pair) {
      if ((pair.bodyA.label === 'coin') && (pair.bodyB.label === "player")) {
        if (!pair.bodyA.isUsed) {
          scoreUpdate();
          pair.bodyA.isUsed = true;
        }
        Matter.World.remove(mainEngine, pair.bodyA)
      };

      if ((pair.bodyA.label === 'player') && (pair.bodyB.label === "coin")) {
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

    //deletes enemy on impact with bullet
    function deleteEnemyFromBullet(pair) {
      if ((pair.bodyA.label === 'bullet') && (pair.bodyB.label === 'enemy')) {
        if (!pair.bodyB.isUsed) {
          scoreUpdate();
          pair.bodyB.isUsed = true;
          pair.bodyA.isUsed = true;
        }
        Matter.World.remove(mainEngine, pair.bodyB)
      };

      if ((pair.bodyA.label === 'enemy') && (pair.bodyB.label === 'bullet')) {
        if (!pair.bodyA.isUsed) {
          scoreUpdate();
          pair.bodyA.isUsed = true;
          pair.bodyB.isUsed = true;
        }
        Matter.World.remove(mainEngine, pair.bodyA)
      };
    };

    //deletes enemy on contact with player
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
        Matter.World.remove(mainEngine, pair.bodyB);
      };
    };

    //intention - delete bullet or enemyBullet whenever a bullet hits an object
    function deleteBull(pair) {
      if ((pair.bodyA.label === 'bullet') || (pair.bodyA.label === 'enemyBullet')) {
        Matter.World.remove(mainEngine, pair.bodyA)
      };

      if ((pair.bodyB.label === 'bullet') || (pair.bodyB.label === 'enemyBullet')) {
        Matter.World.remove(mainEngine, pair.bodyB)
      };
    };

    function deleteWater(pair) {
      if ((pair.bodyA.label === 'bullet') || (pair.bodyB.label === 'water')) {
        Matter.World.remove(mainEngine, pair.bodyA)
      };

      if ((pair.bodyA.label === 'water') || (pair.bodyB.label === 'bullet')) {
        Matter.World.remove(mainEngine, pair.bodyB)
      };
    };

    function nextLevel(pair) {
      if ((pair.bodyA.label === 'door') && (pair.bodyB.label === 'player')) {
        window.location.href = "/katara"

      };

      if ((pair.bodyA.label === 'player') && (pair.bodyB.label === 'door')) {
        window.location.href = "/katara"
      };
    };

    function playerDamagedBullet(pair) {
      if ((pair.bodyA.label === 'player') && (pair.bodyB.label === 'enemyBullet')) {
        if (!pair.bodyB.isUsed) {
          scoreDelete();
          pair.bodyB.isUsed = true;
        }
      };

      if ((pair.bodyB.label === 'player') && (pair.bodyA.label === 'enemyBullet')) {
        if (!pair.bodyA.isUsed) {
          scoreDelete();
          pair.bodyA.isUsed = true;
        }
      };
    }

    function waterReset(pair) {
      if ((pair.bodyA.label === 'water') && (pair.bodyB.label === 'player')) {
        Matter.Body.setPosition(player.body, { x: 400, y: 50 });
      };

      if ((pair.bodyA.label === 'player') && (pair.bodyB.label === 'water')) {
        Matter.Body.setPosition(player.body, { x: 400, y: 50 });
      };
    };

    function waterReset(pair) {
      if ((pair.bodyA.label === 'bullet1') && (pair.bodyB.label === 'water')) {
        Matter.World.remove(mainEngine, pair.bodyA)
      };

      if ((pair.bodyA.label === 'water') && (pair.bodyB.label === 'bullet1')) {
        Matter.World.remove(mainEngine, pair.bodyB)
      };
    };

    function platformDelete(pair) {
      if ((pair.bodyA.label === 'bullet1') && (pair.bodyB.label === 'platform')) {
        Matter.World.remove(mainEngine, pair.bodyA)
      };

      if ((pair.bodyA.label === 'platform') && (pair.bodyB.label === 'bullet1')) {
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
            nextLevel(pair)
            waterReset(pair)
            platformDelete(pair)
            deleteWater(pair)
            playerDamagedBullet(pair)
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


    //needs to be passed enemyX and enemyY for a reference on where to spawn, 
    //direction for which way the soldier should shoot.
    //Function to make enemy bullets
    //
    function makeEnemyBullet(enemyX, enemyY, direction) {
      const bullet = Matter.Bodies.circle(
        enemyX + 40 * direction, enemyY, 8, {
        isUsed: false,
        frictionAir: 0,
        label: "enemyBullet",
        density: 0.1,
        render: {
          sprite: {
            texture: fireBall,
            xScale: 0.1,
            yScale: 0.1
          }
        }
      });

      bullets.add(bullet);
      World.add(engine.world, bullet);
      //applyforce requires body, location to apply force FROM, then a force vector
      Matter.Body.applyForce(
        bullet, { x: enemyX, y: enemyY }, {
        x: 1.7 * direction,
        y: 0,
      },
      );
    }

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


    //ADD PLATFORMS TO WORLD--------------------------------------------------------------------------------------------------------
    //ALL PLATFORMS - Set xScale as 'width/480', set yScale as 'height/200', set xOffset -0.05
    // This helps to account for the image size and empty pixels when overlapping 
    // it over the physical body of an in-game platform

    //ADD MOVING PLATFORM
    //array moving platform presets
    //constructor function
    //call constructor in for:each loop on presets.
    //add to new array of completed objects for later movement code (referencing enemy code)
    const movingPlatformPresets = [
      //x,y,width,height,label,image, range from start position platform will move,
      // speed of platform movement, and axis of movement
      //NOTE - MOVERANGE IS NOT IN PIXELS
      {
        placeX: 400, placeY: 200, rectWidth: 600, rectHeight: 80,
        name: 'platform', image: grass, moveRange: 3, moveSpeed: 0.001, moveY: true
      },
    ]

    function makeMovingPlatform(placeX, placeY, width, height, name, image, range, speed, dirY) {
      const mobilePlatforms =
      {
        body:
          //format is x location, y location (of centerpoint), width, height, {properties}
          Bodies.rectangle(placeX, placeY, width, height, {
            moveRange: range,
            moveSpeed: speed,
            moveY: dirY,
            isStatic: true,
            render: {
              sprite: {
                texture: image,
                xScale: width / 480,
                yScale: height / 200,
                xOffset: -0.05,
              }
            },
            label: name
          })
      }
      return mobilePlatforms;
    }

    //have presets
    //presets.for each, makemovingplatform
    //push to arraymovingplatforms
    const arrayMovingPlatforms = [];

    movingPlatformPresets.forEach(element => {
      let object = makeMovingPlatform(element.placeX, element.placeY, element.rectWidth,
        element.rectHeight, element.name, element.image, element.moveRange, element.moveSpeed, element.moveY)
      arrayMovingPlatforms.push(object);
    });


    //generate MOVING PLATFORMS ONLY
    arrayMovingPlatforms.forEach(element => {
      World.add(mainEngine, element.body);
    });

    //CUSTOM FUNCTION TO SET PLATFORMS IN ARRAY BASED ON PARAMETERS
    // call for each for each listed element in 'platformPresets' to create bodies,
    // then calls for:each on arrayPlatforms to set up bodies for the engine
    const platformPresets = [
      //start platform
      //x,y,width,height,label,image
      // {placeX:400,placeY: 260, rectWidth:200,rectHeight: 80, name: 'platform', image: grass},
      { placeX: 500, placeY: 760, rectWidth: 200, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 250, placeY: 1100, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 3250, placeY: 800, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 2550, placeY: 300, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 3050, placeY: 1300, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 3450, placeY: 300, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 2400, placeY: 1160, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 2800, placeY: 860, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 3000, placeY: 460, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 3650, placeY: 1080, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 2350, placeY: 780, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      //new platforms
      { placeX: 1050, placeY: 1000, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 1050, placeY: 1000, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 1100, placeY: 560, rectWidth: 400, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 1400, placeY: 360, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 1800, placeY: 160, rectWidth: 400, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 1800, placeY: 660, rectWidth: 450, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 1900, placeY: 1100, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 4000, placeY: 460, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 4600, placeY: 60, rectWidth: 400, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 4200, placeY: 260, rectWidth: 200, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 4250, placeY: 1100, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 4350, placeY: 780, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 3900, placeY: 160, rectWidth: 200, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 4800, placeY: 660, rectWidth: 450, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 4900, placeY: 1100, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 5250, placeY: 300, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 5400, placeY: 1160, rectWidth: 250, rectHeight: 80, name: 'platform', image: grass },
      { placeX: 5800,placeY: 160, rectWidth: 400,rectHeight: 80, name: 'platform', image: grass }, 
      {placeX: 5800,placeY: 860, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 6050,placeY: 1300, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 6400,placeY: 360, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 6650,placeY: 1080, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 5900,placeY: 500, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass},
      { placeX: 5300, placeY: 660, rectWidth: 400, rectHeight: 80, name: 'platform', image: grass },

      //platform to leave level 
      { placeX: 6400, placeY: 260, rectWidth: 250, rectHeight: 80, name: 'door', image: waterFlag },
    ];

    function makePlatforms(placeX, placeY, rectWidth, rectHeight, name, image) {
      const newPlatform = {
        body:
          //format is x location, y location (of centerpoint), width, height, {properties}
          Bodies.rectangle(placeX, placeY, rectWidth, rectHeight, {
            isStatic: true,
            render: {
              sprite: {
                texture: image,
                xScale: rectWidth / 480,
                yScale: rectHeight / 200,
                xOffset: -0.05,
              }
            },
            label: name,
          })
      }
      return newPlatform;
    }

    //array to hold presets
    //custom function to call to make body, return it
    //for each loop then returns each one and adds to engine directly


    World.add(mainEngine, [
      //Border creation - once camera follows player -------------------------------------------------------------------------------------
      //(location on x axis, location on y axis, width of box, height of box)
      //*Note: Matter draws these objects from their centerpoint*
      //(location on x axis, location on y axis, width of box, height of box)
      //CHANGE COLOR TO MATCH BACKGROUND (top border)
      //top border
      Bodies.rectangle(2000, -300, 10000, 10, { isStatic: true, label: "border", render: { fillStyle: 'blue' } }),
      //left border
      Bodies.rectangle(-700, 600, 1400, 1800, { isStatic: true, label: "border", render: { fillStyle: 'green' } }),
      //right border
      Bodies.rectangle(7500, 0, 1400, 3000, { isStatic: true, label: "border", render: { fillStyle: 'green' } }),
      // bottom border
      Bodies.rectangle(2000, 1800, 15500, 650, { isStatic: true, label: "water", render: { fillStyle: "blue" } }),
    ]);

    //generate elements within the engine_------SPAWN ITEMS FROM ARRAYS----------------------------------------------------------------------------------------


    const arrayEnemies = [];
    //adds new bodies to the arrayEnemies array to maintain functionality with other custom functions
    arrayPresetEnemies.forEach(element => {
      const newEnemy = makeEnemyObject(element.placeX, element.placeY, element.stopX, element.movingRight, element.image, element.willFire);
      arrayEnemies.push(newEnemy);
    });

    //Add array of enemies to the world
    arrayEnemies.forEach(element => {
      World.add(mainEngine, [element.body])
    });


    //call creates bodies in arrayPlatforms
    platformPresets.forEach(element => {
      const newPlatform = makePlatforms(element.placeX, element.placeY, element.rectWidth, element.rectHeight, element.name, element.image);
      World.add(mainEngine, newPlatform.body)
    });

    //Sets up Coin Objects
    arrayCoinPresets.forEach(element => {
      const newCoin = makeCoinObject(element.placeX, element.placeY);
      World.add(mainEngine, newCoin.body)
    });

    //BELOW HERE - CALLS TO CUSTOM FUNCTIONS WHICH HANDLE CONTROLS, ENEMY MOVEMENT

    //Add Player to the World
    World.add(mainEngine, [player.body]);

    let score = this.state.scoreLevel
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
      KeyS: () => player.earth(),
      KeyP: () => player.fire()
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

    //initialize vector for screen position
    var translate = {
      x: 0,
      y: 0,
    }

    //when called, updates the position and velocity of a 
    //given moving platform
    //uses range, speed, and axis of movement (moveAx)
    //x,y,moveRange,moveSpeed,moveY
    function platformMovement(elementBody) {
      // MUST PLAYTEST to find good balance between distance traveled and multiplier
      //if MoveY is true, platform moves in y direction
      //else, moves in x direction
      //ERROR-unclear why demo values have not scaled to values currently placed in platforms
      if (elementBody.moveY) {
        let py = elementBody.position.y + elementBody.moveRange * Math.sin(engine.timing.timestamp * elementBody.moveSpeed);
        Matter.Body.setVelocity(elementBody, { x: 0, y: py - elementBody.position.y });
        Matter.Body.setPosition(elementBody, { x: elementBody.position.x, y: py });
      } else {
        let px = elementBody.position.x + elementBody.moveRange * Math.sin(engine.timing.timestamp * elementBody.moveSpeed);
        Matter.Body.setVelocity(elementBody, { x: px - elementBody.position.x, y: 0 });
        Matter.Body.setPosition(elementBody, { x: px, y: elementBody.position.y });
      }
      /*var py = 300 + 100 * Math.sin(engine.timing.timestamp * 0.002);

      Matter.Body.setVelocity(element.body, { x: 0, y: py - element.body.position.y });
      Matter.Body.setPosition(element.body, { x: 600, y: py });*/
    }

    //Time reference for enemy shooting interval
    var timeStamp = Date.now();

    //Engine which updates the environment frame-to-frame
    Matter.Events.on(engine, "beforeUpdate", event => {
      [...keysDown].forEach(k => {
        keyHandlers[k]?.();
      });

      //update position and velocity of each moving platform
      arrayMovingPlatforms.forEach(element => {
        // must playtest to find good balance between distance traveled and multiplier
        platformMovement(element.body);
      });

      //update vector for screen position
      translate = {
        x: player.body.position.x - window.innerWidth / 2,
        y: player.body.position.y - window.innerHeight / 2,
      }
      //render screen over new position
      Bounds.shift(render.bounds, translate);

      playerFallen();
      resetJumps();

      //DETECT COLLISION BETWEEN PLAYER AND COINS
      detectCollision();

      //generate shots fired from just enemies who are supposed to shoot
      if (Date.now() - timeStamp > 1000) {
        arrayEnemies.forEach(element => {
          //if the soldier is set to fire, isn't deleted, and the time step is 5 seconds beyond a certain value
          if (element.willFire && !element.body.isUsed) {
            let direction = Math.sign(player.body.position.x - element.body.position.x)
            makeEnemyBullet(element.body.position.x, element.body.position.y, direction);
          }
          timeStamp = Date.now();
        });
      }
      
      arrayEnemies.forEach(element => {
        moveEnemy(element);
      });
    });

      //Move each enemy

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