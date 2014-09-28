function Play() {}
Play.prototype = {
  preload: function () {

  },
  create: function() {
    hiv_game.map.load();
    this.game.physics.startSystem( Phaser.Physics.ARCADE );
    // how often to spawn white blood cells
    this.game.time.events.loop( 1000, this.createWhiteBloodCell, this );
    // how often to spawn HIV
    this.game.time.events.loop( 1000, this.createHIV, this );
    // Create contol points
    this.createControlPoint("thymus")
    this.createControlPoint("marrow");
    this.createControlPoint("lymph");
  },
  update: function() {
    hiv_game.wbc.forEach(function(wbc) {
      wbc.update();
    });
    hiv_game.hiv.forEach(function(hiv) {
      hiv.update();
    });
  },
  createControlPoint: function(type) {
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
        "hiv",600,600
        //(hiv_game.game.width + hiv_game.hivWidthHeight),
        //this.randomNum(1, hiv_game.game.height)
      )
    );
  },
  createWhiteBloodCell: function() {
    var cell = new BloodCell(this.game);
    hiv_game.wbc.push(
      cell.create(
        "white",500, 500
        //(0 - hiv_game.wbcWidthHeight),
        //this.randomNum(1, hiv_game.game.height)
      )
    );
  },
  randomNum: function( start, num ) {
    return Math.floor( Math.random() * num ) + start;
  }
};