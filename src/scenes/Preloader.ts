import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    this.load.image(
      TextureKeys.Background,
      "assets/images/house/bg_repeat_340x640.png"
    );

    this.load.atlas(
      TextureKeys.RocketMouse,
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

    this.scene.start(SceneKeys.Game);
  }
}
