Controls = function(game) {
  this.game = game;
  this.cursors = null;
};
Controls.prototype = {
  create: function () {
    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update: function () {
    if (game.input.activePointer.isDown) {
      // do something
    }
  }
};
