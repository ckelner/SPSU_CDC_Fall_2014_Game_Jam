// static sized game window (sux)
global_HEIGHT=940;
global_WIDTH=1662;
// White blood cell height
global_WBC_HEIGHT=32;
// array to keep WBC objects
global_whiteBloodCellArr=[];
// WBC counter
global_whiteBloodCellNum=0;

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      // I don't know
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      // how often to spawn white blood cells
      var x = this.game.time.events.loop(1000, this.createWhiteBloodCell, this);
    },
    // update loop
    update: function() {},
    /*
      Creates white blood cells
    */
    createWhiteBloodCell: function() {
      var sprite = this.game.add.sprite(
        this.randomNum(global_WIDTH), // place the WBC at random starting x value
        global_HEIGHT, // place WBC at bottom of screen
        "wbc" // "wbc" == the preloaded image from preload.js
      );
      // Create a tween on the WBC
      var tween = this.game.add.tween(sprite);
      /*
        Tween will move south to north over 6 secs
        TODO: Replace with pathfinding once we have enemies (HIV)?
      */
      tween.to({ y: -global_WBC_HEIGHT }, 6000);
      // create the WBC object
      var WBC = {
        "index": global_whiteBloodCellNum, // index WBC -- age
        "tween": tween, // tween index
        "sprite": sprite // the sprite
      };
      // store the WBC object in array
      var index = global_whiteBloodCellArr.push(WBC) - 1;
      // define what happens when tween finishes
      tween.onComplete.add(this.removeWBC,index);
      // start tweening
      tween.start();
      // ++ bitch
      global_whiteBloodCellNum++;
    },
    // generates 1 to "num"
    randomNum: function( num ) {
      return Math.floor(Math.random() * num) + 1;
    },
    // removes WBC
    removeWBC: function() {
      // get the WBC
      var WBC = global_whiteBloodCellArr[this.valueOf()];
      // delete sprite form game memory
      WBC.sprite.destroy(true);
      // remove 1 WBC at index in arrays
      global_whiteBloodCellArr.splice(this.valueOf(),1);
    }
  };
  
  module.exports = Play;