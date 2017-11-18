import http from 'http';
import InteractableObject from '../core/InteractableObject'
class PaytableButton extends InteractableObject {
    constructor(state, x, y, width, height) {
        super(state, x, y, width, height);
    }

    create() {
        this.buttonBg = this.createBackground();
        this.add(this.buttonBg);
        this.scale.set(this.width / this.buttonBg.width, this.height / this.buttonBg.height);
        this.onChildInputOver.add(this.onOver, this);
        this.onChildInputOut.add(this.onOut, this);
        this.onChildInputDown.add(this.onDown, this);
        this.onChildInputUp.add(this.onUp, this);
    }

    createBackground() {
        var buttonBg = new Phaser.Button(this.game, 0, 0, "paytable_btn");
        buttonBg.inputEnabled = true;
        return buttonBg;
    }

    onOver() {
        this.buttonBg.loadTexture("paytable_btn_hover");
    }

    onDown() {
        this.buttonBg.loadTexture("paytable_btn_click");
    }

    onUp() {
        this.buttonBg.loadTexture("paytable_btn");
    }

    onOut() {
        this.buttonBg.loadTexture("paytable_btn");
    }


}

export default PaytableButton;