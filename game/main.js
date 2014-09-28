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
  loadHivGameHelperVars();
};
function loadControls() {
  hiv_game.controls = new Controls(game);
}
function loadHivGameHelperVars() {
  hiv_game.controlPoints = [];
  hiv_game.wbc = [];
  hiv_game.hiv = [];
  hiv_game.hivWidthHeight = 32;
  hiv_game.wbcWidthHeight = 32;
  hiv_game.rBackground1 = null;
  hiv_game.rBackground2 = null;
  hiv_game.gBackground1 = null;
  hiv_game.gBackground2 = null;
};
