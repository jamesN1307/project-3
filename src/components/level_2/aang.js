import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import aang from "../../images/aang.png"
import grass from "../../images/grass.png"
import soldier from "../../images/soldier.png"
import wind from "../../images/hurricane_PNG56.png"
import coin from "../../images/coin.png"
import waterFlag from "../../images/waterFlag.png"
import wave from "../../images/wave.png"

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

    const engine = Engine.create();
    const render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: 7500,
        height: 2000,
        wireframes: false,
        background: "skyblue",
        hasBounds: true,
      },
    });
    const mainEngine = engine.world;
    var world = engine.world

    // ----OBJECTS TO BE RENDERED WITHIN MATTER----//--------------------------------------
    //PLAYER CHARACTER
    const player = {
      //track whether the box has jumped
      hasJumped: false,
      fallen: false,
      body: Bodies.rectangle(400, 200, 80, 80, {
        inertia: Infinity,
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
      fireForce: 5,
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

       //COIN/SCORING OBJECTS-----------------------------------------------------------------------------------------

    //array to hold presets
    //custom function to call to make body, return it
    //for each loop then returns each one and adds to engine directly
    
    const arrayCoinPresets = [
      {placeX: 600, placeY: 350},
      {placeX: 1850, placeY: 100},
      {placeX: 1550, placeY: 250},
      {placeX: 2050, placeY: 500},
      {placeX: 1450, placeY: 1000},
      {placeX: 150, placeY: 1000},
      {placeX:1050, placeY: 900},
    ];
    
    function makeCoinObject (coinX, coinY) {
      const newCoin = {
        body: Matter.Bodies.rectangle(coinX, coinY, 30, 30, {
          isStatic: true,
          render: { 
            sprite: {
            texture: coin,
            xScale: 0.15,
            yScale: 0.15
          } },
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
      {placeX: 1000, placeY: 500, stopX: 1200, movingRight: true, image: soldier},
      {placeX: 300, placeY: 160, stopX: 500, movingRight: true, image: soldier},
      {placeX: 700, placeY: 1200, stopX: 1800, movingRight: true, image: soldier},
      {placeX: 420, placeY: 560, stopX: 580, movingRight: true, image: soldier},
      {placeX: 1650, placeY: 500, stopX: 1900, movingRight: true, image: soldier},
      {placeX: 1750, placeY: 100, stopX: 1780, movingRight: true, image: soldier},
      {placeX: 950, placeY: 800, stopX: 1000, movingRight: true, image: soldier},
      {placeX: 2550, placeY: 800, stopX: 2860, movingRight: true, image: soldier},
    ];

    function makeEnemyObject (spawnX, spawnY, endX, goingRight, image) {
      const newEnemy = {
          spawnX: spawnX,
          endX: endX,
          goingRight: goingRight,
          body: Matter.Bodies.rectangle(spawnX, spawnY, 60, 90, {
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
      var condition11 = pair.bodyA.label === 'water' && pair.bodyB.label === 'player';
      var condition12 = pair.bodyA.label === 'player' && pair.bodyB.label === 'water';
      var condition13 = pair.bodyA.label === 'water' && pair.bodyB.label === 'bullet';
      var condition14 = pair.bodyA.label === 'bullet' && pair.bodyB.label === 'water';


      //returns true condition
      return condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7 || condition8 || condition9 || condition10 || condition11 || condition12 || condition13 || condition14;
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

    function nextLevel(pair) {
      if ((pair.bodyA.label === 'door') && (pair.bodyB.label === 'player')) {
        window.location.href = "/katara"
      };

      if ((pair.bodyA.label === 'player') && (pair.bodyB.label === 'door')) {
        window.location.href = "/katara"
      };
    };

    function waterReset(pair) {
      if ((pair.bodyA.label === 'water') && (pair.bodyB.label === 'player')) {
        window.location.reload();
      };

      if ((pair.bodyA.label === 'player') && (pair.bodyB.label === 'water')) {
        window.location.reload();
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
    //ALL PLATFORMS - Set xScale as 'width/480', set yScale as 'height/200', set xOffset -0.05
    // This helps to account for the image size and empty pixels when overlapping 
    // it over the physical body of an in-game platform


    //CUSTOM FUNCTION TO SET PLATFORMS IN ARRAY BASED ON PARAMETERS
    // call for each for each listed element in 'platformPresets' to create bodies,
    // then calls for:each on arrayPlatforms to set up bodies for the engine
    const platformPresets = [
      //start platform
      //x,y,width,height,label,image
      {placeX:400,placeY: 260, rectWidth:200,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 500,placeY: 760, rectWidth: 200,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 250,placeY: 1100, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 3250,placeY: 800, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 2550,placeY: 300, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 3050,placeY: 1300, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 3450,placeY: 300, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 2400,placeY: 1160, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 2800,placeY: 860, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 3000,placeY: 460, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 3650,placeY: 1080, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 2350,placeY: 780, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass},
      //original platforms
      {placeX: 1050,placeY: 1000, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 1050,placeY: 1000, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 1100,placeY: 560, rectWidth: 400,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 1400,placeY: 360, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 1800,placeY: 160, rectWidth: 400,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 1800,placeY: 660, rectWidth: 450,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 1900,placeY: 1100, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 4000,placeY: 460, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 4600,placeY: 60, rectWidth: 400,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 4200,placeY: 260, rectWidth: 200,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 4250,placeY: 1100, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 4350,placeY: 780, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 3900,placeY: 160, rectWidth: 200,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 4800,placeY: 660, rectWidth: 450,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 4900,placeY: 1100, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 5250,placeY: 300, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 5400,placeY: 1160, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 5800,placeY: 160, rectWidth: 400,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 5800,placeY: 860, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 6050,placeY: 1300, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 6400,placeY: 360, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 6650,placeY: 1080, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass}, 
      {placeX: 5900,placeY: 500, rectWidth: 250,rectHeight: 80, name: 'platform', image: grass},
      {placeX: 5300,placeY: 660, rectWidth: 400,rectHeight: 80, name: 'platform', image: grass}, 

      //platform to leave level 
      {placeX: 6400,placeY: 260, rectWidth: 250,rectHeight: 80, name:'door', image: waterFlag}, 
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
                xScale: rectWidth/480,
                yScale: rectHeight/200,
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
      Bodies.rectangle(2000, -300, 10000, 10, { isStatic: true, label: "border", render: {fillStyle: 'blue'} }),
      //left border
      Bodies.rectangle(-700, 600, 1400, 1800, { isStatic: true, label: "border", render: {fillStyle: 'green'} }),
      //right border
      Bodies.rectangle(7500, 0, 1400, 3000, { isStatic: true, label: "border", render: {fillStyle: 'green'} }),
      // bottom border
      Bodies.rectangle(2000, 1800, 10500, 650, { isStatic: true, label: "water", render: {fillStyle: "blue"} }),
    ]);

    //generate elements within the engine_------SPAWN ITEMS FROM ARRAYS----------------------------------------------------------------------------------------

    
    const arrayEnemies = [];
    //adds new bodies to the arrayEnemies array to maintain functionality with other custom functions
    arrayPresetEnemies.forEach(element => {
      const newEnemy = makeEnemyObject(element.placeX, element.placeY, element.stopX, element.movingRight, element.image);
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

    //initialize vector for screen position
    var translate = {
      x: 0,
      y: 0,
    }

    //Engine which updates the environment frame-to-frame
    Matter.Events.on(engine, "beforeUpdate", event => {
      [...keysDown].forEach(k => {
        keyHandlers[k]?.();
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
        <div ref="scene" />
      </div>
    )
  }
}
export default Scene;