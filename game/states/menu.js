function Menu() {
    this.menuWbc;
    this.menuHiv;
    this.menuBloodPulse;
    this.menuBpAlpha;
    this.menuBpAlphaStart = 0;
    this.menuBpAlphaEnd;
    this.jumpStart = null;
    this.tickityTock = 0;
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
      
    menuBloodPulse = this.game.add.sprite(this.game.world.centerX/2,this.game.world.centerY/2, 'rBackground');
    menuBloodPulse.anchor.setTo(0.5,0.5);
    menuBloodPulse.scale.setTo(3, 3);
    menuBloodPulse.alpha = 0;
    menuBpAlpha = 0;
    menuBpAlphaEnd = 0;
      
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
//      this.game.state.start('play');
        this.game.state.start('gameover'); // GOTTA TEST THAT SCREEEEEEEN
    }
    _jump = hiv_game.game.time.elapsedSince(this.jumpStart)
    if( (this.tickityTock + 5000) - _jump <= 0 ) {
      // start pulse
      menuBpAlphaStart = 1;
      // complete within 1000 ticks
      // revert within 1000 ticks
      // prep for next pulse
      this.tickityTock = _jump;
    }
    if(menuBpAlphaStart == 1 && menuBpAlpha <= 1){
      menuBpAlpha += 0.01;
      menuBloodPulse.alpha = menuBpAlpha;
      if(menuBpAlpha >= 1){
          //console.log(menuBpAlpha + " " + menuBloodPulse.alpha);
          menuBpAlphaStart = 0;
          menuBpAlphaEnd = 1;
      }
    }
    if(menuBpAlphaEnd == 1 && menuBpAlpha >= 0){
      menuBpAlpha -= 0.01;
      menuBloodPulse.alpha = menuBpAlpha;
      if(menuBpAlpha <= 0){
          menuBpAlphaStart = 1;
          menuBpAlphaEnd = 0;
      }
    }
    if(menuBpAlphaEnd == 1){
      
    }
    
    menuHiv.angle += 0.1;
    menuWbc.angle += 0.2;
    menuBloodPulse.angle += 0.5;
  }
};
