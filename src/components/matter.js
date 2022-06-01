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
      Events = Matter.Events;

    var engine = Engine.create({
      // positionIterations: 20
    });

    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: 1000,
        height: 600,
        wireframes: false
      }
    });

    var ballA = Bodies.rectangle(110, 100, 30, 30,{ restitution: 0.5 });
    var ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });
    World.add(engine.world, [
      // walls
      //rectangle top
      //(location on x axis, location on y axis from top, width of box, height of box, options)
      //x axis: left = 0 //right = 1000
      //y axis: top = 0 // bottom = 600
      
      //bottom box
      Bodies.rectangle(200, 600, 300, 50, { isStatic: true }),
      //1st platform box
      Bodies.rectangle(400, 400, 300, 50, { isStatic: true }),
      //2nd platform box
      Bodies.rectangle(600, 200, 300, 50, { isStatic: true }),      
      //3rd platform
      Bodies.rectangle(800, 300, 300, 50, { isStatic: true }),
    ]);

    World.add(engine.world, [ballA]);

    // add mouse control
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

      const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        },
    }
      var runner = Runner.create(render.canvas),
      Events = Events.on(ballA, 'keydown', ({keyCode}) => {
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
    });

    World.add(engine.world, mouseConstraint);

    // Matter.Events.on(mouseConstraint, "mousedown", function(event) {
    //   World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    // });

    Engine.run(engine);

    Render.run(render);
  }

  render() {
    return <div ref="scene" />;
  }
}
export default Scene;