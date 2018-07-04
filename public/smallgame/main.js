// var width = window.innerWidth
// var height = window.innerHeight
//TODO

var width = 800
var height = 500

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game')

var states = {
	// 加载场景, 載入資源
    preload: function() {

    	this.preload = function() {
            game.state.backgroundColor = '#000000'

            // 載入資源
            game.load.image('bg', 'images/bg.png')
            game.load.image('btnStart', 'images/button_start.png')
            game.load.image('btnRank', 'images/button_rank.png')
            game.load.image('btnIntro', 'images/button_intro.png')
            game.load.image('squirrel','images/pc.png' )

            // 添加進度提示
            var progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
                fontSize: '60px',
                fill: '#ffffff'
            })
            progressText.anchor.setTo(0.5, 0.5)
            game.load.onFileComplete.add(function(progress) {
                progressText.text = progress + '%'
            })
            game.load.onLoadComplete.add(onLoad)
            var deadLine = false
            setTimeout(function() {
                deadLine = true
            }, 3000)

            function onLoad() {
                if (deadLine) {
                    game.state.start('main')
                } else {
                    setTimeout(onLoad, 1000)
                }
            }
        }
    },
    // 开始界面
    main: function() {
        this.create = function() {
            // 背景
            var bg = game.add.image(0, 0, 'bg')
            bg.width = game.world.width
            bg.height = game.world.height

            // 松鼠圖片
            var squirrel = game.add.sprite(game.world.centerX - 70, game.world.centerY - 180, 'squirrel')
            var text1 = game.add.text(0, 0, '松鼠塔')
            text1.alignTo(squirrel, Phaser.BOTTOM_CENTER)

            // 按鈕
            var buttonStart
            var buttonRank
            var buttonIntro

            buttonStart = game.add.button(game.world.centerX + 50, game.world.centerY + 55, 'btnStart', buttonForStart, this)
            buttonRank = game.add.button(game.world.centerX + 50, game.world.centerY + 110, 'btnRank', buttonForRank, this)
            buttonIntro = game.add.button(game.world.centerX + 50, game.world.centerY + 165, 'btnIntro', buttonForIntro, this)

            buttonStart.anchor.setTo(1, 1)
            buttonRank.anchor.setTo(1, 1)
            buttonIntro.anchor.setTo(1, 1)
            
            // 按鈕綁定時間
            function buttonForStart() {
               game.state.start('start')

            }
            
            function buttonForRank() {
                game.state.start('rank')
            
            }
            
            function buttonForIntro() {
                game.state.start('intro')
            
            }

        }
    },
    // 遊戲 play 界面
    start: function() {
    	this.create = function() {
            var bg = game.add.image(0, 0, 'bg')
            bg.width = game.world.width
            bg.height = game.world.height
            // alert("play 界面")
            // game.state.start('main')
        }
    },

    // 排行榜
    rank: function() {
        this.create = function() {
            var bg = game.add.image(0, 0, 'bg')
            bg.width = game.world.width
            bg.height = game.world.height
            alert("rank 界面")
            game.state.start('main')

        }
    },

    // 介紹界面
    intro: function () {
        this.create = function() {
            var bg = game.add.image(0, 0, 'bg')
            bg.width = game.world.width
            bg.height = game.world.height
            alert("intro 界面")
            game.state.start('main')

        }
    },

    // 结束分數场景
    over: function() {
    	this.create = function() {
        	// TO-DO
            game.stage.backgroundColor = '#000'
            alert('游戏结束!')
        }
    }
}

// 添加場景到遊戲中
Object.keys(states).map(function(key) {
	game.state.add(key, states[key])
})

// 啟動遊戲
game.state.start('preload')