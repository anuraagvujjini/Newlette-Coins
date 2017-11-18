import RainbowText from '../objects/RainbowText';
import InteractableObject from '../core/InteractableObject';
import Config from '../config/ConfigLoader';

class SpentPointBox extends InteractableObject {
    constructor(state, x, y, width, height, opts) {
        super(state, x, y, width, height, opts);
    }

    create() {
        this._spentPoints = 0;
        this.text = this.createText();
        this.box = this.createBox();
        this.text.scale.set(this.box.width / (this.text.width * 1.3), this.box.height / (this.text.height * 1.3));
        this.box.scale.set(1.5, 1);
        this.box.position.x = this.text.width + 20;
        this.pointText = this.createPointText();
        this.add(this.text);
        this.add(this.box);
        this.add(this.pointText);
        this.scale.set(this.width / (this.box.width + this.text.width + 20), this.height / this.box.height);
        this.gameState.onBombsChange.add(this.onBombsChange, this);
        this.gameState.onMultiplierChange.add(this.onMultiplierChange, this);
    }

    createBox() {
        var box = new Phaser.Image(this.game, 0, 0, "spent_point_box_border");
        return box;
    }

    createText() {
        var text = new Phaser.Image(this.game, 0, 10, "spent_point_box_text");
        return text;
    }

    createPointText() {
        let spentPointsText = new RainbowText(this.game, this.box.position.x + 50, this.box.position.y + 25, this._spentPoints);
        return spentPointsText;
    }

    onBombsChange(oldValue, newValue, multiplier) {
        this.updatePointsSpent(newValue, multiplier);
    }

    onMultiplierChange(oldValue, multiplier, bombsArr) {
        this.updatePointsSpent(bombsArr, multiplier);
    }

    updatePointsSpent(bombsArray, multiplier) {
        this._spentPoints = bombsArray.length * Config.board.bombCost * multiplier;
        this.remove(this.pointText);

        this.pointText = this.createPointText();
        this.add(this.pointText);
    }

    getPointsSpent() {
        return this._spentPoints;
    }
}

export default SpentPointBox;