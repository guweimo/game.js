class GuaScene {
    constructor(game) {
        this.game = game
        this.game.actions = {}
        this.game.keydowns = {}
        this.elements = []
        this.debugModeEnabled = true
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }

    removeElement(img) {
        for (let i = 0; i < this.elements.length; i++) {
            const item = this.elements[i]
            if (item == img) {
                this.elements.splice(i, 1)
                break
            }
        }
    }

    removeAll() {
        this.elements = []
    }

    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }

    update() {
        this.debug && this.debug()
        if (this.debugModeEnabled) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }

    show() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.show && e.show()
        }
    }

    stop() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.stop && e.stop()
        }
    }
}
