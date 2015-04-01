window.net = {};
window.net.clol = {
    setupAjax: function(opts) {
        opts.beforeSend = function(xhr) {
            xhr.setRequestHeader("X-Mashape-Key", "Y8lNLcAH8XmshQpwecFMDF6jWUzJp1K3hMnjsnkPylutVtVLXj");
        };
    },
    get: function(opts) {
        var self = this;
        opts.type = "GET";
        self.setupAjax(opts);
        $.ajax(opts);
    },
    post: function(opts) {
        var self = this;
        opts.type = "POST";
        self.setupAjax(opts);
        $.ajax(opts);
    }
};
