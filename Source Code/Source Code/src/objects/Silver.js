import ItemFactory from '../factories/ItemFactory';
class Silver extends Phaser.Image{
	constructor(game,x,y,width,height){
		super(game,x,y,'silver');
		this.game = game;
		if(width) this.width = width;
		if(height) this.height = height;
		this.anchor = {x:0.5, y:0.5};
		this.appearMusic = new Phaser.Sound(this.game, 'hurt_audio');
		this.type = "SILVER";

	}
	startAnimation(){
		this.appearMusic.play();
		this.animations.add('rotate',Phaser.Animation.generateFrameNames('ruby-', 1,30));
		this.animations.play('rotate',20,true);
	}
}
export default Silver;