Map = function() {
  this.map           = null;
  this.tileset       = null;
  this.layer         = null;
};

Map.prototype = {
  load: function () {
    map = hiv_game.game.add.tilemap('body-map');
    map.addTilesetImage('Body', 'map-tiles');
    layer = map.createLayer('Ground');
    layer.resizeWorld();
  },
  update: function () {}
};
