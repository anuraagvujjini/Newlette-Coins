class CustomState extends Phaser.State {
	constructor(){
		super();
		
	}
	create(){
		this.display = new Phaser.Group(this.game);
		this.control = new Phaser.Group(this.game);
		this.world.add(this.display);
		this.world.add(this.control);
	}
	setResponsiveSetting(){
		this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(960/3, 540/3);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setShowAll();
		if (!this.game.device.desktop) {
			this.invalidOrientation = new Phaser.Image(this,0,0,'invalid-orientation');
            this.invalidOrientation.width = this.game.width;
            this.invalidOrientation.height = this.game.height;
            this.invalidOrientation.inputEnabled = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.handleIncorrect,this);
            this.scale.leaveIncorrectOrientation.add(this.handleCorrect,this);
            if(this.scale.incorrectOrientation) this.handleIncorrect();
        }
	}
	handleIncorrect(){
        if(!this.game.device.desktop){
            this.control.add(this.invalidOrientation);
            //  var gameRatio = window.innerHeight/window.innerWidth;       
            // var newHeight = Math.ceil(1080*gameRatio);
            // var newWidth = 1080;
            // //this.game.renderer.resize(this.game.width,this.game.height);
            // this.scale.setupScale(newWidth,newHeight);
            //this.scale.setupScale(1080,1920);
        }
    }
    
    handleCorrect(){
        if(!this.game.device.desktop){
            this.control.remove(this.invalidOrientation);
            // var gameRatio = window.innerWidth/window.innerHeight;       
            // var newWidth = Math.ceil(1080*gameRatio);
            // var newHeight = 1080;
            // //this.game.renderer.resize(this.game.width,this.game.height);
            // this.scale.setupScale(newWidth,newHeight);
        }
    }
    gameResized(){
        
    }

}
export default CustomState;