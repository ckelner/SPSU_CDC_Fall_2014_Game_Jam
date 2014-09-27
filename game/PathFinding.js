PathFinding = function(game) {
  this.game          = game;
  this.pathfinder    = null;
  this.cursors       = null;
  this.spritey       = null;
  this.marker        = null;
  this.blocked       = false;
};

PathFinding.prototype = {
  preload: function () {
    var walkables = [30];
    pathfinder = this.game.plugins.add( Phaser.Plugin.PathFinderPlugin );
    pathfinder.setGrid(map.layers[0].data, walkables);
    cursors = this.game.input.keyboard.createCursorKeys();
    marker = this.game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 32, 32);
  },
  update: function () {},
  findPathTo: function (tilex, tiley) {
    pathfinder.setCallbackFunction(function(path) {
        path = path || [];
        for(var i = 0, ilen = path.length; i < ilen; i++) {
            map.putTile(46, path[i].x, path[i].y);
        }
        blocked = false;
    });
    pathfinder.preparePathCalculation([0,0], [tilex,tiley]);
    pathfinder.calculatePath();
  }
};
