class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 5
        this.cooldown = 0
        this.alive = true
        this.playerBullet = []
    }

    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown --
        }
    }

    kill() {
        this.alive = false
        var x = this.x + this.w / 2
        var y = this.y + this.h / 2
        var ps = GuaParticleSystem.new(this.game, x, y)
        this.scene.playEnd = ps
        this.scene.addElement(ps)
    }

    fire() {
        if (this.cooldown == 0 && this.alive) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game, 'bullet1', 2)
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.scene.playerBullet.push(b)
        }
    }

    move(position, speed) {
        if (!this.alive) {
            return
        }
        this[position] += speed
    }

    moveLeft() {
        this.move('x', -this.speed)
    }

    moveRight() {
        this.move('x', this.speed)
    }

    moveUp() {
        this.move('y', -this.speed)
    }

    moveDown() {
        this.move('y', this.speed)
    }

    draw() {
        if (!this.alive) {
            return
        }

        super.draw()
    }
}
