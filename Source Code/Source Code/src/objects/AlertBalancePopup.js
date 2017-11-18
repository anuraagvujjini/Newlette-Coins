import InteractableObject from '../core/InteractableObject';
class AlertBalancePopup extends InteractableObject{
	constructor(state, x, y, width, height) {
        super(state, x, y, width, height);
    }
    create(){
    	this.popup = this.createPopup();
    	this.button = this.createButton();
    	this.scale.set(this.width/this.popup.width,this.height/this.popup.height);
    }
    createPopup(){
    	var popup = new Phaser.Image(this.game, 0, 0, "alert_balance_outer");
    	popup.anchor = {x:0.5,y:0.5};
        this.add(popup);
        return popup;
    }
    createButton(){
    	var button = new Phaser.Button(this.game,0,this.popup.height*0.2,"alert_balance_ok",this.onClick, this);
    	button.width = this.popup.width*0.2;
    	button.height = this.popup.height*0.2;
    	button.anchor = {x:0.5,y:0.5};
    	this.add(button)
    	return button;
    }
    onClick(){
        this.button.inputEnabled = false;
        this.popup.inputEnabled = false;
    	this.gameState.display.remove(this);
    }
    showPopup(){
        this.button.inputEnabled = true;
        this.button.input.useHandCursor = true;
        this.popup.inputEnabled = true;
        this.gameState.display.add(this);
    }
}
export default AlertBalancePopup;