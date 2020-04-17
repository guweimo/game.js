class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.stop()
        this.setupInputs()
    }

    setup() {
        var game = this.game
        var canvas = game.canvas
        var ctx = game.context
        // background
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // ground
        var ground = Ground.new(game)
        this.addElement(ground)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // bird
        this.birdSpeed = 2
        var b = Bird.new(this.game)
        b.x = 100
        b.y = 200
        this.bird = b
        this.addElement(b)
        // title
        var label = Label.new(this.game, '按 j 开始游戏')
        label.x = canvas.width / 2
        label.y = canvas.height / 2
        this.addElement(label)
    }

    debug() {
        this.birdSpeed = config.bird_speed.value
    }

    update() {
        super.update()
    }
    
    setupInputs() {
        var game = this.game
        game.registerAction('j', function(keyStatus) {
            var scene = Scene.new(game)
            game.replaceScene(scene)
        })
    }
}
