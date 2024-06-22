import { Scene } from 'phaser';
import Player from '../Player';


// Define an interface for custom keys
interface InputKeys {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
}


export default class Game extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;

  player: Phaser.Physics.Matter.Sprite;
  inputKeys: InputKeys;

  constructor() {
    super('Game');
  }

  preload() {
    console.log('Game: preload.');
    Player.preload(this);
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

    this.player = new Player({
      scene: this,
      x: 160,
      y: 80,
      texture: 'player_atlas',
      frame: 'f5'});
    this.add.existing(this.player);
  }

  update() {
    this.player.update();
  }
}
