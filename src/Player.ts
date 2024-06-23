import * as Phaser from 'phaser';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import Game from './scenes/Game';


interface SpriteData {
  scene: Game;
  x: number;
  y: number;
  texture: string;
  frame: string;
}


export default class Player extends Phaser.Physics.Matter.Sprite
{
  game: Game;

  constructor(data: SpriteData) {
    const bodyOptions = {
      restitution: 0,
      friction: 0,
      shape: {
        type: "circle",
        radius: 10,
      },
      label: 'player',
      isStatic: false,
    };

    super(
      data.scene.matter.world,
      data.x,
      data.y,
      data.texture,
      data.frame,
      bodyOptions
    );

    this.game = data.scene;
    this.game.add.existing(this);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas(
      'player_atlas',
      'assets/images/practice_soldier-f01_no_gun-32x32.png',
      'assets/images/practice_soldier.json'
    );
    scene.load.animation(
      'player_anime',
      'assets/images/practice_soldier_anime.json'
    );
  }

  update() {
    let inputKeys = this.game.inputKeys;

    const speed = 2.5;
    let Velocity = new Phaser.Math.Vector2();
    let isRunning = false;

    if (inputKeys.left.isDown) {
      Velocity.x = -1;
      isRunning = true;
    } else if (inputKeys.right.isDown) {
      Velocity.x = 1;
      isRunning = true;
    } else {
      this.setVelocityX(0.0);
      Velocity.x = 0;
    }

    if (inputKeys.up.isDown) {
      Velocity.y = -1;
      isRunning = true;
    } else if (inputKeys.down.isDown) {
      Velocity.y = 1;
      isRunning = true;
    } else {
      Velocity.y = 0;
    }
    Velocity.normalize();
    Velocity.scale(speed);
    this.setPosition(this.x + Velocity.x, this.y + Velocity.y);
    this.setVelocity(0.0, 0.0);  // to prevent applying force

    if (isRunning) {
      this.anims.play('idle', true);
    } else {
      this.anims.play('idle', true);
    }
  }

  onCollision() {
    console.log('player detects collision.');
  }
}
