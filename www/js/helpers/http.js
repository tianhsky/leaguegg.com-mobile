window.app = window.app || {};
app.helpers = app.helpers || {};
app.helpers.api = {
  setupAjax: function(opts) {
    opts.beforeSend = function(xhr) {
      xhr.setRequestHeader("api-key", config.apiKey);
    };
  },
  get: function(opts) {
    var self = this;
    opts.url = config.apiHost + opts.url;
    opts.type = "GET";
    self.setupAjax(opts);
    $.ajax(opts);
  },
  post: function(opts) {
    var self = this;
    opts.url = config.apiHost + opts.url;
    opts.type = "POST";
    self.setupAjax(opts);
    $.ajax(opts);
  }
};

app.helpers.twitchtv = {
  setupAjax: function(opts) {
    opts.beforeSend = function(xhr) {
      xhr.setRequestHeader("Accept", "application/vnd.twitchtv.v3+json");
    };
  },
  get: function(opts) {
    var self = this;
    opts.url = "https://api.twitch.tv/kraken/" + opts.url;
    opts.type = "GET";
    self.setupAjax(opts);
    $.ajax(opts);
  }
}