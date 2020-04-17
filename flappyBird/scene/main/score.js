class Score {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(game) {
        return new this(game)
    }

    setup() {
        this.number = '00'
        this.x = 0
        this.y = 30
    }

    update() {
        
    }

    updateNumber(number) {
        number = String(number)
        if (number.length < 2) {
            number = '0' + number
        }

        this.number = number
    }

    draw() {
        var ctx = this.game.context
        var canvas = this.game.canvas
        ctx.font = "24px serif"
        ctx.fillStyle = '#fff'
        ctx.textBaseline = 'middle' // 设置文本的垂直对齐方式
        ctx.textAlign = 'center' // 设置文本的水平对齐方式
        
        this.x = canvas.width / 2
        this.y = 30
        ctx.fillText(this.number, this.x, this.y)
    }
}