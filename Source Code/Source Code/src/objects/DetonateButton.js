import InteractableObject from '../core/InteractableObject'
class DetonateButton extends InteractableObject {
    constructor(game, x, y, width, height) {
        super(game, x, y, width, height);
        this.inputEnable = false;
        this.ignoreChildInput = true;
    }

    create() {
        this.buttonBg = this.createBackground();
        this.buttonText = this.createText();
        this.buttonFlame = this.createFlame();
        this.loadFlameStaticTexture();
        this.add(this.buttonBg);
        this.add(this.buttonText);
        this.add(this.buttonFlame);
        this.onChildInputOver.add(this.onOver, this);
        this.onChildInputOut.add(this.onOut, this);
        this.onChildInputDown.add(this.onDown, this);
        this.scale.set(this.width / this.buttonBg.width, this.height / this.buttonBg.height);
        this.gameState.onBombsChange.add(this.onBombsChanged, this);
    }

    createBackground() {
        var buttonBg = new Phaser.Button(this.game, 0, 0, "detonate_btn_bg");
        buttonBg.inputEnabled = true;
        return buttonBg;
    }

    createText() {
        var buttonText = new Phaser.Image(this.game, 0, 0, "detonate_btn_text");
        buttonText.anchor = {x: 0.5, y: 0.5};
        buttonText.position = {x: 210, y: 80};
        buttonText.width = 170;
        buttonText.height = 60;
        return buttonText;
    }

    createFlame() {
        var buttonFlame = new Phaser.Image(this.game, 20, 20, "detonate_btn_flame");
        buttonFlame.anchor = {x: 0.5, y: 0.5};
        this.removeFlameStaticTexture(buttonFlame);
        buttonFlame.animations.add('detonate_btn_flame', Phaser.Animation.generateFrameNames('flame-', 0, 29));
        return buttonFlame;
    }

    loadFlameStaticTexture() {
        this.buttonFlame.loadTexture("detonate_btn_flame_static");//.resizeFrame();   // new Phaser.RenderTexture(this.game, 40, 83, Phaser.scaleModes.NEAREST));
        this.buttonFlame.width = 20;
        this.buttonFlame.height = 41;
        this.buttonFlame.position = {x: 65, y: 95};
    }

    removeFlameStaticTexture(buttonFlame) {
        buttonFlame.loadTexture('detonate_btn_flame');
        buttonFlame.position = {x: 65, y: 73};
        buttonFlame.width = 65;
        buttonFlame.height = 80;
    }

    onOver() {
        this.buttonBg.loadTexture("detonate_btn_bg_hover");
    }

    onDown(){
        this.buttonBg.loadTexture("detonate_btn_bg_click");   
    }

    onOut() {
        this.buttonBg.loadTexture("detonate_btn_bg");
    }

    onBombsChanged(oldValue, newValue) {
        if (newValue.length === 4) {
            this.removeFlameStaticTexture(this.buttonFlame);
            this.buttonFlame.animations.play('detonate_btn_flame', 20, true);
            this.inputEnable = true;
            this.ignoreChildInput = false;
        } else {
            this.buttonFlame.animations.stop('detonate_btn_flame');
            this.loadFlameStaticTexture();
            this.inputEnable = false;
            this.ignoreChildInput = true;
        }
    }
}


export default DetonateButton;