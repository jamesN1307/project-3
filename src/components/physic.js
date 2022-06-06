import Matter from 'matter-js';
import { GameEngine } from 'react';

import {enemyWalking} from './function/EnemyWalking'


export const Physics = (entities, { touches, time }) => {
    let engine = entities['physics'].engine;

    Matter.Engine.update(engine, time.delta);

    enemyWalking(entities);
  
}