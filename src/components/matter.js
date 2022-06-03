import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import aang from "../images/aang.png"

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreLevel: 0,
    };
  }

  componentDidMount() {
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
        height: window.innerHeight
      }
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
        label: 'player'
      }),

      lastShot: Date.now(),
      cooldown: 150,
      fireForce: 0.1,
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
          density: 0.1,
          render: { fillStyle: "yellow" },
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

    //COIN/SCORING OBJECTS
    const pickupSides = 30;
    const arrayPickups = [
      {
        body: Matter.Bodies.rectangle(600, 350, pickupSides, pickupSides, { isStatic: true, label: 'coin' }),
        coinUsed: false,
      },
    ];

    /*
    //DETECTOR ARRAY BETWEEN PLAYER OBJECT AND COINS
    const pickupsBodies = [player.body];
    arrayPickups.forEach(element => {
      pickupsBodies.push(element.body);
    });
    const pickupDetector = Matter.Detector.create();
    Matter.Detector.setBodies(pickupDetector, pickupsBodies);

    function pickupsCollisions() {
      //collided IS AN ARRAY
      let collidedArray = Matter.Detector.collisions(pickupDetector);
      //HAVE TO CHECK BODIES - MAY NOT BE RETURNED IN SPECIFIC ORDER
      if (collidedArray) {
          collidedArray.forEach(element => {
            if (element.bodyA.isPlayer) {
              Matter.World.remove(element.bodyB);
            } else {
              Matter.World.remove(element.bodyA);
            }
          });
      }
    }*/

    //FUNCTIONS BELOW - HANDLE COLLISIONS WITH PICKUPS
    const scoreUpdate = () => {
      this.setState({
        scoreLevel: this.state.scoreLevel += 10,
      })
    };

    function onCollision(pair) {
      var condition1 = pair.bodyA.label === 'player' && pair.bodyB.label === 'coin';
      var condition2 = pair.bodyA.label === 'coin' && pair.bodyB.label === 'player';

      //returns true condition
      return condition1 || condition2;
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

    function detectCollision() {
      Matter.Events.on(engine, 'collisionStart', (event) => {
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
      Bodies.rectangle(300, 260, 80, 80, { isStatic: true, label: '' }),
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