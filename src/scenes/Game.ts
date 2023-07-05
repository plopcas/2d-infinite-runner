import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.image("background", "assets/images/house/bg_repeat_340x640.png");

    this.load.atlas(
      "rocket-mouse",
      "assets/images/characters/rocket-mouse.png",
      "assets/images/characters/rocket-mouse.json"
    );
  }

  create() {
    this.anims.create({
      key: "rocket-mouse-run",
      frames: this.anims.generateFrameNames("rocket-mouse", {
        start: 1,
        end: 4,
        prefix: "rocketmouse_run",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    // store the width and height of the game screen
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.tileSprite(0, 0, width, height, "background").setOrigin(0);

    this.add
      .sprite(
        width * 0.5, //middle of the screen
        height * 0.5,
        "rocket-mouse", //atlst key given in preload()
        "rocketmouse_fly01.png"
      )
      .play("rocket-mouse-run");
  }
}
