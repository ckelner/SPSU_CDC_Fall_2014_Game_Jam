ControlPoint = function() {
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
        this.sprite = hiv_game.game.add.sprite(x, y, 'thymus-96');
      break;
      case "marrow":
        this.sprite = hiv_game.game.add.sprite(x, y, 'bone-marrow-96');
      break;
      case "lymph":
        this.sprite = hiv_game.game.add.sprite(x, y, 'lymph-96');
      break;
    }
    this.sprite.anchor.setTo(0.5,0.5);
    hiv_game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;
    this.sprite.gameObject = this;
    this.sprite.typeOfSprite = { "type": "controlpoint", "spec": type };
    return this;
  },
  update: function () {},
  getSprite: function () {
    return this.sprite;
  }
};
