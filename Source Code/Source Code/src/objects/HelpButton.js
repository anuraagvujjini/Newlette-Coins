import InteractableObject from '../core/InteractableObject'
class HelpButton extends InteractableObject {
	constructor(state,x,y,width,height){
		super(state,x,y,width,height);
	}
	create(){
		this.buttonBg = this.createBackground();
		//this.buttonBg.animations.play('help_btn',12,true);
		this.add(this.buttonBg);
		this.scale.set(this.width/this.buttonBg.width,this.height/this.buttonBg.height);
		this.onChildInputOver.add(this.onOver,this);
		this.onChildInputOut.add(this.onOut,this);
		this.onChildInputDown.add(this.onDown,this);
		this.onChildInputUp.add(this.onUp,this);
	}
	createBackground(){
		var buttonBg = new Phaser.Button(this.game,0,0,"help_btn")
		buttonBg.inputEnabled = true;
		return buttonBg;	
	}
	onOver(){
		this.buttonBg.loadTexture("help_btn_hover");
	}
	onDown(){
		this.buttonBg.loadTexture("help_btn_click");
	}
	onUp(){
		this.buttonBg.loadTexture("help_btn");
	}
	onOut(){
		this.buttonBg.loadTexture("help_btn");
	}


}

export default HelpButton;