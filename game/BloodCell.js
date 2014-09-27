BloodCell = function(game) {
	this.game = game;
	this.sprite = null;
	this.moveSpeed = 1;
	this.destX = 0;
	this.destY = 0;
};

BloodCell.prototype = {

	preload: function () {

	},

	create: function (type, x, y) {

		switch (type) {
			case "white":
				this.sprite = game.add.sprite(x, y, 'white-blood-cell-32');
			break;
		}

		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	},

	update: function () {
		//this.sprite.x += 10;
	}
};