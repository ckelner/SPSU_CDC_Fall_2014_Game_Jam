BloodCell = function() {
  this.sprite = null;
  this.moveSpeed = 1;
  this.destX = 0;
  this.destY = 0;
  this.cellType = null;
  this.direction = null;
  this.giveUpMoveCloserRange = 45;
  this.speed = 100;
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
    this.sprite.gameObject = this;
    this.sprite.typeOfSprite = { "type": "cell", "spec": type };
    return this;
  },
  update: function () {
    this.goToNearestTarget( this.sprite );
    this.move();
  },
  getSprite: function () {
    return this.sprite;
  },
  goToNearestTarget: function(sprite) {
    var target = this.findNearestControlPoint( sprite );
    var pos = target.position;
    if( Math.abs(sprite.position.x - pos.x) < this.giveUpMoveCloserRange && 
      Math.abs(sprite.position.y - pos.y) < this.giveUpMoveCloserRange ) {
      sprite.body.velocity = 0;
      sprite.body.velocity.x = 0;
      sprite.body.velocity.y = 0;
      sprite.body.angularVelocity = 0;
    } else {
      var pt = new Phaser.Point();
      pt.x = pos.x + hiv_game.randomNum(20,45);
      pt.y = pos.y + hiv_game.randomNum(20,45);

      var possibleRotation = hiv_game.game.physics.arcade.angleBetween(sprite.position, pt);
      if( this.direction === null ) {
        this.direction = possibleRotation;
      }
      // don't adjust the angle like a crazy fucker
      if( Math.abs(this.direction - possibleRotation) > 0.05 ) {
        this.setDirection(possibleRotation);
      }
    }
  },
  setDirection: function(dir) {
    this.direction = dir;
  },
  getDirection: function() {
    return this.direction;
  },
  move: function() {
    this.sprite.rotation = this.direction;
    hiv_game.game.physics.arcade.velocityFromRotation(this.sprite.rotation, 100, this.sprite.body.velocity);
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
