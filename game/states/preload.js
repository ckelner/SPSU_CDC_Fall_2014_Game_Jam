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
    this.load.image('wbc', 'assets/white-blood-cell-32.png');
    this.load.image('hiv_32', 'assets/hiv.png'); // 32x32
    // All 96x96
    this.load.image('marrow', 'assets/bone-marrow-96.png');
    this.load.image('lymph', 'assets/lymph-96.png');
    this.load.image('thymus', 'assets/thymus-96.png');
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
