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
				this.sprite = game.add.sprite(x, y, 'thymus-96');
				this.sprite.scale.setTo(2, 2);
			break;
			case "marrow":
				this.sprite = game.add.sprite(x, y, 'bone-marrow-96');
			break;
			case "lymph":
				this.sprite = game.add.sprite(x, y, 'lymph-96');
			break;
		}

	},

	update: function () {

	}
};