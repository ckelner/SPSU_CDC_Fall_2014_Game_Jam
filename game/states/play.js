// shitty global variables
// static sized game window (sux)
global_HEIGHT=940;
global_WIDTH=1662;
// White blood cell height
global_WBC_HEIGHT=32;
// HIV height
global_HIV_HEIGHT=32;
// array to keep WBC objects
global_whiteBloodCellArr=[];
// WBC counter
global_whiteBloodCellNum=0;
// array to keep HIV objects
global_hivCellArr=[];
// HIV counter
global_hivCellNum=0;
// Control point array
global_controlPointArr=[]
// Control point count
// shitty global functions
function global_findCellObjByIndexValue ( arr, index ) {
  var arrLen = arr.length;
  for (var i = 0; i < arrLen; i++) {
    if( arr[i].index === index ) {
      return i;
    }
  }
  return null;
}

function Play() {}
Play.prototype = {

  preload: function () {

  },

  create: function() {
    // load the map
    hiv_game.map.load();
    // I don't know
    this.game.physics.startSystem( Phaser.Physics.ARCADE );
    // how often to spawn white blood cells
    var wbcEventLoop = this.game.time.events.loop( 1000, this.createWhiteBloodCell, this );
    // how often to spawn HIV
    var hivEventLoop = this.game.time.events.loop( 1000, this.createHIV, this );
  },

  // update loop
  update: function() {
    
  },

  createControlPoint: function(id, type, x, y) {
    var cPoint = new ControlPoint(this.game);
    cPoint.create(type, x, y);

    var point = {
      "index": id,
      "controlPoint": cPoint,
    };
    // Store
    global_controlPointArr.push(point);
  },

  /*
    Creates HIV
  */
  createHIV: function() {
    var hivcell = new BloodCell(this.game);
    hivcell.create("hiv", 1000, this.randomNum(1080));

    var HIV = {
      "index": global_hivCellNum, // index HIV -- age
      "cell": hivcell, // cell index
    };
    // store the HIV object in array
    global_hivCellArr.push( HIV );

    // ++ bit
    global_hivCellNum++;
  },

  /*
    Creates white blood cells
  */
  createWhiteBloodCell: function() {
    var cell = new BloodCell(this.game);
    cell.create("white", 0, this.randomNum(1080));

    var WBC = {
      "index": global_whiteBloodCellNum, // index WBC -- age
      "cell": cell, // cell index
    };
    // store the WBC object in array
    global_whiteBloodCellArr.push( WBC );

    // ++ bit
    global_whiteBloodCellNum++;
  },

  // generates 1 to "num"
  randomNum: function( num ) {
    return Math.floor( Math.random() * num ) + 1;
  },

  // removes WBC
  removeWBC: function() {
    // find WBC index to remove
    var indexToRemove = global_findCellObjByIndexValue( global_whiteBloodCellArr, this.valueOf() );
    if( indexToRemove === null ) {
      console.log( "WBC index to remove was null... #wtf" );
    } else {
      // get the WBC
      var WBC = global_whiteBloodCellArr[ indexToRemove ];
      // remove 1 WBC at index in array
      global_whiteBloodCellArr.splice( indexToRemove, 1);
      // delete sprite form game memory
      WBC.sprite.destroy( true );
    }
  },

  // removes HIV
  removeHIV: function() {
    // find HIV index to remove
    var indexToRemove = global_findCellObjByIndexValue( global_hivCellArr, this.valueOf() );
    if( indexToRemove === null ) {
      console.log( "HIV index to remove was null... #wtf" );
    } else {
      // get the HIV
      var HIV = global_hivCellArr[ indexToRemove ];
      // remove 1 HIV at index in array
      global_hivCellArr.splice( indexToRemove, 1);
      // delete sprite form game memory
      HIV.sprite.destroy( true );
    }
  }
};
