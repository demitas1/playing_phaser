import * as Phaser from 'phaser';
import { GameScene } from './gamescene';

const config: Phaser.Types.Core.GameConfig = {
  title: 'Empty',

  scene: [GameScene],
  backgroundColor: '#333',
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 800,
    height: 600,
    max: {
      width: 800,
      height: 600
    }
  }
};

// main
// create Application and append it to document
const app = new Phaser.Game(config);
