function GameOver() {}
GameOver.prototype = {
  preload: function () {},
  create: function () {
    hiv_game.gBackground1 = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'gBackground'); 
    hiv_game.gBackground1.anchor.setTo(0.5,0.5);
    hiv_game.gBackground1.scale.setTo(3, 3);
    hiv_game.gBackground1.alpha = 1;
      
    hiv_game.gBackground2 = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'gBackground'); 
    hiv_game.gBackground2.anchor.setTo(0.5,0.5);
    hiv_game.gBackground2.scale.setTo(3, 3);
    hiv_game.gBackground2.alpha = 1;
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.gameover = this.game.add.sprite(this.game.world.centerX,100, 'gameover');
    this.gameover.anchor.setTo(0.5,0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
      
      
      
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
      
          console.log("hit")
    hiv_game.gBackground1.angle += 0.1;
    hiv_game.gBackground2.angle += 0.2;
  }
};
