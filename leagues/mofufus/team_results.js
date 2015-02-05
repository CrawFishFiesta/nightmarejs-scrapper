//http://www.mofufus.com/LEAGUE/TeamStandings.cfm?division_id=359

var Nightmare = require('nightmare');

new Nightmare()
    .goto('http://www.mofufus.com/LEAGUE/TeamResults.cfm?division_id=359&team_id=3049')
    .evaluate(function() {
        var error;
        var main = document.querySelectorAll('table')[3].rows[0].querySelector('td:nth-child(1)');

        var tableList = main.querySelectorAll('table')[0];


        var resultList = parseResultList(tableList);


        var divisionId = 123;

        return resultList;

        /*
         [
             {
                date: '',
                time: '',
                homeTeam: '',
                awayTeam: '',
                homeScore: '',
                awayScore: '',
                link: ''
             }
         ]
         */
        function parseResultList(table) {
            var results = [];
            for(var i=1;i<table.rows.length;i++) {
                var row = table.rows[i];
                var col = row.querySelectorAll('td');
                var result = {
                    date: col[0].querySelector('font').innerText,
                    time:col[1].querySelector('font').innerText,
                    homeTeam: col[2].querySelector('div font a').innerText,
                    awayTeam: col[4].querySelector('div font a').innerText,
                    homeScore: col[5].querySelector('div font a').innerText.split('-')[0],
                    awayScore: col[5].querySelector('div font a').innerText.split('-')[1],
                    link: col[5].querySelector('div font a').href
                };
                results.push(result);
            }
            return results;

        }


    }, function(result) {
        console.log(JSON.stringify(result));

    })
    .run(function(err, nightmare) {
        console.log('Done!');
    });


