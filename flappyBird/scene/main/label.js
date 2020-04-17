class Label {
    constructor(game, text) {
        this.game = game
        this.text = text
        this.setup()
    }

    static new(game, text) {
        return new this(game, text)
    }

    setup() {

    }

    update() {

    }

    draw() {
        var ctx = this.game.context
        ctx.font = "24px serif"
        ctx.fillStyle = '#fff'
        ctx.textBaseline = 'middle' // 设置文本的垂直对齐方式
        ctx.textAlign = 'center' // 设置文本的水平对齐方式
        ctx.fillText(this.text, this.x, this.y)
    }
}
