class Leaderboard extends Phaser.Group {
	constructor(game,x,y,width,height,results){
		super(game);
		this.position.x = x;
		this.position.y = y;
		this._width = width;
		this._height = height;
		this.results = results;
		this.fontStyle =  {font: "bold 60px Metalo", fill: "#ffffff"};
		this.init();
		this.writeName = this.writeName.bind(this);
		this.writeScore = this.writeScore.bind(this);
	}
	init(){
		this.text = this.createText();
		for (let [index, value] of this.results.entries()) {
			if(index >= 5) break;
			this.writeName(index,value.userName);
			this.writeScore(index,value.totalPoints);
		}
	}
	
	createText() {
        var text = new Phaser.Image(this.game, 0, 0, "leaderboard_text");
        text.anchor = {x: 0.5, y: 0.5};
        text.position = {x: 800, y: 0};
        text.width = 550;
        text.height = 200;
        this.add(text);
        return text;

    }

	writeName(index,name){
		var nameText = new Phaser.Text(
			this.game, 
			0, 80 + index * 100, 
			(index+1) + ". " + name, this.getFontStyle(index));
            nameText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.add(nameText);
	}
	writeScore(index,score){
		var scoreText = new Phaser.Text(
			this.game, 
			1300+index*5, 80+ index * 100, 
			score, this.getFontStyle(index));
            scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.add(scoreText);
	}
	getFontStyle(index){
		return  {
			font: "bold " + (80-index*5) +"px Metalo", 
			fill: "#ffffff"
		};
	}
}
export default Leaderboard;