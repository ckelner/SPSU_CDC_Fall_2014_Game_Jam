BloodCell = function(game) {
	this.game = game;
	this.sprite = null;
	this.moveSpeed = 1;
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
	},

	update: function () {
		//this.sprite.x += 10;
	}
};