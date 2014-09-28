BloodCell = function() {
  this.sprite = null;
  this.moveSpeed = 200;
  this.destX = 0;
  this.destY = 0;
  this.cellType = null;
  this.direction = null;
  this.giveUpMoveCloserRange = 45;
  this.speed = 100;
  this.isMoving = false;
  this.x = null;
  this.y = null;
  this.targetX = null;
  this.targetY = null;
  this.atTarget = false;
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
    this.sprite.anchor.setTo(0.5,0.5);
    // do some dumbass adjustment for stupid physics shit
    if( type === "hiv" ) {

    }
    return this;
  },
  update: function () {
    if( !this.atTarget ) {
      this.goToNearestTarget( this.sprite );
      this.move();
    } else {
      // some logic needs to trigger to tell it to move to next target
    }
  },
  getSprite: function () {
    return this.sprite;
  },
  goToNearestTarget: function(sprite) {
    var target = this.findNearestControlPoint( sprite );
    var pos = target.position;
    if( Math.abs(sprite.position.x - pos.x) < this.giveUpMoveCloserRange && 
      Math.abs(sprite.position.y - pos.y) < this.giveUpMoveCloserRange ) {
      // once we've reached this stage we should freeze the cell
      // until we give explicit instruction
      this.atTarget = true;
      // set immovable
      sprite.body.immovable = true;
      // no more moving
      this.isMoving = false;
      sprite.body.velocity = 0;
      sprite.body.velocity.x = 0;
      sprite.body.velocity.y = 0;
      sprite.body.angularVelocity = 0;
    } else {
      this.isMoving = true;
      this.setTarget( pos.x + hiv_game.randomNum(20,45), pos.y + hiv_game.randomNum(20,45) );
    }
  },
  isAtTarget: function() {
    return this.atTarget;
  },
  setAtTarget: function( bool ) {
    this.atTarget = bool;
  },
  setTarget: function(x,y) {
    this.targetX = x;
    this.targetY = y;
  },
  setPosition: function(x,y) {
    this.x = x;
    this.y = y;
  },
  getPosition: function() {
    return {"x":this.x,"y":this.y};
  },
  setDirection: function(dir) {
    this.direction = dir;
  },
  getDirection: function() {
    return this.direction;
  },
  isMoving: function() {
    return this.isMoving;
  },
  dontMove: function() {
    this.isMoving = false;
  },
  startMoving: function() {
    this.isMoving = true;
  },
  move: function() {
    var pt = new Phaser.Point();
    pt.x = this.targetX;
    pt.y = this.targetY;

    var possibleRotation = hiv_game.game.physics.arcade.angleBetween(this.sprite.position, pt);
    // init the first time through
    if( this.direction === null ) {
      this.direction = possibleRotation;
    }
    // don't adjust the angle like a crazy fucker
    if( Math.abs(this.direction - possibleRotation) > 0.05 ) {
      this.setDirection(possibleRotation);
    }
    this.sprite.rotation = this.direction;
    hiv_game.game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.moveSpeed, this.sprite.body.velocity);
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
