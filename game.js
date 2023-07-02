var config = {
    type: Phaser.AUTO, // Use WebGL if available, otherwise use Canvas
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var player;

function preload() {
    // Load an image asset
    this.load.image('player', 'path/to/player.png');
}

function create() {
    // Create the player sprite at the center of the screen
    player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player');

    // Setup player input (arrow keys)
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Update the player's movement based on input
    player.setVelocity(0, 0);

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
    }
    else if (cursors.up.isDown) {
        player.setVelocityY(-160);
    }
    else if (cursors.down.isDown) {
        player.setVelocityY(160);
    }
}
