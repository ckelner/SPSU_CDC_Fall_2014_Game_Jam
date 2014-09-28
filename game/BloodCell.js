BloodCell = function(game) {
	this.game = game;
	this.sprite = null;
  this.cellType = null;
};

BloodCell.prototype = {

	preload: function () {

	},

	create: function (type, x, y) {

		switch (type) {
			case "white":
				this.sprite = game.add.sprite(x, y, 'white-blood-cell-32');
        this.cellType = type;
			break;
			case "hiv":
				this.sprite = game.add.sprite(x, y, 'hiv');
        this.cellType = type;
			break;
		}

    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    //this.sprite.body.drag.set(100);
    //this.sprite.body.maxVelocity.set(200);
    return this;
	},

	update: function () {
		this.goToNearestTarget( this.sprite );
	},
  goToNearestTarget: function(sprite) {
    var pos = this.findNearestControlPoint( sprite );
    //var tween = this.game.add.tween( sprite );
    //tween.to({ x: pos.x, y: pos.y }, 6000);
    //tween.start();
    /*if( pos.x === sprite.position.x &&
      pos.y === sprite.position.y ) {
      sprite.body.acceleration.set(0);
    } else {*/
    //var angle = this.findAngleToTarget( sprite.position, pos );
    //sprite.rotation = angle;
    sprite.rotation = hiv_game.game.physics.arcade.angleBetween(sprite.position, pos);
    hiv_game.game.physics.arcade.velocityFromRotation(sprite.rotation, 100, sprite.body.velocity);
    //}
  },
  findAngleToTarget: function( sprite, target ) {
    var spritePosX = sprite.x;
    var spritePosY = sprite.y;
    var targetPosX = target.x;
    var targetPosY = target.y;
    var angleRad = Math.atan( (spritePosX * targetPosX + spritePosY * targetPosY) /
      ( Math.sqrt(spritePosX * spritePosX + spritePosY * spritePosY) * 
      Math.sqrt(targetPosX * targetPosX + targetPosY * targetPosY) ) );
    return angleRad * 180 / Math.PI;
  },
  findNearestControlPoint: function( sprite ) {
    var spritePosX = sprite.position.x;
    var spritePosY = sprite.position.y;
    var target = null;
    var bestDistance = null;
    hiv_game.controlPoints.forEach(function(cp) {
      if (cp.owner == "none" || cp.owner != this.cellType) {
        var cpPosX = cp.getSprite().position.x;
        var cpPosY = cp.getSprite().position.y;
        var distance = Math.sqrt(Math.pow((cpPosX - spritePosX), 2) + Math.pow((cpPosY - spritePosY), 2));
      }
      //if( Math.floor(distance) === 0 ) {
      //  target = cp.position;
      //} else {
        if( !bestDistance ) {
          bestDistance = distance;
        } else {
          if( bestDistance > distance ) {
            bestDistance = distance;
            target = cp.getSprite().position;
          }
        }
        if( !target ) {
          target = cp.getSprite().position;
        }
      //}
    });
    return target;
  },
	moveTo: function (destination) {
		//game.physics.moveTowardsObject(this.sprite, destination, 100);
	}
};