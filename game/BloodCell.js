BloodCell = function() {
  this.sprite = null;
  this.moveSpeed = 1;
  this.destX = 0;
  this.destY = 0;
  this.cellType = null;
};
BloodCell.prototype = {
  create: function (type, x, y) {
    switch (type) {
      case "white":
        this.sprite = hiv_game.game.add.sprite(x, y, 'white-blood-cell-32');
      break;
      case "hiv":
        this.sprite = hiv_game.game.add.sprite(x, y, 'hiv');
      break;
    }
    hiv_game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    return this;
  },
  update: function () {
    this.goToNearestTarget( this.sprite );
  },
  getSprite: function () {
    return this.sprite;
  },
  goToNearestTarget: function(sprite) {
    var target = this.findNearestControlPoint( sprite );
    sprite.rotation = hiv_game.game.physics.arcade.angleBetween(sprite.position, target.position);
    hiv_game.game.physics.arcade.velocityFromRotation(sprite.rotation, 100, sprite.body.velocity);
  },
  findNearestControlPoint: function( sprite ) {
    var spritePosX = sprite.position.x;
    var spritePosY = sprite.position.y;
    var target = null;
    var bestDistance = null;
    hiv_game.controlPoints.forEach(function(cp) {
      if (cp.owner == "none" || cp.owner != this.cellType) {
        var cpPosX = cp.getSprite().position.x + cp.getSprite().width/2;
        var cpPosY = cp.getSprite().position.y + cp.getSprite().height/2;
        var distance = Math.sqrt(Math.pow((cpPosX - spritePosX), 2) + Math.pow((cpPosY - spritePosY), 2));
      }
      if( !bestDistance ) {
        bestDistance = distance;
      } else {
        if( bestDistance > distance ) {
          bestDistance = distance;
          target = cp.getSprite();
        }
      }
      if( !target ) {
        target = cp.getSprite();
      }
    });
    return target;
  }
};
