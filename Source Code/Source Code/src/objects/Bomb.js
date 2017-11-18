import InteractableObject from '../core/InteractableObject';
import { Promise } from 'bluebird';
class Bomb extends InteractableObject {
    constructor(state, x, y, width, height) {
        super(state, x, y, width, height);
    }

    create() {
        var bombImage = new Phaser.Image(this.game, 0, 0, "bomb");
        bombImage.inputEnabled = false;
        bombImage.width = this.width;
        bombImage.height = this.height;
        bombImage.anchor = {x:0.5,y:0.5};
        this.add(bombImage);
        this.crackMusic = new Phaser.Sound(this.game, 'crack_audio');
        this.explodeMusic = new Phaser.Sound(this.game, 'explosion_audio');
        this.bombImage = bombImage;
        this.startAnimation();
    }
    startAnimation(){
    	this.bombImage.animations.add('placed', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        this.bombImage.animations.play('placed', 20, true);
    }
    startDetonationAnimate() {
        this.visible = true;
        this.bombImage.loadTexture('bomb');
        this.bombImage.animations.add('detonated', [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
        this.bombImage.animations.play('detonated', 20, false);
        return this.bombImage.events
    }

    detonate() {
    	this.crackMusic.play();
        var resolver = new Promise((resolve,reject)=>{
            var detonateAnim = this.startDetonationAnimate();
            detonateAnim.onAnimationComplete.addOnce(()=>{
                var tile = this.parent;
                tile.explodeTile();
                this.explodeMusic.play();
                this.bombImage.loadTexture('bomb_blast');
                this.bombImage.animations.add('detonated', Phaser.Animation.generateFrameNames('blast-', 0,15));
                this.bombImage.animations.play('detonated', 20, false);
                this.bombImage.events.onAnimationComplete.addOnce(()=> {
                    tile.showItem();
                    this.visible = false;
                    resolve();
                });
            }, this);
        });
        return resolver;
        
    }
}
export default Bomb;