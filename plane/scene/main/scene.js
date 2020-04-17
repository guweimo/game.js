class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    setup() {
        var game = this.game
        this.game.score = 0
        this.numberOfEnemies = 3
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = Cloud.new(game, 'cloud')

        this.enemies = []
        this.enemiesBullet = []
        this.playerBullet = []
        this.playEnd = null
        this.player = Player.new(game)
        // this.player = GuaImage.new(game, 'player')
        this.player.x = 100
        this.player.y = 400
        // score
        var ctx = game.context
        this.score = GuaLabel.new(game, '玩家得分: 0', 20, 30)
        ctx.font = '24px Georgia'

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        //
        this.addEnemies()

        this.addElement(this.score)
    }

    createEnemie() {
        var e = Enemy.new(this.game)
        this.enemies.push(e)
        this.addElement(e)
    }

    addEnemies() {
        for (var i = 0; i < this.numberOfEnemies; i++) {
            this.createEnemie()
        }
    }

    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function() {
            s.player.moveLeft()
        })
        g.registerAction('d', function() {
            s.player.moveRight()
        })
        g.registerAction('w', function() {
            s.player.moveUp()
        })
        g.registerAction('s', function() {
            s.player.moveDown()
        })
        g.registerAction('j', function() {
            s.player.fire()
        })
    }

    update() {
        super.update()
        this.cloud.y += 1

        if (this.enemies.length < this.numberOfEnemies) {
            this.createEnemie()
        }

        this.filterAlive()
        this.collide()

        var playEnd = this.playEnd
        if (!this.player.alive && playEnd && playEnd.duration < 0) {
            var scene = SceneEnd.new(this.game)
            this.game.replaceScene(scene)
        }
    }

    addScore() {
        this.game.score += 100
        this.score.content = `玩家得分：${this.game.score}`
    }

    collide() {
        if (this.player.alive) {
            for (let item of this.enemies) {
                if (collide(item, this.player)) {
                    this.player.kill()
                    item.kill()
                }
            }
    
            for (let eb of this.enemiesBullet) {
                if (collide(eb, this.player)) {
                    this.player.kill()
                    eb.alive = false
                }
            }
        }

        for (let p of this.playerBullet) {
            for (let eb of this.enemiesBullet) {
                if (collide(p, eb)) {
                    p.alive = false
                    eb.alive = false
                    this.filterAlive()
                }
            }

            for (let e of this.enemies) {
                if (collide(p, e)) {
                    e.kill()
                    p.alive = false
                    this.addScore()
                    this.filterAlive()
                }
            }
        }
    }

    filterAlive() {
        this.enemiesBullet = this.enemiesBullet.filter(b => b.alive)
        this.playerBullet = this.playerBullet.filter(b => b.alive)
        this.enemies = this.enemies.filter(e => e.alive)
    }
}
