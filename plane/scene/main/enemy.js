class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 1)
        var name = 'enemy' + type
        super(game, name)
        this.game = game
        this.number = type + 1
        this.setup()
    }

    setup() {
        this.speed = 4 - this.number
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.alive = true
        this.cooldown = 0
        this.score = 100 * this.number
    }

    update() {
        this.y += this.speed
        if (this.y > 600 && this.alive) {
            this.setup()
        }

        if (this.y + this.h > this.h / 3) {
            this.fire()
        }

        if (this.cooldown > 0) {
            this.cooldown --
        }
    }

    kill() {
        var x = this.x + this.w / 2
        var y = this.y + this.h / 2
        var ps = GuaParticleSystem.new(this.game, x, y)
        this.scene.addElement(ps)
        this.alive = false
    }

    fire() {
        if (this.cooldown == 0 && this.alive) {
            this.cooldown = config.enemy_fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y + this.h
            var speed = -2 * (this.number + 1)
            var b = Bullet.new(this.game, 'bullet2', speed)
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.scene.enemiesBullet.push(b)
        }
    }

    draw() {
        if (this.alive) {
            super.draw()
        }
    }

}
