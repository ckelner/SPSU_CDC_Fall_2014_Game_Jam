function Play() {}
var kelnerCell1=null;
var kelnerCell2=null;
Play.prototype = {
  create: function() {
    this.doThemBackGroundThings();
    //hiv_game.map.load();
    hiv_game.game.physics.startSystem( Phaser.Physics.ARCADE );
    // how often to spawn white blood cells
    hiv_game.game.time.events.loop( 1000, this.createWhiteBloodCell, this );
    // how often to spawn HIV
    hiv_game.game.time.events.loop( 1000, this.createHIV, this );
    this.createControlPoint("thymus")
    this.createControlPoint("marrow");
    this.createControlPoint("marrow");
    this.createControlPoint("lymph");
    this.createControlPoint("lymph");

    kelnerCell1 = new BloodCell();
    kelnerCell1.create("white",10,10);
    kelnerCell2 = new BloodCell();
    kelnerCell2.create("white",300,10);
    kelnerCell1.getSprite().body.velocity.x=100;
    //kelnerCell2.getSprite().body.velocity.x=-100;
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
    hiv_game.game.physics.arcade.collide(kelnerCell1.getSprite(),kelnerCell2.getSprite(),function(){console.log("collided")});
    var wbcArray = [];
    var hivArray = [];
    hiv_game.wbc.forEach(function(wbc) {
      wbc.update();
      wbcArray.push(wbc.getSprite());
    });
    hiv_game.hiv.forEach(function(hiv) {
      hiv.update();
      hivArray.push(hiv.getSprite());
    });

    hiv_game.game.physics.arcade.collide(wbcArray,wbcArray,function(){console.log("collided")});
    hiv_game.game.physics.arcade.collide(hivArray,hivArray,function(){console.log("collided")});
    hiv_game.game.physics.arcade.collide(wbcArray,hivArray,function(){console.log("collided")});

    hiv_game.gBackground1.angle += 0.1;
    hiv_game.gBackground2.angle += 0.2;
    hiv_game.rBackground1.angle += 0.1;
    hiv_game.rBackground2.angle += 0.2;  
  },
  createControlPoint: function(type, x, y) {
    var cPoint = new ControlPoint();
    var x = this.randomNum(
      cPoint.eastWestLaneBuffer,
      (hiv_game.game.width-(cPoint.eastWestLaneBuffer*2))
    );
    var y = this.randomNum(
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
        this.randomNum(1, hiv_game.game.height)
      )
    );
  },
  createWhiteBloodCell: function() {
    var cell = new BloodCell();
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
