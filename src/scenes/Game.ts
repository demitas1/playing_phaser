import { Scene } from 'phaser';

export class Game extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text : Phaser.GameObjects.Text;

  player: Phaser.Physics.Matter.Sprite;
  inputKeys: any;

  constructor() {
    super('Game');
  }

  preload() {
    console.log('Game: preload.');
  }

  create() {
    console.log('Game: create.');

    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(512, 384, 'background');
    this.background.setAlpha(0.5);

    this.msg_text = this.add.text(
      512, 384,
      'Make something fun!\nand share it with us:\nsupport@phaser.io',
      {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
      }
    );
    this.msg_text.setOrigin(0.5);

    this.inputKeys = this.input.keyboard.addKeys({
      up:    Phaser.Input.Keyboard.KeyCodes.W,
      down:  Phaser.Input.Keyboard.KeyCodes.S,
      left:  Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    console.log(this.inputKeys);

    this.player = this.matter.add.sprite(0, 0, "player");
  }

  update() {
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
