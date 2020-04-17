class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
        var game = this.game
        // bg
        this.bg = GuaImage.new(game, 'sky')
        // title
        var canvas = game.canvas
        var ctx = game.context
        var w = canvas.width / 2
        var h = canvas.height / 2
        var label = GuaLabel.new(game, '游戏结束, 按 r 重玩', w, h + 100, 'center')
        // 分数
        var scoreTitle = GuaLabel.new(game, '最终分数', w, h - 50, 'center')
        var score = GuaLabel.new(game, game.score, w, h, 'center')
        
        ctx.font = "24px serif"
        ctx.fillStyle = '#fff'

        this.addElement(this.bg)
        this.addElement(scoreTitle)
        this.addElement(score)
        this.addElement(label)
    }

    setupInputs() {
        var game = this.game
        game.registerAction('r', function() {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
}
