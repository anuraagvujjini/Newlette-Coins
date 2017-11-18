import InteractableObject from '../core/InteractableObject'
class SoundBar extends InteractableObject {
    constructor(state, x, y, width, height) {
        super(state, x, y, width, height);
    }

    create() {
        this.buttonBg = this.createBackground();
        this.onChildInputDown.add(this.onDown, this);
        this.onChildInputUp.add(this.onUp, this);
        this.add(this.buttonBg);
        this.scale.set(this.width / this.buttonBg.width, this.height / this.buttonBg.height);
        this.updateVolume(this.game.sound.volume);
    }

    createBackground() {
        var buttonBg = new Phaser.Button(this.game, 0, 0, 'sound_bar');
        return buttonBg;
    }

    onDown(object,event) {
        this.isClicked =true;
    }

    onUp(){
        this.isClicked = false;
    }

    updateVolume(volume) {
        if(volume>1) volume = 1;
        this.game.sound.volume = volume;
        this.buttonBg.frameName = "soundbar"+(volume*8+1).toFixed(0);

        if(volume === 0 ) {
            this.gameState.soundBtn.mute();
        }else{
            this.gameState.soundBtn.unmute();
        }
    }
    
    update(){
        super.update();
        if(this.isClicked){
            var posX = this.toLocal(game.input.mousePointer).x*this.scale.x;
            if(posX<0)posX=0;
            var volume = posX/this.width;
            this.updateVolume(volume);
        }
    }
}

export default SoundBar;