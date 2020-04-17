class Bullet extends GuaImage {
    constructor(game, name, speed) {
        super(game, name)
        this.game = game
        this.speed = speed
        this.setup()
    }

    static new(game, name, speed) {
        var i = new this(game, name, speed)
        return i
    }

    setup() {
        this.alive = true
    }

    update() {
        // this.speed = config.bullet_speed
        this.y -= this.speed
        var canvas = this.game.canvas
        if (this.y > canvas.height) {
            this.alive = false
        }
    }

    draw() {
        if (this.alive) {
            super.draw()
        }
    }
}
