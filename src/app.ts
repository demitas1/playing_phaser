import * as Phaser from 'phaser';

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
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
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
