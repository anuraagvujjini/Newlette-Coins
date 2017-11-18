import RainbowText from '../objects/RainbowText';
import InteractableObject from '../core/InteractableObject'

class WinPointBox extends InteractableObject {
    constructor(state, x, y, width, height, opts) {
        super(state, x, y, width, height, opts);
    }

    create() {
        this.text = this.createText();
        this.box = this.createBox();
        this.text.scale.set(this.box.width / this.text.width, this.box.height / this.text.height);
        this.box.scale.set(1.5, 1);
        this.box.position.x = this.text.width + 20;
        this.pointText = this.createPointText();
        this.add(this.text);
        this.add(this.box);
        this.add(this.pointText);
        this.scale.set(this.width / (this.box.width + this.text.width + 20), this.height / this.box.height);
        this.counterSound = new Phaser.Sound(this.game, 'counter_audio');
    }

    createBox() {
        var box = new Phaser.Image(this.game, 0, 0, "win_point_box_border");
        return box;
    }

    createText() {
        var text = new Phaser.Image(this.game, 0, 0, "win_point_box_text");
        return text;
    }

    createPointText() {
        let winPointsText = new RainbowText(this.game, this.box.position.x + 50, this.box.position.y + 25, this.opts.winPoints);
        return winPointsText;
    }

    addPoint(amount) {
        var balanceValue = {};
        balanceValue.count = 0;
        var balanceTween = this.gameState.add.tween(balanceValue).to({
            count: amount
        }, 2000);
        balanceTween.start();
        balanceTween.onUpdateCallback(()=> {
            this.pointText.text = balanceValue.count.toFixed(0);
        });
        balanceTween.onComplete.addOnce(()=> {
            this.pointText.text = amount;
        })

        this.counterSound.play();
        return balanceTween;
    }
}

export default WinPointBox;