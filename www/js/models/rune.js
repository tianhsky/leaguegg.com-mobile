window.app = window.app || {};
app.models = app.models || {};
app.models.rune = function() {

};
app.models.rune.findById = function(runeId) {
  var runes = app.consts.rune.data;
  var rune = runes[runeId];
  if (!rune) return {};
  rune.img_url = "img/riot/rune/" + rune.image.full;
  return rune;
};