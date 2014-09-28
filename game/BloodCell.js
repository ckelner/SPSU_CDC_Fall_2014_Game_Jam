BloodCell = function() {
  this.sprite = null;
  this.destX = 0;
  this.destY = 0;
  this.cellType = null;
  this.direction = null;
  this.giveUpMoveCloserRange = 45;
  this.speed = 300;
  this.isMoving = false;
  this.health = 1;
  this.x = null;
  this.y = null;
  this.targetX = null;
  this.targetY = null;
  this.atTarget = false;
  this.goingForNearestTarget = true;
  this.lastPos = null;
  this.uuid = null;
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
    this.cellType = type;
    hiv_game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.gameObject = this;
    this.sprite.typeOfSprite = { "type": "cell", "spec": type };
    this.sprite.anchor.setTo(0.5,0.5);
    // do some dumbass adjustment for stupid physics shit
    if( type === "hiv" ) {

    }
    this.uuid = guid();
    return this;
  },
  getUUID: function() {
    return this.uuid;
  },
  update: function () {
    //moveAgainPlease
    if( this.lastPos === null ) {
      this.lastPos = this.sprite.position;
    }
    if( !this.atTarget ) {
      if( this.goingForNearestTarget ) {
        this.goToNearestTarget( this.sprite, this.cellType );
      }
      this.move();
    } else {
      // some logic needs to trigger to tell it to move to next target
    }
    if( this.lastPos.x == this.sprite.position.x && this.lastPos.y == this.sprite.position.y ) {
      this.moveAgainPlease();
    }
  },
  goNearest: function( bool ) {
    this.goingForNearestTarget = bool;
  },
  getSprite: function () {
    return this.sprite;
  },
  pvp: function () {
    var indexToDelete = null;
    if (this.cellType == "white") {
      this.health -= 1;
    }
    if (this.health < 0) {
      var len = hiv_game.wbc.length;
      for( var i = 0; i < len; i++ ) {
        var wbc = hiv_game.wbc[i];
        if( wbc.getUUID() == this.uuid ) {
          indexToDelete = i;
          break;
        }
      }
    }
    return { "i": indexToDelete, "spriteToDelete": this.sprite};
  },
  goToNearestTarget: function(sprite, cellType) {
    var target = this.findNearestControlPoint( sprite, cellType );
    if( cellType == "hiv" ) {
      var t2 = this.findNearestWhitey( sprite, target );
      if( t2 !== null && t2 !== undefined ) {
        target = t2;
      }
    }
    var pos = target.position;
    this.setTarget( pos.x + hiv_game.randomNum(5,15), pos.y + hiv_game.randomNum(5,15) );
  },
  findNearestWhitey: function( sprite, target ) {
    var spritePosX = sprite.position.x;
    var spritePosY = sprite.position.y;
    var target2 = null;
    var bestDistance = Math.sqrt(Math.pow((target.position.x - spritePosX), 2) + Math.pow((target.position.y - spritePosY), 2));;
    hiv_game.wbc.forEach(function(wbc) {
      var wbcPosX = wbc.getSprite().position.x + wbc.getSprite().width/2;
      var wbcPosY = wbc.getSprite().position.y + wbc.getSprite().height/2;
      var distance = Math.sqrt(Math.pow((wbcPosX - spritePosX), 2) + Math.pow((wbcPosY - spritePosY), 2));
      if( bestDistance > distance ) {
        bestDistance = distance;
        target2 = wbc.getSprite();
      }
    });
    return target2;
  },
  arrivedAtTarget: function() {
    this.atTarget = true;
    // set immovable
    //this.sprite.body.immovable = true;
    // no more moving
    this.isMoving = false;
    this.goingForNearestTarget = true;
    this.sprite.body.velocity = 0;
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.body.angularVelocity = 0;
  },
  moveAgainPlease: function() {
    this.atTarget = false;
    // set immovable
    //this.sprite.body.immovable = false;
    // no more moving
    this.isMoving = true;
    this.goingForNearestTarget = true;
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
  isCellMoving: function() {
    return this.isMoving;
  },
  dontMove: function() {
    this.isMoving = false;
  },
  startMoving: function() {
    this.isMoving = true;
    this.setAtTarget( false );
    //this.sprite.body.immovable = false;
  },
  move: function() {
    var pt = new Phaser.Point();
    pt.x = this.targetX;
    pt.y = this.targetY;

    if( Math.abs(this.sprite.position.x - pt.x) < this.giveUpMoveCloserRange && 
      Math.abs(this.sprite.position.y - pt.y) < this.giveUpMoveCloserRange ) {
      var setAfterArrive = false;
      if( !this.goingForNearestTarget ) {
        setAfterArrive = true;
      }
      // once we've reached this stage we should freeze the cell
      // until we give explicit instruction
      this.arrivedAtTarget();
      // will cause cell to try to go to target again
      if( setAfterArrive ) {
        this.setAtTarget( false );

      }
    } else {
      this.isMoving = true;
      //this.sprite.body.immovable = false;
    }

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
    hiv_game.game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.speed, this.sprite.body.velocity);
  },
  findNearestControlPoint: function( sprite, cType ) {
    var spritePosX = sprite.position.x;
    var spritePosY = sprite.position.y;
    var target = null;
    var bestDistance = null;
    hiv_game.controlPoints.forEach(function(cp) {
      if (cp.owner == "none" || cp.owner != cType) {
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
