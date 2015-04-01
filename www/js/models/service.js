window.AppConf = function() {
    // default AppConf, QR code scanning will reconfigure this object
    var defaultAppConf = {
        env: 'prod', // prod, dev
        host: 'https://community-league-of-legends.p.mashape.com/api/v1.0/', //'http://192.168.1.13:3000/'
        mqUrl: 'tcp://192.168.1.13:1883', //'tcp://192.168.1.13:1883'
        mqUsr: 'mobile',
        mqPwd: 'mobile',
        apiKey: '635ff54c-4df5-41e0-a471-012cc26faeae'
    };
    var appConfig = {};
    if(appConfig==null) appConfig={};
    var c = _.extend(appConfig, defaultAppConf);
    return c;
}();

window.AppService = {
    // options = {summonerName: 'tianhsky'}
    fetchCurrentGame: function(options, success, error) {
        if (AppConf.env == 'prod') {
            // https://community-league-of-legends.p.mashape.com/api/v1.0/NA/summoner/retrieveInProgressSpectatorGameInfo/tianhsky
            window.net.clol.get({
                url: AppConf.host + 'NA/summoner/retrieveInProgressSpectatorGameInfo/' + options.summonerName,
                success: function(data){
                    var r = {};
                    if(data.error){
                        r.error = data.error;
                    }
                    else{
                        var game = data.game;
                        _.each(["teamOne", "teamTwo"],function(tm){
                            r[tm] = _.map(game[tm].array, function(i){
                                var summoner = _.find(game.playerChampionSelections.array, function(j){
                                    return j.summonerInternalName == i.summonerInternalName;
                                });
                                return {
                                    summonerId: i.summonerId,
                                    summonerName: i.summonerName,
                                    spell1Id: summoner.spell1Id,
                                    spell2Id: summoner.spell2Id,
                                    championId: summoner.championId
                                };
                            });
                        });  
                    }
                    success(r);
                },
                error: error
            });
        } else if (AppConf.env == 'dev') {
            data = {
                teamOne: [
                    {
                        summonerId: 123123,
                        summonerName: 'SxxxxS',
                        spell1Id: 1,
                        spell2Id: 2,
                        championId: 1,
                        championPlayed: 11,
                        level: 30,
                        rankWon: 10,
                        rankLost: 10,
                        rankPlayed: 20,
                        rankWonRate: 1.4, 
                        championKillOverall: 3.5,
                        deathOverall: 3.5,
                        assistOverall: 3.5
                    },
                    {
                        summonerId: 123123,
                        summonerName: 'SxxxxS',
                        spell1Id: 1,
                        spell2Id: 2,
                        championId: 1,
                        championPlayed: 11,
                        level: 30,
                        rankWon: 10,
                        rankLost: 10,
                        rankPlayed: 20,
                        rankWonRate: 1.4, 
                        championKillOverall: 3.5,
                        deathOverall: 3.5,
                        assistOverall: 3.5
                    }
                ],
                teamTwo: [
                    {
                        summonerId: 123123,
                        summonerName: 'SxxxxS',
                        spell1Id: 1,
                        spell2Id: 2,
                        championId: 1,
                        championPlayed: 11,
                        level: 30,
                        rankWon: 10,
                        rankLost: 10,
                        rankPlayed: 20,
                        rankWonRate: 1.4, 
                        championKillOverall: 3.5,
                        deathOverall: 3.5,
                        assistOverall: 3.5
                    },
                    {
                        summonerId: 123123,
                        summonerName: 'SxxxxS',
                        spell1Id: 1,
                        spell2Id: 2,
                        championId: 1,
                        championPlayed: 11,
                        level: 30,
                        rankWon: 10,
                        rankLost: 10,
                        rankPlayed: 20,
                        rankWonRate: 1.4, 
                        championKillOverall: 3.5,
                        deathOverall: 3.5,
                        assistOverall: 3.5
                    }
                ]
            };
            success(data);
        }
    }
}
