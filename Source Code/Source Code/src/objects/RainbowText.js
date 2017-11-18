class RainbowText extends Phaser.Text {

    constructor(game, x, y, text) {

        super(game, x, y, text, {font: "45px Arial", fill: "#ff0044"});

        this._speed = 125; //ms
        this._colorIndex = 0;
        this._colors = ['#FFDD2C', '#FFC72C', '#FFB22E', '#FF9D2C', '#FF872C'];

        this.colorize();
        this.startTimer();
    }

    startTimer() {
        this.game.time.events.loop(this._speed, this.colorize, this).timer.start();
    }

    colorize() {

        for (let i = 0; i < this.text.length; i++) {

            if (this._colorIndex === this._colors.length) {
                this._colorIndex = 0;
            }

            this.addColor(this._colors[this._colorIndex], i);
            this._colorIndex++;

        }

    }

}

export default RainbowText;