var Nightmare = require('nightmare');

new Nightmare()
    .goto('http://www.mofufus.com/LEAGUE/PastResults.cfm')
    .evaluate(function() {
        var error;
        var main = document.querySelectorAll('table')[3].rows[0].querySelector('td:nth-child(1)');

        var tableList = main.querySelectorAll('div table');

        var seasonList = [];
        for(var i=0; i<tableList.length; i++) {
            var season = parseSeasonList(tableList[i]);
            seasonList.push(season);
        }


        return seasonList;

        // want to return array of seasons
        //[
        //    {
        //        season: '2014 fall season',
        //        divisionList: [
        //            {
        //                name: 'Copper West',
        //                divisionId: 123
        //            }
        //        ]
        //    }
        //]
        function parseSeasonList(seasonTable) {
            var seasonName = seasonTable.querySelector('tr td:nth-child(1) img').getAttribute('alt');
            var nodeList = seasonTable.querySelectorAll('tr td:nth-child(2) font a');
            var divisionList = [];

            for(var i=0;i<nodeList.length; i++) {
                var division = {
                    name: nodeList[i].innerHTML,
                    //divisionId: nodeList[i].getAttribute('href').spit('=')[1]
                    link: nodeList[i].href,
                    divisionId: nodeList[i].href.split('=')[1]
                };
                divisionList.push(division);
            }
            var season = {
                seasonName: seasonName,
                divisionList: divisionList
            };

            return season;

        }

    }, function(result) {
        console.log(JSON.stringify(result));

    })
    .run(function(err, nightmare) {
        console.log('Done!');
    });


