import * as Phaser from 'phaser';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainMenu } from './scenes/MainMenu';
import Game from './scenes/Game';
import { GameOver } from './scenes/GameOver';


const pluginConfig = {
  // The plugin class:
  plugin: PhaserMatterCollisionPlugin,
  // Where to store in Scene.Systems, e.g. scene.sys.matterCollision:
  key: "matterCollision" as "matterCollision",
  // Where to store in the Scene, e.g. scene.matterCollision:
  mapping: "matterCollision" as "matterCollision",
};

declare module "phaser" {
  interface Scene {
    [pluginConfig.mapping]: PhaserMatterCollisionPlugin;
  }
  namespace Scenes {
    interface Systems {
      [pluginConfig.key]: PhaserMatterCollisionPlugin;
    }
  }
}


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
    scene: [pluginConfig],
  },
  scene: [
    Boot,
    Preloader,
    MainMenu,
    Game,
    GameOver,
  ],
};

// main
// create Application and append it to document
const app = new Phaser.Game(config);
