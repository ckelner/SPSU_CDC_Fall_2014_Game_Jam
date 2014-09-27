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
  // new map
  var map = new Map();
  hiv_game.map = map;
};
