Controls = function() {
  this.cursors = null;
};
Controls.prototype = {
  create: function () {
    this.cursors = hiv_game.game.input.keyboard.createCursorKeys();
  },
  update: function () {
    if (hiv_game.game.input.activePointer.isDown) {
      // do something
    }
  }
};
