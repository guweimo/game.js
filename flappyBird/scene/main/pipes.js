class Pipes {
    constructor(game) {
        this.setup(game)
    }

    static new(game) {
        return new this(game)
    }

    setup(game) {
        this.game = game
        this.alive = true
        this.pipes = []
        this.pipeSpace = 150
        this.管子横向间距 = 250
        this.columsOfPipe = 3
        for (let i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.管子横向间距
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
        p1.through = false
    }

    debug() {
        // this.管子横向间距 = config.管子横向间距.value
        // this.pipeSpace = config.pipe_space.value
    }

    update() {
        if (this.alive) {
            for (var i = 0; i < this.pipes.length; i += 2) {
                var p1 = this.pipes[i]
                var p2 = this.pipes[i+1]
                p1.x -= 5
                p2.x -= 5

                if (p1.x < -100) {
                    p1.x += this.管子横向间距 * this.columsOfPipe
                }
                if (p2.x < -100) {
                    p2.x += this.管子横向间距 * this.columsOfPipe
                    this.resetPipesPosition(p1, p2)
                }
            }
        }
    }

    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.globalAlpha = p.alpha
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            // log('draw, x, -x', x, -x)
            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }

    show() {
        this.alive = true
    }

    stop() {
        this.alive = false
    }
}
