import Phaser from "phaser";

import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // Which renderer to use
  parent: "app", // ID of the DOM element to add the canvas to
  width: 800, // Canvas width in pixels
  height: 640, // Canvas height in pixels
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  scene: [Preloader, Game],
};

export default new Phaser.Game(config);
