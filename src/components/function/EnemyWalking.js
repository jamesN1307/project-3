import Matter from 'matter-js'

function getRandomInt(max){
    return Math.floor(Math.random()*Math.floor(max))
}

let randomizer = getRandomInt(100)
let consecutive = 0 
let direction = "left"

export const enemyWalking = (entities) =>{
    let enemy = entities.initialEnemy.body;

    const walkLeft = () => {
        entities.initialenemy.face = -1;
        Matter.Body.applyForce(enemy, enemy.position, { x: -0.01, y: 0 });
      };
      const walkRight = () => {
        entities.initialenemy.face = 1;
        Matter.Body.applyForce(enemy, enemy.position, { x: 0.01, y: 0 });
      };
    
      if (consecutive < randomizer) {
        if (direction === 'left') {
          walkLeft();
        } else {
          walkRight();
        }
        consecutive++;
      } else {
        if (direction === 'left') {
          direction = 'right';
        } else {
          direction = 'left';
        }
        consecutive = 0;
        randomizer = getRandomInt(100);
      }
    };
    