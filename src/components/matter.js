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
        element: document.body,
        engine: engine
      });
      
      const boxA = Matter.Bodies.rectangle(400, 200, 80, 80, {
        inertia: Infinity,
        friction: 0.1,
      });
      const boxB = Matter.Bodies.rectangle(600, 560, 80, 80, {
        isStatic: true,
      });
      const ground = Matter.Bodies.rectangle(435, 630, 810, 60, {
        isStatic: true
      });
      const leftWall = Matter.Bodies.rectangle(0, 200, 60, 800, {
        isStatic: true
      });
      
      const keyHandlers = {
        KeyD: () => {
          Matter.Body.applyForce(boxA, {
            x: boxA.position.x,
            y: boxA.position.y
          }, {x: 0.02, y: 0})
        },
        KeyW: () => {
          Matter.Body.applyForce(boxA, {
            x: boxA.position.x,
            y: boxA.position.y
          }, {x: 0.0, y: -0.05})
        },
        KeyA: () => {
          Matter.Body.applyForce(boxA, {
            x: boxA.position.x,
            y: boxA.position.y
          }, {x: -0.02, y: 0})
        },
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
      });
      
      Matter.Composite.add(
        engine.world, [boxA, boxB, ground, leftWall]
      );
      Matter.Render.run(render);
      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
  }

  render() {
    return <div ref="scene" />;
  }
}
export default Scene;