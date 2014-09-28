function Menu() {
    this.menuWbc;
    this.menuHiv;
}
Menu.prototype = {    
  preload: function() {},
  create: function() {
    
    menuWbc = this.game.add.sprite(this.game.world.centerX/2,this.game.world.centerY/2, 'menu-wbc');
    menuWbc.anchor.setTo(0.5,0.5);
    menuWbc.scale.setTo(3, 3);
    
    menuHiv = this.game.add.sprite(this.game.world.centerX/2,this.game.world.centerY/2, 'menu-hiv');
    menuHiv.anchor.setTo(0.5,0.5);
    menuHiv.scale.setTo(3, 3);
      
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 150, 'HIV-virus');
    this.sprite.anchor.setTo(0.5, 0.5);
      
    this.sprite = this.game.add.sprite(this.game.world.centerX, 400, 'title3');
    this.sprite.anchor.setTo(0.5,0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 600,
      'Click anywhere to play', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
    menuHiv.angle += 0.1;
    menuWbc.angle += 0.2;
  }
};
