import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";

export default class LaserObstacle extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const top = scene.add.image(0, 0, TextureKeys.LaserEnd).setOrigin(0.5, 0);

    const middle = scene.add
      .image(0, top.y + top.displayHeight, TextureKeys.LaserMiddle)
      .setOrigin(0.5, 0);

    middle.setDisplaySize(middle.width, 200);

    const bottom = scene.add
      .image(0, middle.y + middle.displayHeight, TextureKeys.LaserEnd)
      .setOrigin(0.5, 0)
      .setFlipY(true);

    this.add(top);
    this.add(middle);
    this.add(bottom);

    scene.physics.add.existing(this, true);

    const body = this.body as Phaser.Physics.Arcade.StaticBody;
    const width = top.displayWidth;
    const height =
      top.displayHeight + middle.displayHeight + bottom.displayHeight;

    body.setSize(width * 0.25, height * 0.7);
    body.setOffset(-width * 0.11, 57);

    body.position.x = this.x + body.offset.x;
    body.position.y = this.y + body.offset.y;
  }
}
