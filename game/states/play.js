function Play() {
}
Play.prototype = {
  preload: function () {

  },
  create: function() {
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
    
    //hiv_game.map.load();
    this.game.physics.startSystem( Phaser.Physics.ARCADE );
    // how often to spawn white blood cells
    this.game.time.events.loop( 1000, this.createWhiteBloodCell, this );
    // how often to spawn HIV
    this.game.time.events.loop( 1000, this.createHIV, this );
    // Create contol points
    this.createControlPoint("thymus")
    this.createControlPoint("marrow");
    this.createControlPoint("marrow");
    this.createControlPoint("lymph");
    this.createControlPoint("lymph");
    

      
  },
  update: function() {
    hiv_game.wbc.forEach(function(wbc) {
      wbc.update();
    });
    hiv_game.hiv.forEach(function(hiv) {
      hiv.update();
    });
   
        /*hiv_game.gBackground1.alpha += 0.01;
    hiv_game.gBackground2.alpha += 0.01;
    hiv_game.rBackground1.alpha -= 0.01;
    hiv_game.rBackground2.alpha -= 0.01;*/
    hiv_game.gBackground1.angle += 0.1;
    hiv_game.gBackground2.angle += 0.2;
    hiv_game.rBackground1.angle += 0.1;
    hiv_game.rBackground2.angle += 0.2;  

  },
  createControlPoint: function(type, x, y) {
    var cPoint = new ControlPoint(this.game);
    var x = this.randomNum(
      cPoint.eastWestLaneBuffer,
      (hiv_game.game.width-cPoint.eastWestLaneBuffer)
    );
    var y = this.randomNum(
      cPoint.northSouthLaneBuffer,
      (hiv_game.game.height-cPoint.northSouthLaneBuffer)
    );
    hiv_game.controlPoints.push(
      cPoint.create(type, x, y)
    );
  },
  createHIV: function() {
    var cell = new BloodCell(this.game);
    hiv_game.hiv.push(
      cell.create(
        "hiv",
        (hiv_game.game.width + hiv_game.hivWidthHeight),
        this.randomNum(1, hiv_game.game.height)
      )
    );
  },
  createWhiteBloodCell: function() {
    var cell = new BloodCell(this.game);
    hiv_game.wbc.push(
      cell.create(
        "white",
        (0 - hiv_game.wbcWidthHeight),
        this.randomNum(1, hiv_game.game.height)
      )
    );
  },
  randomNum: function( start, num ) {
    return Math.floor( Math.random() * num ) + start;
  }
};
