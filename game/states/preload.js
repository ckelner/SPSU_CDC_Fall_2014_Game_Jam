function Preload() {
  this.asset = null;
  this.ready = false;
}
Preload.prototype = {
  preload: function() {
    // loading bar
    this.asset = this.add.sprite(this.HEIGHT,this.WIDTH, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    // run onLoadComplete after assets get loaded
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    // load all the assets [ABCs!]
    this.load.image('b-cell-plasma', 'assets/b-cell-plasma.png');
    this.load.image('b-cell-spawn', 'assets/b-cell-spawn.png');
    this.load.image('b-cell', 'assets/b-cell.png');
    this.load.image('bone-marrow-96', 'assets/bone-marrow-96.png');
    this.load.image('hit-25x13', 'assets/hit-25x13.png');
    this.load.image('HIV-virus', 'assets/HIV-virus.png');
    this.load.image('hiv', 'assets/hiv.png'); // 32x32
    this.load.image('lymph-96', 'assets/lymph-96.png');
    this.load.image('macrophage-64', 'assets/macrophage-64.png');
    this.load.image('map-tiles', 'assets/map-tiles.png');
    this.load.image('tcell-48', 'assets/tcell-48.png');
    this.load.image('thymus-96', 'assets/thymus-96.png');
    this.load.image('white-blood-cell-32', 'assets/white-blood-cell-32.png');
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
