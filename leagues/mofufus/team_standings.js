//http://www.mofufus.com/LEAGUE/TeamStandings.cfm?division_id=359

var Nightmare = require('nightmare');

new Nightmare()
    .goto('http://www.mofufus.com/LEAGUE/TeamStandings.cfm?division_id=359')
    .evaluate(function() {
        var error;
        var main = document.querySelectorAll('table')[3].rows[0].querySelector('td:nth-child(1)');

        var tableList = main.querySelectorAll('table')[0];

        var teamList = parseTeamList(tableList);

        var divisionId = 123;

        return teamList;

        /*
        [
        {
            teamName: 'foo',
            link: 'link',
            teamId: 123,
            divisionId: 456
        }
        ]
         */
        function parseTeamList(table) {
            var teams = [];
            for(var i=1;i<table.rows.length;i++) {
                var row = table.rows[i];
                var col = row.querySelectorAll('td');
                var team = {
                    teamName: col[1].querySelector('font a').innerText,
                    link: col[1].querySelector('font a').href,
                    teamId: col[1].querySelector('font a').href.split('=')[2],
                    divisionId: divisionId
                };
                teams.push(team);
            }
            return teams;

        }


    }, function(result) {
        console.log(JSON.stringify(result));

    })
    .run(function(err, nightmare) {
        console.log('Done!');
    });


