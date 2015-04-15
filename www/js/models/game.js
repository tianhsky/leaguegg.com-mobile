window.app = window.app || {};
app.models = app.models || {};
app.models.game = function() {
  // class vars
  this.data = null;
};

// class methods
app.models.game.findBySummoner = function(options, success, error) {
  app.helpers.api.get({
    url: 'api/game.json?summoner_name=' + options.summonerName + '&region=' + options.region,
    success: success,
    error: error
  })
};

// instance methods
app.models.game.prototype.init = function(json) {
  this.data = json;
  // this.aggregateStats();
  this.ensureTeamInfo();
  this.ensureImgs();
  this.genChartData();
  this.genKDADiff();
}
app.models.game.prototype.getData = function() {
  return this.data;
}
app.models.game.prototype.aggregateStats = function() {
  _.each(this.data.teams, function(team) {
    var attrs = [
      "recent_aggresive_rate",
      "recent_helpful_rate",
      "recent_cs_rate",
      "recent_jungle_rate",

      "recent_physical_to_champ",
      "recent_magic_to_champ",
      "recent_true_to_champ",

      "recent_kills",
      "recent_deaths",
      "recent_assists",

      "recent_won",
      "recent_lost",
      "recent_win_rate",

      "aggresive_rate",
      "kills",
      "deaths",
      "assists",
      "win_rate"
    ];

    // init team stats
    team.people_with_stats = 0;
    _.each(attrs, function(attr) {
      team[attr] = 0;
    });

    // count people
    _.each(team.participants, function(p) {
      if (!_.isEmpty(p[attrs[0]])) {
        team.people_with_stats += 1;
      }
    });

    // sum
    _.each(team.participants, function(p) {
      _.each(attrs, function(attr) {
        if (!_.isEmpty(p[attr])) {
          team[attr] += 1;
        }
      });
    });
  });
  return null;
}
app.models.game.prototype.ensureImgs = function() {
  _.each(this.data.teams, function(team) {
    _.each(team.banned_champions, function(c) {
      c.img_url = app.models.champion.findById(c.id).img_url;
    });
    _.each(team.participants, function(p) {
      p.champion.img_url = app.models.champion.findById(p.champion.id).img_url;
      p.spell1.img_url = app.models.spell.findById(p.spell1.id).img_url;
      p.spell2.img_url = app.models.spell.findById(p.spell2.id).img_url;
    });
  })
}
app.models.game.prototype.ensureTeamInfo = function() {
  _.each(this.data.teams, function(team) {
    if (team.id == 100) {
      team.name = "Blue Team";
      team.css = "blue";
    }
    if (team.id == 200) {
      team.name = "Red Team";
      team.css = "red";
    }
  })
}
app.models.game.prototype.genChartData = function() {
  _.each(this.data.teams, function(team) {
    _.each(team.participants, function(p) {
      if (p.ranked_stat_recent) {
        p.charts = [{
          nodata: false,
          label: "Aggresive",
          rate: p.ranked_stat_recent.aggresive_rate,
          bar_class: "offense",
          drate: p.ranked_stat_recent.aggresive_rate - (p.ranked_stat_overall ? p.ranked_stat_overall.aggresive_rate : 0),
          description: ""
        }, {
          nodata: false,
          label: "Win",
          rate: p.ranked_stat_recent.win_rate,
          bar_class: "win",
          drate: p.ranked_stat_recent.win_rate - (p.ranked_stat_overall ? p.ranked_stat_overall.win_rate : 0),
          description: ""
        }];
      } else {
        p.charts = [{
          nodata: true,
          label: "Aggresive",
          rate: 0,
          bar_class: "offense",
          drate: 0,
          description: "No Data"
        }, {
          nodata: true,
          label: "Win",
          rate: 0,
          bar_class: "win",
          drate: 0,
          description: "No Data"
        }];
      }
    })
  })
}
app.models.game.prototype.genKDADiff = function() {
  _.each(this.data.teams, function(team) {
    _.each(team.participants, function(p) {
      if (p.ranked_stat_recent) {
        p.diff = {
          avg_kills: p.ranked_stat_recent.avg_kills - (p.ranked_stat_overall ? p.ranked_stat_overall.avg_kills : 0),
          avg_deaths: p.ranked_stat_recent.avg_deaths - (p.ranked_stat_overall ? p.ranked_stat_overall.avg_deaths : 0),
          avg_assists: p.ranked_stat_recent.avg_assists - (p.ranked_stat_overall ? p.ranked_stat_overall.avg_assists : 0)
        }
      } else {
        p.diff = {
          avg_kills: 0,
          avg_deaths: 0,
          avg_assists: 0
        }
      }
    })
  })
}