// var width = window.innerWidth;
// var height = window.innerHeight;
var width = 800;
var height = 500;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');

var states = {
	// 加载场景
    preload: function() {
    	this.create = function() {
        	// TO-DO
			game.stage.backgroundColor = '#aaa';
            setTimeout(function() {
				game.state.start('created');
			}, 3000);
        }
    },
    // 开始场景
    created: function() {
    	this.create = function() {
            // TO-DO
			game.stage.backgroundColor = '#777';
			setTimeout(function() {
				game.state.start('play');
			}, 3000);
        }
    },
    // 游戏场景
    play: function() {
    	this.create = function() {
            // TO-DO
			game.stage.backgroundColor = '#444';
			setTimeout(function() {
				game.state.start('over');
			}, 3000);
        }
    },
    // 结束场景
    over: function() {
    	this.create = function() {
        	// TO-DO
            game.stage.backgroundColor = '#000';
            alert('游戏结束!');
        }
    }
};

// 添加场景到游戏示例中
Object.keys(states).map(function(key) {
	game.state.add(key, states[key]);
});

// 启动游戏
game.state.start('preload');