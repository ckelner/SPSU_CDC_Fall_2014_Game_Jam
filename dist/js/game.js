(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(1662, 940, Phaser.AUTO, 'hiv_game');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 150, 'hiv');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 400, 'Battle HIV!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 600,
      'Click anywhere to play', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){
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

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      // I don't know
      this.game.physics.startSystem( Phaser.Physics.ARCADE );
      // how often to spawn white blood cells
      var wbcEventLoop = this.game.time.events.loop( 1000, this.createWhiteBloodCell, this );
      // how often to spawn HIV
      var hivEventLoop = this.game.time.events.loop( 1000, this.createHIV, this );
    },
    // update loop
    update: function() {},
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
        "hiv_32" // "hiv" == the preloaded image from preload.js
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
        "wbc" // "wbc" == the preloaded image from preload.js
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
  
  module.exports = Play;
},{}],6:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.HEIGHT/2,this.WIDTH/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('hiv', 'assets/HIV-virus.png');
    this.load.image('heart', 'assets/heart.png');
    this.load.image('wbc', 'assets/white-blood-cell-32.png');
    this.load.image('hiv_32', 'assets/hiv.png'); // 32x32
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])