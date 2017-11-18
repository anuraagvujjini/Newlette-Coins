import InteractableObject from '../core/InteractableObject'
class SoundButton extends InteractableObject {
    constructor(state, x, y, width, height) {
        super(state, x, y, width, height);
    }

    create() {
        this.buttonBg = this.createBackground();
        this.onChildInputUp.add(this.onClick, this);
        this.add(this.buttonBg);
        //this.onChildInputOver.add(this.onOver, this);
        this.loadButton();
        this.scale.set(this.width / this.buttonBg.width, this.height / this.buttonBg.height);
    }

    createBackground() {
        var buttonBg = new Phaser.Button(this.game, 0, 0, this.getTextureName());
        buttonBg.animations.add("mute", Phaser.Animation.generateFrameNames('', 1, 20));
        buttonBg.animations.add("unmute", Phaser.Animation.generateFrameNames('', 1, 23));
        return buttonBg;
    }

    onClick() {
        if(this.game.sound.mute){
            this.unmute();
        }else{
            this.mute();
        }
        
    }

    //onOver() {
      //  this.buttonBg.loadTexture("sound_mute_btn_hover");
    //}
    mute(){
        if(!this.game.sound.mute){
        this.game.sound.mute = true;
        if(this.gameState.soundBar) this.gameState.soundBar.updateVolume(0);
        this.loadButton();
        }
    }
    unmute(){
        if(this.game.sound.mute){
            this.game.sound.mute = false;
            if(this.gameState.soundBar) this.gameState.soundBar.updateVolume(1);
            this.loadButton();   
        }
    }
    getTextureName() {
        return this.game.sound.mute ? "sound_mute_btn" : "sound_unmute_btn";
    }

    loadButton() {
        this.buttonBg.loadTexture(this.getTextureName(), 1);
        if (this.game.sound.mute) {
            this.buttonBg.animations.play("mute", 20, false);
           
        }
        else {
            this.buttonBg.animations.play("unmute", 20, false);
            

        }
    }
}

export default SoundButton;