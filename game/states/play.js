function Play() {}
Play.prototype = {
  preload: function () {},
  create: function() {
    hiv_game.map.load();
    this.game.physics.startSystem( Phaser.Physics.ARCADE );
    // how often to spawn white blood cells
    this.game.time.events.loop( 1000, this.createWhiteBloodCell, this );
    // how often to spawn HIV
    this.game.time.events.loop( 1000, this.createHIV, this );
    // Create contol points
    var controlPointThymus = new ControlPoint(this.game);
    hiv_game.controlPoints.push( 
      controlPointThymus.create(
        "thymus",
        this.randomNum(
          controlPointThymus.eastWestLaneBuffer,
          hiv_game.game.width-controlPointThymus.eastWestLaneBuffer
        ),
        this.randomNum(
          controlPointThymus.northSouthLaneBuffer,
          hiv_game.game.height-controlPointThymus.northSouthLaneBuffer
        )
      )
    );
    var controlPointMarrow = new ControlPoint(this.game);
    hiv_game.controlPoints.push( 
      controlPointThymus.create(
        "marrow",
        this.randomNum(
          controlPointMarrow.eastWestLaneBuffer,
          hiv_game.game.width-controlPointMarrow.eastWestLaneBuffer
        ),
        this.randomNum(
          controlPointMarrow.northSouthLaneBuffer,
          hiv_game.game.height-controlPointMarrow.northSouthLaneBuffer
        )
      )
    );
    var controlPointLymph = new ControlPoint(this.game);
    hiv_game.controlPoints.push( 
      controlPointThymus.create(
        "lymph",
        this.randomNum(
          controlPointLymph.eastWestLaneBuffer,
          hiv_game.game.width-controlPointLymph.eastWestLaneBuffer
        ),
        this.randomNum(
          controlPointLymph.northSouthLaneBuffer,
          hiv_game.game.height-controlPointLymph.northSouthLaneBuffer
        )
      )
    );
  },
  // update loop
  update: function() {
    hiv_game.wbc.forEach(function(wbc) {
      wbc.update();
    });
    hiv_game.hiv.forEach(function(hiv) {
      hiv.update();
    });
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
    return Math.floor( Math.random() * num ) + 1;
  }
};
