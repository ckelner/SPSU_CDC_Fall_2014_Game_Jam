function Play() {
  this.jumpStart = null;
  this.tickityTock = 0;
}
Play.prototype = {
  create: function() {
    this.doThemBackGroundThings();
    hiv_game.game.physics.startSystem( Phaser.Physics.ARCADE );
    this.createControlPoint("thymus")
    this.createControlPoint("marrow");
    this.createControlPoint("marrow");
    this.createControlPoint("lymph");
    this.createControlPoint("lymph");
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
  update: function() {
    _jump = hiv_game.game.time.elapsedSince(this.jumpStart)
    if( (this.tickityTock + 2000) - _jump <= 0 ) {
      this.tickityTock = _jump;
      this.createWhiteBloodCell();
      this.createHIV();
    }
    var wbcGroup = game.add.group();
    var hivGroup = game.add.group();
    hiv_game.wbc.forEach(function(wbc) {
      wbc.update();
      wbcGroup.add(wbc.getSprite());
    });
    hiv_game.hiv.forEach(function(hiv) {
      hiv.update();
      hivGroup.add(hiv.getSprite());
    });

    hiv_game.game.physics.arcade.collide(wbcGroup,wbcGroup);
    hiv_game.game.physics.arcade.collide(hivGroup,hivGroup);
    hiv_game.game.physics.arcade.collide(wbcGroup,hivGroup);

    hiv_game.gBackground1.angle += 0.1;
    hiv_game.gBackground2.angle += 0.2;
    hiv_game.rBackground1.angle += 0.1;
    hiv_game.rBackground2.angle += 0.2;  
  },
  createControlPoint: function(type, x, y) {
    var cPoint = new ControlPoint();
    var x = hiv_game.randomNum(
      cPoint.eastWestLaneBuffer,
      (hiv_game.game.width-(cPoint.eastWestLaneBuffer*2))
    );
    var y = hiv_game.randomNum(
      cPoint.northSouthLaneBuffer,
      (hiv_game.game.height-(cPoint.northSouthLaneBuffer*2))
    );
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
  }
};
