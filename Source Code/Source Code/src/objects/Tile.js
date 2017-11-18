import InteractableObject from '../core/InteractableObject';
import Bomb from './Bomb';

class Tile extends InteractableObject {
    constructor(state, xIndex, yIndex,onSelectedCallback) {
        var tileUtils = state.tileUtils;
        super(state, 
            tileUtils.calculatePosX(xIndex,yIndex),
            tileUtils.calculatePosY(yIndex), 
            tileUtils.calculateWidth(yIndex), 
            tileUtils.calculateHeight(yIndex));
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.onSelectedCallback = onSelectedCallback;
        this.isSelected = false;
        this.texture = tileUtils.getTileTextureName(xIndex);
        this.hoverTexture = tileUtils.getTileHoverTextureName(xIndex);
        this.holeTexture = tileUtils.getTileHoleTextureName(xIndex);
        this.tileImage = this.createTile();
        this.tileHoverImage = this.createTileHover();
    }

    create() {
        this.bomb = new Bomb(this.gameState, this.width/2, this.height/2, this.width*0.8, this.height);
        this.onChildInputUp.add(this.onClick.bind(this));
    }
    createTile() {
        var tileImage = new Phaser.Image(this.game, 0, 0, this.texture);
        tileImage.inputEnabled = true;
        tileImage.width = this.width;
        tileImage.height = this.height;
        tileImage.input.pixelPerfectClick = true;
        this.add(tileImage);
        return tileImage;
    }
    createTileHover(){
        var tileHoverImage = new Phaser.Image(this.game, 0, 0, this.hoverTexture);
        //tileImage.inputEnabled = true;
        tileHoverImage.width = this.width;
        tileHoverImage.height = this.height;
        tileHoverImage.animations.add('hover_animation',Phaser.Animation.generateFrameNames('hover-', 1,4));
        return tileHoverImage;
    }
    playHoverAnimation(){           
        this.add(this.tileHoverImage);
        var hoverAnim = this.tileHoverImage.animations.play('hover_animation',12,false);
        hoverAnim.onComplete.add(()=>{
            this.remove(this.tileHoverImage);
        },this);
    }
    onClick() {
        if(this.gameState.gameover) return;
        this.playHoverAnimation()
        if (this.isSelected) {
            this.onTileUnselected();
        } else {
            this.onTileSelected();
        }
    }

    onTileSelected() {
        if (this.onSelectedCallback(this, true)) {
           // this.isSelected = true;
            this.add(this.bomb);
            //this.bomb.bringToTop();
        }
    }

    onTileUnselected() {
        if (this.onSelectedCallback(this, false)) {
            //this.isSelected = false;
            this.remove(this.bomb);
        }
    }

    detonateBomb() {
        return this.bomb.detonate();
    }

    explodeTile(){
        this.tileImage.loadTexture(this.holeTexture);
    }
    addItem(item){
        item.width = this.width*0.6;
        item.height = this.height*0.8;
        item.position = {x:this.width/2,y:this.height/3};
        this.item = item;
    }
    showItem(){
        if(this.item && this.getIndex(this.item) < 0) {
            this.item.alpha = 0.5;
            this.add(this.item);
            this.item.startAnimation();
            this.gameState.add.tween(this.item).to({alpha:1},1000,Phaser.Easing.Exponential.Out,true);
            this.gameState.add.tween(this.item).from({y:this.height/2+5},1000,Phaser.Easing.Exponential.Out,true);
        }
    }   
    hideItem(){
        if(this.item && this.getIndex(this.item) >= 0) {
            this.remove(this.item);
        }
    }
}

export default Tile;