//http://www.mofufus.com/LEAGUE/TeamStandings.cfm?division_id=359

var Nightmare = require('nightmare');

new Nightmare()
    .goto('http://www.mofufus.com/LEAGUE/BoxScore.cfm?game_id=12139&division_id=359')
    .evaluate(function() {
        var error;
        var main = document.querySelectorAll('table')[3].rows[0].querySelector('td:nth-child(1)');

        var boldList = main.querySelectorAll('font[face="Arial Narrow"]:not([size="2"])');
        var gameDetails = main.querySelectorAll('font')[1];
        var date = gameDetails.childNodes[2].textContent.split('-')[0];
        var time = gameDetails.childNodes[2].textContent.split('-')[1];
        var gameLocation = gameDetails.childNodes[6].textContent;

        var teamA = boldList[1].innerText;
        var teamB = boldList[1].innerText;
        //var tableList = main.querySelectorAll('table')[0];

        var boxScores = main.querySelectorAll('table');
        var results = {};

        results[teamA] = parseBoxScore(boxScores[0]);
        results[teamB] = parseBoxScore(boxScores[1]);


        return results;

        /* Box Score
         {
            'teamA': {
                 score: '',
                 location: '',
                 time: '',
                 date: '',
                 players: {
                     'name1': {
                        FGM: '',
                        FGA: '',
                     },
                     'name2': {
                        ...
                     },
                     'name3': {
                        ...
                     }
                 },
                 teamStats: {
                    FGM: '',
                    FGA: '',
                    FTM: '',
                    FTA: '',
                    Reb: ''
                 }
             },
            'teamB': {
                score: '',
                location: '',
                time: '',
                date: '',
                players: {
                    'name1': {
                        FGM: '',
                        FGA: '',
                    },
                    'name2': {
                        ...
                    },
                    'name3': {
                        ...
                    }
                },
                teamStats: {
                     FGM: '',
                     FGA: '',
                     FTM: '',
                     FTA: '',
                     Reb: ''
                }
             }
         }
         */

        function parseBoxScore(table) {
            var teamStats = {};
            var players = [];
            var start = 1, end = table.rows.length - 2;
            for (var i = start; i < end; i++) {
                var playerTD = table.rows[i].querySelectorAll('td');

                var player = {};
                var name = playerTD[1].querySelector('font a').innerText;
                player[name] = {
                    name: playerTD[1].querySelector('font a').innerText,
                    FGM: playerTD[2].querySelector('div font').innerText.split('-')[0],
                    FGA: playerTD[2].querySelector('div font').innerText.split('-')[1],
                    '3PM': playerTD[3].querySelector('div font').innerText.split('-')[0],
                    '3PA': playerTD[3].querySelector('div font').innerText.split('-')[1],
                    FTM: playerTD[4].querySelector('div font').innerText.split('-')[0],
                    FTA: playerTD[4].querySelector('div font').innerText.split('-')[1],
                    rebounds: playerTD[5].querySelector('div font').innerText,
                    assists: playerTD[6].querySelector('div font').innerText,
                    steals: playerTD[7].querySelector('div font').innerText,
                    blocks: playerTD[8].querySelector('div font').innerText,
                    fouls: playerTD[9].querySelector('div font').innerText,
                    points: playerTD[10].querySelector('div font').innerText
                };
                players.push(player);

            }
            var teamStatsTD = table.rows[table.rows.length - 2].querySelectorAll('td');
            teamStats = {
                date: date,
                time: time,
                location: gameLocation,
                teamStats: {
                    FGM: teamStatsTD[2].querySelector('div font').innerText.split('-')[0],
                    FGA: teamStatsTD[2].querySelector('div font').innerText.split('-')[1],
                    '3PM': teamStatsTD[3].querySelector('div font').innerText.split('-')[0],
                    '3PA': teamStatsTD[3].querySelector('div font').innerText.split('-')[1],
                    FTM: teamStatsTD[4].querySelector('div font').innerText.split('-')[0],
                    FTA: teamStatsTD[4].querySelector('div font').innerText.split('-')[1],
                    rebounds: teamStatsTD[5].querySelector('div font').innerText,
                    assists: teamStatsTD[6].querySelector('div font').innerText,
                    steals: teamStatsTD[7].querySelector('div font').innerText,
                    blocks: teamStatsTD[8].querySelector('div font').innerText,
                    fouls: teamStatsTD[9].querySelector('div font').innerText,
                    points: teamStatsTD[10].querySelector('div font').innerText
                },
                players: players
            };
            return teamStats;
        }



    }, function(result) {
        console.log(JSON.stringify(result));

    })
    .run(function(err, nightmare) {
        console.log('Done!');
    });


