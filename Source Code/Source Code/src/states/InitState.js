import CustomState from '../core/CustomState';
import LoadState from './LoadState';
import BoardState from './BoardState';
class InitState extends CustomState {

    init() {
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(960/2, 540/2);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setShowAll();
    }

    preload() {
        this.loader = this.game.load;
        this.loadStates();
        this.loader.image('invalid-orientation','/assets/alert_message/orientation.png');
        // this.loader.image('loading-bar-right','/assets/loading-bar-right.png');
        // this.loader.image('loading-bar-left','/assets/loading-bar-left.png');
        // this.loader.image('loading-bar-middle','/assets/loading-bar-middle.png');


         //leaderboard text
        this.loader.image('leaderboard_text', '/assets/leaderboard_text.png');

        // this.loader.image('loading-bar-right', '/assets/loading-bar-right.png');
        // this.loader.image('loading-bar-left', '/assets/loading-bar-left.png');
        // this.loader.image('loading-bar-middle', '/assets/loading-bar-middle.png');
        this.loader.atlas('loadingbar', '/assets/loadingbar/loadingbar.png', '/assets/loadingbar/loadingbar.json');

    }

    create() {
        super.create();
        this.game.state.start('LoadState', true, false);
    }

    // handleIncorrect(){
    //     if(!this.game.device.desktop){
    //         this.world.add(this.invalidOrientation);
    //         this.world.bringToTop(this.invalidOrientation);
    //     }
    // }
    
    // handleCorrect(){
    //     if(!this.game.device.desktop){
    //         this.world.remove(this.invalidOrientation);
    //     }
    // }
    loadStates() {
        this.game.state.add('LoadState', LoadState, false);
        this.game.state.add('BoardState', BoardState, false);
    }
}

export default InitState;