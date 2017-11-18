import Board from '../objects/Board';
import DetonateButton from '../objects/DetonateButton';
import SoundButton from '../objects/SoundButton';
import SoundBar from '../objects/SoundBar';
import PaytableButton from '../objects/PaytableButton';
import HelpButton from '../objects/HelpButton';
import Multiplier1XButton from '../objects/Multiplier1XButton';
import Multiplier10XButton from '../objects/Multiplier10XButton';
import Multiplier100XButton from '../objects/Multiplier100XButton';
import BoardService from '../services/BoardService';
import WinPointBox from '../objects/WinPointBox';
import SpentPointBox from '../objects/SpentPointBox';
import BombRemainBox from '../objects/BombRemainBox';
import AlertBalancePopup from '../objects/AlertBalancePopup';
import PaytablePopup from '../objects/PaytablePopup';
import HelpPopup from '../objects/HelpPopup';
import UserData from '../storages/UserData';
import Config from '../config/ConfigLoader';
import CustomState from '../core/CustomState';
import TileUtils from '../utils/TileUtils';
class BoardState extends CustomState {
    constructor() {
        super();
    }

    init(cols, rows, data) {
        this.cols = cols;
        this.rows = rows;
        this.boardWidth = Config.board.width;
        this.boardHeight = Config.board.height;
        this.gameover = false; 
        this.onBombsChange = new Phaser.Signal();
        this.onMultiplierChange = new Phaser.Signal();
        this.multiplier = (data && data.multiplier) || 1;
        this.winPoints = (data && data.winPoints) || 0;
        this.spentPoints = (data && data.spentPoints) || 0;
        this.terrain = (data && data.terrain) || "grass";//TileUtilsService.TileType.GRASS;
        this.tileUtils = new TileUtils(this.terrain,this.cols,this.rows,this.boardWidth/cols, this.boardHeight/rows);
    }

    create() {
        super.create();
        
        this.board = new Board(this, 20, 120, this.boardWidth, this.boardHeight, this.cols, this.rows);
        this.detonateBtn = new DetonateButton(this, 1200, 480, 600, 200);
        this.detonateBtn.onChildInputUp.add(this.onClickDetonate,this);
        
        // multiplier
        this.multiplier1XBtn = new Multiplier1XButton(this, 1300, 380, 210, 165);
        this.multiplier10XBtn = new Multiplier10XButton(this, 1500, 380, 240, 180);
        this.multiplier100XBtn = new Multiplier100XButton(this, 1710, 380, 270, 195);
        
        // box
        this.winPointsBox = new WinPointBox(this, 1200, 100, 600, 140, {winPoints: this.winPoints});
        this.spentPointsBox = new SpentPointBox(this, 1200, 830, 600, 140, {spentPoints: this.spentPoints});
        this.bombRemainBox = new BombRemainBox(this, 80, 840, 960, 100, {numBombs: 4});
        
        // volume control
        if(this.game.device.desktop){
            this.soundBtn = new SoundButton(this, 1230, 950, 160, 160);
            this.soundBar = new SoundBar(this, 1360, 990, 160, 80);
        }else{
            this.soundBtn = new SoundButton(this, 1400, 950, 160, 160);
        }

        // popup
        this.paytablePopup = new PaytablePopup(this, this.world.width/2, this.world.height/2, this.world.width*0.9, this.world.height*0.9);
        this.paytableBtn = new PaytableButton(this, 1600, 980, 280, 100);
        this.paytableBtn.onChildInputUp.add(this.paytablePopup.showPopup,this.paytablePopup);
        this.helpPopup = new HelpPopup(this, this.world.width/2, this.world.height/2, this.world.width*0.9, this.world.height*0.9);
        this.helpBtn = new HelpButton(this, 1540, 990, 90, 90);
        this.helpBtn.onChildInputUp.add(this.helpPopup.showPopup,this.helpPopup);
        this.alertBalancePopup = new AlertBalancePopup(this, this.world.width/2, this.world.height/2, 960, 600);
        
        this.display.add(this.board);
        this.display.add(this.detonateBtn);
        this.display.add(this.multiplier1XBtn);
        this.display.add(this.multiplier10XBtn);
        this.display.add(this.multiplier100XBtn);
        this.display.add(this.winPointsBox);
        this.display.add(this.spentPointsBox);
        this.display.add(this.bombRemainBox);
        this.display.add(this.paytableBtn);
        this.display.add(this.helpBtn);
        this.display.add(this.soundBtn);
        if(this.game.device.desktop){
            this.display.add(this.soundBar);
        }
        this.music.play('', 0, 0.5, true);
        this.playNewGameAnimation();
        this.setResponsiveSetting();
        this.bombs = [];
        //just a comment
    }

