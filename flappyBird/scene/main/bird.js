class Bird extends GuaAnimation {
    constructor(game) {
        var animations = {
            idle: {
                number: 3,
                frameCount: 3,
                frames: [],
            }
        }
        super(game, 'b', animations)

        this.setup()
    }

    setup() {
        this.alive = true
        this.deadTime = false
        this.flipX = false
        this.rotation = 0
        // this.alpha = 1
        // 重力和加速度
        this.gy = 10
        this.vy = 0
    }

    jump() {
        if (this.alive) {
            this.vy = -10
            this.rotation = -45
        }
    }

    update() {
        super.update()
        if (this.alive || (this.deadTime && this.y < 520)) {
            this.action()
        }
    }

    action() {
        // 更新 alpha
        // if (this.alpha > 0) {
        //     this.alpha -= 0.05
        // }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 520
        if (this.y > h) {
            this.y = h
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
    }

    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        // context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        // log('draw, x, -x', x, -x)
        context.drawImage(this.texture, 0, 0)

        context.restore()
    }

    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
    }

    show() {
        this.alive = true
    }

    stop() {
        this.alive = false
    }

    dead() {
        this.deadTime = true
        this.vy = -10
        this.rotation = -45
    }
}
