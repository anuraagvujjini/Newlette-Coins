import Service from '../core/Service';
class BoardService extends Service {
    detonate(rows, cols, multiplier, bombTiles) {
        return this.requestAuth({
            uri: this.config.api.url + this.config.api.endpoints.detonate,
            method: 'POST',
            json: this.makeDetonateRequest(rows, cols, multiplier, bombTiles)
        });
    }

    makeDetonateRequest(rows, cols, multiplier, bombTiles) {
        var json = [];
        for (var i = 0; i < bombTiles.length; i++) {
            var tile = bombTiles[i];
            json.push({
                x: tile.xIndex,
                y: tile.yIndex
            });
        }
        return {
            rows: rows,
            cols: cols,
            multiplier: multiplier,
            items: json
        };
    }
}

export default new BoardService();