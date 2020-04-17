class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
        var game = this.game
        // bg
        this.bg = GuaImage.new(game, 'sky')
        this.addElement(this.bg)
        // title
        var canvas = game.canvas
        var ctx = game.context
        var label = GuaLabel.new(game, '按 k 开始游戏', canvas.width / 2, canvas.height / 2, 'center')
        ctx.fillStyle = '#fff'
        ctx.font = "24px serif"
        this.addElement(label)
    }

    setupInputs(){
        var game = this.game
        game.registerAction('k', function() {
            var scene = Scene.new(game)
            game.replaceScene(scene)
        })
    }
}
