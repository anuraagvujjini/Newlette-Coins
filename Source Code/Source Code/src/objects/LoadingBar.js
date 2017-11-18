class LoadingBar extends Phaser.Group {
	constructor(game,x,y,maxWidth,barHeight){
		super(game);
		this.position.x = x;
		this.position.y = y;
		this.maxWidth = maxWidth;
		this.barHeight = barHeight;
		this.init();
	}
	init(){
        this.loadingbar = new Phaser.Image(this.game,0,0,"loadingbar","loading_bar0");
        this.loadingbar.width = this.maxWidth;
        this.loadingbar.height = this.barHeight;
        this.add(this.loadingbar);
        this.percentCompleted = 0;
	}

	get percentCompleted(){
		return this._percentCompleted;
	}
	set percentCompleted(percentCompleted){
		this.onPercentCompletedChange(this._percentCompleted,percentCompleted);
		this._percentCompleted = percentCompleted;
	}
	onPercentCompletedChange(oldValue,newValue){
		this.loadingbar.frameName = "loading_bar"+(newValue/100*13).toFixed(0);
	}


}
export default LoadingBar;