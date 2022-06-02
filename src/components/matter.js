import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      
      // "Player Character"
      var boxA = Matter.Bodies.rectangle(400, 200, 80, 80, {
        inertia: Infinity,
        friction: 0.1,

        //track whether the box has jumped
        hasJumped: false,
        fallen: false,
      });

      // Essential platform/wall rectangle elements
      World.add(engine.world, [
        //(location on x axis, location on y axis, width of box, height of box)
        Bodies.rectangle(300, 260, 80, 80, {isStatic: true,}),
        Bodies.rectangle(435, 630, 1600, 60, {isStatic: true}),
        Bodies.rectangle(0, 200, 60, 800, {isStatic: true}),
        Bodies.rectangle(2000, 400, 60, 1000, {isStatic: true}),
        ]);

      World.add(engine.world, [boxA]);

      //Player Controls
      const keyHandlers = {
        KeyD: () => {
          Matter.Body.setVelocity(boxA,  {x: 5, y:(boxA.velocity.y)})
        },
        KeyW: () => {
          //if the box has NOT jumped
          if (!boxA.hasJumped) {
            boxA.hasJumped = true;
            Matter.Body.applyForce(boxA, {
              x: boxA.position.x,
              y: boxA.position.y
            }, {x: 0.0, y: -0.4})
          }
          console.log("hasJumped is" + boxA.hasJumped);
          console.log("fallen is" + boxA.fallen);
          console.log("velocity" + boxA.velocity.y);
        },
        KeyA: () => {
          Matter.Body.setVelocity(boxA,  {x: -5, y:(boxA.velocity.y)})
        },
      };

      
      //If the player character has jumped and is falling
      function playerFallen() {
        if (boxA.hasJumped && (boxA.velocity.y > 0)) {
          boxA.fallen = true;
        }
      };
      
      //if the player character has jumped, fallen, and hit stopped when hitting the ground
      function resetJumps() {
        if (boxA.hasJumped && boxA.fallen && (0.00000001<boxA.velocity.y<0.00000001)) {
          boxA.hasJumped = false;
          boxA.fallen = false;
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
    return <div ref="scene" />;
  }
}
export default Scene;