import InitState from 'states/InitState';
import UserData from 'storages/UserData';
import ConfigLoader from 'config/ConfigLoader';

class Game extends Phaser.Game {

    constructor(sessionToken) {
        super(960 * 2, 540 * 2, Phaser.AUTO, 'content', null, true, true);
        this.state.add('InitState', InitState, false);
        this.state.start('InitState', true, false);
    }
     handleIncorrect(){
        if(!this.device.desktop){
            if(!this.invalidOrientation){
                this.invalidOrientation = new Phaser.Image(this,0,0,'invalid-orientation');
                this.invalidOrientation.width = this.width;
                this.invalidOrientation.height = this.height;
                this.invalidOrientation.inputEnabled = true;
            }
            console.log(this);
            this.world.add(this.invalidOrientation);
            this.world.bringToTop(this.invalidOrientation);
        }
    }
    
    handleCorrect(){
        if(!this.device.desktop){
            this.world.remove(this.invalidOrientation);
        }
    }
}

export default Game;