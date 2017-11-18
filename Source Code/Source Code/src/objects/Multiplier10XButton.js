import http from 'http';
import InteractableObject from '../core/InteractableObject'
class Multiplier10XButton extends InteractableObject {
    constructor(state, x, y, width, height) {
        super(state, x, y, width, height);
    }

    create() {
        this.buttonBg = this.createBackground();
        this.add(this.buttonBg);
        this.buttonBg.animations.play('multiplier_10x_btn', 12, true);
        this.scale.set(this.width / this.buttonBg.width, this.height / this.buttonBg.height);
        this.onChildInputOver.add(this.onOver, this);
        this.onChildInputOut.add(this.onOut, this);
        this.onChildInputUp.add(this.onUp, this);
        this.gameState.onMultiplierChange.add(this.onMultiplierChanged, this);
        this.onMultiplierChanged(this.gameState.multiplier, this.gameState.multiplier);
    }

    createBackground() {
        var buttonBg = new Phaser.Button(this.game, 0, 0, "multiplier_10x_btn")
        buttonBg.inputEnabled = true;
        buttonBg.animations.add('multiplier_10x_btn');
        buttonBg.anchor = {x:0.5,y:0.5};
        return buttonBg;
    }

    onOver() {
        if (!this.isSelected) this.buttonBg.loadTexture("multiplier_10x_btn_hover");
    }

    onOut() {
        if (!this.isSelected) this.buttonBg.loadTexture("multiplier_10x_btn");
    }

    onUp() {
        this.gameState.multiplier = 10;
    }

    onMultiplierChanged(oldValue, newValue) {
        if (newValue === 10) {
            if(!this.isSelected){
                this.isSelected = true;
                this.buttonBg.loadTexture("multiplier_10x_btn_glow", 0, true);
                this.buttonBg.animations.add('multiplier_10x_btn_glow', Phaser.Animation.generateFrameNames('10x_glow-', 1, 8));
                this.buttonBg.animations.play("multiplier_10x_btn_glow", 10, true);
            }
        } else {
            this.isSelected = false;
            this.buttonBg.animations.stop("multiplier_10x_btn_glow");
            this.buttonBg.loadTexture("multiplier_10x_btn");
        }
    }
}

export default Multiplier10XButton;