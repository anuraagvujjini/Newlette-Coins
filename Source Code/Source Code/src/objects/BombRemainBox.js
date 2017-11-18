import InteractableObject from '../core/InteractableObject';
class BombRemainBox extends InteractableObject {
    constructor(game, x, y, width, height, opts) {
        super(game, x, y, width, height, opts);
        this.inputEnable = false;
        this.ignoreChildInput = true;
    }

    create() {
        this.text = this.createText();
        this.box = this.createBox();
        this.text.scale.set(this.box.width / this.text.width, this.box.height / this.text.height);
        this.box.position.x = this.text.width + 20;
        this.bombImages = this.createBombImages();
        this.add(this.text);
        this.add(this.box);
        for (let bombImage of this.bombImages) {
            this.add(bombImage);
        }
        this.scale.set(this.width / (this.box.width + this.text.width + 20), this.height / this.box.height);
        this.gameState.onBombsChange.add(this.onBombsChange, this);
    }

    createText() {
        var text = new Phaser.Image(this.game, 0, 0, "bomb_remain_box_text");
        return text;
    }

    createBox() {
        var box = new Phaser.Image(this.game, 0, 0, "bomb_remain_box_border");
        return box;
    }

    createBombImages() {
        var numBombs = this.opts.numBombs;
        var marginWidth = 40;
        var marginHeight = 20;
        var maxWidth = (this.box.width - 2 * marginWidth) / numBombs;
        var maxHeight = (this.box.height - 2 * marginHeight);
        var bombImages = [];
        for (var i = 0; i < numBombs; i++) {
            var bombImage = new Phaser.Image(this.game,
                this.box.position.x + marginWidth + maxWidth / 2 + maxWidth * i,
                marginHeight + maxHeight / 2,
                "bomb_remain_box_bomb");
            bombImage.width = maxWidth;
            bombImage.height = maxHeight;
            bombImage.anchor = {x: 0.5, y: 0.5};
            bombImages.push(bombImage);
        }
        return bombImages;
    }

    onBombsChange(oldValue, newValue) {
        var remainingBomb = this.opts.numBombs - newValue.length;
        // re render
        //// remove all bombs
        for (var i = 0; i < this.opts.numBombs; i++) {
            this.remove(this.bombImages[i]);
        }
        //// add all bombs
        for (var i = 0; i < remainingBomb; i++) {
            this.add(this.bombImages[i]);
        }
    }
}

export default BombRemainBox;