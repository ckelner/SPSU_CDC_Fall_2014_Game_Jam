ControlPoint = function(game) {
	this.game = game;
	this.sprite = null;
};

ControlPoint.prototype = {

	preload: function () {

	},

	create: function (type, x, y) {
		
		switch (type) {
			case "thymus":
				this.sprite = game.add.sprite(x, y, 'thymus');
			break;
			case "marrow":
				this.sprite = game.add.sprite(x, y, 'marrow');
			break;
			case "lymph":
				this.sprite = game.add.sprite(x, y, 'lymph');
			break;
		}

	},

	update: function () {

	}
};