Here's the page flow to scrape

http://www.mofufus.com/LEAGUE/PastResults.cfm -> { divisionId: 123, name: 'TIN PACIFIC' }

http://www.mofufus.com/LEAGUE/TeamStandings.cfm?division_id=359 -> {teamId: 3049, teamName: 'ABC', link: 'http://www.mofufus.com/LEAGUE/teamroster.cfm?division=359&team_id=3049' }

http://www.mofufus.com/LEAGUE/TeamResults.cfm?division_id=359&team_id=3049 -> { awayScore: 50, awayTeam: 'FOOBARS', homeScore: 51, homeTeam: 'WE TRY', link: 'http://box_score_page.cfm' }

http://www.mofufus.com/LEAGUE/BoxScore.cfm?game_id=12139&division_id=359 -> { 'TEAM A': {}, 'TEAM B': {} }