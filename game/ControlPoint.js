ControlPoint = function(game) {
	this.game = game;
	this.sprite = null;
  this.eastWestLaneBuffer=200;
  this.northSouthLaneBuffer=50;
};

ControlPoint.prototype = {

	preload: function () {

	},

	create: function (type, x, y) {
		
		switch (type) {
			case "thymus":
				this.sprite = game.add.sprite(x, y, 'thymus-96');
			break;
			case "marrow":
				this.sprite = game.add.sprite(x, y, 'bone-marrow-96');
			break;
			case "lymph":
				this.sprite = game.add.sprite(x, y, 'lymph-96');
			break;
		}
    return this.sprite;
	},

	update: function () {

	}
};