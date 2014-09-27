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
// Control point containers
var controlPoint = null;
// Test blood cell
var testwbc = null;
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
    testwbc = new BloodCell(this.game);
  },
  create: function() {
    // I don't know
    this.game.physics.startSystem( Phaser.Physics.ARCADE );
    // how often to spawn white blood cells
    //var wbcEventLoop = this.game.time.events.loop( 1000, this.createWhiteBloodCell, this );
    // how often to spawn HIV
    //var hivEventLoop = this.game.time.events.loop( 1000, this.createHIV, this );
    // Create contol points
    controlPoint = new ControlPoint(this.game);
    controlPoint.create("thymus", 150, 150);
    controlPoint.create("marrow", 0, 0);
    controlPoint.create("lymph", 300, 0);
    testwbc.create("white", 100, 100);
  },
  // update loop
  update: function() {
    testwbc.update();
  },
  /*
  Do this shit later
  genericCreateThing: function( startHeight, startWidth, spriteName, endHeight,
    tweenTime, thingIndex, thingArray ) {
    var sprite = this.game.add.sprite(
      this.randomNum( startWidth ),
      startHeight,
      spriteName
    );
    var tween = this.game.add.tween( sprite );
    tween.to({ y: endHeight }, tweenTime);
    var thing = {
      "index": thingIndex,
      "tween": tween, // tween index
      "sprite": sprite // the sprite
    };
    thingArray.push( thing );
  },*/
  /*
    Creates HIV
  */
  createHIV: function() {
    var sprite = this.game.add.sprite(
      this.randomNum( global_WIDTH ), // place the HIV at random starting x value
      0 - global_HIV_HEIGHT, // place HIV at bottom of screen
      "hiv"
    );
    // Create a tween on the HIV
    var tween = this.game.add.tween( sprite );
    /*
      Tween will move south to north over 6 secs
      TODO: Replace with pathfinding once we have enemies (HIV)?
    */
    tween.to({ y: global_HEIGHT + global_HIV_HEIGHT }, 6000); // to test, change y to "0" or less to watch it delete
    // create the HIV object
    var HIV = {
      "index": global_hivCellNum, // index HIV -- age
      "tween": tween, // tween index
      "sprite": sprite // the sprite
    };
    // store the HIV object in array
    global_hivCellArr.push( HIV );
    // index of given object
    var dex = global_hivCellNum + 0;
    // define what happens when tween finishes
    tween.onComplete.add( this.removeHIV, dex );
    // start tweening
    tween.start();
    // ++ bitch
    global_hivCellNum++;
  },
  /*
    Creates white blood cells
  */
  createWhiteBloodCell: function() {
    var sprite = this.game.add.sprite(
      this.randomNum( global_WIDTH ), // place the WBC at random starting x value
      global_HEIGHT, // place WBC at bottom of screen
      "white-blood-cell-32"
    );
    // Create a tween on the WBC
    var tween = this.game.add.tween( sprite );
    /*
      Tween will move south to north over 6 secs
      TODO: Replace with pathfinding once we have enemies (HIV)?
    */
    tween.to({ y: -global_WBC_HEIGHT }, 6000); // to test, change y to "0" or less to watch it delete
    // create the WBC object
    var WBC = {
      "index": global_whiteBloodCellNum, // index WBC -- age
      "tween": tween, // tween index
      "sprite": sprite // the sprite
    };
    // store the WBC object in array
    global_whiteBloodCellArr.push( WBC );
    var dex = global_whiteBloodCellNum + 0;
    // define what happens when tween finishes
    tween.onComplete.add( this.removeWBC, dex );
    // start tweening
    tween.start();
    // ++ bitch
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
