import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import aang from "../images/aang.png"
class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  } s


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
      
      const player = {
        score: 0,
        //track whether the box has jumped
        hasJumped: false,
        fallen: false,
        body: Matter.Bodies.rectangle(400, 200, 80, 80, {
          inertia: Infinity,
          friction: 0.1,
        }),
        lastShot: Date.now(),
        cooldown: 150,
        fireForce: 0.1,
        fire() {
          if (Date.now() - this.lastShot < this.cooldown) {
            return;
          }
          
          // move the bullet away from the player a bit
          const {x: bx, y: by} = this.body.position;
          const x = bx + (Math.cos(this.body.angle) * 10);
          const y = by + (Math.sin(this.body.angle) * 10);
      
          const bullet = Matter.Bodies.circle(
            x, y, 4, {
              frictionAir: 0.006,
              density: 0.1,
              render: {fillStyle: "yellow"},
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
      }
      const bullets = new Set();
      World.add(engine.world, [
        //(location on x axis, location on y axis, width of box, height of box)
      Bodies.rectangle(300, 260, 80, 80, {isStatic: true,}),
      Bodies.rectangle(435, 630, 1600, 60, {isStatic: true}),
      Bodies.rectangle(0, 200, 60, 800, {isStatic: true}),
      Bodies.rectangle(2000, 400, 60, 1000, {isStatic: true}),
    ]);
      World.add(engine.world, [player.body]);

      //Player Controls
      const keyHandlers = {
        KeyD: () => {
          Matter.Body.setVelocity(player.body,  {x: 10, y:(player.body.velocity.y)})
        },
        KeyW: () => {
          if (!player.hasJumped) {
            Matter.Body.applyForce(player.body, {
              x: player.body.position.x,
              y: player.body.position.y
            }, {x: 0.0, y: -0.4})
            player.hasJumped = true;
          }
        },
        KeyA: () => {
          Matter.Body.setVelocity(player.body,  {x: -10, y:(player.body.velocity.y)})
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
        if (player.hasJumped && player.fallen && (0.00000001<player.body.velocity.y<0.00000001)) {
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
      Matter.Events.on(engine, "beforeUpdate", event => {
        [...keysDown].forEach(k => {
          keyHandlers[k]?.();
        });

        playerFallen();
        resetJumps();

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