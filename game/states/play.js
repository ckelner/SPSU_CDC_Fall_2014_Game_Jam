function Play() {
  this.jumpStart = null;
  this.tickityTock = 0;
  this.cellCount = 0;
  this.cellCap = 5000;
}
Play.prototype = {
  create: function() {
    this.doThemBackGroundThings();
    hiv_game.game.physics.startSystem( Phaser.Physics.ARCADE );
    // Create contol points
    //this.createControlPoint("thymus", 800, 450)
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
    // delete them fatties
    if( hiv_game.toDelete.length > 0 ) {
      hiv_game.toDelete.forEach(function(obj){
        var spritey = obj.spriteToDelete;
        /*try{
          spritey.body.destroy();
          spritey.kill();
          var indexToD = obj.i;
          hiv_game.wbc.splice(indexToD,1);
        } catch( e ) {}
        */
        spritey.position.x = -10000;
        spritey.position.y = -10000;
        spritey.body.immovable = true;
      });
    }
    hiv_game.toDelete = [];
    // calc the amount of time that has passed and use it to spawn shit
    _jump = hiv_game.game.time.elapsedSince(this.jumpStart)
    if( (this.tickityTock + 1000) - _jump <= 0 ) {
      this.tickityTock = _jump;
      if( this.cellCount <= this.cellCap ) {
        this.createWhiteBloodCell();
        this.createWhiteBloodCell();
        this.createWhiteBloodCell();
        this.createHIV();
        this.createHIV();
        this.createHIV();
        this.createHIV();
        this.createHIV();
      }
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
    if( hiv_game.handleCellControlPtCollisionEnabled ) {
      var s1SpriteType = spriteOne.typeOfSprite;
      var s2SpriteType = spriteTwo.typeOfSprite;
      var s1GameObj = spriteOne.gameObject;
      var s2GameObj = spriteTwo.gameObject;
      var cell = null;
      var cp = null;
      // who is who?  this shit does not work - scott
      if( s1GameObj.type === hiv_game.gameObjectTypes[0] ) {
        cell = s1GameObj;
        cp = s2GameObj;
      } else {
        cell = s2GameObj;
        cp = s1GameObj;
      }

      cp.owner = cell.cellType;
      /*var cellSprite = cell.getSprite();
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
      var cellLowerRightX = cellUpperLeftX + cellBounds.width;*/
      // don't let these shits get under the ctrl point
      // establish cell position
    }
  },
  handleCollision: function(spriteOne, spriteTwo) {
    var s1SpriteType = spriteOne.typeOfSprite;
    var s2SpriteType = spriteTwo.typeOfSprite;
    var s1GameObj = spriteOne.gameObject;
    var s2GameObj = spriteTwo.gameObject;
    var s1Dir = s1GameObj.getDirection();
    var s2Dir = s2GameObj.getDirection();

    if (s1SpriteType.spec != s2SpriteType.spec) {
      hiv_game.toDelete.push(s1GameObj.pvp());
    }
    // who to move? try to move y?
    var cellToMove = null;
    if( s1GameObj.isCellMoving() ) {
      cellToMove = s1GameObj;
    } else {
      cellToMove = s2GameObj;
    }
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
    var newXDiff = cellToMove.getSprite().position.x;
    var newYDiff = cellToMove.getSprite().position.y  + hiv_game.randomNum(30,50) * goNegY;
    cellToMove.setTarget( newXDiff, newYDiff );
    cellToMove.startMoving();
    //cellToMove.goNearest( false );
  },
  createControlPoint: function(type, x, y) {
    var cPoint = new ControlPoint();
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
    this.cellCount++;
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
    this.cellCount++;
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
