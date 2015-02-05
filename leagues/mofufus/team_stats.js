var Nightmare = require('nightmare');

new Nightmare()
    .goto('http://www.mofufus.com/LEAGUE/TeamStats.cfm?division_id=359&team_id=3099')
    .evaluate(function() {
        var error;
        var main = document.querySelectorAll('table')[3].rows[0].querySelector('td:nth-child(1)');
        if ( main.innerHTML.indexOf('OVER THE HILL') < 0 || main.innerHTML.indexOf('PLAYER AVERAGES') < 0 ) error++;

        var boxTotals = main.querySelectorAll('table')[3].querySelectorAll('table tr');
        if ( boxTotals[0].innerHTML.indexOf('PLAYER') < 0 && boxTotals.innerHTML.indexOf('FGM-A') < 0 ) error ++;

        var playerList = parseBoxScore(boxTotals);

        console.log('NO ONE WILL HEAR THIS!');
        return {
            players: playerList,
            error: error
        };


        function parseBoxScore(playerList) {
            var players = [];
            var start = 1, end = playerList.length -2;
            for(var i=start; i<end; i++) {
                var playerTD = playerList[i].querySelectorAll('td');

                var player = {
                    name: playerTD[0].querySelector('font a').innerText,
                    games: playerTD[1].querySelector('div font').innerText,
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
            return players;
        }

    }, function(result) {

        if(result.error) console.log('There were ' + result.error + ' errors');

        var players = result.players;

        console.log('players: ', players);
    })
    .run(function(err, nightmare) {
        console.log('Done!');
    });


