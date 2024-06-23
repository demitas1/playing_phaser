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

  player: Player;
  inputKeys: InputKeys;

  constructor() {
    super('Game');
  }

  preload() {
    console.log('Game: preload.');
    Player.preload(this);

    // map
    // Tiledで使用したタイルセット画像
    // Asepriteで出力
    this.load.image(
      'tiles',
      'assets/images/tilemap-test1-Sheet-wall.png');
    // TiledでセーブしたJSONファイル
    // Orthogonal, Base64 (uncompressed), 16x16, no background color
    this.load.tilemapTiledJSON(
      'map',
      'assets/images/map1.json');
  }

  create() {
    console.log('Game: create.');

    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(512, 384, 'background');
    this.background.setAlpha(0.5);

    // tilemap
    const map = this.make.tilemap({key: 'map'});
    const tileset = map.addTilesetImage(
      'tilemap-test1-Sheet-wall', // map1.json 内,該当 tilesets[] 要素のname
      'tiles',
      16, 16, 0, 0);
    const layer1 = map.createLayer(
      'Tile Layer 1',  // Tiled で指定したレイヤー名
      tileset,
      0, 0);


    // input
    this.inputKeys = this.input.keyboard.addKeys({
      up:    Phaser.Input.Keyboard.KeyCodes.W,
      down:  Phaser.Input.Keyboard.KeyCodes.S,
      left:  Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as InputKeys;
    console.log(this.inputKeys);

    // player
    this.player = new Player({
      scene: this,
      x: 160,
      y: 80,
      texture: 'player_atlas',
      frame: 'f5'});
    this.add.existing(this.player);


    // test matter for map
    //console.log(this.matterCollision);
    const matterBlock = this.matter.add.rectangle(
      200, 200,
      100, 50,
      {
        isSensor: false,
        label: 'block',
        isStatic: true,
      }
    );

    // matter collistion test
    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: matterBlock,
      callback: eventData => {
        const { bodyA, bodyB } = eventData;
        console.log("Player touched something.");
          // bodyB will be the matter body that the player touched.
          // gameObjectB will be the game object that owns bodyB, or undefined if there's no game object
          // (e.g. the player hitting an invisible Matter body acting as a wall).
        this.player.onCollision();
      }
    });
  }

  update() {
    this.player.update();
  }
}
