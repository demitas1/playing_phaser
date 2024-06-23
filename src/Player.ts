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
      data.frame
    );

    this.game = data.scene;

    //console.log(this.game.matter);
    const _bodies = this.game.matter.bodies;
    const _body = this.game.matter.body;
    const _composite = this.game.matter.composite;
    const _world = this.game.matter.world;
    const _matterCollision = this.game.matterCollision;

    // Define the parts separately
    const mainBody = _bodies.rectangle(this.x, this.y, 20, 20, {
      restitution: 0,
      friction: 0,
      isStatic: false,
      isSensor: false,
      label: 'player_rect',
    });

    const circlePart = _bodies.circle(this.x, this.y + 10, 5, {
      restitution: 0,
      friction: 0,
      isStatic: true,
      isSensor: false,
      label: 'player_circle',
    });

    // Combine the parts into a single body
    const compoundBody = _body.create({
      parts: [mainBody, circlePart],
      restitution: 0,
      friction: 0,
      isStatic: false,
      isSensor: false,
      label: 'player',
    });

    // Remove the old body
    _world.remove(this.body);

    this.setExistingBody(compoundBody);
    this.game.add.existing(this);

    // matter collistion test
    _matterCollision.addOnCollideStart({
      objectA: mainBody,
      callback: (eventData) => {
        console.log("main body touched something.");
      }
    });

    _matterCollision.addOnCollideStart({
      objectA: circlePart,
      callback: (eventData) => {
        console.log("circle part touched something.");
      }
    });
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas(
      'soldier-f01-nogun',  // animation JSON で指定されているatlas内のkeyと同じにする
      'assets/images/soldier-f01-nogun.png',
      'assets/images/soldier-f01-nogun_atlas.json'
    );
    scene.load.animation(
      'player_anime',
      'assets/images/soldier-f01-nogun_anim.json'
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
      this.anims.play('run-down', true);
    } else {
      this.anims.play('idle-down', true);
    }
  }

  onCollision() {
    console.log('player detects collision.');
  }
}
