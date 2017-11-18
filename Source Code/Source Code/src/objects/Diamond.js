import ItemFactory from '../factories/ItemFactory';
class Diamond extends Phaser.Image{
	constructor(game,x,y,width,height){
		super(game,x,y,'diamond');
		this.game = game;
		if(width) this.width = width;
		if(height) this.height = height;
		this.anchor = {x:0.5, y:0.5};
		this.appearMusic = new Phaser.Sound(this.game, 'hurt_audio');
		this.type = "DIAMOND";
	}
	startAnimation(){
		this.appearMusic.play();
		this.animations.add('rotate',Phaser.Animation.generateFrameNames('diamond-', 1,30));
		this.animations.play('rotate',20,true);
	}
}
export default Diamond;