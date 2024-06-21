import * as Phaser from 'phaser';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainMenu } from './scenes/MainMenu';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';


const config: Phaser.Types.Core.GameConfig = {
  title: 'Empty',

  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: '#080f0f',
  width: 1024,
  height: 768,
  scale: {
    zoom: 2,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: {
        x: 0,
        y: 0,
      },
    }
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: 'matterCollision',
        mapping: 'matterCollision',
      }
    ]
  },
  scene: [
    Boot,
    Preloader,
    MainMenu,
    MainGame,
    GameOver,
  ],
};

// main
// create Application and append it to document
const app = new Phaser.Game(config);
