// server.js 
var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();

server.use(middlewares);

server.post("/api/detonate", function (req, res, next) {
    var d = new Date();
    var n = d.getTime() % 3;
    var items;
    switch (n) {
        case 0:
            items = [
                {x: 1, y: 1, type: 'COIN'},
                {x: 1, y: 2, type: 'COIN'},
                {x: 1, y: 3, type: 'DIAMOND'},
                {x: 3, y: 3, type: 'DIAMOND'},
                {x: 0, y: 3, type: 'SILVER'},
                {x: 2, y: 0, type: 'SILVER'}
            ];
            break;
        case 1:
            items = [
                {x: 0, y: 1, type: 'COIN'},
                {x: 3, y: 2, type: 'COIN'},
                {x: 2, y: 1, type: 'DIAMOND'},
                {x: 3, y: 3, type: 'DIAMOND'},
                {x: 0, y: 0, type: 'SILVER'},
                {x: 1, y: 1, type: 'SILVER'}
            ];
            break;
        case 2:
            items = [
                {x: 3, y: 3, type: 'COIN'},
                {x: 3, y: 0, type: 'COIN'},
                {x: 0, y: 2, type: 'DIAMOND'},
                {x: 0, y: 1, type: 'DIAMOND'},
                {x: 1, y: 3, type: 'SILVER'},
                {x: 1, y: 2, type: 'SILVER'}
            ];
            break;
    }

    res.jsonp({
        "id": req.body.id,
        "items": items,
        "points": (70 + n * 10) * req.body.multiplier
    });
});

server.post("/api/game", function (req, res, next) {
    res.jsonp({
        "id": 1,
        "cols": req.body.cols,
        "rows": req.body.rows,
        "encId": "aaaaaaaa"
    });
});
server.post("/authenticate", function (req, res, next) {
    res.jsonp({
        "token": "aaaaaa",
        "user":{
            "totalPoints": "9999",
            "firstName":"test",
            "lastName":"test"
        },
        "status": "success"
    });
});
server.get("/api/userInfo", function (req, res, next) {
    res.jsonp({
        "token": "aaaaaa",
        "user":{
            "totalPoints": "9999",
            "firstName":"test",
            "lastName":"test"
        },
        "status": "success"
    });
});
server.get("/api/leaderboard", function (req, res, next) {
    res.jsonp({
      "results" : [ {
        "userName" : " null",
        "totalPoints" : 103810
      }, {
        "userName" : "nov11 b",
        "totalPoints" : 100000
      }, {
        "userName" : "nov11 c",
        "totalPoints" : 100000
      }, {
        "userName" : "nov11 a",
        "totalPoints" : 99450
      }, {
        "userName" : "John Leibowitz",
        "totalPoints" : 15230
      }, {
        "userName" : " null",
        "totalPoints" : 15000
      }, {
        "userName" : " null",
        "totalPoints" : 15000
      }, {
        "userName" : " null",
        "totalPoints" : 15000
      }, {
        "userName" : " null",
        "totalPoints" : 15000
      }, {
        "userName" : "jhleibow jhleibow",
        "totalPoints" : 15000
      } ],
      "status" : "success"
    });
});
server.use(router);
server.listen(8080, function () {
    console.log('JSON Server is running')
});