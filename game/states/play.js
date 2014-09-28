function Play() {
  this.jumpStart = null;
  this.tickityTock = 0;
  this.handleCellControlPtCollisionEnabled = false;
}
Play.prototype = {
  create: function() {
    this.doThemBackGroundThings();
    hiv_game.game.physics.startSystem( Phaser.Physics.ARCADE );
    // Create contol points
    this.createControlPoint("thymus", 800, 450)
    this.createControlPoint("marrow", 300, 300);
    this.createControlPoint("marrow", 1200, 300);
    this.createControlPoint("lymph", 1200, 700);
    this.createControlPoint("lymph", 300, 830);
    this.jumpStart = hiv_game.game.time.now;
  },
  doThemBackGroundThings: function() {
    hiv_game.gBackground1 = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'gBackground'); 
    hiv_game.gBackground1.anchor.setTo(0.5,0.5);
    hiv_game.gBackground1.scale.setTo(3, 3);
    hiv_game.gBackground1.alpha = 0;
      
    hiv_game.gBackground2 = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'gBackground'); 
    hiv_game.gBackground2.anchor.setTo(0.5,0.5);
    hiv_game.gBackground2.scale.setTo(3, 3);
    hiv_game.gBackground2.alpha = 0;
      
    hiv_game.rBackground1 = this.game.add.sprite(this.game.world.centerX,-100, 'rBackground'); 
    hiv_game.rBackground1.anchor.setTo(0.5,0.5);
    hiv_game.rBackground1.scale.setTo(3, 3);
      
    hiv_game.rBackground2 = this.game.add.sprite(this.game.world.centerX,-100, 'rBackground'); 
    hiv_game.rBackground2.anchor.setTo(0.5,0.5);
    hiv_game.rBackground2.scale.setTo(3, 3);
  },
  render: function() {
    if( hiv_game.debug ) {
      hiv_game.wbc.forEach(function(wbc) {
        hiv_game.game.debug.body( wbc.getSprite() );
      });
      hiv_game.hiv.forEach(function(hiv) {
        hiv_game.game.debug.body( hiv.getSprite() );
      });
      hiv_game.controlPoints.forEach(function(cp) {
        hiv_game.game.debug.body( cp.getSprite() );
      });
    }
  },
  update: function() {
    // calc the amount of time that has passed and use it to spawn shit
    _jump = hiv_game.game.time.elapsedSince(this.jumpStart)
    if( (this.tickityTock + 2000) - _jump <= 0 ) {
      this.tickityTock = _jump;
      this.createWhiteBloodCell();
      this.createHIV();
      this.backgroundColorChanger();
    }
    var wbcGroup = game.add.group();
    var hivGroup = game.add.group();
    var cpGroup = game.add.group();
    hiv_game.wbc.forEach(function(wbc) {
      wbc.update();
      wbcGroup.add(wbc.getSprite());
    });
    hiv_game.hiv.forEach(function(hiv) {
      hiv.update();
      hivGroup.add(hiv.getSprite());
    });
    hiv_game.controlPoints.forEach(function(cp) {
      cp.update();
      cpGroup.add(cp.getSprite());
    });
    this.performCollisions(wbcGroup,hivGroup,cpGroup);
    this.backgroundRotate();
  },
  performCollisions: function(wbcGroup,hivGroup,cpGroup) {
    // collide cells
    hiv_game.game.physics.arcade.collide(wbcGroup,wbcGroup,this.handleCollision);
    hiv_game.game.physics.arcade.collide(hivGroup,hivGroup,this.handleCollision);
    hiv_game.game.physics.arcade.collide(wbcGroup,hivGroup,this.handleCollision);
    // collide control points and cells
    hiv_game.game.physics.arcade.collide(cpGroup,hivGroup,this.handleCellControlPtCollision);
    hiv_game.game.physics.arcade.collide(cpGroup,wbcGroup,this.handleCellControlPtCollision);
  },
  handleCellControlPtCollision: function(spriteOne, spriteTwo) {
    if( this.handleCellControlPtCollisionEnabled ) {
      var s1SpriteType = spriteOne.typeOfSprite;
      var s2SpriteType = spriteTwo.typeOfSprite;
      var s1GameObj = spriteOne.gameObject;
      var s2GameObj = spriteTwo.gameObject;
      var cell = null;
      var cp = null;
      // who is who?
      if( s1GameObj.type === hiv_game.gameObjectTypes[0] ) {
        cell = s1GameObj;
        cp = s2GameObj;
      } else {
        cell = s2GameObj;
        cp = s2GameObj;
      }
      var cellSprite = cell.getSprite();
      var cpSprite = cp.getSprite();
      var cpBounds = cpSprite.getBounds();
      var cellBounds = cellSprite.getBounds();
      var cpUpperLeftY = cpBounds.y;
      var cpUpperLeftX = cpBounds.x;
      var cpLowerRightY = cpUpperLeftY + cpBounds.height;
      var cpLowerRightX = cpUpperLeftX + cpBounds.width;
      var cellUpperLeftY = cellBounds.y;
      var cellUpperLeftX = cellBounds.x;
      var cellLowerRightY = cellUpperLeftY + cellBounds.height;
      var cellLowerRightX = cellUpperLeftX + cellBounds.width;
      // don't let these shits get under the ctrl point
      // establish cell position
    }
  },
  handleCollision: function(spriteOne, spriteTwo) {
    var s1SpriteType = spriteOne.typeOfSprite;
    var s2SpriteType = spriteTwo.typeOfSprite;
    var s1GameObj = spriteOne.gameObject;
    var s2GameObj = spriteTwo.gameObject;
    // FIXME: Kelner -- Don't really need this now w/ two different handlers
    // are they both cells?
    if( s1GameObj.type === hiv_game.gameObjectTypes[0]
      && s1GameObj.type === hiv_game.gameObjectTypes[0] ) {
      // are these guys at the target?
      if( s1GameObj.isAtTarget() && s2GameObj.isAtTarget() ) {
        // then why you fighting?
        // move one target elsewhere
        var negPosX = hiv_game.randomNumNoStart(2);
        var negPosY = hiv_game.randomNumNoStart(2);
        var goNegX = 1;
        var goNegY = 1;
        if( negPosX === 1 ) {
          goNegX = -1;
        }
        if( negPosY === 1 ) {
          goNegY = -1;
        }
        var newXDiff = hiv_game.randomNum(10,30) * goNegX;
        var newYDiff = hiv_game.randomNum(10,30) * goNegY;
        s1GameObj.setTarget( newXDiff, newYDiff );
        s1GameObj.setAtTarget( false );
        s1GameObj.startMoving();
      }
      // are these guys both moving?
      if( s1GameObj.isMoving() && s2GameObj.isMoving() ) {
        // then get direction
        var s1Dir = s1GameObj.getDirection();
        var s2Dir = s2GameObj.getDirection();
        // turn them slightly away from each other?
        if( s1Dir > s2Dir ) {
          s1GameObj.setDirection(s1Dir+0.2);
          s2GameObj.setDirection(s2Dir-0.2);
        } else {
          s1GameObj.setDirection(s1Dir-0.2);
          s2GameObj.setDirection(s2Dir+0.2);
        }
      } else { // one moving and one isnt
        // get off my shit?

      }
    }
  },
  createControlPoint: function(type, x, y) {
    var cPoint = new ControlPoint();
    // un comment for random spots
    /*var x = hiv_game.randomNum(
      cPoint.eastWestLaneBuffer,
      (hiv_game.game.width-(cPoint.eastWestLaneBuffer*2))
    );
    var y = hiv_game.randomNum(
      cPoint.northSouthLaneBuffer,
      (hiv_game.game.height-(cPoint.northSouthLaneBuffer*2))
    );*/
    hiv_game.controlPoints.push(
      cPoint.create(type, x, y)
    );
  },
  createHIV: function() {
    var cell = new BloodCell();
    hiv_game.hiv.push(
      cell.create(
        "hiv",
        (hiv_game.game.width + hiv_game.hivWidthHeight),
        hiv_game.randomNum(1, hiv_game.game.height)
      )
    );
  },
  createWhiteBloodCell: function() {
    var cell = new BloodCell();
    hiv_game.wbc.push(
      cell.create(
        "white",
        (0 - hiv_game.wbcWidthHeight),
        hiv_game.randomNum(1, hiv_game.game.height)
      )
    );
  },
  backgroundRotate: function() {
    hiv_game.gBackground1.angle += 0.1;
    hiv_game.gBackground2.angle += 0.2;
    hiv_game.rBackground1.angle += 0.1;
    hiv_game.rBackground2.angle += 0.2;  
  },
  backgroundColorChanger: function() {
    for(var i; i < hiv_game.controlPoints.length; i++){
      if(hiv_game.controlPoints[i].owner == "hiv"){
        hiv_game.gBackground2.alpha += 0.001;
        hiv_game.gBackground2.alpha += 0.001;
        hiv_game.rBackground1.alpha -= 0.001;
        hiv_game.rBackground2.alpha -= 0.001;
      }
    }
  }
};
