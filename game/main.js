var hiv_game = {} // parent container object for game world
  , game
  , gameWidth = 1662
  , gameHeight = 940;
window.onload = function () {
  // load phaser engine
  game = new Phaser.Game( gameWidth, gameHeight, Phaser.AUTO );
  // Game States
  game.state.add('boot', Boot);
  game.state.add('preload', Preload);
  game.state.add('menu', Menu);
  game.state.add('play', Play);
  game.state.add('gameover', GameOver);
  game.state.start('boot');
  hiv_game.game = game;
  loadHivGameHelpers();
  var debug = getQueryParam('debug');
  if( debug === "true" || debug === true ) {
    hiv_game.debug = true;
  } else {
    hiv_game.debug = false;
  }
};
function getQueryParam( query ) {
  query = query.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + query + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
function loadControls() {
  hiv_game.controls = new Controls();
};
function loadHivGameHelpers() {
  hiv_game.controlPoints = [];
  hiv_game.wbc = [];
  hiv_game.hiv = [];
  hiv_game.handleCellControlPtCollisionEnabled = true;
  hiv_game.hivWidthHeight = 32;
  hiv_game.wbcWidthHeight = 32;
  hiv_game.rBackground1 = null;
  hiv_game.rBackground2 = null;
  hiv_game.gBackground1 = null;
  hiv_game.gBackground2 = null;
  hiv_game.randomNum = function( start, num ) {
    return Math.floor( Math.random() * num ) + start;
  };
  hiv_game.randomNumNoStart = function( num ) {
    return Math.floor( Math.random() * num );
  };
  hiv_game.gameObjectTypes = [
    "cell",
    "controlpoint"
  ];
  hiv_game.cellTypes = [
    "white",
    "hiv"
  ];
  hiv_game.controlPtTypes = [
    "thymus",
    "marrow",
    "lymph"
  ];
};
