class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }

    setup() {
        var game = this.game
        this.gameScore = 0
        this.pause = false
        // background
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // ground
        var ground = Ground.new(game)
        this.addElement(ground)
        // bird
        this.birdSpeed = 2
        var b = Bird.new(this.game)
        b.x = 100
        b.y = 200
        this.bird = b
        this.addElement(b)
        // score
        var score = Score.new(this.game)
        this.score = score
        this.addElement(score)
        // 结束文字
        this.endLabel = null
        this.setUpInputs()

    }

    setUpInputs() {
        var g = this.game
        var self = this
        var b = this.bird
        g.registerAction('a', function(keyStatus) {
            b.move(-self.birdSpeed, keyStatus)
        })
        g.registerAction('d', function(keyStatus) {
            b.move(self.birdSpeed, keyStatus)
        })
        g.registerAction('j', function() {
            if (self.pause) {
                self.start()
            }
            b.jump()
        })
    }

    update() {
        super.update()
        if (!this.pause) {
            this.intersects()
        }
    }

    addScore() {
        this.gameScore ++
        this.score.updateNumber(this.gameScore)
    }

    intersects() {
        if (this.bird.y >= 520) {
            this.over()
        }

        var pipes = this.pipe.pipes
        for (var i = 0; i < pipes.length; i += 2) {
            var p1 = pipes[i]
            var p2 = pipes[i+1]
            if (collide(p1, this.bird) || collide(p2, this.bird)) {
                this.bird.dead()
                this.over()
                break
            }

            if ((p1.x + p1.w < this.bird.x) && !p1.through) {
                p1.through = true
                this.addScore()
            }
        }
    }

    over() {
        this.stop()
        var canvas = this.game.canvas
        // 结束文字
        var label = Label.new(this.game, '游戏结束')
        label.x = canvas.width / 2
        label.y = canvas.height / 2
        this.endLabel = label
        this.addElement(label)

        this.pause = true
    }

    start() {
        this.removeAll()
        this.setup()
    }
}
