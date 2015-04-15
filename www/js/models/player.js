window.app = window.app || {};
app.models = app.models || {};
app.models.player = function() {
  // class vars
  this.data = null;
};

app.models.player.findTwithChannel = function(playerName, success, error) {
  app.helpers.twitchtv.get({
    url: "search/channels?limit=1&q=" + playerName,
    success: function(resp) {
      var channels = resp.channels;
      if (_.isEmpty(channels)) {
        success(null);
      } else {
        var channel = channels[0];
        if (channel.game == "League of Legends") {
          success({
            name: channel.name,
            embed_url: "http://www.twitch.tv/" + channel.name + "/embed"
          });
        } else {
          success(null);
        }
      }
    },
    error: function() {
      success(null);
    }
  })
}

app.models.player.findTwithStream = function(playerName, success, error) {
  app.helpers.twitchtv.get({
    url: "streams/" + playerName,
    success: function(resp) {
      var stream = resp.stream;
      if (_.isEmpty(stream)) {
        success(null);
      } else {
        if (stream.game == "League of Legends") {
          success({
            id: stream._id,
            name: stream.channel.name,
            embed_url: "http://www.twitch.tv/" + stream.channel.name + "/embed",
            preview: stream.preview
          });
        } else {
          success(null);
        }
      }
    },
    error: function() {
      success(null);
    }
  })
}