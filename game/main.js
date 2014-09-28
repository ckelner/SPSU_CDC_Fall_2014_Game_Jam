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
  hiv_game.hivWidthHeight = 32;
  hiv_game.wbcWidthHeight = 32;
  hiv_game.rBackground1 = null;
  hiv_game.rBackground2 = null;
  hiv_game.gBackground1 = null;
  hiv_game.gBackground2 = null;
    
    // strings for awareness yall
    hiv_game.purposeThymus = "T-cells mature in the thymus. These cells hunt and kill friendly cells that become infected.";
    hiv_game.effectThymus = "HIV targets these cells specifically, turning the immune system against itself.";
    
    hiv_game.purposeBoneMarrow = "White blood cells grow here, in your bone marrow.";
    hiv_game.effectBoneMarrow = "";
    
    hiv_game.purposeLymph = "Lymph nodes are like forward bases for your body's defenses.";
    hiv_game.effectLymph = "HIV taxes your defenses, leaving your body vulnerable to secondary infection.";
    
    hiv_game.gameOverDeathToll = 0;
    hiv_game.gameOverDeathTollUp = 0;
    
    hiv_game.hivInfo = [
        "HIV infects cells of the immune system.",
        "It can take up to 10 years for symptoms to manifest.",
        "There are treatments for HIV, but no cure.",
        "35 million people live with HIV.",
        "12 million have access to treatment.",
        "1 in 4 children infected with HIV have access to treatment."
    ]
    
    
    
    
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
