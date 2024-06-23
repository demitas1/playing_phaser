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
    super(
      data.scene.matter.world,
      data.x,
      data.y,
      data.texture,
      data.frame);

    this.game = data.scene;
    this.game.add.existing(this);

    // Collision
    const _matter = this.game.matter;
    const matterCollision = _matter.add.circle(
      this.x,
      this.y,
      12,
      {
        isSensor: false,
        label: 'playerCollsion',
      }
    );
    const matterSensor = _matter.add.circle(
      this.x,
      this.y,
      16,
      {
        isSensor: true,
        label: 'playerSensor',
      }
    );
    const matterCompound = _matter.body.create({
        parts: [
          matterCollision,
          matterSensor,
          ],
        inertia: Infinity  // prevent rotation
    });
    this.setExistingBody(matterCompound);
    this.setFixedRotation();
    this.setStatic(true);  // to prevent applying force

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
}
