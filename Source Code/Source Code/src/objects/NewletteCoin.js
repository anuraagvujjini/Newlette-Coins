import ItemFactory from '../factories/ItemFactory';
class NewletteCoin extends Phaser.Image{
	constructor(game,x,y,width,height){
		super(game,x,y,'coin');
		this.game = game;
		if(width) this.width = width;
		if(height) this.height = height;
		this.anchor = {x:0.5, y:0.5};
		this.appearMusic = new Phaser.Sound(this.game, 'hurt_audio');
		console.log(ItemFactory);
		this.type = "COIN";
	}
	startAnimation(){
		this.appearMusic.play();
		this.animations.add('rotate',Phaser.Animation.generateFrameNames('coin-', 1,22));
		this.animations.play('rotate',20,true);
	}
}
export default NewletteCoin;