    preload() {
        this.music = this.add.audio('game_audio');
        this.winMusic = this.add.audio('win_audio');
        this.loseMusic = this.add.audio('lose_audio');
    }

    get bombs() {
        return this._bombs;
    }

    set bombs(bombs) {
        var oldValue = this._bombs;
        this._bombs = bombs;
        this.onBombsChange && this.onBombsChange.dispatch(oldValue, this._bombs, this._multiplier);
    }

    get multiplier() {
        return this._multiplier;
    }

    set multiplier(multiplier) {
        var oldValue = this._multiplier;
        this._multiplier = multiplier;
        this.onMultiplierChange && this.onMultiplierChange.dispatch(oldValue, this._multiplier, this._bombs);
    }

    get winPoints() {
        return this._winPoints;
    }

    set winPoints(winPoints) {
        this._winPoints = winPoints;
    }

    onClickDetonate() {
        if (this.gameover) {
                return;
        }
        let spoints = this.spentPointsBox.getPointsSpent();
        if(UserData.totalPoints >= spoints){
            this.gameover = true;
            UserData.totalPoints -= spoints;
            var promise = BoardService.detonate(this.rows, this.cols, this.multiplier, this.bombs);
            promise.then(this.onDetonated.bind(this));
        } else{
            this.alertBalancePopup.showPopup();
        }
    }

    onDetonated(response) {
        var gameId = response.id;
        var items = response.items;
        var points = response.points;
        this.board.addItems(items);
        this.board.inputEnabled = false;
        this.board.ignoreChildInput = true;
        var self = this;
        this.board.detonateBombs().then(()=> { 
            this.board.showAllItems();
            this.winPoints = points;
            if (points > 0) {
                this.board.moveItemsTo(this.winPointsBox);
                this.winPointsBox.addPoint(points).onComplete.addOnce(()=>{
                    this.restartGame();
                },this);
                this.winMusic.play();
                
            } else {
                this.board.fadeReceivedItems().onComplete.addOnce(()=>{
                    this.restartGame();
                },this);
                this.loseMusic.play();
            }
            //Update angular scope for changed userData
            UserData.totalPoints = response.totalPoints;
            updateGlobalUserData(UserData);
        });
    }

    restartGame() {
        this.music.stop();
        this.playEndGameAnimation().onComplete.addOnce(()=>{
            this.onMultiplierChange.dispose();
            this.onBombsChange.dispose();
            this.state.restart(true, false, this.cols, this.rows, {
                winPoints: this.winPoints,
                multiplier: this.multiplier
            });
        },this);
    }

    playNewGameAnimation(){
        this.elevatorUpper = new Phaser.Image(this.game,0,0,"elevator_upper");
        var elevatorUpper = this.elevatorUpper;
        elevatorUpper.width = this.game.width;
        elevatorUpper.height = this.game.height/2;
        this.elevatorLower = new Phaser.Image(this.game,0,this.game.height/2,"elevator_lower");
        var elevatorLower = this.elevatorLower;
        elevatorLower.width = this.game.width;
        elevatorLower.height = this.game.height/2;
        this.add.tween(elevatorUpper.position).to({
            y:-this.game.height/2
        },500,Phaser.Easing.Linear.InOut,true).onComplete.addOnce(()=>this.display.remove(elevatorUpper),this);;
        var tween = this.add.tween(elevatorLower.position).to({
            y:this.game.height
        },500,Phaser.Easing.Linear.InOut,true).onComplete.addOnce(()=>this.display.remove(elevatorLower),this);
        this.display.add(elevatorUpper);
        this.display.add(elevatorLower);
        return tween;
    }
    playEndGameAnimation(){
        var elevatorUpper = this.elevatorUpper;
        var elevatorLower = this.elevatorLower;
        this.add.tween(elevatorUpper.position).to({
            y:0
        },500,Phaser.Easing.Linear.InOut,true);
        var tween = this.add.tween(elevatorLower.position).to({
            y:this.game.height/2
        },500,Phaser.Easing.Linear.InOut,true);
        this.display.add(elevatorUpper);
        this.display.add(elevatorLower);
        return tween;
    }
}

export default BoardState;