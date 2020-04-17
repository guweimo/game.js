class GuaAnimation {
    constructor(game, name, animations) {
        this.game = game
        this.animations = animations
        this.imgName = name
        this.animationName = 'idle'
        this.init()
    }
    static new(game) {
        return new this(game)
    }
    init() {
        var animations = this.animations
        var keys = Object.keys(animations)

        for (let k of keys) {
            var a = animations[k]
            for (var i = 1; i < a.number + 1; i++) {
                var name = `b${i}`
                var t = this.game.textureByName(name)
                a.frames.push(t)
            }
        }

        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = this.count()
    }
    frames() {
        return this.animations[this.animationName].frames
    }
    count() {
        return this.animations[this.animationName].frameCount
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = this.count()
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        this.game.drawImage(this)
    }
    changeAnimation(name) {
        this.animationName = name
    }
}
