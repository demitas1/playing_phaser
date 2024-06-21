import { Scene } from 'phaser';


// Define an interface for custom keys
interface InputKeys {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
}


export class Game extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text : Phaser.GameObjects.Text;

  player: Phaser.Physics.Matter.Sprite;
  inputKeys: InputKeys;

  constructor() {
    super('Game');
  }

  preload() {
    console.log('Game: preload.');
    this.load.atlas(
      'player_atlas',
      'assets/images/practice_soldier-f01_no_gun-32x32.png',
      'assets/images/practice_soldier.json'
    );
    this.load.animation(
      'player_anime',
      'assets/images/practice_soldier_anime.json'
    );
  }

  create() {
    console.log('Game: create.');

    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(512, 384, 'background');
    this.background.setAlpha(0.5);

    this.inputKeys = this.input.keyboard.addKeys({
      up:    Phaser.Input.Keyboard.KeyCodes.W,
      down:  Phaser.Input.Keyboard.KeyCodes.S,
      left:  Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as InputKeys;
    console.log(this.inputKeys);

    this.player = this.matter.add.sprite(0, 0, "player_atlas", 'f5');
    this.add.existing(this.player);
  }

  update() {
    this.player.anims.play('idle', true);

    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();

    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    } else {
      playerVelocity.x = 0;
    }

    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    } else {
      playerVelocity.y = 0;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.player.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
