class InteractableObject extends Phaser.Group {
    static get State() {
        return {
            UP:"UP",
            DOWN:"DOWN",
            OVER:"OVER",
            OUT:"OUT",
            NORMAL: "NORMAL",
        };
    }

    constructor(state, x,y,width,height,opts) {
        super(state.game, null)
        this.game = state.game;
        this.position.x = x;
        this.position.y = y;
        this.width = width;
        this.height = height;
        this.gameState = state;
        this.opts = opts;
        this.init();
        this.create();
    }
    
    init(){

        this.stateCallback = {};
        this.inputEnabled = true;
        this.onChildInputDown.add(this.onInputDownHandler.bind(this));
        this.onChildInputUp.add(this.onInputUpHandler.bind(this));
        this.onChildInputOver.add(this.onInputOverHandler.bind(this));
        this.onChildInputOut.add(this.onInputOutHandler.bind(this));
        this.bindOnStateChangeCallback = this.bindOnStateChangeCallback.bind(this);
        this.changeState(InteractableObject.State.NORMAL);
        
    }
    create(){

    }
    get width(){
        return this.objectWidth;
    }
    set width(width){
        this.objectWidth = width;
    }
    get height(){
        return this.objectHeight;
    }
    set height(height){
        this.objectHeight = height;
    }
    onInputDownHandler(sprite, pointer, isOver){
        this.changeState(InteractableObject.State.DOWN);
    }
    onInputUpHandler(sprite, pointer, isOver){
        this.changeState(InteractableObject.State.NORMAL);
    }
    onInputOverHandler(sprite, pointer, isOver){
        this.changeState(InteractableObject.State.OVER);
    }
    onInputOutHandler(sprite, pointer, isOver){
        this.changeState(InteractableObject.State.NORMAL);
    }
    changeState(state){
        if(this.state === state) {
            return;
        }
        this.state = state;
        if(this.stateCallback[state]){
            this.stateCallback[state]();
        }
    }
    bindOnStateChangeCallback(state,callback){
        this.stateCallback[state] = callback.bind(this);
    }

    add(object){
        super.add(object);
    }
    remove(object){
        super.remove(object);
    }
}
export default InteractableObject