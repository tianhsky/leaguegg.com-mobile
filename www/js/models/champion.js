window.app = window.app || {};
app.models = app.models || {};
app.models.champion = function() {

};
app.models.champion.findById = function(championId) {
  var champs = app.consts.champion.data;
  var champKey = _.findKey(champs, function(champ) {
    return champ.id == championId
  });
  if (_.isEmpty(champKey)) {
    return {};
  }
  var champ = champs[champKey];
  champ.img_url = "img/riot/champion/" + champ.key + ".png";
  return champ;
};