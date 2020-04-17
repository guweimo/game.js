class Ground {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(game) {
        return new this(game)
    }

    setup() {
        this.grounds = []
        this.alive = true
        this.skipCount = 4

        var y = 540

        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(this.game, 'ground')
            g.x = i * g.w
            g.y = y
            this.grounds.push(g)
        }
    }

    update() {
        if (this.alive) {
            // 地面移动
            this.skipCount--
            var offset = -5
            if (this.skipCount == 0) {
                this.skipCount = 4
                offset = 15
            }
            for (var i = 0; i < 30; i++) {
                var g = this.grounds[i]
                g.x += offset
            }
        }
    }

    draw() {
        for (const item of this.grounds) {
            this.game.drawImage(item)
        }
    }

    show() {
        this.alive = true
    }

    stop() {
        this.alive = false
    }
}
