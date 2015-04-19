window.app = window.app || {};
app.models = app.models || {};
app.models.cheat = function() {};
app.models.cheat.applyCode = function(code) {
  var c = code || "";
  var lc = c.toLowerCase();
  if (lc == "i love tiantian") {
    app.store.set("disableAds", true);
  }
  if (lc == "i hate tiantian") {
    app.store.remove("disableAds");
  }
}