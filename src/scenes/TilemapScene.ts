import Phaser from "phaser";

export default class TilemapScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("tilemap-scene");
  }

  preload() {
    // Image layers from Tiled can't be exported to Phaser 3 (as yet)
    // So we add the background image separately
    this.load.image("background", "assets/images/background.png");

    // Load the tileset image file, needed for the map to know what
    // tiles to draw on the screen
    this.load.image("tiles", "assets/tilesets/platformPack_tilesheet.png");

    // Even though we load the tilesheet with the spike image, we need to
    // load the Spike image separately for Phaser 3 to render it
    this.load.image("spike", "assets/images/spike.png");

    // Load the export Tiled JSON
    this.load.tilemapTiledJSON("map", "assets/tilemaps/level1.json");

    // Load player animations from the player spritesheet and atlas JSON
    this.load.atlas(
      "player",
      "assets/images/kenney_player.png",
      "assets/images/kenney_player_atlas.json"
    );

    // Alt. load player spritesheet here
    // this.load.spritesheet("player", "assets/spritesheets/player.png", {
    //   frameWidth: 32, // width of each frame in the spritesheet
    //   frameHeight: 32, // height of each frame in the spritesheet
    // });
  }

  create() {
    // Create a tile map, which is used to bring our level in Tiled
    // to our game world in Phaser
    const map = this.make.tilemap({ key: "map" });

    // Add the tileset to the map so the images would load correctly in Phaser
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("kenney_simple_platformer", "tiles");

    // Place the background image in our game world
    const backgroundImage = this.add.image(0, 0, "background").setOrigin(0, 0);
    // Scale the image to better match our game's resolution
    backgroundImage.setScale(2, 0.8);

    // create the layers
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    // Add the platform layer as a static group, the player would be able
    // to jump on platforms like world collisions but they shouldn't move
    const platforms = map.createLayer("Platforms", tileset, 0, 200);

    // There are many ways to set collision between tiles and players
    // As we want players to collide with all of the platforms, we tell Phaser to
    // set collisions for every tile in our platform layer whose index isn't -1.
    // Tiled indices can only be >= 0, therefore we are colliding with all of
    // the platform layer
    platforms.setCollisionByExclusion([-1], true);

    // Add the player to the game world
    // create the player sprite and enable physics
    this.player = this.physics.add.sprite(50, 300, "player");
    this.player.setBounce(0.1); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map
    this.physics.add.collider(this.player, platforms);

    // Create the walking animation using the last 2 frames of
    // the atlas' first row
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("player", {
        prefix: "robo_player_",
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Create an idle animation i.e the first frame
    this.anims.create({
      key: "idle",
      frames: [{ key: "player", frame: "robo_player_0" }],
      frameRate: 10,
    });

    // Use the second frame of the atlas for jumping
    this.anims.create({
      key: "jump",
      frames: [{ key: "player", frame: "robo_player_1" }],
      frameRate: 10,
    });

    // add more animations as needed for up, down, etc.

    // set up player controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // update camera to follow the player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.0);
  }

  update() {
    // Control the player with left or right keys
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      if (this.playerBody.onFloor()) {
        this.player.play("walk", true);
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      if (this.playerBody.onFloor()) {
        this.player.play("walk", true);
      }
    } else {
      // If no keys are pressed, the player keeps still
      this.player.setVelocityX(0);
      // Only show the idle animation if the player is footed
      // If this is not included, the player would look idle while jumping
      if (this.playerBody.onFloor()) {
        this.player.play("idle", true);
      }
    }

    // Player can jump while walking any direction by pressing the space bar
    // or the 'UP' arrow
    if (
      (this.cursors.space.isDown || this.cursors.up.isDown) &&
      this.playerBody.onFloor()
    ) {
      this.player.setVelocityY(-350);
      this.player.play("jump", true);
    }

    // If the player is moving to the right, keep them facing forward
    if (this.player.body.velocity.x > 0) {
      this.player.setFlipX(false);
    } else if (this.player.body.velocity.x < 0) {
      // otherwise, make them face the other side
      this.player.setFlipX(true);
    }
  }

  private get playerBody() {
    return this.player.body as Phaser.Physics.Arcade.Body;
  }
}
