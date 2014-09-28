ControlPoint = function(game) {
  this.game = game;
  this.sprite = null;
  this.owner = "none";
  this.eastWestLaneBuffer=400;
  this.northSouthLaneBuffer=100;
};
ControlPoint.prototype = {
  preload: function () {},
  create: function (type, x, y) {
    switch (type) {
      case "thymus":
        this.sprite = game.add.sprite(x, y, 'thymus-96');
      break;
      case "marrow":
        this.sprite = game.add.sprite(x, y, 'bone-marrow-96');
      break;
      case "lymph":
        this.sprite = game.add.sprite(x, y, 'lymph-96');
      break;
    }
    return this;
  },
  update: function () {},
  getSprite: function () {
    return this.sprite;
  }
};
