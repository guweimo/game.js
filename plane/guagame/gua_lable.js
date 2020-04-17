class GuaLabel {
    constructor(game, content, x, y, align) {
        this.game = game
        this.content = content
        this.x = x
        this.y = y

        var ctx = game.context
        ctx.textBaseline = 'start' // 设置文本的垂直对齐方式
        ctx.textAlign = 'start' // 设置文本的水平对齐方式
        ctx.fillStyle = '#000'
        log('align', align)
        if (align == 'center') {
            ctx.textBaseline = 'middle' // 设置文本的垂直对齐方式
            ctx.textAlign = 'center' // 设置文本的水平对齐方式
        }
    }

    static new(game, content, x, y, align) {
        return new this(game, content, x, y, align)
    }

    update() {

    }

    draw() {
        this.game.context.fillText(this.content, this.x, this.y)
    }
}
